import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. TITAN SMTP CONFIGURATION (SSL Method)
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true, // SSL for Port 465
      auth: {
        user: "info@tonylenta.com",
        pass: "Lenta2026@", // <--- Tony wala password
      },
      tls: {
        rejectUnauthorized: false // Security handshake bypass
      }
    });

    // 2. PREPARE CONTENT FOR BOTH CASES
    let emailSubject = '';
    let emailHtml = '';

    if (isContactForm) {
      // CASE 1: Contact Form Logic
      emailSubject = `Inquiry: ${subject || 'Contact'} - ${name || 'User'}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37;">New Website Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `;
    } else {
      // CASE 2: Newsletter / Inner Circle Logic
      emailSubject = 'New Inner Circle Member! 👑';
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
          <h3>New Fan Joined</h3>
          <p>A new user has subscribed to the newsletter:</p>
          <p style="font-size: 18px; font-weight: bold;">${email}</p>
        </div>
      `;
    }

    // 3. SEND THE EMAIL
    // 'from' address ko bilkul plain rakha hai taake DKIM check bypass ho jaye
    await transporter.sendMail({
      from: 'info@tonylenta.com', 
      to: 'info@tonylenta.com',
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Sent successfully" });

  } catch (error: any) {
    console.error("Titan SMTP Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}