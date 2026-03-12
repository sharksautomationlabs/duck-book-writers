import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const BASE_URL = 'https://www.duckbookwriters.com';
const YOUTUBE_BANNER_IMG = `${BASE_URL}/images/signature-1.png`;
const DUCK_LOGO_IMG = `${BASE_URL}/images/signature-2.png`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const args = body.args || body;
    const {
      to,
      subject,
      client_name,
      project_service,
      budget,
      target_audience,
      stuck_points,
      success_definition,
      timeline,
      previous_experience,
    } = args;

    if (!to) {
      return NextResponse.json({ result: 'Error: No email address provided.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json({ result: 'Error: Email service not configured.' });
    }

    const resend = new Resend(apiKey);

    const calendlyLink = 'https://calendly.com/contact-duckbookwriters/30min';
    const firstName = (client_name || 'there').split(' ')[0];

    const summaryRows = [
      { label: 'Service', value: project_service },
      { label: 'Budget', value: budget },
      { label: 'Target Audience', value: target_audience },
      { label: 'Current Challenges', value: stuck_points },
      { label: 'Success Goals', value: success_definition },
      { label: 'Timeline', value: timeline },
      { label: 'Experience', value: previous_experience },
    ].filter(r => r.value && r.value !== 'Not specified' && r.value !== 'To be discussed');

    const summarySection = summaryRows.length > 0 ? `
          <div style="background: #f9f9f9; border-left: 4px solid #c8a415; padding: 16px 20px; margin: 0 0 28px; border-radius: 0 6px 6px 0;">
            <p style="margin: 0 0 10px; font-size: 14px; font-weight: 700; color: #333;">Your Project Details:</p>
            ${summaryRows.map(r => `<p style="margin: 3px 0; font-size: 13px; color: #555;"><strong>${r.label}:</strong> ${r.value}</p>`).join('')}
          </div>` : '';

    const htmlEmail = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #ffffff;">

        <div style="padding: 25px 30px 15px; background: #ffffff;">
          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 18px;">
            Hi ${firstName},
          </p>

          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 18px;">
            I hope you're doing well.
          </p>

          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 18px;">
            I wanted to quickly share an exciting opportunity with you &mdash; <strong>transforming your book into a YouTube series or film</strong>.
          </p>

          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 18px;">
            With over <strong>2.7 billion users</strong> worldwide, YouTube allows your story to reach audiences far beyond traditional platforms. Instead of waiting for readers to search for books, your story can be discovered through powerful visuals, episodes, or cinematic storytelling.
          </p>

          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 25px;">
            This approach doesn't replace your book &mdash; it <strong>amplifies</strong> it, builds your personal brand, and creates a deeper emotional connection with viewers who can become loyal readers.
          </p>

          <div style="margin: 0 0 28px; text-align: center;">
            <img src="${YOUTUBE_BANNER_IMG}" alt="How can I introduce my book on YouTube" style="width: 100%; max-width: 560px; height: auto; border-radius: 8px; display: block; margin: 0 auto;" />
          </div>

          ${summarySection}

          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 18px;">
            If you think this sounds interesting, feel free to reply to this email or contact me directly at <strong>(346) 463-7684</strong> &ndash; Aly Reed. I'd love to discuss how we can bring your story to life.
          </p>

          <div style="text-align: center; margin: 25px 0 30px;">
            <a href="${calendlyLink}" style="display: inline-block; background: #c8a415; color: #ffffff; font-weight: 700; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 15px; letter-spacing: 0.3px;">Book Your Strategy Session</a>
          </div>

          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 8px;">
            Looking forward to your response.
          </p>

          <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0 0 25px;">
            Warm regards,
          </p>
        </div>

        <div style="padding: 0 30px 30px; background: #ffffff;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
            <tr>
              <td style="vertical-align: top; padding-right: 20px; width: 90px;">
                <img src="${DUCK_LOGO_IMG}" alt="Duck Book Writers" style="width: 80px; height: auto; border-radius: 50%;" />
              </td>
              <td style="vertical-align: top;">
                <p style="margin: 0 0 2px; font-size: 16px; font-weight: 700; color: #1a1a1a;">Aly Reed</p>
                <p style="margin: 0 0 10px; font-size: 13px; color: #c8a415; font-weight: 600;">YouTube Strategist</p>
                <p style="margin: 0 0 3px; font-size: 12px; color: #666;">&#9742; (346) 463-7684 &nbsp;|&nbsp; &#9993; aly.reed@duckbookwriters.com</p>
                <p style="margin: 0 0 3px; font-size: 12px; color: #666;">&#9679; <a href="https://www.duckbookwriters.com" style="color: #666; text-decoration: none;">www.duckbookwriters.com</a></p>
                <p style="margin: 0; font-size: 12px; color: #666;">&#128205; 22023 Rustic Canyon Ln, Richmond TX - 77469, United States.</p>
              </td>
            </tr>
          </table>
        </div>

        <div style="background: #f5f5f5; padding: 18px 30px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; font-size: 10px; color: #999; line-height: 1.5; text-align: center;">
            <strong>Note:</strong> The contents of this email and any attachments are confidential. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.
          </p>
        </div>

      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Aly Reed - Duck Book Writers <onboarding@resend.dev>',
      to: [to],
      subject: subject || `${firstName}, An Exciting Opportunity – Transform Your Book into YouTube Content`,
      html: htmlEmail,
    });

    if (error) {
      console.error('Resend error in Retell webhook:', error);
      return NextResponse.json({
        result: `Failed to send email: ${error.message}`,
      });
    }

    console.log('Confirmation email sent to', to, '- ID:', data?.id);
    return NextResponse.json({
      result: `Confirmation email has been successfully sent to ${to}. The email includes the Book to YouTube pitch, their project details, a Calendly booking link, and contact info for Aly Reed.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Send email webhook error:', message);
    return NextResponse.json({ result: `Error sending email: ${message}` });
  }
}
