import Navbar from "./components/Navbar";
import SocialProof from "./components/SocialProof";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Devices from "./components/Devices";
import Features from "./components/Features";
import Plans from "./components/Plans";
import Compare from "./components/Compare";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import { FinalCta, Footer, StickyCta } from "./components/Closing";
import { FloatingWhatsAppButton, WhatsAppContactSection } from "./components/WhatsApp";

export default function App() {
  return (
    <div className="min-h-screen bg-mist font-body text-ink antialiased">
      <div className="noise-layer" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Devices />
        <Features />
        <Plans />
        <Compare />
        <Reviews />
        <Faq />
        <FinalCta />
        <WhatsAppContactSection />
      </main>
      <Footer />
      <StickyCta />
      <FloatingWhatsAppButton />
      <SocialProof />
    </div>
  );
}
