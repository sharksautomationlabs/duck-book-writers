import { NextRequest, NextResponse } from 'next/server';

const RETELL_API_URL = 'https://api.retellai.com/v2/create-phone-call';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to_number, customer_name, customer_email, service, budget, source } = body;

    // Ensure real form data is passed as strings to Retell (agent uses these, not variable names)
    const clientName = typeof customer_name === 'string' ? customer_name.trim() : '';
    const clientEmail = typeof customer_email === 'string' ? customer_email.trim() : '';
    const projectService = typeof service === 'string' ? service.trim() : '';
    const budgetStr = typeof budget === 'string' ? budget.trim() : '';

    const apiKey = process.env.RETELL_API_KEY;
    const fromNumber = process.env.RETELL_FROM_NUMBER;
    const agentId = process.env.RETELL_AGENT_ID || 'agent_cbb84cd302ededccb48504d3c9';

    if (!apiKey || !fromNumber) {
      console.error('Missing RETELL_API_KEY or RETELL_FROM_NUMBER');
      return NextResponse.json(
        { success: false, error: 'Retell configuration missing' },
        { status: 500 }
      );
    }

    if (!to_number) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const formattedNumber = formatToE164(to_number);
    if (!formattedNumber) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    const retellPayload: Record<string, unknown> = {
      from_number: fromNumber,
      to_number: formattedNumber,
      override_agent_id: agentId,
      override_agent_version: 4,
      retell_llm_dynamic_variables: {
        client_name: clientName || 'Valued Customer',
        client_email: clientEmail || '',
        client_phone: formattedNumber,
        project_service: projectService || 'General Inquiry',
        budget: budgetStr || 'Not specified',
        call_source: 'contact_form',
      },
      metadata: {
        customer_name,
        customer_email,
        service,
        budget,
        source,
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
      console.error('Retell API error:', data);
      return NextResponse.json(
        { success: false, error: data.message || 'Failed to create call' },
        { status: response.status }
      );
    }

    console.log('Retell call created:', data.call_id, '| client_name:', clientName || '(fallback)', '| client_email:', clientEmail ? '***' : '(empty)');
    return NextResponse.json({
      success: true,
      call_id: data.call_id,
      message: 'Call initiated successfully',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Retell call error:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
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
