import registry from "../../content/commercial/pages.json";

export type CommercialPageId = "firestick" | "samsung" | "lg" | "androidtv" | "plans" | "compare" | "support";

export type CommercialPage = {
  id: CommercialPageId;
  path: string;
  label: string;
  kind: "device" | "plans" | "support";
  anchors: string[];
};

/** Single source of truth shared with scripts/seo/* (anchor pools, paths and labels). */
export const commercialPages = registry.pages as CommercialPage[];

export type DeviceLandingContent = {
  id: Extract<CommercialPageId, "firestick" | "samsung" | "lg" | "androidtv">;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  platformHeading: string;
  platformParagraphs: string[];
  platformCheck: string;
  setupSteps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

const sharedSteps = (device: string, player: string) => [
  { title: `Identify your ${device}`, text: `Note the exact model and software version from the device settings. Compatibility depends on the model, its software and the ${player} available in your region.` },
  { title: "Confirm the setup with support", text: "Ask support which player app and setup steps apply to your model before you pay. Player apps are independent products with their own terms." },
  { title: "Choose a plan", text: "Compare plan lengths, prices and device-connection allowances, and read the refund policy before ordering." },
  { title: "Follow the instructions provided", text: "Enter your access details only in the app named in your instructions. Never post credentials publicly or send passwords in a chat message." },
];

export const deviceLandings: DeviceLandingContent[] = [
  {
    id: "firestick",
    path: "/iptv-for-firestick",
    metaTitle: "IPTV for Firestick: Compatibility, Plans & Setup",
    metaDescription: "Check your Fire TV model and software, compare IPTVUS24 plans and get setup help for a compatible player app before you order on Firestick or Fire TV.",
    h1: "IPTV for Firestick: Compatibility, Plans and Setup Help",
    intro: "Using IPTVUS24 on an Amazon Fire TV Stick or Fire TV Cube starts with one question: which software does your device run? Check that first, confirm the player app with support, then pick the plan that fits your household.",
    platformHeading: "Fire OS or Vega OS? Check before you order",
    platformParagraphs: [
      "Most Fire TV Sticks and Fire TV Cubes run Fire OS, which is based on Android. On Fire OS, apps come from the Amazon Appstore, and the device also has a per-app permission for installing apps from other sources.",
      "Some newer Fire TV Stick models run Vega OS, which installs apps from the Amazon Appstore only. Android APK files do not run on Vega OS, so instructions written for Fire OS — including Downloader-based installation — do not apply to those models.",
    ],
    platformCheck: "Open Settings → My Fire TV (or Device & Software) → About and note the model and software version. Share both with support so the instructions match your device.",
    setupSteps: sharedSteps("Fire TV device", "player apps"),
    faqs: [
      { q: "Does IPTVUS24 work on every Fire TV Stick?", a: "Compatibility depends on the model, its operating system and whether a suitable player app is available for it. Vega OS models install apps from the Amazon Appstore only. Ask support to confirm your exact model before ordering." },
      { q: "Do I need the Downloader app?", a: "Not necessarily. The right installation method depends on your model and the player app named in your setup instructions. Downloader is not available on Vega OS devices." },
      { q: "Is a free trial available?", a: "A trial is not a standard plan feature. Ask support whether a trial is currently available before paying." },
    ],
  },
  {
    id: "samsung",
    path: "/iptv-for-samsung-smart-tv",
    metaTitle: "IPTV for Samsung Smart TV: Plans & Setup Help",
    metaDescription: "Check your Samsung Tizen TV model, compare IPTVUS24 plans and get setup help for a compatible player app from the Samsung app store before you order.",
    h1: "IPTV for Samsung Smart TV: Compatibility, Plans and Setup Help",
    intro: "Samsung Smart TVs run Tizen, so the player app has to be available for your TV model and region in Samsung's own app store. Confirm that first, then choose a plan with the right number of device connections.",
    platformHeading: "How app availability works on Samsung Tizen TVs",
    platformParagraphs: [
      "Samsung televisions install apps from the Samsung app store (Smart Hub). Which apps appear depends on the model year, the Tizen version and the store region, so two Samsung TVs can show different catalogues.",
      "Some player apps on Samsung TVs have their own activation or licence, separate from a content subscription. Keep the two apart when you compare costs, and use only the publisher's official activation page.",
    ],
    platformCheck: "Open Settings → Support → About This TV and note the model code and software version. Share them with support before you order.",
    setupSteps: sharedSteps("Samsung TV", "player apps"),
    faqs: [
      { q: "Will the player app be available on my Samsung TV?", a: "Availability depends on the model year, software version and store region. Search the Samsung app store on the TV itself and ask support which app applies to your model." },
      { q: "Is the player activation the same as an IPTVUS24 plan?", a: "No. A player licence or activation is sold by the player's publisher. An IPTVUS24 plan is a separate subscription. Check both before paying." },
      { q: "Is a free trial available?", a: "A trial is not a standard plan feature. Ask support whether a trial is currently available before paying." },
    ],
  },
  {
    id: "lg",
    path: "/iptv-for-lg-smart-tv",
    metaTitle: "IPTV for LG Smart TV: webOS Plans & Setup Help",
    metaDescription: "Check your LG webOS TV model and region, compare IPTVUS24 plans and get setup help for a compatible player app from the LG Content Store before ordering.",
    h1: "IPTV for LG Smart TV: Compatibility, Plans and Setup Help",
    intro: "LG Smart TVs run webOS and install apps from the LG Content Store. The player app must be listed for your model and LG Services Country, so confirm availability before you choose a plan.",
    platformHeading: "How app availability works on LG webOS TVs",
    platformParagraphs: [
      "LG televisions install apps from the LG Content Store. The catalogue depends on the webOS version, the model and the LG Services Country set on the TV, so an app listed for one TV may be missing on another.",
      "Android APK files are not webOS apps and cannot be installed on an LG television. If a player is not listed for your model, ask support about a supported alternative rather than attempting workarounds.",
    ],
    platformCheck: "Open Settings → General → About This TV (menu names vary by webOS version) and note the model and software version. Share them with support before ordering.",
    setupSteps: sharedSteps("LG TV", "player apps"),
    faqs: [
      { q: "Why can I not find the player app on my LG TV?", a: "Listings depend on the webOS version, model and LG Services Country. Search the LG Content Store on the TV and ask support which app applies to your model." },
      { q: "Can I install an Android app on an LG TV?", a: "No. LG televisions run webOS, not Android, so Android APK files cannot be installed. Use an app listed in the LG Content Store." },
      { q: "Is a free trial available?", a: "A trial is not a standard plan feature. Ask support whether a trial is currently available before paying." },
    ],
  },
  {
    id: "androidtv",
    path: "/iptv-for-android-tv",
    metaTitle: "IPTV for Android TV & Google TV: Plans & Setup",
    metaDescription: "Check your Android TV or Google TV device, compare IPTVUS24 plans and get setup help for a compatible player app from Google Play before you order.",
    h1: "IPTV for Android TV and Google TV: Compatibility, Plans and Setup Help",
    intro: "Android TV and Google TV devices — TVs, streaming boxes and sticks — install apps from Google Play. Most offer a wide choice of player apps, but storage, software version and certification still matter.",
    platformHeading: "What to check on Android TV and Google TV devices",
    platformParagraphs: [
      "Google TV is an interface built on Android TV, so most TV-optimised player apps from Google Play run on both. Which apps appear still depends on the device's Android version, Google certification and store region.",
      "Low storage is a common cause of failed installs and crashing guides on compact streaming sticks. Check free space before installing a player and loading a large programme guide.",
    ],
    platformCheck: "Open Settings → System → About (or Device Preferences → About) and note the model and Android TV OS version. Share them with support before ordering.",
    setupSteps: sharedSteps("Android TV or Google TV device", "player apps on Google Play"),
    faqs: [
      { q: "Which player app should I use on Android TV?", a: "Several TV-optimised players are available on Google Play, each with its own features and terms. Ask support which app and setup steps apply to your device." },
      { q: "Does it matter whether my device is Google certified?", a: "Certified devices have Google Play and receive Google's app compatibility checks. Uncertified boxes can behave differently, so mention the exact model when you contact support." },
      { q: "Is a free trial available?", a: "A trial is not a standard plan feature. Ask support whether a trial is currently available before paying." },
    ],
  },
];

export function getDeviceLanding(id: DeviceLandingContent["id"]) {
  const page = deviceLandings.find(item => item.id === id);
  if (!page) throw new Error(`Unknown device landing page: ${id}`);
  return page;
}
