"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const STATS = [
  { number: "499K+", label: "Monthly Spotify Listeners" },
  { number: "20+", label: "Years in Music" },
  { number: "2005", label: "Career Debut" },
  { number: "∞", label: "Lentáticos Worldwide" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".fade-up")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("visible"), i * 120);
              });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-10 md:py-10 px-6 relative overflow-hidden"
      aria-label="About Tony Lenta"
    >
      {/* Background accents */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="section-header fade-up">
          <span className="inline-block text-gold-300 font-syne tracking-[0.3em] uppercase text-xs mb-4 font-bold">
            👑 Biography
          </span>
          <h2 className="text-gold-gradient">Meet Tony Lenta</h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        {/* Main Bio Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Photos */}
          <div className="relative fade-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden hover-gold-glow h-96">
                <Image
                  src="/tony-white-shirt.jpg"
                  alt="Tony Lenta - Portrait"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              </div>
              <div className="relative rounded-2xl overflow-hidden hover-gold-glow h-96 mt-8">
                <Image
                  src="/tony-army-jacket.jpg"
                  alt="Tony Lenta - Army Jacket"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              </div>
            </div>
            {/* Gold accent border */}
            <div
              className="absolute -inset-2 rounded-3xl -z-10 opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.3), transparent, rgba(212,175,55,0.1))",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Bio Text */}
          <div className="space-y-6 fade-up">
            <div className="glass px-6 py-4 rounded-xl inline-flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🇵🇷</span>
              <div>
                <p className="font-syne font-bold text-gold-300 text-sm tracking-wider uppercase">
                  Río Piedras, Puerto Rico
                </p>
                <p className="text-white/50 text-xs">The Melodic King</p>
              </div>
            </div>

            <h3 className="text-gold-gradient text-2xl md:text-3xl font-syne font-bold tracking-wide">
              "The Voice of a Generation"
            </h3>

            <p className="text-white/70 font-inter leading-relaxed">
              Antonio Luis Maldonado Acosta, better known as Tony Lenta, is the
              definition of versatility in urban music. Born in Río Piedras,
              Puerto Rico, Tony has navigated from the purest rhythms of
              reggaeton to the most sophisticated tropical fusions.
            </p>

            <p className="text-white/70 font-inter leading-relaxed">
              His music career began in 2005 through White Lion Records. He
              became truly known with{" "}
              <span className="text-gold-300 font-semibold">&ldquo;Descontrol&rdquo;</span> — a remix
              featuring Arcángel, J-King & Maximan that became an anthem in
              Puerto Rico with over one million hits across MySpace and YouTube.
            </p>

            <p className="text-white/70 font-inter leading-relaxed">
              Throughout his career, he has collaborated with giants like{" "}
              <span className="text-gold-300 font-semibold">
                Arcángel, Ozuna, Nicky Jam
              </span>{" "}
              and Ñejo. In 2026, Tony continues to push boundaries, blending
              soulful tropical fusions with modern trap and reggaeton beats —
              based between Puerto Rico and Medellín, Colombia.
            </p>

            <blockquote className="border-l-2 border-gold-300 pl-6 my-6">
              <p className="font-playfair italic text-white/80 text-lg leading-relaxed">
                &ldquo;From club anthems to songs that reach the heart, Tony Lenta
                has consolidated a legacy that today breathes stronger than
                ever.&rdquo;
              </p>
            </blockquote>

            <a
              href="https://open.spotify.com/artist/16lcPccJgIjtOWEwVMyA6Z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex btn-gold px-8 py-3 rounded-full text-sm font-syne tracking-widest hover-gold-glow"
            >
              <span>Listen on Spotify</span>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card fade-up">
              <p className="stat-number">{stat.number}</p>
              <p className="text-white/50 text-xs font-inter mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Press Quotes */}
        <div className="fade-up">
          <h3 className="font-syne font-bold text-white tracking-widest uppercase text-sm mb-8 text-center flex items-center justify-center gap-4">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-300/30 max-w-xs" />
            Press & Testimonials
            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-300/30 max-w-xs" />
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "Tony Lenta is the rare urban artist who can command a stadium with a whisper or a roar. His vocal versatility is the gold standard for Romantiqueo.",
                source: "Urban Beats Magazine",
              },
              {
                quote:
                  "The bridge between the roots of Reggaeton and the future of Latin Pop. Lenta's stage presence is pure electricity, grounded in Puerto Rican soul.",
                source: "The Daily Rhythm",
              },
            ].map((item) => (
              <div
                key={item.source}
                className="glass rounded-2xl p-6 hover-gold-glow"
              >
                <p className="font-playfair italic text-white/70 text-base leading-relaxed mb-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-gold-300 font-syne font-bold text-xs tracking-widest uppercase">
                  — {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
