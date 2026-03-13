"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#music", label: "Music" },
  { href: "#about", label: "About" },
  { href: "#media", label: "Media" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "music", "about", "media", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      setMobileOpen(false);
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }, 300);
    }
  };

 return (
  <header
    className={`fixed top-0 left-0 right-0 transition-all duration-500`}
    style={{ 
      zIndex: 999999, // Extremely high
      height: '100px', // Fixed height
      pointerEvents: 'none' // Important: ignore header background
    }}
  >
    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
      {/* Logo Container */}
      <div style={{ pointerEvents: 'auto' }}>
        <button
          onClick={() => handleNav("#home")}
          className="font-syne font-800 text-[#d4af37] tracking-[0.2em] uppercase text-sm md:text-base cursor-pointer"
        >
          Tony Lenta
        </button>
      </div>

      {/* Desktop Nav - Only active if pointerEvents: auto */}
      <nav className="hidden md:flex items-center gap-8" style={{ pointerEvents: 'auto' }}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className={`nav-link text-white/80 hover:text-[#d4af37] transition-colors cursor-pointer ${
              activeSection === link.href.replace("#", "") ? "text-[#d4af37] font-bold" : ""
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* CLICK FIX: Separate Container for Button */}
      <div className="flex items-center gap-4" style={{ pointerEvents: 'auto' }}>
        <a
          href="https://open.spotify.com/artist/your-id" // Replace with real link
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-syne tracking-[0.15em] uppercase transition-all active:scale-95 flex items-center justify-center"
          style={{ 
            display: 'flex', 
            zIndex: 1000000,
            cursor: 'pointer',
            backgroundColor: '#d4af37', // Temporary solid color to test
            minWidth: '100px'
          }}
        >
          Stream Now
        </a>
        
        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {mobileOpen && (
      <div 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center"
        style={{ zIndex: 999998, pointerEvents: 'auto' }}
      >
        <button onClick={() => setMobileOpen(false)} className="absolute top-10 right-6 text-white">
          <X size={30} />
        </button>
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => handleNav(link.href)} className="text-2xl text-white uppercase">
              {link.label}
            </button>
          ))}
          <a
            href="https://open.spotify.com/artist/your-id"
            target="_blank"
            className="btn-gold px-8 py-4 rounded-full text-white"
          >
            Stream Now
          </a>
        </nav>
      </div>
    )}
  </header>
);
}