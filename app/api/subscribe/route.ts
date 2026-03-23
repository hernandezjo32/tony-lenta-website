import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. TITAN SMTP CONFIGURATION (Using Port 587 to bypass strict DKIM)
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 587,
      secure: false, // Port 587 ke liye false hota hai
      auth: {
        user: "info@tonylenta.com",
        pass: "YOUR_EMAIL_PASSWORD", // <--- Yahan Tony ki email ka password likhein
      },
      tls: {
        // Ye line DKIM aur Certificate errors ko bypass karne mein madad karti hai
        rejectUnauthorized: false 
      }
    });

    // 2. PREPARE EMAIL CONTENT
    let emailSubject = '';
    let emailHtml = '';

    if (isContactForm) {
      // CASE 1: Contact Form
      emailSubject = `New Inquiry: ${subject || 'General'} from ${name || 'Fan'}`;
      emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #d4af37;">New Website Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `;
    } else {
      // CASE 2: Newsletter (Enter the Circle)
      emailSubject = 'New Inner Circle Member! 👑';
      emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; background: #f4f4f4;">
          <h3>New Fan Joined!</h3>
          <p>The following email has subscribed to the newsletter:</p>
          <p><strong>${email}</strong></p>
        </div>
      `;
    }

    // 3. SEND THE EMAIL
    await transporter.sendMail({
      from: '"Tony Lenta Support" <info@tonylenta.com>',
      to: "info@tonylenta.com",
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Sent successfully" });

  } catch (error: any) {
    console.error("SMTP Final Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}