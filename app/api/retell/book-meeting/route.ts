import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_EMAIL, CONTACT_PHONE, CALENDLY_LINK } from '../../config/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const args = body.args || body;
    const {
      attendee_name,
      attendee_email,
      preferred_time,
    } = args;

    if (!attendee_email) {
      return NextResponse.json({ result: 'Error: No email address provided for meeting booking.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json({ result: 'Error: Email service not configured.' });
    }

    const resend = new Resend(apiKey);

    const htmlEmail = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 26px; color: #1A1A1A; font-weight: 700;">Duck Book Writers</h1>
          <p style="margin: 8px 0 0; color: #333; font-size: 14px;">Meeting Invitation</p>
        </div>

        <div style="padding: 35px 30px; background: #ffffff;">
          <p style="font-size: 16px; color: #333; margin: 0 0 20px;">Hi <strong>${attendee_name || 'Valued Client'}</strong>,</p>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 25px;">
            As discussed during our call, we'd love to schedule a consultation meeting with you to dive deeper into your book project.
          </p>

          ${preferred_time ? `
          <div style="background: #FFFBF0; border: 1px solid #FFE4A0; border-radius: 8px; padding: 20px; margin: 0 0 25px; text-align: center;">
            <p style="margin: 0; color: #777; font-size: 13px;">Your Preferred Time</p>
            <p style="margin: 5px 0 0; color: #333; font-size: 18px; font-weight: 700;">${preferred_time}</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin: 0 0 25px;">
            <p style="font-size: 15px; color: #555; margin: 0 0 15px;">Please click the button below to confirm and book your 30-minute consultation:</p>
            <a href="${CALENDLY_LINK}" style="display: inline-block; background: #FFD700; color: #1A1A1A; font-weight: 700; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-size: 16px;">Book Your Meeting Now</a>
          </div>

          <div style="background: #F0F7FF; border: 1px solid #B8D4F0; border-radius: 8px; padding: 20px; margin: 0 0 25px;">
            <h4 style="margin: 0 0 10px; color: #1A1A1A; font-size: 14px;">What to Expect in the Meeting:</h4>
            <ul style="margin: 0; padding: 0 0 0 20px; color: #555; font-size: 14px; line-height: 1.8;">
              <li>Detailed review of your book project</li>
              <li>Custom publishing roadmap for your goals</li>
              <li>Timeline and pricing discussion</li>
              <li>Q&A with our publishing specialist</li>
            </ul>
          </div>

          <p style="font-size: 14px; color: #555; line-height: 1.6; margin: 0 0 10px;">
            If you need to reschedule, simply click the link above and choose a new time. For any questions, call us at <strong>+1 (346) 463-7721</strong>.
          </p>
          <p style="font-size: 14px; color: #555; margin: 0;">
            Looking forward to meeting you!<br><strong>Duck Book Writers Team</strong>
          </p>
        </div>

        <div style="background: #F8F9FA; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #eee;">
          <p style="margin: 0; color: #999; font-size: 12px;">A Project of ECOMMERCE SHARKS LLC | © 2025 Duck Book Writers. All Rights Reserved.</p>
          <p style="margin: 5px 0 0; color: #999; font-size: 11px;">${CONTACT_EMAIL} | ${CONTACT_PHONE}</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Duck Book Writers <onboarding@resend.dev>',
      to: [attendee_email],
      subject: 'Book Your Consultation Meeting - Duck Book Writers',
      html: htmlEmail,
    });

    if (error) {
      console.error('Resend error in meeting webhook:', error);
      return NextResponse.json({
        result: `Failed to send meeting invitation: ${error.message}`,
      });
    }

    console.log('Meeting invitation sent to', attendee_email, '- ID:', data?.id);
    return NextResponse.json({
      result: `Meeting invitation email has been sent to ${attendee_email}. The email includes a Calendly link where they can book a 30-minute consultation at their preferred time${preferred_time ? ` (suggested: ${preferred_time})` : ''}. The client should check their inbox to confirm the booking.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Book meeting webhook error:', message);
    return NextResponse.json({ result: `Error sending meeting invitation: ${message}` });
  }
}
