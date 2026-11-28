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

export const devices: { id: string; name: string; note: string }[] = [
  { id: "tv", name: "Smart TVs", note: "Check your TV model and available player apps." },
  { id: "box", name: "Android TV devices", note: "Confirm compatibility for your device and OS version." },
  { id: "stick", name: "Fire TV devices", note: "Ask support which setup instructions apply." },
  { id: "cube", name: "Apple TV", note: "Confirm supported apps and service availability first." },
  { id: "phone", name: "Smartphones", note: "Compatibility depends on the device and player app." },
  { id: "tablet", name: "Tablets", note: "Check app availability in your region." },
  { id: "monitor", name: "Windows PCs", note: "A compatible player and stable internet connection are required." },
  { id: "laptop", name: "Mac computers", note: "Confirm supported software before placing an order." },
];

export const features: { icon: IconName; title: string; desc: string; tag: string }[] = [
  {
    icon: "tv",
    title: "Live television",
    desc: "Explore the live-TV offering described in the current plan details. Channel availability may vary.",
    tag: "Live",
  },
  {
    icon: "film",
    title: "On-demand viewing",
    desc: "Plan information describes on-demand movies and series. Check the current catalogue before ordering.",
    tag: "On demand",
  },
  {
    icon: "guide",
    title: "Programme guide",
    desc: "Plan details refer to an electronic programme guide. Features can depend on the channel and device.",
    tag: "Guide",
  },
];

export const plans: {
  name: string;
  tagline: string;
  price: string;
  per: string;
  monthly: string;
  best?: boolean;
  features: string[];
}[] = [
  {
    name: "Monthly",
    tagline: "One-month term",
    price: "$14.99",
    per: "1 month",
    monthly: "$14.99/mo",
    features: [
      "1 device connection",
      "Live TV and on-demand offering",
      "Setup help available from support",
    ],
  },
  {
    name: "Quarterly",
    tagline: "Three-month term",
    price: "$29.99",
    per: "3 months",
    monthly: "$10.00/mo",
    features: [
      "2 device connections",
      "Live TV and on-demand offering",
      "Setup help available from support",
    ],
  },
  {
    name: "Semi-Annual",
    tagline: "Six-month term",
    price: "$39.99",
    per: "6 months",
    monthly: "$6.67/mo",
    features: [
      "2 device connections",
      "Live TV and on-demand offering",
      "Setup help available from support",
    ],
  },
  {
    name: "Annual",
    tagline: "Twelve-month term",
    price: "$69.99",
    per: "12 months",
    monthly: "$5.83/mo",
    best: true,
    features: [
      "2 device connections",
      "Live TV and on-demand offering",
      "Setup help available from support",
    ],
  },
];

export type FaqCategory = "Setup" | "Compatibility" | "Billing" | "Quality" | "Support";

export const faqs: { q: string; a: string; cat: FaqCategory }[] = [
  {
    q: "What is included in each plan?",
    a: "Plan duration, price, and listed features are shown on the pricing cards. Check the current terms and confirm availability with support before ordering.",
    cat: "Billing",
  },
  {
    q: "How do I choose a plan?",
    a: "Compare the total price and plan duration, then check whether the device-connection allowance fits your needs. The full refund terms are available on the Refund Policy page.",
    cat: "Billing",
  },
  {
    q: "How do I get started?",
    a: "Check your device, review the plan terms, and contact support to confirm compatibility, availability, and setup instructions before placing an order.",
    cat: "Setup",
  },
  {
    q: "Which devices can I use?",
    a: "The device guide lists common device types, but compatibility depends on the exact model, operating system, player app, region, and network. Ask support to confirm your setup before ordering.",
    cat: "Compatibility",
  },
  {
    q: "What internet connection do I need?",
    a: "A stable broadband connection is needed. The bandwidth required depends on stream quality, the number of devices, your Wi-Fi, and other network use. Contact your internet provider if you need help checking your connection.",
    cat: "Quality",
  },
  {
    q: "How do I confirm content availability?",
    a: "Availability may vary by region and can change. Before ordering, confirm the channels or content you want are available to you and review the service terms and applicable local rules.",
    cat: "Billing",
  },
  {
    q: "Can I get a refund?",
    a: "The first paid plan is covered by the 30-day refund policy. Eligibility, exclusions, and processing details are explained on the Refund Policy page.",
    cat: "Billing",
  },
  {
    q: "Which payment methods can I use?",
    a: "Available payment methods, currency, and any applicable taxes are shown before you authorize an order. Ask support if you need clarification before paying.",
    cat: "Billing",
  },
  {
    q: "How soon will my plan be activated?",
    a: "The plan pages do not promise a fixed activation time. Ask support for the current estimate before you place an order.",
    cat: "Setup",
  },
  {
    q: "Is a trial available?",
    a: "A trial is not listed as a standard plan feature. Ask support whether a trial is currently available before paying.",
    cat: "Billing",
  },
  {
    q: "Will my plan renew automatically?",
    a: "Unless your order expressly says otherwise, a plan ends at the end of its stated term and does not renew automatically. Any recurring renewal must be disclosed and authorized before payment.",
    cat: "Billing",
  },
  {
    q: "How can I contact support?",
    a: "WhatsApp is the primary contact method for pre-sale questions. Response times may vary. Do not send passwords, account credentials, or payment-card details in a message.",
    cat: "Support",
  },
];

export const footerCols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Service",
    links: [
      { label: "Plans & Pricing", href: "/#plans" },
      { label: "Features", href: "/#features" },
      { label: "Compare plans", href: "/#compare-plans" },
      { label: "Compatible Devices", href: "/#devices" },
      { label: "Setup guide", href: "/#setup" },
      { label: "Reviews", href: "/reviews" },
      { label: "Service Status", href: "/status" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Devices",
    links: [
      { label: "IPTV for Firestick", href: "/iptv-for-firestick" },
      { label: "IPTV for Android TV", href: "/iptv-for-android-tv" },
      { label: "IPTV for Samsung TV", href: "/iptv-for-samsung-smart-tv" },
      { label: "IPTV for LG TV", href: "/iptv-for-lg-smart-tv" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About IPTVUS24", href: "/about" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Frequently Asked Questions", href: "/#faq" },
      { label: "WhatsApp Support", href: "https://wa.me/447473970663" },
    ],
  },
];
