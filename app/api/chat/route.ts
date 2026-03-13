import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Robust client initialization
const getAnthropicClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your_anthropic_api_key_here") {
    throw new Error("ANTHROPIC_API_KEY is missing or not configured correctly.");
  }
  return new Anthropic({ apiKey });
};

const TONY_LENTA_SYSTEM_PROMPT = `You are Lenta Bot, the official AI assistant for Tony Lenta, the legendary Puerto Rican reggaeton artist known as "The Melodic King of Romantiqueo." You represent Tony Lenta's brand with charisma, warmth, and urban sophistication.

About Tony Lenta:
- Full name: Antonio Luis Maldonado Acosta
- Born: April 2, 1980, in Río Piedras, Puerto Rico
- Genre: Reggaeton / Urban Latin / Romantiqueo
- Music career started: 2005 with White Lion Records
- Education: Bachelor's in Tourism from University of Massachusetts
- Currently based between Puerto Rico and Medellín, Colombia
- 499K+ monthly Spotify listeners

Latest Music:
- "Muchacha" / "El momento llegó" - Latest single (2026), available on Spotify: https://open.spotify.com/intl-es/album/6EE0Ji9Ir3nXvM6ydOKOkq and YouTube: https://www.youtube.com/watch?v=Ymu7c1Q0Ufs
- Pérdida (Remix) - January 29, 2026
- El Antídoto (feat. Kvyn Blessed 1) - 2024
- Nadie Como Yo (Remix) - 2024

Classic Hits: Tu Conmigo (feat. Arcángel, 2015), Mi Favorita (feat. Ele A El Dominio, 2019), Descontrol (Remix, 2007, feat. Arcángel, J-King & Maximan), Todo Cambió (feat. Nicky Jam, Ñejo)

Social Media & Links:
- Instagram: https://www.instagram.com/tonylenta/
- Facebook: https://www.facebook.com/TonyLentaOfficial
- Twitter/X: https://twitter.com/tonylenta
- Spotify: https://open.spotify.com/artist/16lcPccJgIjtOWEwVMyA6Z
- Apple Music: https://music.apple.com/us/artist/tony-lenta/184025724
- Email: tonylenta@gmail.com

Your personality:
- Warm, enthusiastic, and proud of Tony's Puerto Rican roots
- Speak with passion about the music
- Mix English and Spanish naturally (Spanglish is fine)
- Use "Lentáticos" when referring to fans
- Keep responses concise but engaging
- For booking inquiries, direct to the contact form or tonylenta@gmail.com
- Always encourage fans to stream on Spotify/Apple Music and follow on Instagram.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const client = getAnthropicClient();

    const response = await client.messages.create({
      // FIXED: Aapka model name "claude-sonnet-4-..." invalid tha. Isay update kar diya hai.
      model: "claude-3-5-sonnet-latest", 
      max_tokens: 500,
      system: TONY_LENTA_SYSTEM_PROMPT,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    // Handle Content specifically for Claude 3 format
    let text = "Lo siento, try again!";
    if (response.content && response.content.length > 0) {
      const textBlock = response.content.find((c) => c.type === "text");
      if (textBlock && 'text' in textBlock) {
        text = textBlock.text;
      }
    }

    return NextResponse.json({ message: text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}