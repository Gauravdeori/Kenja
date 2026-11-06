import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Stepped easing for motion: an ease-out curve quantised into 8 frames, so
 * animations tick along like sprite frames instead of gliding.
 */
export const pixelEase = (t: number) => Math.floor((1 - Math.pow(1 - t, 3)) * 8) / 8;

/* Bitmap glyphs for the wordmark. Rows top→bottom; "#" is a lit pixel. */
const GLYPHS: Record<string, string[]> = {
  k: ["#...", "#...", "#...", "#..#", "#.#.", "##..", "#.#.", "#..#", "....", "...."],
  e: ["....", "....", "....", ".##.", "#..#", "####", "#...", ".###", "....", "...."],
  n: ["....", "....", "....", "###.", "#..#", "#..#", "#..#", "#..#", "....", "...."],
  j: ["...", "...", "...", "..#", "..#", "..#", "..#", "..#", "#.#", ".#."],
  a: ["....", "....", "....", ".##.", "...#", ".###", "#..#", ".###", "....", "...."],
};
/* the green triangle above the "j", pointing right */
const TRIANGLE = [
  [0, -1],
  [0, 0],
  [1, 0],
  [0, 1],
] as const;

function buildWordmark() {
  const cells: [number, number][] = [];
  let col = 0;
  let jCol = 0;
  for (const ch of "kenja") {
    const g = GLYPHS[ch]!;
    if (ch === "j") jCol = col + 2;
    g.forEach((row, y) => [...row].forEach((c, x) => c === "#" && cells.push([col + x, y + 1])));
    col += (g[0]?.length ?? 0) + 1;
  }
  return { cells, width: col - 1, jCol };
}
const WORDMARK = buildWordmark();
const PX = 4;

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  const { cells, width, jCol } = WORDMARK;
  const path = (pts: readonly (readonly [number, number])[], dy = 0) => pts.map(([x, y]) => `M${x * PX} ${(y + dy) * PX}h${PX}v${PX}h-${PX}z`).join("");
  return (
    <svg viewBox={`0 0 ${width * PX} ${11 * PX}`} className={cn("h-8 w-auto", className)} role="img" aria-label="Kenja" shapeRendering="crispEdges">
      <path d={path(cells)} fill={tone === "light" ? "var(--night-foreground)" : "var(--ink)"} />
      <path d={path(TRIANGLE.map(([x, y]) => [jCol + x, y] as const), 1)} fill="var(--pixel-deep)" />
    </svg>
  );
}

export function Eyebrow({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "light" }) {
  return (
    <p className={cn("font-pixel mb-5 inline-flex items-center gap-2 text-[0.62rem] uppercase", tone === "light" ? "text-night-muted" : "text-ink-2")}>
      <span aria-hidden className="grid grid-cols-2 gap-[2px]">
        <span className="size-[4px] bg-pixel" />
        <span className="size-[4px] bg-transparent" />
        <span className="size-[4px] bg-pixel" />
        <span className="size-[4px] bg-pixel" />
      </span>
      {children}
    </p>
  );
}

type KnobVariant = "dark" | "blue" | "light" | "ghost" | "ghostLight";
const knobStyles: Record<KnobVariant, { root: string; knob: string }> = {
  dark: { root: "bg-ink text-night-foreground hover:bg-primary shadow-[4px_4px_0_0_var(--pixel-deep)]", knob: "bg-surface text-ink" },
  blue: { root: "bg-primary text-primary-foreground hover:bg-primary-deep shadow-[4px_4px_0_0_var(--ink)]", knob: "bg-surface text-primary" },
  light: { root: "bg-surface text-ink hover:bg-blue-soft shadow-[4px_4px_0_0_var(--pixel)]", knob: "bg-ink text-night-foreground" },
  ghost: { root: "border-2 border-ink text-ink hover:bg-surface shadow-[4px_4px_0_0_var(--ink)]", knob: "" },
  ghostLight: { root: "border-2 border-night-foreground text-night-foreground hover:bg-night-2 shadow-[4px_4px_0_0_var(--pixel)]", knob: "" },
};

type KnobProps = {
  variant?: KnobVariant;
  size?: "md" | "sm";
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

function KnobInner({ variant = "dark", size = "md", children, icon }: KnobProps) {
  const s = knobStyles[variant];
  const hasKnob = variant !== "ghost" && variant !== "ghostLight";
  return (
    <>
      <span className={cn("relative z-10", hasKnob ? (size === "sm" ? "pl-4" : "pl-6") : size === "sm" ? "px-4" : "px-6")}>{children}</span>
      {hasKnob && (
        <span className={cn("relative z-10 grid place-items-center transition-transform duration-200 [transition-timing-function:steps(2)] group-hover:translate-x-[3px]", size === "sm" ? "size-8" : "size-10", s.knob)}>
          {icon ?? <ArrowRight className="size-4" strokeWidth={2} />}
        </span>
      )}
    </>
  );
}

const knobRoot = (variant: KnobVariant, size: "md" | "sm", className?: string) =>
  cn(
    "group relative inline-flex items-center gap-3 font-semibold text-[1rem] uppercase tracking-[0.04em] transition-[background-color,transform,box-shadow] duration-100 [transition-timing-function:steps(1)] select-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    size === "sm" ? "h-[42px] pr-[5px]" : "h-[52px] pr-[6px]",
    (variant === "ghost" || variant === "ghostLight") && "pr-0",
    knobStyles[variant].root,
    className,
  );

/** Magnetic wrapper: the element leans slightly toward the pointer. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  if (reduce) return <>{children}</>;
  return (
    <motion.span
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function KnobButton({ variant = "dark", size = "md", className, children, icon, ...rest }: KnobProps & Omit<ComponentProps<"button">, "children">) {
  return (
    <Magnetic>
      <button type="button" className={knobRoot(variant, size, className)} {...rest}>
        <KnobInner variant={variant} size={size} icon={icon}>
          {children}
        </KnobInner>
      </button>
    </Magnetic>
  );
}

export function KnobLink({ variant = "dark", size = "md", className, children, icon, to, href, ...rest }: KnobProps & { to?: string; href?: string; params?: Record<string, string>; search?: Record<string, string>; hash?: string }) {
  const inner = (
    <KnobInner variant={variant} size={size} icon={icon}>
      {children}
    </KnobInner>
  );
  return (
    <Magnetic>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={knobRoot(variant, size, className)}>
          {inner}
        </a>
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Link to={to as any} {...(rest as any)} className={knobRoot(variant, size, className)}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

export function Reveal({ children, delay = 0, className, as = "div", variant = "fade" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" | "article"; variant?: "fade" | "rise" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <M
      className={className}
      initial={variant === "rise" ? { opacity: 0, y: 64, clipPath: "inset(0 0 100% 0)" } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: pixelEase }}
    >
      {children}
    </M>
  );
}

/** Headline whose words rise in one after another. */
export function SplitHeading({ text, className, as = "h2" }: { text: string; className?: string; as?: "h1" | "h2" }) {
  const reduce = useReducedMotion();
  const Tag = as;
  const lines = text.split(" / ");
  if (reduce)
    return (
      <Tag className={className}>
        {lines.map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </Tag>
    );
  let w = 0;
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word, i) => {
            const idx = w++;
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: pixelEase }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

export function SplitHead({ title, text, eyebrow, tone = "ink", className }: { title: string; text?: string; eyebrow?: string; tone?: "ink" | "light"; className?: string }) {
  return (
    <div className={cn("mb-12 grid gap-6 md:mb-16 md:grid-cols-[1.4fr_1fr] md:items-end", className)}>
      <div>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <SplitHeading text={title} className="text-section max-w-[18ch]" />
      </div>
      {text && (
        <Reveal>
          <p className={cn("text-lead md:text-right", tone === "light" ? "text-night-muted" : "text-ink-2")}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}

export function GlassCaption({ icon, children, className }: { icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("glass-caption absolute inset-x-3 bottom-3 flex items-center gap-3 p-3 text-sm", className)}>
      {icon && <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">{icon}</span>}
      <div className="leading-snug">{children}</div>
    </div>
  );
}

export function RoundButton({ children, muted, ...rest }: ComponentProps<"button"> & { muted?: boolean }) {
  return (
    <button
      type="button"
      className={cn("pixel-press grid size-11 place-items-center border-2 border-ink disabled:opacity-40", muted ? "bg-surface text-ink hover:bg-canvas-2" : "bg-ink text-night-foreground hover:bg-primary")}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Small pixel loading indicator. */
export function PixelLoader({ className }: { className?: string }) {
  return (
    <span className={cn("inline-grid grid-cols-3 gap-[2px]", className)} aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="size-[4px] bg-current animate-pixel" style={{ animationDelay: `${(i * 0.17) % 1.2}s` }} />
      ))}
    </span>
  );
}
