import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend API Key
const resend = new Resend("re_5KjCXyfA_3DDoBbCDT3fMGN2ZjzxwrMz4");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // --- VARIABLES FOR BOTH CASES ---
    let emailSubject = '';
    let emailHtml = '';

    if (isContactForm) {
      // CASE 1: Contact Form (From Website Contact Section)
      emailSubject = `New ${subject || 'Inquiry'} from ${name || 'Fan'} 👑`;
      emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #d4af37; border-radius: 10px;">
          <h2 style="color: #d4af37;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry Type:</strong> ${subject}</p>
          <hr style="border: 0.5px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333;">${message}</p>
        </div>
      `;
    } else {
      // CASE 2: Newsletter / Inner Circle (From Footer/Hero)
      emailSubject = 'New Inner Circle Member! 🔥';
      emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; background: #000; color: #fff; text-align: center; border-radius: 10px;">
          <h2 style="color: #d4af37;">NEW FAN JOINED!</h2>
          <p style="font-size: 18px;">A new member just joined the <strong>Lentáticos</strong> family.</p>
          <p style="background: #222; padding: 10px; display: inline-block; border-radius: 5px;">${email}</p>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Notification from tonylenta.com</p>
        </div>
      `;
    }

    // --- SENDING VIA VERIFIED DOMAIN ---
    const { data, error } = await resend.emails.send({
      from: 'Lenta Web <system@tonylenta.com>', // Verified domain use kar rahe hain
      to: 'info@tonylenta.com',                 // Tony ko notification jaye
      replyTo: email,                          // Tony direct fan ko reply kar sake
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 422 });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}