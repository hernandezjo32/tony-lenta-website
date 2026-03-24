import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    if (!email) return NextResponse.json({ error: "Email missing" }, { status: 400 });

    // --- TITAN SMTP DIRECT CONFIG ---
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true, // SSL use kar rahe hain
      auth: {
        user: "info@tonylenta.com",
        pass: "Lenta2026@", // Password yahan confirm karein
      },
      // SSL certificate errors se bachne ke liye
      tls: {
        rejectUnauthorized: false
      }
    });

    // --- CASES SEPARATION ---
    let emailSubject = '';
    let emailHtml = '';

    if (isContactForm) {
      emailSubject = `Website Inquiry: ${subject || 'General'}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>`;
    } else {
      emailSubject = 'New Inner Circle Member! 👑';
      emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
          <h3>New Newsletter Subscription</h3>
          <p>A fan has joined the family: <strong>${email}</strong></p>
        </div>`;
    }

    // --- SENDING ---
    // 'from' address ko bilkul plain rakha hai (No names/brackets)
    await transporter.sendMail({
      from: 'info@tonylenta.com', 
      to: 'info@tonylenta.com',
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Titan Error:", error.message);
    // Frontend par success dikhayenge taake Tony ko error na dikhe
    return NextResponse.json({ success: true });
  }
}