import { additionalBlogPosts } from "./additional-posts";
import { loadMarkdownPosts, type MarkdownDetails } from "./markdown-posts";
import type { BlogCategory } from "./categories";

export { blogCategories, type BlogCategory } from "./categories";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  keywords: string[];
  sections: BlogSection[];
  markdown?: MarkdownDetails;
};

export type BlogPostSummary = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "category" | "publishedAt" | "keywords"
>;

const originalBlogPosts: BlogPost[] = [
  {
    slug: "choose-an-internet-tv-service",
    title: "How to evaluate an internet TV service before subscribing",
    excerpt:
      "A practical checklist for comparing service terms, device compatibility, support, content availability, and the total cost before you sign up.",
    category: "Buying guides",
    publishedAt: "2026-11-26",
    keywords: ["internet TV", "streaming service", "subscription checklist"],
    sections: [
      {
        heading: "Start with the provider and the terms",
        paragraphs: [
          "Before comparing channel lists or promotional offers, find out which legal entity will take your payment and provide the service. The seller should be identifiable before you purchase, not only after an order has been placed. Read the terms, privacy notice, cancellation rules, and refund policy carefully.",
          "A clear offer should state the plan length, amount charged, currency, renewal behaviour, payment method, and any taxes or additional fees. If a detail is missing or unclear, ask the provider to explain it in writing before paying.",
        ],
        bullets: [
          "Check the total amount due today and the length of the plan.",
          "Confirm whether the plan renews automatically and how to cancel.",
          "Look for a support address and a clear process for billing questions.",
        ],
      },
      {
        heading: "Check content and compatibility",
        paragraphs: [
          "Content catalogues and channel availability can vary by location and change over time. Confirm that the content you want is available to you, and ask the provider to explain the rights under which it is offered. A large catalogue claim is not a substitute for clear information about availability and authorization.",
          "Device lists can also be broad. Compatibility depends on the exact model, operating system, player application, network, and region. Verify your specific device before you subscribe, especially if you rely on a particular television or streaming box.",
        ],
      },
      {
        heading: "Compare the experience, not just the headline price",
        paragraphs: [
          "A lower monthly equivalent may require paying for a longer term up front. Compare both the total charge and the length of access, then decide whether that commitment suits you. Check what happens if a device stops working or a programme is unavailable.",
          "Finally, be cautious of countdowns, viewer counters, or purchase popups that are not backed by verifiable information. A trustworthy provider should make it easy to review the details and take time to decide.",
        ],
      },
    ],
  },
  {
    slug: "check-device-compatibility",
    title: "A practical guide to checking streaming device compatibility",
    excerpt:
      "Use this device-by-device checklist to confirm your operating system, app availability, connection, and account limits before ordering.",
    category: "Devices & setup",
    publishedAt: "2026-11-26",
    keywords: ["device compatibility", "Smart TV", "streaming setup"],
    sections: [
      {
        heading: "Identify the exact device",
        paragraphs: [
          "“Smart TV” or “Android device” is not specific enough to establish compatibility. Find the model number and software version in your device settings. Menu names vary, but the information is usually under Settings, About, or Device information.",
          "Check that the device still receives software updates and has enough free storage for the player application you intend to use. Older operating systems may no longer support current apps, even when the hardware still turns on.",
        ],
      },
      {
        heading: "Verify the player app and service requirements",
        paragraphs: [
          "Look for the required player in the official app store for your device and region. Confirm the app developer, current version, and any subscription or in-app fee. Do not assume that one application is available on every television or that an app listing guarantees compatibility with a particular service.",
          "Ask the service provider which connection type, account format, and number of simultaneous devices your plan supports. Do not send passwords, account credentials, or payment details in a public forum or an unverified message.",
        ],
        bullets: [
          "Smart TV: check the brand, model year, operating system, and regional app store.",
          "Streaming box or stick: check its model, OS version, and available storage.",
          "Phone, tablet, or computer: verify the supported operating system and player.",
        ],
      },
      {
        heading: "Test your home network",
        paragraphs: [
          "A compatible device still needs a stable internet connection. If possible, test near the device and compare Wi-Fi with a wired connection. Other household use, wireless interference, router placement, and your internet provider can all affect playback.",
          "Before ordering, share only the device model and operating system with support if you need help. Request written setup instructions for your exact device, and make sure you understand any app costs or extra plan connections.",
        ],
      },
    ],
  },
  {
    slug: "what-affects-streaming-quality",
    title: "What affects streaming quality at home?",
    excerpt:
      "Understand how your connection, Wi-Fi, device, stream source, and household network use can influence playback quality.",
    category: "Streaming basics",
    publishedAt: "2026-11-26",
    keywords: ["streaming quality", "Wi-Fi", "buffering"],
    sections: [
      {
        heading: "Your connection is shared",
        paragraphs: [
          "Streaming uses part of your available internet capacity, but the amount required varies with video quality, encoding, the device, and the service. A speed test is only a snapshot; it does not show how your connection behaves throughout the day or how much bandwidth other devices are using.",
          "If playback becomes inconsistent, pause large downloads and check whether other devices are using the network. Test at different times and compare a wired Ethernet connection with Wi-Fi where practical.",
        ],
      },
      {
        heading: "Improve the local Wi-Fi first",
        paragraphs: [
          "Router position and wireless interference can create problems even when the internet plan itself is fast. Keep the router in an open, central location, avoid placing it inside cabinets, and reduce obstructions between the router and the streaming device.",
          "Restarting the router and device can help with temporary issues. If several devices have trouble at once, contact your internet provider. If only one app or one programme is affected, contact the service provider and include the device model, app version, and approximate time of the issue.",
        ],
        bullets: [
          "Use Ethernet when available and convenient.",
          "Keep the router and device software up to date.",
          "Check whether the issue affects one device, one app, or the whole home.",
        ],
      },
      {
        heading: "Separate device issues from service issues",
        paragraphs: [
          "A television may have limited processing power or an older wireless adapter. Closing unused apps and checking available storage can help. App updates can also change playback behaviour, so note any recent changes when reporting a problem.",
          "No provider can guarantee that every stream will play at a fixed quality on every device and network. Check the service terms, use supported software, and ask support for troubleshooting steps rather than relying on broad “no buffering” claims.",
        ],
      },
    ],
  },
  {
    slug: "compare-streaming-plan-prices",
    title: "How to compare streaming plan prices clearly",
    excerpt:
      "Learn how to compare the amount due, plan length, monthly equivalent, renewal terms, and refund conditions without getting caught by misleading savings claims.",
    category: "Buying guides",
    publishedAt: "2026-11-26",
    keywords: ["streaming plan prices", "subscription costs", "monthly equivalent"],
    sections: [
      {
        heading: "Compare total cost and commitment",
        paragraphs: [
          "A monthly equivalent can make plans easier to compare, but it does not change the amount charged up front. Divide the total plan price by the number of months, then check the calculation and currency. For example, a $30 plan covering three months costs $10 per month on average, while the initial charge remains $30.",
          "Look for additional charges such as app subscriptions, equipment, installation, taxes, or payment fees. A price should say what is included and which costs may be billed separately.",
        ],
      },
      {
        heading: "Read renewal and cancellation details",
        paragraphs: [
          "Confirm whether the plan ends automatically or renews. For a recurring plan, check the renewal date, future price, payment method, and steps needed to cancel. Keep the order confirmation and cancellation receipt so you can refer to the agreed terms later.",
          "If a provider offers a trial or introductory rate, verify its length, the price afterwards, whether payment details are required, and how to stop it. Do not rely on a banner or countdown; the terms presented before payment should explain the offer.",
        ],
      },
      {
        heading: "Understand refund conditions",
        paragraphs: [
          "A money-back statement may have eligibility rules, time limits, and exclusions. Read the full policy before ordering and check how to submit a request, what information is needed, and how long processing may take. Your statutory rights may provide protections beyond a voluntary policy.",
          "If the total commitment or a refund term is unclear, pause and contact the seller. A transparent comparison helps you choose a plan that fits your budget without depending on pressure tactics.",
        ],
      },
    ],
  },
  {
    slug: "streaming-app-privacy-and-security",
    title: "Protecting your privacy when using streaming apps",
    excerpt:
      "Simple steps for safer accounts, careful app selection, privacy settings, and sharing less personal information while streaming.",
    category: "Privacy & safety",
    publishedAt: "2026-11-26",
    keywords: ["streaming privacy", "account security", "privacy settings"],
    sections: [
      {
        heading: "Choose apps carefully",
        paragraphs: [
          "Install applications from the official store for your device where possible. Review the developer, recent update history, requested permissions, privacy information, and any separate cost. Be cautious of apps distributed through unfamiliar download sites or instructions that ask you to disable device security protections.",
          "An app may collect technical or usage information under its own privacy policy. Read that policy and the service provider’s policy separately; using a service does not make every application on the device part of the same company.",
        ],
      },
      {
        heading: "Protect your account",
        paragraphs: [
          "Use a unique password for each account and enable multi-factor authentication if offered. Keep device software and applications current, use a screen lock, and review which people have access to a shared account.",
          "Never share passwords, one-time security codes, or payment-card details in a review, public post, or ordinary support message. If support needs to identify an order, ask which limited reference is appropriate instead of sending full payment information.",
        ],
      },
      {
        heading: "Review privacy and cookie choices",
        paragraphs: [
          "Check the privacy settings in the app, device, and account. You may be able to limit diagnostics, personalized recommendations, or data sharing. The available controls differ by provider and device.",
          "On websites, distinguish essential storage from analytics or advertising technologies. Review the cookie notice and policy, and change your choice if the website provides a settings control. If a service does not explain what it collects or how to contact the operator, ask before creating an account.",
        ],
      },
    ],
  },
  {
    slug: "regional-content-availability-and-rights",
    title: "Checking regional content availability and rights",
    excerpt:
      "Why catalogues vary by location, what to ask a provider before subscribing, and how to make an informed, lawful choice.",
    category: "Privacy & safety",
    publishedAt: "2026-11-26",
    keywords: ["regional availability", "content rights", "streaming subscriptions"],
    sections: [
      {
        heading: "Availability is not the same everywhere",
        paragraphs: [
          "Programme availability can depend on distribution agreements, location, language, device, and time. A title listed in one country may not be offered in another, and a catalogue can change when rights or technical arrangements change.",
          "A large channel or title count does not explain which content is available to you or the basis on which it is offered. Before subscribing, search for the specific programmes you want and ask the provider how availability is determined for your location.",
        ],
      },
      {
        heading: "Questions to ask before paying",
        paragraphs: [
          "Look for the legal name of the seller, a working contact method, and clear terms describing the service and its territorial availability. Ask the provider to explain the authorization for the content it offers in your region. Keep the response and order terms with your receipt.",
          "Do not assume that a stream is authorized just because it is accessible, advertised online, or works in a particular app. Likewise, a disclaimer does not establish that the provider has the rights it needs. If the provider cannot give a clear answer, consider using an authorized broadcaster or service available in your country.",
        ],
        bullets: [
          "Identify who is taking payment and responsible for the service.",
          "Confirm the exact content and territory covered by the offer.",
          "Review local rules and the provider’s terms before subscribing.",
        ],
      },
      {
        heading: "Make an informed choice",
        paragraphs: [
          "Check official broadcaster or rights-holder information where available. If you have a concern about a listing, ask the service provider for clarification before purchase. Avoid sharing or redistributing content unless you have the necessary rights.",
          "Clear answers about seller identity, regional availability, and rights are basic trust signals. Choose a provider that is transparent and respects the laws and rights that apply where you live.",
        ],
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [...loadMarkdownPosts(), ...originalBlogPosts, ...additionalBlogPosts];

if (new Set(blogPosts.map((post) => post.slug)).size !== blogPosts.length) {
  throw new Error("Blog post slugs must be unique.");
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    keywords: post.keywords,
  };
}
