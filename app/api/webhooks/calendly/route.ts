import { NextRequest, NextResponse } from 'next/server';

const RETELL_API_URL = 'https://api.retellai.com/v2/create-phone-call';

export async function POST(request: NextRequest) {
  console.log('=== CALENDLY WEBHOOK RECEIVED ===');

  try {
    const body = await request.json();
    console.log('Calendly event type:', body.event);
    console.log('Calendly payload keys:', Object.keys(body.payload || {}));

    const event = body.event;
    const payload = body.payload;

    if (event !== 'invitee.created') {
      console.log('Ignoring event:', event);
      return NextResponse.json({ received: true, action: 'ignored' });
    }

    const invitee = payload;
    const name = String(invitee.name || invitee.invitee_name || '').trim();
    const email = String(invitee.email || invitee.invitee_email || '').trim();
    const phone = extractPhone(invitee);
    const eventName = String(invitee.event_type?.name || invitee.scheduled_event?.name || 'Book to YouTube Consultation').trim();

    console.log('Calendly invitee:', { name, email, phone: phone || 'NOT FOUND', eventName });

    if (invitee.questions_and_answers) {
      console.log('Calendly Q&A:', JSON.stringify(invitee.questions_and_answers));
    }

    if (!phone) {
      console.log('WARNING: No phone number found. Available fields:', JSON.stringify({
        phone_number: invitee.phone_number,
        text_reminder_number: invitee.text_reminder_number,
        questions_count: invitee.questions_and_answers?.length || 0,
      }));
      return NextResponse.json({
        received: true,
        action: 'skipped',
        reason: 'No phone number provided in Calendly booking',
      });
    }

    const apiKey = process.env.RETELL_API_KEY;
    const fromNumber = process.env.RETELL_FROM_NUMBER;
    const agentId = process.env.RETELL_AGENT_ID || 'agent_cbb84cd302ededccb48504d3c9';

    if (!apiKey || !fromNumber) {
      console.error('MISSING ENV VARS - RETELL_API_KEY:', !!apiKey, 'RETELL_FROM_NUMBER:', !!fromNumber);
      return NextResponse.json(
        { success: false, error: 'Retell configuration missing' },
        { status: 500 }
      );
    }

    const formattedNumber = formatToE164(phone);
    if (!formattedNumber) {
      console.log('Invalid phone format. Raw:', phone);
      return NextResponse.json({
        received: true,
        action: 'skipped',
        reason: 'Invalid phone number format',
      });
    }

    console.log('Initiating Retell call to:', formattedNumber, 'for:', name);

    const retellPayload = {
      from_number: fromNumber,
      to_number: formattedNumber,
      override_agent_id: agentId,
      override_agent_version: 4,
      retell_llm_dynamic_variables: {
        client_name: name || 'Valued Customer',
        client_email: email || '',
        client_phone: formattedNumber,
        project_service: eventName || 'Book to YouTube Consultation',
        budget: 'Not specified',
        call_source: 'calendly',
      },
      metadata: {
        customer_name: name,
        customer_email: email,
        event_name: eventName,
        source: 'calendly_webhook',
        timestamp: new Date().toISOString(),
      },
    };

    const response = await fetch(RETELL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(retellPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Retell API FAILED:', response.status, data);
      return NextResponse.json(
        { received: true, action: 'call_failed', error: data.message },
        { status: 200 }
      );
    }

    console.log('=== CALL SUCCESS === Call ID:', data.call_id, '| To:', name, formattedNumber);
    return NextResponse.json({
      received: true,
      action: 'call_initiated',
      call_id: data.call_id,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('CALENDLY WEBHOOK ERROR:', message);
    return NextResponse.json(
      { received: true, error: message },
      { status: 200 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: 'Calendly Webhook → Retell AI Call',
    events: ['invitee.created'],
    instructions: 'Configure this URL as webhook in Calendly Developer Portal',
  });
}

function extractPhone(invitee: Record<string, unknown>): string | null {
  if (typeof invitee.phone_number === 'string' && invitee.phone_number) {
    return invitee.phone_number;
  }

  const questionsAndAnswers = invitee.questions_and_answers as Array<{
    question: string;
    answer: string;
  }> | undefined;

  if (Array.isArray(questionsAndAnswers)) {
    for (const qa of questionsAndAnswers) {
      const q = (qa.question || '').toLowerCase();
      if (
        q.includes('phone') || q.includes('contact') || q.includes('number') ||
        q.includes('cell') || q.includes('mobile') || q.includes('whatsapp') ||
        q.includes('tel')
      ) {
        if (qa.answer) return qa.answer;
      }
    }

    for (const qa of questionsAndAnswers) {
      const answer = (qa.answer || '').replace(/\D/g, '');
      if (answer.length >= 10 && answer.length <= 15) {
        return qa.answer;
      }
    }
  }

  const textReminderNumber = invitee.text_reminder_number;
  if (typeof textReminderNumber === 'string' && textReminderNumber) {
    return textReminderNumber;
  }

  return null;
}

function formatToE164(phone: string): string | null {
  const digits = phone.replace(/[^\d+]/g, '');

  if (digits.startsWith('+') && digits.length >= 11 && digits.length <= 15) {
    return digits;
  }

  const cleanDigits = digits.replace(/\D/g, '');

  if (cleanDigits.length === 10) {
    return `+1${cleanDigits}`;
  }

  if (cleanDigits.length === 11 && cleanDigits.startsWith('1')) {
    return `+${cleanDigits}`;
  }

  if (cleanDigits.length >= 10 && cleanDigits.length <= 15) {
    return `+${cleanDigits}`;
  }

  return null;
}
