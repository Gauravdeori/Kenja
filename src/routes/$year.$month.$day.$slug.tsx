import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Facebook, Linkedin, Share2 } from "lucide-react";
import { findPost, posts, postPath } from "@/data/blog";
import { img } from "@/data/site";
import { CategoryLinks, PostCard } from "@/components/kenja/sections";
import { Bento, ImageTile, Page, Tile } from "@/components/kenja/bento";

export const Route = createFileRoute("/$year/$month/$day/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.year, params.month, params.day, params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Post not found | Kenja" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.title} | Kenja` },
        { name: "description", content: p.summary },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PostPage,
});

const shareCls = "grid size-10 place-items-center border-2 border-ink bg-surface text-ink shadow-[2px_2px_0_0_var(--ink)] hover:bg-pixel";

function PostPage() {
  const { post } = Route.useLoaderData();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = posts[idx + 1];
  const next = posts[idx - 1];
  const related = posts.filter((p) => p.slug !== post.slug && p.categories.some((c) => post.categories.includes(c))).slice(0, 3);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Page>
      <Bento>
        <Tile as="article" className="justify-end gap-5 sm:col-span-6 lg:col-span-8">
          <Link to="/blog" className="inline-flex items-center gap-2 self-start border-2 border-ink bg-surface px-3 py-1 text-sm font-semibold shadow-[2px_2px_0_0_var(--ink)] hover:bg-pixel">
            <ArrowLeft className="size-4" /> All posts
          </Link>
          <p className="font-pixel text-[0.72rem] uppercase text-primary">
            <CategoryLinks cats={post.categories} />
            {post.categories.length > 0 && <span className="text-ink-2"> · </span>}
            <time className="text-ink-2" dateTime={`${post.year}-${post.month}-${post.day}`}>{post.date}</time>
          </p>
          <h1 className="max-w-[22ch] text-[clamp(2.2rem,1.4rem+3vw,4rem)]">{post.title}</h1>
        </Tile>
        <ImageTile src={img(post.image)} alt="" delay={0.05} className="min-h-[260px] sm:col-span-6 lg:col-span-4" />

        <Tile className="prose-k gap-0 text-lg sm:col-span-6 md:p-10 lg:col-span-8">
          <p className="text-xl leading-relaxed text-ink">{post.summary}</p>
          <div className="mt-6 border-2 border-dashed border-ink bg-canvas-2 p-5 text-sm text-ink-2">
            The full text of this article lives in the Kenja content archive and has not been imported yet. The summary above is the article's published description.
          </div>
        </Tile>
        <Tile tone="green" label="Share" icon={Share2} delay={0.05} className="self-start sm:col-span-6 lg:col-span-4">
          <div className="flex gap-2">
            <a aria-label="Share on LinkedIn" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} className={shareCls}>
              <Linkedin className="size-4" />
            </a>
            <a aria-label="Share on Facebook" target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} className={shareCls}>
              <Facebook className="size-4" />
            </a>
          </div>
        </Tile>

        {prev && (
          <Tile tone="muted" interactive className="sm:col-span-3 lg:col-span-6">
            <Link to="/$year/$month/$day/$slug" params={postPath(prev)} className="after:absolute after:inset-0">
              <span className="flex items-center gap-2 text-xs uppercase text-ink-2">
                <ArrowLeft className="size-3.5" /> Previous
              </span>
              <span className="mt-2 block font-semibold">{prev.title}</span>
            </Link>
          </Tile>
        )}
        {next && (
          <Tile tone="muted" interactive className="text-right sm:col-span-3 lg:col-span-6">
            <Link to="/$year/$month/$day/$slug" params={postPath(next)} className="after:absolute after:inset-0">
              <span className="flex items-center justify-end gap-2 text-xs uppercase text-ink-2">
                Next <ArrowRight className="size-3.5" />
              </span>
              <span className="mt-2 block font-semibold">{next.title}</span>
            </Link>
          </Tile>
        )}
      </Bento>

      {related.length > 0 && (
        <section aria-labelledby="related-title">
          <h2 id="related-title" className="font-pixel mb-3 text-[0.72rem] uppercase text-ink-2">
            Related posts
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}
