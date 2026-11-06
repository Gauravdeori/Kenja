import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, Cpu, Layers, Lock, Play, Shield, SlidersHorizontal, Sparkles, Users } from "lucide-react";
import { clients, company, img, logo, tedCareer } from "@/data/site";
import { posts } from "@/data/blog";
import { KnobButton, KnobLink, SplitHeading } from "@/components/kenja/primitives";
import { ClientMarquee, GetInTouch, PostCard, RotatingWords, Testimonials, TileHeading, UseCasesBento } from "@/components/kenja/sections";
import { PixelField } from "@/components/kenja/PixelField";
import { useContact } from "@/components/kenja/ContactDialog";
import { Bento, ImageTile, Page, StatTile, Tile } from "@/components/kenja/bento";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenja | Secure AI for enterprise knowledge" },
      { name: "description", content: "Kenja builds secure, accurate AI for enterprises. Our retrieval augmented generation platform answers from your own documents, with access control on every file." },
      { property: "og:title", content: "Kenja | Secure AI for enterprise knowledge" },
      { property: "og:description", content: "Secure AI that knows your business, with access control on every file." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Kenja K.K.",
          url: "https://kenja.com",
          email: company.email,
          telephone: company.phone,
          address: { "@type": "PostalAddress", streetAddress: "Moto Akasaka Building 9F, 1-7-10 Moto Akasaka", addressLocality: "Minato-ku, Tokyo", addressCountry: "JP" },
        }),
      },
    ],
  }),
  component: Home,
});

const prod = clients.filter((c) => c.production);

function Home() {
  return (
    <Page>
      <Hero />
      <Security />
      <Features />
      <Rooms />
      <UseCasesBento />
      <Clients />
      <Leadership />
      <News />
      <GetInTouch />
    </Page>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { open } = useContact();
  return (
    <Bento>
      <Tile label="ISO 27001 certified · NIST CSF 2.0 aligned" icon={Shield} className="min-h-[440px] justify-end sm:col-span-6 lg:col-span-8 lg:row-span-2">
        <PixelField density={0.08} />
        <div className="relative">
          <SplitHeading as="h1" text="Secure AI That / Knows Your Business" className="text-display max-w-[14ch]" />
          <p className="mt-5 max-w-[46ch] text-lead text-ink-2">Kenja turns your company's documents into a private AI expert, with access control on every file.</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <KnobButton onClick={() => open("I would like to book a demo of Kenja.")}>Book a Demo</KnobButton>
            <KnobLink to="/solutions" variant="ghost">How It Works</KnobLink>
          </div>
        </div>
      </Tile>

      <Tile tone="muted" delay={0.06} className="items-center justify-center sm:col-span-3 lg:col-span-4">
        <div className="animate-float">
          <img src={img("hero-cube")} alt="A glass cube holding a stack of softly glowing glass pages" className="mx-auto w-full max-w-[230px] mix-blend-multiply [mask-image:radial-gradient(circle,black_52%,transparent_70%)]" fetchPriority="high" />
        </div>
        <div className="animate-shadow mx-auto -mt-3 h-3 w-1/2 bg-ink/40" />
      </Tile>

      <Tile bleed tone="image" delay={0.12} className="group min-h-[220px] sm:col-span-3 lg:col-span-4">
        <a href={company.tedxUrl} target="_blank" rel="noreferrer" className="flex h-full flex-col">
          <img src={img("ted-tedx")} alt="Ted Katagi speaking on stage at TEDxTokyo Salon" className="absolute inset-0 h-full w-full object-cover" />
          <span className="relative grid flex-1 place-items-center">
            <span className="grid size-14 place-items-center border-2 border-ink bg-surface text-ink shadow-[4px_4px_0_0_var(--ink)] group-hover:bg-pixel">
              <Play className="ml-0.5 size-5 fill-current" />
            </span>
          </span>
          <span className="relative border-t-2 border-ink bg-night/90 p-3 text-sm">Watch our CEO Ted Katagi speak at TEDxTokyo Salon ↗</span>
        </a>
      </Tile>

      <StatTile value="13 yrs" text="serving enterprise customers in Japan" className="sm:col-span-3 lg:col-span-3" />
      <StatTile tone="blue" value="90%+" text="answer accuracy with Kenja Filtered Retrieval and CARG" delay={0.05} className="sm:col-span-3 lg:col-span-3" />
      <StatTile tone="green" value={prod.length} text="enterprises running Kenja in production" delay={0.1} className="sm:col-span-3 lg:col-span-3" />
      <Tile tone="dark" delay={0.15} className="justify-between gap-4 sm:col-span-3 lg:col-span-3">
        <div className="flex -space-x-2">
          {prod.slice(0, 4).map((c) => (
            <span key={c.slug} className="grid size-11 place-items-center overflow-hidden border-2 border-ink bg-surface p-1.5">
              <img src={logo(c.slug)} alt={c.name} className="max-h-full object-contain" />
            </span>
          ))}
        </div>
        <p className="text-sm text-night-muted">In production at NTT Docomo Business, Morgan Stanley, Robert Walters and Dale Carnegie.</p>
      </Tile>

      <Tile bleed tone="light" className="py-4 sm:col-span-6 lg:col-span-12">
        <ClientMarquee rows={1} />
      </Tile>
    </Bento>
  );
}

/* ---------------- Security ---------------- */
function Security() {
  return (
    <Bento id="security" label="Security">
      <Tile tone="dark" label="Trusted and secure" icon={Shield} className="justify-between gap-8 sm:col-span-6 lg:col-span-5 lg:row-span-2">
        <div className="pixel-grid-dark pointer-events-none absolute inset-0" />
        <TileHeading text="Trusted and Secure / Enterprise AI" className="relative" />
        <p className="relative text-lead text-night-muted">Vetted by a top 3 investment bank, ISO 27001 certified and aligned with the NIST Cybersecurity Framework 2.0.</p>
      </Tile>
      <ImageTile src={img("glass-shield")} alt="A glass shield with a soft blue glow" delay={0.05} className="min-h-[300px] sm:col-span-3 lg:col-span-4 lg:row-span-2" caption="Enterprise grade security, reviewed and approved by a top 3 investment bank." />
      <ImageTile src={img("server-room")} alt="A bright server room with white racks behind smoked glass doors" delay={0.1} className="sm:col-span-3 lg:col-span-3" caption="On premises, cloud or hybrid cloud." />
      <Tile tone="blue" delay={0.15} className="justify-between gap-6 sm:col-span-3 lg:col-span-3">
        <PixelField density={0.12} interactive={false} className="opacity-50" />
        <Award className="relative size-8" />
        <p className="relative text-3xl font-semibold leading-tight">
          ISO 27001
          <span className="block text-base font-medium opacity-80">certified</span>
        </p>
      </Tile>
      <ImageTile src={img("person-tablet")} alt="A manager in Tokyo reading answers from Kenja on a tablet" delay={0.05} className="sm:col-span-3 lg:col-span-6" caption={<><span className="font-semibold">Your Content, Your Control.</span> Decide who can see each document, by department, team or single user.</>} />
      <Tile tone="green" label="Access control" icon={Lock} delay={0.1} className="justify-end sm:col-span-6 lg:col-span-6">
        <p className="text-2xl font-semibold leading-snug">Every answer comes only from documents the person asking is allowed to see.</p>
      </Tile>
    </Bento>
  );
}

/* ---------------- Features ---------------- */
const features = [
  { icon: Lock, title: "Access control on every file", text: "Our Access Control Layer decides who sees what, by department, team or user.", tone: "light" as const },
  { icon: SlidersHorizontal, title: "Kenja Filtered Retrieval", text: "A second filtering step keeps only the passages that answer the question.", tone: "muted" as const },
  { icon: Layers, title: "Output the way you want it", text: "Documents in your own templates and language, or answers in your website and chatbot.", tone: "muted" as const },
  { icon: Cpu, title: "Your choice of model", text: "Pick the language model you trust. Source code escrow is available.", tone: "light" as const },
];

function Features() {
  return (
    <Bento id="features" label="Features">
      <ImageTile src={img("glass-panels")} alt="" className="min-h-[360px] sm:col-span-6 lg:col-span-6 lg:row-span-2">
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/40 to-transparent" />
        <div className="relative mt-auto p-6 md:p-8">
          <TileHeading text="Built for Accuracy / and Control" />
          <p className="mt-4 max-w-[46ch] text-night-foreground/85">Kenja adds its own retrieval technology to standard RAG, so every answer comes from the documents each person is allowed to see.</p>
        </div>
      </ImageTile>
      {features.map((f, i) => (
        <Tile key={f.title} tone={f.tone} delay={i * 0.05} className="group gap-3 sm:col-span-3 lg:col-span-3">
          <span className="grid size-11 place-items-center border-2 border-ink bg-pixel text-ink group-hover:bg-primary group-hover:text-primary-foreground">
            <f.icon className="size-5" />
          </span>
          <h3 className="mt-3 text-xl">{f.title}</h3>
          <p className="text-sm text-ink-2">{f.text}</p>
        </Tile>
      ))}
    </Bento>
  );
}

/* ---------------- Kenja Rooms ---------------- */
function Rooms() {
  return (
    <Bento id="rooms" label="Kenja Rooms">
      <Tile label="Your secure workspace for AI" icon={Users} className="justify-between gap-6 sm:col-span-6 lg:col-span-7">
        <TileHeading text="Kenja Rooms. Your Secure / Workspace for AI" className="max-w-[18ch]" />
        <div>
          <p className="max-w-[56ch] text-ink-2">Create a Room, upload your files and train a private corpus. Within minutes your team can ask questions and get answers from its own content, with the sources shown.</p>
          <div className="mt-6">
            <KnobLink to="/products">See Kenja Rooms</KnobLink>
          </div>
        </div>
      </Tile>
      <Tile tone="dark" delay={0.05} className="justify-end sm:col-span-3 lg:col-span-5">
        <p className="text-[clamp(2.4rem,1.6rem+2.4vw,3.6rem)] font-semibold leading-none">
          <span className="text-pixel">→ </span>
          <RotatingWords words={["Secure", "Accurate", "Yours"]} />
        </p>
        <p className="mt-4 text-sm text-night-muted">Every Room keeps its own access rules, and Kenja AI answers only from the content that Room holds.</p>
      </Tile>
      <ImageTile src={img("glass-cube")} alt="A glass cube holding a stack of softly glowing glass pages" delay={0.05} className="sm:col-span-3 lg:col-span-4" />
      <Tile label="What customers say" icon={Sparkles} tone="light" delay={0.1} className="sm:col-span-6 lg:col-span-8">
        <Testimonials />
      </Tile>
      <ImageTile src={img("green-triangle")} alt="A green glass triangle on a light oak desk beside a white cup and a stack of paper" delay={0.1} className="sm:col-span-3 lg:col-span-4" />
      <Tile tone="muted" delay={0.15} className="justify-center sm:col-span-3 lg:col-span-8">
        <p className="text-ink-2">Kenja Rooms is where your teams share files, comment, assign tasks and publish results.</p>
      </Tile>
    </Bento>
  );
}

/* ---------------- Clients ---------------- */
function Clients() {
  return (
    <Bento id="clients" label="In production">
      <Tile tone="blue" label="Clients" icon={Building2} className="justify-between gap-6 sm:col-span-6 lg:col-span-6">
        <TileHeading text="Enterprise Teams / Run on Kenja" />
        <p className="text-primary-foreground/85">For 13 years, Kenja has served enterprise customers in Japan. These organizations use Kenja in production today.</p>
      </Tile>
      {prod.map((c, i) => (
        <Tile key={c.slug} as="article" delay={i * 0.04} className="gap-2 sm:col-span-3 lg:col-span-3">
          <div className="flex h-12 items-center">
            <img src={logo(c.slug)} alt="" loading="lazy" className="max-h-10 max-w-[140px] object-contain" />
          </div>
          <h3 className="mt-2 text-lg">{c.name}</h3>
          <p className="text-sm text-ink-2">{c.note}</p>
        </Tile>
      ))}
    </Bento>
  );
}

/* ---------------- Leadership ---------------- */
function Leadership() {
  return (
    <Bento id="leadership" label="Leadership">
      <ImageTile src={img("ted-katagi")} alt="Portrait of Ted Katagi, Founder and CEO of Kenja" className="min-h-[380px] sm:col-span-3 lg:col-span-4 lg:row-span-2" caption={<><span className="font-semibold">Ted Katagi</span> · Founder and CEO</>} />
      <Tile label="Founder and CEO" delay={0.05} className="justify-between gap-6 sm:col-span-3 lg:col-span-8">
        <TileHeading text="Led by Ted Katagi" />
        <p className="max-w-[60ch] text-ink-2">Ted Katagi founded Kenja and serves as its Chief Executive Officer. Kenja provides an AI enabled collaboration platform for enterprise customers.</p>
        <div className="flex flex-wrap gap-4">
          <KnobLink to="/about">About Kenja</KnobLink>
          <KnobLink href={company.tedxUrl} variant="light" icon={<Play className="ml-0.5 size-3.5 fill-current" />}>
            Watch his TEDx talk
          </KnobLink>
        </div>
      </Tile>
      {tedCareer.slice(0, 4).map((c, i) => (
        <Tile key={c.role} tone={i % 2 ? "muted" : "light"} delay={0.05 + i * 0.04} className="gap-1 sm:col-span-3 lg:col-span-2">
          <p className="text-xs text-ink-2">{c.role}</p>
          <p className="font-semibold leading-snug">{c.org}</p>
        </Tile>
      ))}
    </Bento>
  );
}

/* ---------------- News ---------------- */
function News() {
  const latest = posts.filter((p) => !p.title.startsWith("Conversations")).slice(0, 3);
  return (
    <Bento id="news" label="News and events">
      <Tile tone="green" className="justify-between gap-6 sm:col-span-6 lg:col-span-3">
        <TileHeading text="News and Events" />
        <Link to="/blog" className="inline-flex items-center gap-2 self-start border-2 border-ink bg-surface px-4 py-2 text-sm font-semibold shadow-[3px_3px_0_0_var(--ink)] hover:bg-ink hover:text-night-foreground">
          All posts <ArrowRight className="size-4" />
        </Link>
      </Tile>
      {latest.map((p, i) => (
        <div key={p.slug} className="sm:col-span-3 lg:col-span-3">
          <PostCard post={p} index={i} />
        </div>
      ))}
    </Bento>
  );
}
