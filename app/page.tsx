import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import About from "@/components/About";
import Media from "@/components/Media";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Music />
      <About />
      <Media />
      <Newsletter />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
