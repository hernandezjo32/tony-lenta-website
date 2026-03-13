"use client";

import { Instagram, Facebook, Twitter, Music } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian border-t border-gold-300/10 pt-12 pb-44 md:pb-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-3">
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: 'auto', minWidth: '80px', mixBlendMode: 'screen' }}
                className="h-32 md:h-48 w-auto" 
                aria-hidden="true"
              >
                <source src="/logo-animated.webm" type="video/webm" />
                <source src="/logo-animated.mp4" type="video/mp4" />
              </video>

              <div className="flex flex-col items-center md:items-start">
                <span className="font-syne font-bold text-gold-300 tracking-[0.2em] uppercase text-xl md:text-2xl">
                  Tony Lenta
                </span>
                <p className="text-white/30 text-[10px] md:text-xs font-inter uppercase tracking-widest">
                  The Melodic King of Romantiqueo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gold-300/20 to-transparent" />

        <div className="relative z-[200] flex flex-col items-center justify-center text-white/30 text-[10px] md:text-xs font-inter text-center">
          <p className="select-none">
            © {currentYear} Tony Lenta. Site by{" "}
            <a 
              href="https://www.joewebworks.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:text-gold-300 transition-colors underline underline-offset-4 decoration-white/10 relative z-[210] py-3 px-2"
              style={{ 
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
              onClick={(e) => {
                // Keyboard open hone se rokne ke liye
                e.stopPropagation();
              }}
            >
              joewebworks.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}