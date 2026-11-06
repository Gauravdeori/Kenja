import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/data/blog";
import { publicJobs } from "@/data/jobs";

const SITE = "https://kenja.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = ["/", "/solutions/", "/products/", "/rfp-management/", "/about/", "/blog/", "/careers/", "/contact/", "/terms-of-use/", "/privacy-policy-2/",
          ...posts.map((p) => `/${p.year}/${p.month}/${p.day}/${p.slug}/`),
          ...publicJobs.filter((j) => j.status === "open").map((j) => `/careers/${j.slug}/`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${SITE}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "content-type": "application/xml" } });
      },
    },
  },
});
