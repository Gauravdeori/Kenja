import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy WordPress category links → filtered blog.
export const Route = createFileRoute("/category/$slug")({
  beforeLoad: ({ params }) => {
    const s = params.slug === "industry-news" ? "industrynews" : params.slug;
    if (s === "uncategorized") throw redirect({ to: "/blog", statusCode: 301 });
    throw redirect({ to: "/blog", search: { category: s }, statusCode: 301 });
  },
});
