import raw from "./posts.json";

export type Post = {
  n: number;
  title: string;
  slug: string;
  categories: string[];
  summary: string;
  year: string;
  month: string;
  day: string;
  date: string;
  image: string;
};

// The documentation records every post as dated 27 November 2024 (the WordPress
// import date). It does not include post bodies or cover pictures, so cards use
// crops of the photo library and pages show the documented summary.
const photos = ["glass-panels", "glass-cube", "server-room", "green-triangle", "glass-shield", "uc-training", "person-tablet", "uc-rfp", "ted-tedx", "ted-gbbc"];

export const posts: Post[] = (raw as Omit<Post, "year" | "month" | "day" | "date" | "image">[]).map((p, i) => ({
  ...p,
  year: "2024",
  month: "11",
  day: "27",
  date: "27 November 2024",
  image: p.title.includes("TEDx") ? "ted-tedx" : p.title.includes("UNGA") ? "ted-gbbc" : photos[i % photos.length]!,
}));

export const categories = [
  { slug: "ai", label: "AI" },
  { slug: "events", label: "Events" },
  { slug: "blockchain", label: "Blockchain" },
  { slug: "industrynews", label: "Industry News" },
  { slug: "kenja-rooms", label: "Kenja Rooms" },
  { slug: "use-case", label: "Use Case" },
  { slug: "thoughtleadership", label: "Thought Leadership" },
  { slug: "understanding-ai-101", label: "Understanding AI 101" },
  { slug: "navigating-ai", label: "Navigating AI" },
  { slug: "digital-transformation", label: "Digital Transformation" },
];
export const catSlug = (label: string) => categories.find((c) => c.label === label)?.slug ?? "";

export const postPath = (p: Post) => ({ year: p.year, month: p.month, day: p.day, slug: p.slug });
export const findPost = (y: string, m: string, d: string, s: string) =>
  posts.find((p) => p.year === y && p.month === m && p.day === d && p.slug === s);
