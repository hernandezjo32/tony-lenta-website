"use client";

import { useEffect, useRef } from "react";
import { Play, ExternalLink } from "lucide-react";

const LATEST_SINGLE = {
  title: "Muchacha",
  subtitle: "El momento llegó — El regreso que esperabas",
  description:
    "Tony regresa a la música y lo hace como se debe: con un himno. Una canción que marca un antes y un después.",
  spotifyId: "6EE0Ji9Ir3nXvM6ydOKOkq",
  youtubeId: "Ymu7c1Q0Ufs",
  spotifyUrl:
    "https://open.spotify.com/intl-es/album/6EE0Ji9Ir3nXvM6ydOKOkq?si=C9zQmV3hTgezde0hcFdz_w",
  youtubeUrl: "https://www.youtube.com/watch?v=Ymu7c1Q0Ufs",
};

const CLASSIC_TRACKS = [
  {
    title: "Tu Conmigo",
    feat: "feat. Arcángel",
    year: "2015",
    style: "Romantiqueo Puro",
    spotifySearch: "https://open.spotify.com/search/Tony%20Lenta%20Tu%20Conmigo",
  },
  {
    title: "Mi Favorita",
    feat: "feat. Ele A El Dominio",
    year: "2019",
    style: "Street-Melodic",
    spotifySearch: "https://open.spotify.com/search/Tony%20Lenta%20Mi%20Favorita",
  },
  {
    title: "Descontrol (Remix)",
    feat: "feat. Arcángel, J-King & Maximan",
    year: "2007",
    style: "Energy Classic",
    spotifySearch: "https://open.spotify.com/search/Tony%20Lenta%20Descontrol",
  },
  {
    title: "Todo Cambió",
    feat: "feat. Nicky Jam, Ñejo",
    year: "",
    style: "Club Anthem",
    spotifySearch: "https://open.spotify.com/search/Tony%20Lenta%20Todo%20Cambio",
  },
  {
    title: "Pérdida (Remix)",
    feat: "",
    year: "2026",
    style: "Modern Trap",
    spotifySearch: "https://open.spotify.com/search/Tony%20Lenta%20Perdida",
  },
  {
    title: "El Antídoto",
    feat: "feat. Kvyn Blessed 1",
    year: "2024",
    style: "Romantiqueo",
    spotifySearch: "https://open.spotify.com/search/Tony%20Lenta%20El%20Antidoto",
  },
];

export default function Music() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".fade-up")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("visible"), i * 100);
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
    <section id="music" ref={sectionRef} className="py-24 px-6 relative">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="section-header fade-up">
          <span className="inline-block text-gold-300 font-syne tracking-[0.3em] uppercase text-xs mb-4 font-bold">
            🎵 Discography
          </span>
          <h2 className="text-gold-gradient">La Música</h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        {/* Latest Single — Spotify + YouTube embeds */}
        <div className="mb-16 fade-up">
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gold-300 animate-pulse" />
              <span className="font-syne font-bold tracking-[0.2em] uppercase text-gold-300 text-xs">
                🔥 Latest Release
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Info */}
           <div className="w-full px-2 sm:px-0 overflow-hidden">
  {/* Title: Mobile par size chota aur break-words taake bahar na nikle */}
  <h3
    className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white mb-2 break-words"
    style={{ letterSpacing: "-0.02em", lineHeight: "1.2" }}
  >
    {LATEST_SINGLE.title}
  </h3>

  {/* Subtitle */}
  <p className="text-gold-300 font-syne tracking-wider text-[10px] sm:text-sm uppercase mb-3">
    {LATEST_SINGLE.subtitle}
  </p>

  {/* Description: Max-width lagayi hai taake text phailay nahi */}
  <p className="text-white/60 font-inter text-xs sm:text-sm leading-relaxed mb-6 max-w-full sm:max-w-md">
    {LATEST_SINGLE.description}
  </p>

  {/* Buttons: Mobile par gap kam kiya hai */}
  <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
    <a
      href={LATEST_SINGLE.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-[#1DB954] text-black font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-syne tracking-wider hover:bg-[#1ed760] transition-transform active:scale-95"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
      <span>Spotify</span>
    </a>

    <a
      href={LATEST_SINGLE.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-[#FF0000] text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-syne tracking-wider hover:bg-[#cc0000] transition-transform active:scale-95"
    >
      <Play size={14} />
      <span>YouTube</span>
    </a>
  </div>
</div>

              {/* Spotify Embed */}
              <div className="embed-container">
                <iframe
                  title="Tony Lenta - Muchacha on Spotify"
                  src={`https://open.spotify.com/embed/album/${LATEST_SINGLE.spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="block"
                />
              </div>
            </div>

 {/* Live Performance */}
<div className="mt-8">
  <h4 className="font-syne font-bold text-gold-300 tracking-widest uppercase text-xs mb-4">
    🎤 Live Performance
  </h4>
  {/* Aspect ratio changed for mobile (4/3) and kept (video) for desktop */}
  <div className="relative rounded-xl overflow-hidden border border-gold-300/20 group aspect-[4/3] md:aspect-video">
    <video
      src="/hero-video.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
    
    <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
      <p className="font-syne font-bold text-white text-lg mb-1">En Vivo</p>
      <p className="text-white/70 text-sm">Tony Lenta bringing the energy on stage</p>
    </div>
  </div>
</div>
          </div>
        </div>

        {/* Spotify Artist Profile */}
        <div className="mb-16 fade-up">
          <h3 className="font-syne font-bold text-white tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
            <span className="gold-divider inline-block w-8 h-px bg-gold-300" />
            Artist Profile on Spotify
          </h3>
          <div className="embed-container">
            <iframe
              title="Tony Lenta on Spotify"
              src="https://open.spotify.com/embed/artist/16lcPccJgIjtOWEwVMyA6Z?utm_source=generator&theme=0"
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block"
            />
          </div>
        </div>

       {CLASSIC_TRACKS.map((track, i) => (
  <a
    key={track.title}
    href={track.spotifySearch}
    target="_blank"
    rel="noopener noreferrer"
    // pointer-events-auto lazmi add karein taake clicks block na hon
    className="track-card p-5 flex items-center gap-4 group cursor-pointer fade-up relative z-20 pointer-events-auto"
    aria-label={`Stream ${track.title} on Spotify`}
    style={{ touchAction: 'manipulation' }} // Mobile clicks behtar karne ke liye
  >
    {/* Play Icon Container */}
    <div className="w-10 h-10 rounded-lg bg-gold-300/10 border border-gold-300/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-300/20 transition-all active:scale-90">
      <Play size={18} className="text-gold-300 ml-0.5" />
    </div>
    
    <div className="min-w-0 flex-1">
      <p className="font-syne font-bold text-white text-sm truncate group-hover:text-gold-300 transition-colors">
        {track.title}
      </p>
      {track.feat && (
        <p className="text-white/50 text-xs truncate">{track.feat}</p>
      )}
      <p className="text-gold-300/60 text-xs mt-0.5">{track.style}</p>
    </div>

    {track.year && (
      <span className="ml-auto text-white/30 text-xs font-syne flex-shrink-0">
        {track.year}
      </span>
    )}
  </a>
))}

        {/* Stream CTA */}
        <div className="mt-12 text-center fade-up">
          <a
            href="https://open.spotify.com/artist/16lcPccJgIjtOWEwVMyA6Z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline-gold px-8 py-3 rounded-full text-sm font-syne tracking-widest"
          >
            <ExternalLink size={16} />
            Full Discography on Spotify
          </a>
        </div>
      </div>
    </section>
  );
}
