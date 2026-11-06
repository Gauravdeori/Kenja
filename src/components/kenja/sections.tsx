import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarCheck, HelpCircle, Mail, MessageSquare, Minus, Plus, Presentation, ShieldCheck } from "lucide-react";
import { clients, company, faqs, img, logo, testimonials, useCases } from "@/data/site";
import { KnobButton, KnobLink, Logo, RoundButton, SplitHeading, pixelEase } from "./primitives";
import { useContact } from "./ContactDialog";
import { PixelField } from "./PixelField";
import { Bento, ImageTile, Tile } from "./bento";
import { cn } from "@/lib/utils";
import type { Post } from "@/data/blog";
import { catSlug, postPath } from "@/data/blog";

/* ---------------- Page hero (inner pages): headline tile + image tile ---------------- */
export function PageHero({ eyebrow, title, lead, actions, image, imageAlt, caption }: { eyebrow: string; title: string; lead: string; actions?: ReactNode; image?: string; imageAlt?: string; caption?: ReactNode }) {
  return (
    <Bento>
      <Tile label={eyebrow} className={cn("min-h-[340px] justify-end sm:col-span-6", image ? "lg:col-span-8" : "lg:col-span-9")}>
        <PixelField density={0.06} />
        <div className="relative mt-auto">
          <SplitHeading as="h1" text={title} className="text-display max-w-[16ch]" />
          <p className="mt-5 max-w-[56ch] text-lead text-ink-2">{lead}</p>
          {actions && <div className="mt-7 flex flex-wrap gap-4">{actions}</div>}
        </div>
      </Tile>
      {image ? (
        <ImageTile src={img(image)} alt={imageAlt ?? ""} caption={caption} delay={0.08} className="min-h-[260px] sm:col-span-6 lg:col-span-4" />
      ) : (
        <Tile tone="green" delay={0.08} className="justify-between gap-8 sm:col-span-6 lg:col-span-3">
          <Logo className="h-8 self-start" />
          <p className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4" /> ISO 27001 certified · NIST CSF 2.0 aligned
          </p>
        </Tile>
      )}
    </Bento>
  );
}

/** Headline sized for a tile. */
export function TileHeading({ text, className, as = "h2" }: { text: string; className?: string; as?: "h1" | "h2" }) {
  return <SplitHeading as={as} text={text} className={cn("text-[clamp(1.9rem,1.3rem+1.9vw,2.9rem)] leading-[1.05]", className)} />;
}

/* ---------------- Rotating words ---------------- */
export function RotatingWords({ words, interval = 2400, className }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className={cn("relative inline-grid overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={words[i]} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: pixelEase }} className="col-start-1 row-start-1">
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---------------- Client logo marquee ---------------- */
function LogoTile({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="mx-1.5 grid h-[72px] w-[160px] shrink-0 place-items-center border-2 border-ink/15 bg-surface px-5">
      <img src={logo(slug)} alt={name} loading="lazy" className="max-h-[40px] max-w-full object-contain opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0" />
    </div>
  );
}
export function ClientMarquee({ rows = 2 }: { rows?: 1 | 2 }) {
  const prod = clients.filter((c) => c.production);
  const other = clients.filter((c) => !c.production);
  const row1 = [...prod, ...other];
  const row2 = [...other.slice(4), ...prod.slice(3), ...other.slice(0, 4), ...prod.slice(0, 3)];
  return (
    <div className="group/m mask-fade-x space-y-3 overflow-hidden" aria-label="Kenja clients">
      {[row1, row2].slice(0, rows).map((row, r) => (
        <div key={r} className="flex w-max animate-marquee group-hover/m:[animation-play-state:paused]" style={{ ["--marquee-dur" as string]: r ? "80s" : "70s", animationDirection: r ? "reverse" : "normal" }} aria-hidden={r === 1}>
          {[...row, ...row].map((c, i) => (
            <LogoTile key={i} slug={c.slug} name={c.name} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-[190px] flex-1">
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: pixelEase }} className="flex h-full flex-col">
            <blockquote className="flex-1 text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="font-pixel grid size-11 shrink-0 place-items-center bg-primary text-[0.7rem] text-primary-foreground">{t.initials}</span>
              <span>
                <span className="block text-sm font-semibold">{t.name}</span>
                <span className="block text-xs text-ink-2">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <RoundButton muted aria-label="Previous testimonial" onClick={() => setI((x) => (x + testimonials.length - 1) % testimonials.length)}>
          <ArrowLeft className="size-4" />
        </RoundButton>
        <RoundButton aria-label="Next testimonial" onClick={() => setI((x) => (x + 1) % testimonials.length)}>
          <ArrowRight className="size-4" />
        </RoundButton>
        <span className="ml-3 flex gap-1.5">
          {testimonials.map((_, k) => (
            <span key={k} className={cn("size-2.5", k === i ? "bg-ink" : "bg-border")} />
          ))}
        </span>
      </div>
    </div>
  );
}

/* ---------------- Use case carousel ---------------- */
export function UseCaseCarousel() {
  const [active, setActive] = useState(1);
  const n = useCases.length;
  return (
    <div>
      <div className="relative h-[480px] overflow-hidden md:h-[540px]" aria-roledescription="carousel">
        {useCases.map((u, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const isActive = off === 0;
          return (
            <motion.article
              key={u.title}
              aria-hidden={!isActive}
              className="absolute left-1/2 top-1/2 h-full w-[min(92%,820px)] overflow-hidden border-4 border-ink"
              animate={{ x: `calc(-50% + ${off * 62}%)`, y: `calc(-50% + ${Math.abs(off) * 6}%)`, scale: isActive ? 1 : 0.82, filter: isActive ? "grayscale(0)" : "grayscale(1)", opacity: Math.abs(off) > 1 ? 0 : isActive ? 1 : 0.55, zIndex: 10 - Math.abs(off) }}
              transition={{ duration: 0.6, ease: pixelEase }}
              onClick={() => !isActive && setActive(i)}
            >
              <img src={img(u.img)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
              <div className="glass-light absolute right-4 top-4 w-[min(78%,300px)] p-4 text-night-foreground">
                <p className="font-pixel text-[0.72rem] uppercase text-pixel">&gt; Ask Kenja</p>
                <p className="mt-1 text-sm font-medium">{u.q}</p>
                <div className="mt-3 h-2 overflow-hidden border border-night-foreground/40 bg-night">
                  <motion.div className="h-full bg-pixel" initial={{ width: "8%" }} animate={{ width: isActive ? "86%" : "8%" }} transition={{ duration: 2.4, ease: (t: number) => Math.floor(t * 12) / 12 }} />
                </div>
                <p className="mt-2 text-[0.75rem] opacity-80">
                  Answering from your files<span className="animate-caret">_</span>
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 text-night-foreground md:flex-row md:items-end md:justify-between md:p-8">
                <div className="max-w-[46ch]">
                  <h3 className="text-3xl md:text-4xl">{u.title}</h3>
                  <p className="mt-2 text-sm text-night-foreground/80 md:text-base">{u.text}</p>
                </div>
                {isActive && (
                  <Link to={u.to} className="pixel-press inline-flex shrink-0 items-center gap-2 bg-surface px-5 py-3 text-sm font-semibold uppercase text-ink hover:bg-pixel">
                    Learn more <ArrowUpRight className="size-4" />
                  </Link>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <RoundButton muted aria-label="Previous use case" onClick={() => setActive((a) => (a + n - 1) % n)}>
          <ArrowLeft className="size-4" />
        </RoundButton>
        <span className="font-pixel min-w-[7ch] text-center text-[0.72rem]">
          {active + 1} / {n}
        </span>
        <RoundButton aria-label="Next use case" onClick={() => setActive((a) => (a + 1) % n)}>
          <ArrowRight className="size-4" />
        </RoundButton>
      </div>
    </div>
  );
}

/** Use cases as a full-width bento row. */
export function UseCasesBento({ id = "use-cases" }: { id?: string }) {
  return (
    <Bento id={id} label="Use cases">
      <Tile label="Made for every team" icon={Presentation} tone="muted" className="sm:col-span-6 lg:col-span-12" bleed>
        <div className="grid gap-4 px-5 pb-6 pt-16 md:grid-cols-[1.4fr_1fr] md:items-end md:px-8">
          <TileHeading text="Made for Every Team / and Every Workflow" className="max-w-[18ch]" />
          <p className="text-ink-2 md:text-right">Kenja works from the documents each team already has. Here is what that looks like in six common jobs.</p>
        </div>
        <div className="pb-6">
          <UseCaseCarousel />
        </div>
      </Tile>
    </Bento>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQSection() {
  const [open, setOpen] = useState(0);
  const { open: openContact } = useContact();
  return (
    <Bento id="faq" label="FAQ">
      <Tile tone="blue" label="Help" icon={HelpCircle} className="justify-between gap-8 sm:col-span-6 lg:col-span-4">
        <TileHeading text="Frequently Asked / Questions" />
        <p className="text-primary-foreground/85">
          Can't find your answer?{" "}
          <button onClick={() => openContact()} className="font-semibold underline decoration-2 underline-offset-4">
            Ask our team.
          </button>
        </p>
      </Tile>
      <Tile bleed className="divide-y-2 divide-dashed divide-border p-2 sm:col-span-6 lg:col-span-8">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="px-4">
              <h3>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center gap-4 py-5 text-left text-lg font-semibold">
                  <span className="grid size-7 shrink-0 place-items-center border-2 border-ink bg-surface text-ink">{isOpen ? <Minus className="size-3.5" strokeWidth={3} /> : <Plus className="size-3.5" strokeWidth={3} />}</span>
                  {f.q}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: pixelEase }} className="overflow-hidden">
                    <p className="pb-5 pl-11 text-ink-2">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Tile>
    </Bento>
  );
}

/* ---------------- Get in touch ---------------- */
const stripTiles = [
  { n: "glass-panels", w: true },
  { n: "person-tablet" },
  { n: "uc-rfp", w: true },
  { n: "glass-cube" },
  { n: "server-room", w: true },
  { n: "glass-shield" },
  { n: "uc-customer-service", w: true },
  { n: "green-triangle" },
  { n: "uc-training", w: true },
];
const phrases = ["Secure AI.", "Accurate answers.", "Your own content."];

function CyclingHeadline() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % phrases.length), 3600);
    return () => clearInterval(t);
  }, []);
  return (
    <h2 className="min-h-[2.1em] text-[clamp(2.2rem,1.4rem+3vw,4.2rem)] leading-none" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span key={i} className="inline-block">
          {(phrases[i] ?? "").split("").map((ch, k) => (
            <motion.span
              key={k}
              className="inline-block whitespace-pre"
              initial={{ opacity: 0, color: "var(--primary)" }}
              animate={{ opacity: 1, color: ["var(--primary)", "var(--pixel-deep)", "var(--ink)"] }}
              exit={{ opacity: 0, transition: { duration: 0.01, delay: k * 0.015 } }}
              transition={{ opacity: { duration: 0.01, delay: k * 0.045 }, color: { duration: 0.6, delay: k * 0.045, ease: pixelEase } }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </h2>
  );
}

export function GetInTouch() {
  const { open } = useContact();
  return (
    <Bento id="get-in-touch" label="Get in touch">
      <Tile label="Talk to our team" icon={MessageSquare} className="min-h-[340px] justify-end sm:col-span-6 lg:col-span-8 lg:row-span-2">
        <PixelField density={0.1} />
        <div className="relative">
          <CyclingHeadline />
          <p className="mt-2 max-w-[48ch] text-ink-2">Tell us what your teams need to find, write or answer, and we will show you how Kenja can help.</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <KnobButton variant="blue" onClick={() => open()}>
              Get in Touch
            </KnobButton>
            <KnobLink to="/solutions" variant="ghost">
              How It Works
            </KnobLink>
          </div>
        </div>
      </Tile>
      <Tile tone="dark" label="Direct line" icon={Mail} delay={0.06} className="sm:col-span-3 lg:col-span-4">
        <a href={`mailto:${company.email}`} className="text-xl font-semibold hover:text-pixel">{company.email}</a>
        <a href={company.phoneHref} className="mt-1 text-night-muted hover:text-pixel">{company.phone}</a>
        <Link to="/contact" className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-pixel hover:underline">
          Contact page <ArrowRight className="size-4" />
        </Link>
      </Tile>
      <Tile tone="green" label="Demo" icon={CalendarCheck} delay={0.12} className="sm:col-span-3 lg:col-span-4">
        <p className="text-xl font-semibold leading-snug">See Kenja answer from your own documents.</p>
        <div className="mt-auto pt-5">
          <KnobButton size="sm" onClick={() => open("I would like to book a demo of Kenja.")}>
            Book a Demo
          </KnobButton>
        </div>
      </Tile>
      <Tile bleed tone="muted" className="py-4 sm:col-span-6 lg:col-span-12">
        <div className="mask-fade-x overflow-hidden" aria-hidden>
          <div className="flex w-max animate-marquee gap-3" style={{ ["--marquee-dur" as string]: "70s" }}>
            {[...stripTiles, ...stripTiles].map((t, i) => (
              <img key={i} src={img(t.n)} alt="" loading="lazy" className={cn("h-[150px] shrink-0 border-2 border-ink object-cover md:h-[180px]", t.w ? "w-[270px] md:w-[320px]" : "w-[150px] md:w-[180px]")} />
            ))}
          </div>
        </div>
      </Tile>
    </Bento>
  );
}

/* ---------------- Blog card ---------------- */
export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const crops = ["center", "top", "bottom", "left", "right"];
  return (
    <Link to="/$year/$month/$day/$slug" params={postPath(post)} className="group flex h-full flex-col overflow-hidden border-2 border-ink bg-surface shadow-[4px_4px_0_0_var(--ink)] transition-[translate,box-shadow] duration-100 [transition-timing-function:steps(1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--primary)]">
      <div className="relative aspect-video overflow-hidden border-b-2 border-ink">
        <img src={img(post.image)} alt="" loading="lazy" style={{ objectPosition: crops[index % crops.length] }} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-pixel text-[0.72rem] uppercase text-primary">{post.categories.join(" · ") || "News"}</p>
        <h3 className="mt-2 text-lg leading-snug">{post.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-5 text-sm text-ink-2">
          <span>{post.date}</span>
          <span className="grid size-9 place-items-center border-2 border-ink bg-surface group-hover:translate-x-[3px] group-hover:bg-ink group-hover:text-night-foreground">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CategoryLinks({ cats }: { cats: string[] }) {
  return (
    <>
      {cats.map((c, i) => (
        <span key={c}>
          {i > 0 && " · "}
          <Link to="/blog" search={{ category: catSlug(c) }} className="hover:underline">
            {c}
          </Link>
        </span>
      ))}
    </>
  );
}

/* ---------------- Steps as tiles (render inside a <Bento>) ---------------- */
const stepSpan = { 3: "sm:col-span-3 lg:col-span-4", 4: "sm:col-span-3 lg:col-span-3" } as const;
export function StepTiles({ steps, perRow = 3 }: { steps: { title: string; text: string }[]; perRow?: 3 | 4 }) {
  return (
    <>
      {steps.map((s, i) => (
        <Tile key={s.title} as="article" delay={i * 0.05} className={cn("group gap-2 hover:bg-ink hover:text-night-foreground", stepSpan[perRow])}>
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[0.72rem] text-primary group-hover:text-pixel">
              STEP {String(i + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
            </span>
            <span aria-hidden className="text-3xl font-semibold leading-none text-ink/15 group-hover:text-night-foreground/25">
              {i + 1}
            </span>
          </div>
          <h3 className="mt-4 text-xl">{s.title}</h3>
          <p className="text-sm text-ink-2 group-hover:text-night-muted">{s.text}</p>
          <div aria-hidden className="mt-auto pt-4">
            <div className="h-2 border border-ink bg-surface">
              <div className="h-full bg-primary group-hover:bg-pixel" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        </Tile>
      ))}
    </>
  );
}
