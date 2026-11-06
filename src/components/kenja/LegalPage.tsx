import { FileText, ListTree } from "lucide-react";
import { Bento, Page, Tile } from "./bento";

type Block = { t: "h" | "p"; text: string };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function LegalPage({ title, updated, blocks }: { title: string; updated: string; blocks: Block[] }) {
  const heads = blocks.filter((b) => b.t === "h");
  return (
    <Page>
      <Bento>
        <Tile label="Legal" icon={FileText} className="sm:col-span-6 lg:col-span-9">
          <h1 className="text-display">{title}</h1>
        </Tile>
        <Tile tone="green" delay={0.05} className="justify-end sm:col-span-6 lg:col-span-3">
          <p className="font-pixel text-[0.72rem] uppercase">Last updated</p>
          <p className="mt-2 text-2xl font-semibold">{updated}</p>
        </Tile>
        <Tile tone="muted" label="On this page" icon={ListTree} className="self-start sm:col-span-6 lg:sticky lg:top-6 lg:col-span-3">
          <nav aria-label="On this page">
            <ul className="space-y-1.5 text-sm">
              {heads.map((h, i) => (
                <li key={i}>
                  <a href={`#${slug(h.text)}`} className="text-ink-2 hover:bg-primary hover:text-primary-foreground">
                    ▸ {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Tile>
        <Tile className="prose-k sm:col-span-6 md:p-10 lg:col-span-9">
          <div className="max-w-[44rem]">
            {blocks.map((b, i) => (b.t === "h" ? <h2 key={i} id={slug(b.text)}>{b.text}</h2> : <p key={i}>{b.text}</p>))}
          </div>
        </Tile>
      </Bento>
    </Page>
  );
}
