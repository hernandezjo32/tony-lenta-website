"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToMusic = () => {
    document.getElementById("music")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
  <section
    id="home"
    className="relative min-h-screen flex flex-col items-center justify-start md:justify-center overflow-hidden pt-[120px] pb-12 md:pt-32"
    style={{ background: '#0A0A0A' }}
  >
    {/* Gradient Background */}
    <div 
      className="absolute inset-0 z-0" 
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%)'
      }}
      aria-hidden="true" 
    />

    {/* Content Container */}
    <div className="relative z-[2] text-center px-4 max-w-[900px] mx-auto w-full flex flex-col items-center">
      
      {/* 1. THE BADGE: Isay fixed gap dene ke liye mt-4 ya 6 add kiya hai */}
      <div
        className="relative inline-flex items-center justify-center mb-6 transition-all duration-800 flex-shrink-0"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div className="glass px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-gold-300/30 shadow-lg bg-black/20">
          <span className="text-[8px] sm:text-[10px] md:text-[11px] text-gold-300 font-syne font-bold tracking-[0.12em] md:tracking-[0.25em] uppercase whitespace-nowrap block">
            • DE PUERTO RICO PARA EL MUNDO •
          </span>
        </div>
      </div>

      {/* 2. LOGO GIF: Size ko mazeed balance kiya hai */}
      <div 
        className="mb-4 transition-all duration-900 flex justify-center w-full"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '150ms'
        }}
      >
        <Image 
          src="/v1gold.gif" 
          alt="Tony Lenta Logo"
          width={600}
          height={100}
          priority
          className="w-full max-w-[260px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] h-auto object-contain"
        />
      </div>

      {/* 3. Subtitle & Description */}
      <p
        className="font-playfair italic text-white/75 mb-2 transition-all duration-900"
        style={{ 
          fontSize: 'clamp(0.85rem, 2.5vw, 1.4rem)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '450ms'
        }}
      >
        Tú Dulce Menta
      </p>

      <p
        className="text-white/45 text-[0.75rem] md:text-[0.9rem] max-w-[380px] md:max-w-[420px] mx-auto leading-relaxed mb-8 transition-all duration-900"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '550ms'
        }}
      >
        Dieciséis años de camino,<br />
        compartiendo una energía auténtica y fiel a lo que somos.
      </p>

      {/* 4. CTA Buttons */}
      <div
        className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto transition-all duration-900"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '650ms'
        }}
      >
        <button
          onClick={scrollToMusic}
          className="btn-gold w-[180px] sm:w-auto px-8 py-3.5 rounded-full text-[0.7rem] font-bold uppercase tracking-wider"
        >
          LISTEN NOW
        </button>
        <button
          onClick={scrollToContact}
          className="btn-outline-gold w-[180px] sm:w-auto px-8 py-3.5 rounded-full text-[0.7rem] font-bold uppercase tracking-wider"
        >
          BOOK TONY
        </button>
      </div>

      {/* 5. NEW SINGLE Badge: Screen size ke mutabiq width auto */}
      <a
        href="https://open.spotify.com/intl-es/album/6EE0Ji9Ir3nXvM6ydOKOkq?si=C9zQmV3hTgezde0hcFdz_w"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mt-10 no-underline transition-all duration-900 hover:border-gold-300/30"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '800ms'
        }}
      >
        <div className="text-left">
          <div className="font-syne font-bold text-gold-300 uppercase tracking-widest text-[0.5rem]">
            🔥 NEW SINGLE
          </div>
          <div className="text-white/75 text-[0.65rem] whitespace-nowrap">
            Muchacha — El momento llegó
          </div>
        </div>
        <span className="btn-gold px-3 py-1.5 rounded-full text-[0.55rem] uppercase font-bold tracking-wider">
          STREAM
        </span>
      </a>
    </div>

    {/* Scroll indicator */}
    <button
      onClick={scrollToMusic}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] text-gold-300/40 hover:text-gold-300 transition-colors bg-transparent border-0 text-[1.5rem] cursor-pointer"
      aria-label="Scroll down"
      style={{ animation: "float 3s ease-in-out infinite" }}
    >
      ⌄
    </button>
  </section>
);
}