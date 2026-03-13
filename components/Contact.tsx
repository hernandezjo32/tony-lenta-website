"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mail, Instagram, Facebook, Twitter, Music, Check, Youtube, Apple, Music2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "fan",
    message: "",
  });
  
  // Status management for loading and submission
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  // API Call logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Hum pura formData bhej rahe hain taake API message read kar sake
        body: JSON.stringify({ 
          email: formData.email,
          name: formData.name,
          subject: formData.subject,
          message: formData.message,
          isContactForm: true // Ye flag API ko batayega ke ye contact message hai
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "fan", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
      aria-label="Contact Tony Lenta"
    >
      {/* ... Background styling remains same ... */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(139,0,0,0.2) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="section-header fade-up">
          <span className="inline-block text-gold-300 font-syne tracking-[0.3em] uppercase text-xs mb-4 font-bold">
            📬 Contact
          </span>
          <h2 className="text-gold-gradient text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tighter">Get in Touch</h2>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Booking & Socials Column */}
          <div className="space-y-8 fade-up">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="font-syne font-extrabold text-white text-2xl uppercase tracking-wide mb-2">
                Bring the Legend to Your Stage
              </h3>
              <p className="text-white/50 font-inter text-sm leading-relaxed mb-6">
                Available for festivals, concerts, private events, and
                collaborations worldwide.
              </p>
              <a
                href="mailto:Info@tonylenta.com"
                className="inline-flex items-center gap-3 btn-gold px-6 py-3 rounded-full text-sm font-syne tracking-widest hover-gold-glow"
              >
                <Mail size={16} aria-hidden="true" />
                <span>Request Booking</span>
              </a>
            </div>

            <div className="flex flex-col gap-6">
               <div>
                  <h4 className="font-syne font-bold text-gold-300 tracking-widest uppercase text-xs mb-4">
                    Direct Contact
                  </h4>
                  <a
                    href="mailto:Info@tonylenta.com"
                    className="flex items-center gap-3 text-white/70 hover:text-gold-300 transition-colors font-inter text-sm"
                  >
                    <Mail size={16} className="text-gold-300" aria-hidden="true" />
                    Info@tonylenta.com
                  </a>
               </div>

               <div>
                  <h4 className="font-syne font-bold text-gold-300 tracking-widest uppercase text-xs mb-4">
                    Follow Tony
                  </h4>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { Icon: Instagram, url: "https://www.instagram.com/tonylenta/", label: "Instagram" },
                      { Icon: Facebook, url: "https://www.facebook.com/TonyLentaOfficial", label: "Facebook" },
                      { Icon: Twitter, url: "https://twitter.com/tonylenta", label: "Twitter" },
                      { Icon: Music, url: "#", label: "Spotify" },
                      { Icon: Youtube, url: "https://www.youtube.com/@TonyLentaOfficial", label: "YouTube" },
                      { Icon: Music2, url: "https://music.apple.com/us/artist/tony-lenta/184025724", label: "Apple Music" },
                    ].map(({ Icon, url, label }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-gold-300/20 hover:text-gold-300 hover:border-gold-300/40 transition-all duration-300"
                        aria-label={label}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="fade-up">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5 border border-white/10"
              >
                <h3 className="font-syne font-bold text-white tracking-wider uppercase text-sm mb-6">
                  Send a Message
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white/50 text-[10px] font-syne tracking-widest uppercase">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white/50 text-[10px] font-syne tracking-widest uppercase">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="input-gold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-white/50 text-[10px] font-syne tracking-widest uppercase">Inquiry Type</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-gold appearance-none cursor-pointer bg-black"
                  >
                    <option value="fan">Fan Message</option>
                    <option value="booking">Booking / Event</option>
                    <option value="press">Press / Media</option>
                    <option value="collab">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-white/50 text-[10px] font-syne tracking-widest uppercase">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell Tony what's on your mind..."
                    className="input-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-4 rounded-xl text-sm font-syne tracking-widest flex items-center justify-center gap-2 hover-gold-glow disabled:opacity-50 transition-all"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  {!loading && <Send size={16} />}
                </button>
              </form>
            ) : (
              <div className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center gap-5 border border-gold-300/30">
                <div className="w-16 h-16 rounded-full bg-gold-300/20 border border-gold-300/40 flex items-center justify-center">
                  <Check size={28} className="text-gold-300" />
                </div>
                <div>
                  <h3 className="font-syne font-extrabold text-white text-xl uppercase tracking-wide mb-2">
                    Message Sent! 🔥
                  </h3>
                  <p className="text-white/50 font-inter text-sm max-w-[250px] mx-auto">
                    Tony's team will be in touch soon. ¡Gracias, Lentático!
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-gold-300 text-xs uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}