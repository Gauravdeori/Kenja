/**
 * Bento dashboard layout: pages are grids of differently sized pixel tiles.
 *   <Page>             page column (sits right of the sidebar)
 *     <Bento label>    a 12-column tile grid with an optional section label
 *       <Tile ...>     one tile; size it with col/row span classes
 */
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Briefcase, FileText, Info, Lightbulb, Mail, Monitor, Newspaper, Package, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { pixelEase } from "./primitives";

export const navIcons: Record<string, LucideIcon> = {
  "/": Monitor,
  "/solutions": Lightbulb,
  "/products": Package,
  "/rfp-management": FileText,
  "/about": Info,
  "/blog": Newspaper,
  "/careers": Briefcase,
  "/contact": Mail,
};

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-3 pb-6 pt-[76px] md:gap-12 md:px-5 lg:pt-6", className)}>{children}</div>;
}

export function Bento({ id, label, children, className }: { id?: string; label?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-label={label} className="scroll-mt-20">
      {label && (
        <div className="mb-3 flex items-center gap-3">
          <span aria-hidden className="size-2 bg-pixel-deep" />
          <span className="font-pixel text-[0.72rem] uppercase text-ink-2">{label}</span>
          <span aria-hidden className="h-[2px] flex-1 bg-ink/15" />
        </div>
      )}
      <div className={cn("grid grid-flow-row-dense grid-cols-1 gap-3 sm:grid-cols-6 md:gap-4 lg:grid-cols-12", className)}>{children}</div>
    </section>
  );
}

const toneCls = {
  light: "bg-surface text-ink",
  muted: "bg-canvas-2 text-ink",
  dark: "bg-night text-night-foreground",
  blue: "bg-primary text-primary-foreground",
  green: "bg-pixel text-ink",
  image: "bg-night text-night-foreground",
} as const;
export type TileTone = keyof typeof toneCls;

export type TileProps = {
  children?: ReactNode;
  className?: string;
  tone?: TileTone;
  /** Small pixel label in the tile's top-left corner. */
  label?: string;
  icon?: LucideIcon;
  /** Remove the default padding (for full-bleed images). */
  bleed?: boolean;
  /** Lift on hover (for tiles that are links). */
  interactive?: boolean;
  as?: "div" | "article" | "li" | "section" | "figure";
  delay?: number;
  id?: string;
};

export function Tile({ children, className, tone = "light", label, icon: Icon, bleed, interactive, as = "div", delay = 0, id }: TileProps) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      id={id}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.4, delay, ease: pixelEase }}
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]",
        toneCls[tone],
        !bleed && "p-5 md:p-6",
        interactive && "transition-[translate,box-shadow] duration-100 [transition-timing-function:steps(1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--ink)]",
        className,
      )}
    >
      {label && <TileLabel icon={Icon} className={bleed ? "absolute left-4 top-4 z-10 bg-surface px-2 py-1 text-ink" : undefined}>{label}</TileLabel>}
      {children}
    </M>
  );
}

export function TileLabel({ children, icon: Icon, className }: { children: ReactNode; icon?: LucideIcon; className?: string }) {
  return (
    <p className={cn("font-pixel mb-4 flex items-center gap-2 text-[0.72rem] uppercase opacity-80", className)}>
      {Icon && <Icon className="size-3.5" strokeWidth={2.5} />}
      {children}
    </p>
  );
}

/** A big number tile: value on top, explanation underneath. */
export function StatTile({ value, text, tone = "light", className, delay }: { value: ReactNode; text: string; tone?: TileTone; className?: string; delay?: number }) {
  return (
    <Tile tone={tone} delay={delay} className={cn("justify-between gap-6", className)}>
      <p className="text-[clamp(2.4rem,1.6rem+2.4vw,3.6rem)] font-semibold leading-none">{value}</p>
      <p className={cn("text-sm", tone === "light" || tone === "muted" ? "text-ink-2" : "opacity-85")}>{text}</p>
    </Tile>
  );
}

/** Full-bleed photo tile with an optional caption bar along the bottom. */
export function ImageTile({ src, alt, caption, className, label, delay, children }: { src: string; alt: string; caption?: ReactNode; className?: string; label?: string; delay?: number; children?: ReactNode }) {
  return (
    <Tile bleed tone="image" label={label} delay={delay} className={cn("group min-h-[220px]", className)}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      {children}
      {caption && <div className="relative mt-auto border-t-2 border-ink bg-night/90 p-3 text-sm leading-snug text-night-foreground">{caption}</div>}
    </Tile>
  );
}
