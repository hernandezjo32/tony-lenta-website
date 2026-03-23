import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. TITAN SMTP - PORT 465 (Most Secure & Recommended)
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true, // Port 465 ke liye hamesha TRUE hota hai
      auth: {
        user: "info@tonylenta.com",
        pass: "Lenta2026@", // <--- Password ko quotes mein likhein
      },
      // Titan ki special security settings
      tls: {
        rejectUnauthorized: false 
      }
    });

    // 2. LOGIC FOR BOTH CASES
    let emailSubject = '';
    let emailHtml = '';

    if (isContactForm) {
      // CASE 1: Contact Form
      emailSubject = `New Inquiry: ${subject || 'General'} from ${name || 'Fan'}`;
      emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #d4af37; border-radius: 10px;">
          <h2 style="color: #d4af37;">New Website Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0.5px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333;">${message}</p>
        </div>
      `;
    } else {
      // CASE 2: Newsletter (Enter the Circle)
      emailSubject = 'New Inner Circle Member! 🔥';
      emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; background: #000; color: #fff; text-align: center; border-radius: 10px;">
          <h2 style="color: #d4af37; letter-spacing: 2px;">NEW FAN ALERT</h2>
          <p style="font-size: 16px;">Someone just joined the <strong>Lentáticos</strong> family.</p>
          <p style="background: #d4af37; color: #000; padding: 10px; display: inline-block; border-radius: 5px; font-weight: bold;">
            ${email}
          </p>
          <p style="margin-top: 20px; font-size: 11px; color: #666;">Notification from tonylenta.com</p>
        </div>
      `;
    }

    // 3. SEND THE EMAIL
    // 'from' aur 'to' dono 'info@tonylenta.com' rakhein taake DKIM ka issue hi na aaye
    await transporter.sendMail({
      from: '"Lenta Web" <info@tonylenta.com>',
      to: "info@tonylenta.com",
      replyTo: email, // Taake Tony direct fan ko reply kar sake
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Email Sent Successfully" });

  } catch (error: any) {
    console.error("Titan SMTP Error:", error.message);
    // User ko clean message dikhayein
    return NextResponse.json({ 
      error: "Could not connect to the mail server. Please check your credentials." 
    }, { status: 500 });
  }
}