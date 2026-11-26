export const blogCategories = [
  "Buying guides",
  "Devices & setup",
  "Streaming basics",
  "Privacy & safety",
] as const;

export type BlogCategory = (typeof blogCategories)[number];
