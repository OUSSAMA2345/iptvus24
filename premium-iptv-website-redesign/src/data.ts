export type IconName =
  | "tv"
  | "bolt"
  | "headset"
  | "globe"
  | "shield"
  | "signal"
  | "ball"
  | "film"
  | "rewind"
  | "guide"
  | "devices"
  | "globe-arrows"
  | "lock"
  | "check"
  | "minus"
  | "play"
  | "spark"
  | "phone"
  | "tablet"
  | "monitor"
  | "laptop"
  | "box"
  | "stick"
  | "cube"
  | "clock"
  | "chat"
  | "star"
  | "flame"
  | "badge"
  | "arrow"
  | "card"
  | "server"
  | "wifi";

export const tickerItems = [
  "Premier League",
  "NFL Live",
  "NBA",
  "UFC Fight Night",
  "Sky Sports",
  "ESPN",
  "TNT Sports",
  "Formula 1",
  "HBO Catalog",
  "4K Documentaries",
  "Warner Bros",
  "Universal Pictures",
  "Kids TV",
  "40+ Countries",
  "March Madness",
  "Champions League",
  "MLB",
  "PGA Tour",
];

export const devices: { id: string; name: string; note: string }[] = [
  { id: "tv", name: "Smart TV", note: "Samsung, LG, Tizen & WebOS — install in 2 taps" },
  { id: "box", name: "Android TV Box", note: "Xiaomi, Nvidia, TCL & every Google TV box" },
  { id: "stick", name: "Fire Stick", note: "Fire TV Stick 4K — guided setup included" },
  { id: "cube", name: "Apple TV", note: "Buttery-smooth native experience on tvOS" },
  { id: "phone", name: "Smartphones", note: "iOS & Android — watch on the go" },
  { id: "tablet", name: "Tablets", note: "iPad, Galaxy Tab and every major tablet" },
  { id: "monitor", name: "Windows", note: "PC & laptop via our free player app" },
  { id: "laptop", name: "Mac", note: "Optimized for macOS — 4K ready" },
];

export const features: { icon: IconName; title: string; desc: string; tag: string }[] = [
  {
    icon: "tv",
    title: "Premium Live TV",
    desc: "25,000+ channels from 100+ countries with a crystal-clear signal and zero re-tuning.",
    tag: "Live",
  },
  {
    icon: "film",
    title: "Movies & TV Shows",
    desc: "150,000+ titles refreshed weekly with the latest releases, classics and originals.",
    tag: "150K+",
  },
  {
    icon: "signal",
    title: "4K Streaming",
    desc: "True UHD 4K, Full HD and HD with anti-buffer technology for rock-solid playback.",
    tag: "4K UHD",
  },
  {
    icon: "rewind",
    title: "Catch-Up TV",
    desc: "Missed the final? Rewind up to 7 days back on thousands of live channels.",
    tag: "7-day",
  },
  {
    icon: "guide",
    title: "EPG Guide",
    desc: "A clean electronic program guide with search, favorites and what's-on-next.",
    tag: "Guided",
  },
  {
    icon: "devices",
    title: "Multi-Device Access",
    desc: "Watch on up to 2 devices at once — one account, every screen in the house.",
    tag: "2 screens",
  },
  {
    icon: "globe-arrows",
    title: "Worldwide Channels",
    desc: "Entertainment, news and sports from the US, UK, Canada, Europe, LatAm & Asia.",
    tag: "100+ countries",
  },
  {
    icon: "server",
    title: "Anti-Buffer Engine",
    desc: "Adaptive anti-freeze servers in 12 regions — buffering under 0.3% of watch time.",
    tag: "<0.3% buffer",
  },
];

export const plans: {
  name: string;
  tagline: string;
  price: string;
  per: string;
  monthly: string;
  save?: string;
  best?: boolean;
  trial?: boolean;
  features: string[];
  cta: string;
}[] = [
  {
    name: "Monthly",
    tagline: "Test the waters",
    price: "$14.99",
    per: "billed monthly",
    monthly: "$14.99/mo",
    features: [
      "25,000+ live channels",
      "150,000+ movies & series",
      "HD, Full HD & 4K quality",
      "1 device connection",
      "EPG guide + 7-day catch-up",
      "Free activation & setup",
      "24/7 live support",
    ],
    cta: "Get Monthly",
  },
  {
    name: "Quarterly",
    tagline: "Flexible 3-month term",
    price: "$29.99",
    per: "for 3 months",
    monthly: "$9.99/mo",
    save: "Save 33%",
    features: [
      "Everything in Monthly",
      "2 device connections",
      "Priority stream servers",
      "Free device migration",
      "Priority 24/7 support",
      "Free monthly channel updates",
      "No mid-term price changes",
    ],
    cta: "Get Quarterly",
  },
  {
    name: "Semi-Annual",
    tagline: "Half-year commitment",
    price: "$39.99",
    per: "for 6 months",
    monthly: "$6.67/mo",
    save: "Save 55%",
    features: [
      "Everything in Quarterly",
      "2 simultaneous streams",
      "VIP anti-buffer 4K servers",
      "Free device migration + M3U export",
      "Dedicated setup specialist",
      "Priority 24/7 support",
      "Season sport pass-through",
    ],
    cta: "Get Semi-Annual",
  },
  {
    name: "Annual",
    tagline: "Our absolute best value",
    price: "$69.99",
    per: "for 12 months",
    monthly: "$5.83/mo",
    save: "Save 61%",
    best: true,
    trial: true,
    features: [
      "Everything in Semi-Annual",
      "2 simultaneous streams",
      "7-day free trial available",
      "Dedicated setup specialist",
      "VIP anti-buffer 4K servers",
      "Free device migration + M3U export",
      "24/7 priority human support",
    ],
    cta: "Get Annual",
  },
];

export const compareRows: { label: string; us: string; them: string }[] = [
  { label: "Live channels", us: "25,000+ from 100+ countries", them: "5,000 – 12,000" },
  { label: "Sports in 4K", us: "NFL, NBA, EPL, UFC, F1 in 4K", them: "Rarely available" },
  { label: "VOD library", us: "150,000+ movies & series", them: "Limited or none" },
  { label: "Streaming quality", us: "HD / FHD / 4K anti-buffer", them: "Frequent buffering" },
  { label: "Network uptime", us: "99.9% guaranteed, monitored 24/7", them: "≈ 90% with outages" },
  { label: "Activation time", us: "Under 5 minutes", them: "Same day — or later" },
  { label: "Support", us: "24/7 real humans, < 5 min reply", them: "Email only — or none" },
  { label: "Free trial", us: "7-day trial on Annual plan", them: "Rarely offered" },
  { label: "Setup included", us: "We set it up for you, free", them: "Manual DIY guides" },
  { label: "Price value", us: "$5.83/mo — annual, all-in", them: "$15+/mo, hidden fees" },
];

export const reviews: {
  name: string;
  location: string;
  plan: string;
  rating: number;
  text: string;
  tag: string;
}[] = [
  {
    name: "Marcus T.",
    location: "Austin, Texas",
    plan: "Annual Plan",
    rating: 5,
    text: "Set up on my Fire Stick in under 10 minutes from checkout. Every Sunday Premier League match has been crystal clear all season — zero dropouts.",
    tag: "Sports",
  },
  {
    name: "Jennifer L.",
    location: "Sacramento, California",
    plan: "Annual Plan",
    rating: 5,
    text: "We cancelled two streaming subscriptions in a week. The 4K movie picture is genuinely stunning and March Madness didn't buffer a single second.",
    tag: "4K Quality",
  },
  {
    name: "Dave R.",
    location: "Brooklyn, New York",
    plan: "Quarterly Plan",
    rating: 5,
    text: "I switched from another provider after a server outage. Support replied in 4 minutes on a Sunday night and had my old channels imported the same day.",
    tag: "Support",
  },
  {
    name: "Amanda K.",
    location: "Tampa, Florida",
    plan: "Annual Plan",
    rating: 5,
    text: "All of my mom's international channels from back home work perfectly, plus the kids' TV is loaded. Easiest TV experience I've ever had.",
    tag: "International",
  },
  {
    name: "Chris B.",
    location: "Detroit, Michigan",
    plan: "Monthly Plan",
    rating: 4,
    text: "Trial converted to monthly because I couldn't find a fault. F1 on my MacBook at night, NBA on the living room TV — one account for everything.",
    tag: "Multi-device",
  },
  {
    name: "Sophia M.",
    location: "Atlanta, Georgia",
    plan: "Annual Plan",
    rating: 5,
    text: "The interface on Apple TV feels like a first-party app. Clean, fast, and the EPG actually tells you what's coming up. Worth every dollar.",
    tag: "Apple TV",
  },
];

export type FaqCategory = "Setup" | "Compatibility" | "Billing" | "Quality" | "Support";

export const faqs: { q: string; a: string; cat: FaqCategory }[] = [
  {
    q: "How long does activation take?",
    a: "Activation is instant in 95% of cases. Right after your secure checkout, your login details, app links and a step-by-step setup guide land in your inbox — usually within 5 minutes. If you prefer, our team can set everything up on your device for you, live and free of charge.",
    cat: "Setup",
  },
  {
    q: "How do I start with IPTVUS24?",
    a: "Three steps: choose a plan, complete the secure checkout (card, PayPal or Apple Pay), and receive your personal login by email. Then either follow the 3-minute setup guide or ping our team and we'll install it on your device while you watch.",
    cat: "Setup",
  },
  {
    q: "Which devices are supported?",
    a: "Practically everything: Smart TVs (Samsung, LG, Tizen, WebOS, Android TV), streaming boxes, Fire TV Stick, Apple TV, iOS & Android phones and tablets, Windows PCs, Macs and most MAG/Enigma2 boxes. If it can run a player app, it works with IPTVUS24.",
    cat: "Compatibility",
  },
  {
    q: "What internet speed do I need?",
    a: "15 Mbps for HD, 25 Mbps for Full HD, and 35+ Mbps for stable 4K (per stream). A 5GHz Wi-Fi network or Ethernet connection gives the best results. Our anti-buffer servers automatically adjust quality so playback keeps flowing even if your line dips.",
    cat: "Quality",
  },
  {
    q: "Do you offer 4K content?",
    a: "Yes. Thousands of live channels and a large, growing VOD catalog stream in true UHD 4K, with Full HD and HD available everywhere. HDR10 is supported on compatible devices and flows for major sports events.",
    cat: "Quality",
  },
  {
    q: "How do I pay, and is billing secure?",
    a: "We accept Visa, Mastercard, American Express, PayPal and Apple Pay through a PCI-compliant, 256-bit SSL encrypted checkout with 3-D Secure verification. We never see or store your card details — and every invoice arrives instantly by email.",
    cat: "Billing",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. You are covered by a 30-day iron-clad money-back guarantee. Changed your mind, or something isn't right? One message to our 24/7 support and your refund is processed within 24 hours — no forms, no phone calls, no guilt trips.",
    cat: "Billing",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — the Annual Plan comes with a 7-day free trial. Test every channel, movie and device with your family. You only pay if you decide to keep it, and you can cancel the trial anytime before it ends.",
    cat: "Billing",
  },
  {
    q: "Is support really available 24/7?",
    a: "Really. Human agents — not bots — are online 24 hours a day, 7 days a week, 365 days a year, covering US, Canadian and UK time zones. Average first response time is under 5 minutes, and your setup specialist stays with you until it's perfect.",
    cat: "Support",
  },
];

export const footerCols: { title: string; links: string[] }[] = [
  { title: "Service", links: ["Plans & Pricing", "Features", "Compatible Devices", "Free Trial", "Channel List"] },
  { title: "Company", links: ["About IPTVUS24", "Why We Win", "Refund Policy", "Terms of Service", "Privacy Policy"] },
  { title: "Support", links: ["24/7 Live Chat", "Setup Guides", "System Status", "Contact Us", "FAQ"] },
];
