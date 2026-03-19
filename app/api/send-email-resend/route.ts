import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { CONTACT_EMAIL } from '../../config/constants';
import { checkIpRateLimit, getClientIp } from '../../../lib/rate-limit-ip';

export async function POST(request: NextRequest) {
  try {
    // Max 3 form submissions per IP per 24h
    const ip = getClientIp(request);
    const { allowed, remaining } = checkIpRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'Submission limit reached. You can only submit this form 3 times from this network per day.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { 
      from_name, 
      from_email, 
      contact_number, 
      project_service, 
      budget,
      manuscript_file,
      book_cover_file,
      event_name,
      confirmation,
      // Additional fields for event registration
      fullName,
      email,
      cityStateZip,
      bookName,
      authorName,
      genre,
      bookVisibility,
      bookTopic,
      isbn,
      numberOfPages,
      printedCopies,
      soldCopies,
      bookReviews
    } = body;

    // Prepare file attachments
    const attachments = [];
    
    if (manuscript_file && manuscript_file !== 'No file uploaded') {
      try {
        const filePath = join(process.cwd(), 'public', 'uploads', manuscript_file);
        const fileBuffer = await readFile(filePath);
        attachments.push({
          filename: manuscript_file,
          content: fileBuffer
        });
      } catch (error) {
        console.error('Error reading manuscript file:', error);
      }
    }

    if (book_cover_file && book_cover_file !== 'No file uploaded') {
      try {
        const filePath = join(process.cwd(), 'public', 'uploads', book_cover_file);
        const fileBuffer = await readFile(filePath);
        attachments.push({
          filename: book_cover_file,
          content: fileBuffer
        });
      } catch (error) {
        console.error('Error reading book cover file:', error);
      }
    }

    // Determine email content based on form type
    let subject, htmlContent;
    
    if (event_name) {
      // Event registration email
      subject = `Event Registration: ${event_name}`;
      htmlContent = `
        <h2>Event Registration Details</h2>
        <p><strong>Name:</strong> ${fullName || from_name}</p>
        <p><strong>Email:</strong> ${email || from_email}</p>
        <p><strong>Contact:</strong> ${contact_number}</p>
        <p><strong>City/State/Zip:</strong> ${cityStateZip}</p>
        <p><strong>Book Name:</strong> ${bookName}</p>
        <p><strong>Author Name:</strong> ${authorName}</p>
        <p><strong>Genre:</strong> ${genre}</p>
        <p><strong>Book Visibility:</strong> ${bookVisibility}</p>
        <p><strong>Book Topic:</strong> ${bookTopic}</p>
        <p><strong>ISBN:</strong> ${isbn}</p>
        <p><strong>Number of Pages:</strong> ${numberOfPages}</p>
        <p><strong>Printed Copies:</strong> ${printedCopies}</p>
        <p><strong>Sold Copies:</strong> ${soldCopies}</p>
        <p><strong>Book Reviews:</strong> ${bookReviews}</p>
        <p><strong>Manuscript File:</strong> ${manuscript_file}</p>
        <p><strong>Book Cover File:</strong> ${book_cover_file}</p>
        <p><strong>Event:</strong> ${event_name}</p>
        <p><strong>Confirmation:</strong> ${confirmation}</p>
      `;
    } else {
      // General contact email
      subject = `New Contact Form Submission from ${from_name}`;
      htmlContent = `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${from_email}</p>
        <p><strong>Contact:</strong> ${contact_number}</p>
        <p><strong>Project/Service:</strong> ${project_service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
      `;
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[send-email-resend] Missing RESEND_API_KEY - add to env');
      return NextResponse.json({ success: false, error: 'Email service not configured.' }, { status: 500 });
    }
    const resend = new Resend(resendApiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const htmlWrapper = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">📚 Duck Book Writers</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Website Form Submission</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            ${htmlContent}
            
            <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
              <h3 style="margin: 0 0 10px 0; color: #1976d2;">📎 File Attachments</h3>
              <p style="margin: 0; color: #666;">
                ${attachments.length > 0 ? 
                  `This email contains ${attachments.length} file attachment(s): ${attachments.map(att => att.filename).join(', ')}` : 
                  'No files were uploaded with this submission.'
                }
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
              <p>This email was sent from your Duck Book Writers website contact form.</p>
              <p>Reply directly to this email to contact the author.</p>
            </div>
          </div>
        </div>
      `;

    const resendAttachments = attachments.map((att: { filename: string; content: Buffer }) => ({
      filename: att.filename,
      content: att.content.toString('base64'),
    }));

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_EMAIL,
      subject,
      html: htmlWrapper,
      attachments: resendAttachments,
      replyTo: from_email || email || CONTACT_EMAIL,
    });
    if (error) {
      throw new Error(error.message || 'Failed to send via Resend');
    }

    console.log('[send-email-resend] Notification email sent to team', {
      to: CONTACT_EMAIL,
      messageId: data?.id,
      provider: 'resend',
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully to team via Resend',
      messageId: data?.id
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email sending error:', error);
    return NextResponse.json({ 
      success: false, 
      error: `Failed to send email: ${message}` 
    }, { status: 500 });
  }
}
