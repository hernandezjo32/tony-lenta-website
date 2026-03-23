import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    // 1. Hostinger/Titan SMTP Configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email", // Ye Titan ka server hai
      port: 465,
      secure: true, // Port 465 ke liye true hota hai
      auth: {
        user: "info@tonylenta.com",
        pass: "Lenta2026@", // <--- Apna password yahan likhein
      },
    });

    if (isContactForm) {
      // --- CASE 1: CONTACT FORM ---
      await transporter.sendMail({
        from: '"Lenta Web" <info@tonylenta.com>',
        to: "info@tonylenta.com",
        replyTo: email,
        subject: `New Inquiry: ${subject} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<h3>New Contact Message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
      });
    } else {
      // --- CASE 2: NEWSLETTER ---
      // Tony ko notification bhejna
      await transporter.sendMail({
        from: '"Lenta Web" <info@tonylenta.com>',
        to: "info@tonylenta.com",
        subject: "New Inner Circle Member! 👑",
        html: `<p>A new fan has joined: <strong>${email}</strong></p>`,
      });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" });

  } catch (error: any) {
    console.error("SMTP Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}