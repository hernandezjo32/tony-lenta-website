"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // 1. Backend API ko real request bhejna
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true); // Success message dikhayega
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData.error);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      aria-label="Newsletter signup"
    >
      {/* Gold background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(139,0,0,0.05) 50%, rgba(10,10,10,0) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 border-t border-b border-gold-300/10"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="text-4xl mb-4" aria-hidden="true">👑</div>
        <h2 className="font-syne font-extrabold text-gold-gradient text-3xl md:text-5xl uppercase tracking-tight mb-3">
          Join the Lentáticos
        </h2>
        <p className="font-playfair italic text-white/60 text-lg mb-8">
          Get exclusive access to unreleased music, pre-sale tickets, and VIP
          experiences
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                aria-hidden="true"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="input-gold pl-11"
                aria-label="Email address for newsletter"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold px-6 py-3 rounded-lg font-syne text-sm tracking-widest whitespace-nowrap disabled:opacity-50 hover-gold-glow"
            >
              <span>{loading ? "Joining..." : "Enter the Inner Circle"}</span>
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 text-gold-300">
            <div className="w-10 h-10 rounded-full bg-gold-300/20 border border-gold-300/40 flex items-center justify-center">
              <Check size={20} />
            </div>
            <div className="text-left">
              <p className="font-syne font-bold tracking-wider uppercase text-sm">
                Welcome, Lentático!
              </p>
              <p className="text-white/50 text-xs mt-0.5 font-inter">
                Check your inbox for a confirmation email
              </p>
            </div>
          </div>
        )}

        <p className="text-white/30 text-xs mt-4 font-inter">
          No spam. Unsubscribe anytime. 🔥
        </p>
      </div>
    </section>
  );
}
