import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Aapki wahi API Key jo pehle thi
const resend = new Resend("re_5KjCXyfA_3DDoBbCDT3fMGN2ZjzxwrMz4");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    // --- NOTIFICATION FOR TONY ---
    // Hum 'onboarding@resend.dev' use kar rahe hain taake Titan block na kare
    await resend.emails.send({
      from: 'Lenta Web Alerts <onboarding@resend.dev>',
      to: 'info@tonylenta.com',
      subject: isContactForm ? `Inquiry: ${subject}` : 'New Inner Circle Member! 👑',
      replyTo: email, // Tony direct reply kar sakega
      html: isContactForm 
        ? `<h3>New Message</h3><p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
        : `<p>New fan joined the family: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}