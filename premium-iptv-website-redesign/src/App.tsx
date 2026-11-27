import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Devices from "./components/Devices";
import Features from "./components/Features";
import Plans from "./components/Plans";
import Compare from "./components/Compare";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import { Footer } from "./components/Closing";
import { WhatsAppContactSection } from "./components/WhatsApp";
import SetupGuide from "./components/SetupGuide";
import Reveal from "./components/Reveal";

export default function App() {
  return (
    <div className="premium-site min-h-screen bg-mist font-body text-ink antialiased">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Reveal><TrustBar /></Reveal>
        <Reveal><Devices /></Reveal>
        <Reveal><Features /></Reveal>
        <Plans />
        <Reveal><Compare /></Reveal>
        <Reveal><SetupGuide /></Reveal>
        <Reveal><Reviews /></Reveal>
        <Reveal><Faq /></Reveal>
        <Reveal><WhatsAppContactSection /></Reveal>
      </main>
      <Footer />
    </div>
  );
}
