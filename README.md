# Tony Lenta Official Website 🎵

**The Melodic King of Romantiqueo** — Premium Next.js 15 website for Tony Lenta.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy the env file and add your API key
cp .env.local.example .env.local

# Add your Anthropic API key to .env.local:
# ANTHROPIC_API_KEY=sk-ant-...

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

---

## 🔑 Environment Variables

Create a `.env.local` file (copy from `.env.local.example`):

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes (for chatbot) | Get from [console.anthropic.com](https://console.anthropic.com) |

> **Note:** Without the API key, the chatbot will return an error. Everything else works fine.

---

## ☁️ Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (Fastest)

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
5. Click **Deploy**

That's it! Vercel auto-detects Next.js and configures everything.

---

## 📁 Project Structure

```
tony-lenta-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata + grain overlay
│   ├── page.tsx            # Main page (assembles all sections)
│   ├── globals.css         # Global styles, design system
│   └── api/
│       └── chat/
│           └── route.ts    # AI chatbot API (Anthropic Claude)
├── components/
│   ├── Navbar.tsx          # Sticky nav with animated logo
│   ├── Hero.tsx            # Full-screen video hero
│   ├── Music.tsx           # Latest release + Spotify/YouTube embeds
│   ├── About.tsx           # Bio, photos, stats, press quotes
│   ├── Media.tsx           # Social links + live performance video
│   ├── Newsletter.tsx      # Email capture (Lentáticos VIP Club)
│   ├── Contact.tsx         # Contact form + booking CTA
│   ├── Chatbot.tsx         # AI fan chatbot (floating)
│   └── Footer.tsx          # Footer with nav, social, copyright
├── public/
│   ├── hero-video.mp4      # Background video for hero section
│   ├── logo.gif            # Animated logo (fallback)
│   ├── logo-animated.mp4   # Animated logo (MP4)
│   ├── logo-animated.webm  # Animated logo (WebM, preferred)
│   ├── tony-army-jacket.jpg
│   └── tony-white-shirt.jpg
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🎨 Design System

**Colors:**
- Obsidian Black: `#0A0A0A` (background)
- Liquid Gold: `#D4AF37` (accents, CTAs)
- Passion Crimson: `#8B0000` (accents)

**Fonts:**
- Headlines: Syne (Bold, 800)
- Body: Inter
- Quotes: Playfair Display

---

## ⚙️ Customization

### Update Tour Dates
Edit the `Contact.tsx` component and add a tour dates section, or connect to a ticketing API.

### Connect MailChimp Newsletter
In `Newsletter.tsx`, replace the mock submit handler with a real MailChimp API call:
```typescript
// Replace the mock delay with:
const response = await fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify({ email }),
});
```

### Connect Contact Form
In `Contact.tsx`, replace the mock submit with Formspree or your backend:
```typescript
const response = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  body: JSON.stringify(formData),
  headers: { 'Content-Type': 'application/json' },
});
```

### Update Chatbot Knowledge
Edit the `TONY_LENTA_SYSTEM_PROMPT` in `app/api/chat/route.ts` to add tour dates, new releases, etc.

---

## 🎵 Features

- ✅ Full-screen video hero with animated text
- ✅ Animated gold logo in navbar
- ✅ Spotify artist embed + latest album embed
- ✅ YouTube video embeds (latest single + live concert)
- ✅ AI-powered fan chatbot (Lenta Bot) with Anthropic Claude
- ✅ Artist biography with dual photo layout
- ✅ Career stats display
- ✅ Press quotes/testimonials
- ✅ Social media links (Instagram, Spotify, YouTube, Facebook, Twitter)
- ✅ Newsletter signup (Lentáticos VIP Club)
- ✅ Contact & booking form
- ✅ Film grain texture overlay
- ✅ Glass-morphism cards
- ✅ Smooth scroll navigation
- ✅ Mobile-responsive design
- ✅ Intersection Observer animations

---

## 📞 Tony Lenta Links

| Platform | URL |
|----------|-----|
| Spotify | https://open.spotify.com/artist/16lcPccJgIjtOWEwVMyA6Z |
| Apple Music | https://music.apple.com/us/artist/tony-lenta/184025724 |
| Instagram | https://www.instagram.com/tonylenta/ |
| YouTube | Latest: https://www.youtube.com/watch?v=Ymu7c1Q0Ufs |
| Facebook | https://www.facebook.com/TonyLentaOfficial |
| Twitter/X | https://twitter.com/tonylenta |
| Email | tonylenta@gmail.com |

---

*Built for Tony Lenta — De Puerto Rico Para El Mundo 🇵🇷*
