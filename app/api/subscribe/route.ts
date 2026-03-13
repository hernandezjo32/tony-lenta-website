import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Direct API Key (Kyunke .env local par read nahi ho rahi thi)
const resend = new Resend("re_5KjCXyfA_3DDoBbCDT3fMGN2ZjzxwrMz4");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, subject, isContactForm } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // --- CASE 1: AGAR YE CONTACT FORM HAI ---
    if (isContactForm) {
      await resend.emails.send({
        from: 'Lenta Web <info@tonylenta.com>',
        to: 'info@tonylenta.com',
        subject: `New ${subject} Inquiry from ${name} 👑`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #d4af37;">
            <h2 style="color: #d4af37;">New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Inquiry Type:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: "Contact email sent" });
    }

    // --- CASE 2: AGAR YE NEWSLETTER (INNER CIRCLE) HAI ---
    
    // A. Fan ko Welcome Email
    await resend.emails.send({
      from: 'Tony Lenta <info@tonylenta.com>',
      to: email,
      subject: '¡Bienvenido a los Lentáticos! 🔥',
      html: `
        <div style="font-family: sans-serif; background: #000; color: #fff; padding: 20px; text-align: center;">
          <h1 style="color: #d4af37;">WELCOME TO THE INNER CIRCLE!</h1>
          <p>¡Qué lo que! You are now officially a part of the Lentáticos family.</p>
          <p>Get ready for exclusive access to unreleased music and VIP experiences.</p>
          <hr style="border: 0.5px solid #d4af37; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Follow Tony on Instagram: @tonylenta</p>
        </div>
      `,
    });

    // B. Client ko Notification
    await resend.emails.send({
      from: 'Lenta Web <info@tonylenta.com>',
      to: 'info@tonylenta.com',
      subject: 'New Inner Circle Member! 👑',
      html: `<p>A new fan has joined the Lentáticos: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({ success: true, message: "Newsletter subscription successful" });

  } catch (error: any) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}