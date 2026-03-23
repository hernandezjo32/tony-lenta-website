import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend("re_5KjCXyfA_3DDoBbCDT3fMGN2ZjzxwrMz4");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // --- LOGIC START ---
    
    let emailSubject = '';
    let emailContent = '';

    if (isContactForm) {
      // CASE 1: Contact Form
      emailSubject = `New Inquiry: ${subject || 'Contact'} from ${name || 'User'}`;
      emailContent = `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
    } else {
      // CASE 2: Newsletter (Inner Circle)
      emailSubject = 'New Inner Circle Member! 👑';
      emailContent = `<p>A new fan has joined the family: <strong>${email}</strong></p>`;
    }

    // --- SENDING PROCESS ---
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default domain for 100% delivery
      to: 'info@tonylenta.com',      // Notification Tony ko jaye
      replyTo: email,               // Taake Tony fan ko reply kar sake
      subject: emailSubject,
      html: `<div style="font-family: sans-serif; padding: 20px;">${emailContent}</div>`,
    });

    if (error) {
      console.error("Resend 422 Error Detail:", error);
      return NextResponse.json({ error }, { status: 422 });
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}