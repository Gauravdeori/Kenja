import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { categories, posts } from "@/data/blog";
import { KnobButton } from "@/components/kenja/primitives";
import { PageHero, PostCard } from "@/components/kenja/sections";
import { Bento, Page, Tile } from "@/components/kenja/bento";
import { cn } from "@/lib/utils";

type S = { category?: string; q?: string };

export const Route = createFileRoute("/blog")({
  validateSearch: (s: Record<string, unknown>): S => ({
    category: typeof s["category"] === "string" ? (s["category"] as string) : undefined,
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Blog | Kenja" },
      { name: "description", content: "News, events and articles from Kenja about enterprise AI, retrieval augmented generation, blockchain and Kenja Rooms." },
      { property: "og:title", content: "Blog | Kenja" },
      { property: "og:description", content: "News, events and ideas from Kenja." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

function Blog() {
  const { category, q = "" } = Route.useSearch();
  const navigate = useNavigate({ from: "/blog" });
  const [limit, setLimit] = useState(12);
  const label = categories.find((c) => c.slug === category)?.label;

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    posts.forEach((p) => p.categories.forEach((c) => m.set(c, (m.get(c) ?? 0) + 1)));
    return m;
  }, []);
  const chips = [...categories].sort((a, b) => (counts.get(b.label) ?? 0) - (counts.get(a.label) ?? 0));

  const filtered = posts.filter((p) => (!label || p.categories.includes(label)) && (!q || (p.title + " " + p.summary).toLowerCase().includes(q.toLowerCase())));

  return (
    <Page>
      <PageHero eyebrow="Blog" title="News, Events / and Ideas" lead="Updates from Kenja on AI, blockchain, events and the work of our team." />

      <Bento label={`${filtered.length} posts`}>
        <Tile label="Search" icon={Search} tone="muted" className="sm:col-span-6 lg:col-span-4">
          <label className="relative">
            <span className="sr-only">Search posts</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-2" />
            <input
              type="search"
              value={q}
              onChange={(e) => navigate({ search: (s: S) => ({ ...s, q: e.target.value || undefined }), replace: true })}
              placeholder="Search posts"
              className="h-11 w-full border-2 border-ink bg-surface pl-9 pr-3 outline-none focus:shadow-[3px_3px_0_0_var(--primary)]"
            />
          </label>
        </Tile>
        <Tile label="Filter by category" icon={Filter} className="sm:col-span-6 lg:col-span-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <Chip active={!category} onClick={() => navigate({ search: (s: S) => ({ ...s, category: undefined }) })} label="All" count={posts.length} />
            {chips.map((c) => (
              <Chip key={c.slug} active={category === c.slug} onClick={() => navigate({ search: (s: S) => ({ ...s, category: c.slug }) })} label={c.label} count={counts.get(c.label) ?? 0} />
            ))}
          </div>
        </Tile>
      </Bento>

      <section aria-label="Posts">
        {filtered.length === 0 ? (
          <p className="border-2 border-dashed border-ink bg-surface p-10 text-center text-ink-2">No posts match your search.</p>
        ) : (
          <motion.div layout className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.slice(0, limit).map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: (i % 12) * 0.03 }} className={cn(i === 0 && !q && !category && "sm:col-span-2")}>
                  <PostCard post={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        {filtered.length > limit && (
          <div className="mt-10 flex justify-center">
            <KnobButton variant="light" onClick={() => setLimit((l) => l + 12)}>
              Show more posts
            </KnobButton>
          </div>
        )}
      </section>
    </Page>
  );
}

function Chip({ active, label, count, onClick }: { active: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={active} className={cn("border-2 border-ink px-3 py-1 text-sm font-medium", active ? "translate-x-[2px] translate-y-[2px] bg-ink text-night-foreground" : "bg-surface text-ink shadow-[2px_2px_0_0_var(--ink)] hover:bg-pixel")}>
      {label} <span className="ml-1 opacity-60">{count}</span>
    </button>
  );
}
