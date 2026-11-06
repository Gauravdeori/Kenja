import { createFileRoute } from "@tanstack/react-router";
import { Check, Building2, Cloud, Layers, Package, Settings, Table, Gift } from "lucide-react";
import { KnobButton } from "@/components/kenja/primitives";
import { GetInTouch, PageHero, TileHeading } from "@/components/kenja/sections";
import { Bento, Page, Tile } from "@/components/kenja/bento";
import { PixelField } from "@/components/kenja/PixelField";
import { useContact } from "@/components/kenja/ContactDialog";
import { img } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | Kenja" },
      { name: "description", content: "Kenja's Standard and Enterprise plans: Kenja Rooms, retrieval augmented generation AI, private corpora and enterprise grade security, on premises, in the cloud or hybrid." },
      { property: "og:title", content: "Products | Kenja" },
      { property: "og:description", content: "Plans for teams of every size: Standard and Enterprise." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

const plans = [
  {
    name: "Standard",
    tag: "AI beyond the GPT model",
    title: "A sandbox for small and medium businesses",
    text: "Set up a RAG enabled expert system in minutes and try AI on your own documents. Upload your files to Kenja Rooms, press Train and start asking questions. Our instant retrieval finds the documents that matter most for each question.",
    items: ["Kenja Rooms with task collaboration", "Kenja retrieval augmented generation AI", "Several private corpora per organization", "Enterprise grade security", "5 GB of storage per user", "Up to 10 users"],
    message: "I would like to know more about the Standard plan.",
    dark: false,
  },
  {
    name: "Enterprise",
    tag: "Built around your processes",
    title: "A secure, accurate expert system made for you",
    text: "For enterprises that want AI as part of their core processes. We combine large language models, retrieval augmented generation and blockchain, and add tailored solutions and consulting.",
    items: ["Full access to Kenja Rooms and our services", "Advanced AI features", "Advanced security options for your regulations", "Integration with your internal systems"],
    message: "I would like to know more about the Enterprise plan.",
    dark: true,
  },
];

const pillars = [
  { title: "Your Content, Your Control", img: "person-tablet", alt: "A manager in Tokyo reading answers from Kenja on a tablet", text: "Your content is where your expertise lives, so it stays yours. Our Access Control Layer decides when and who can reach each document, and separate corpora keep answers focused." },
  { title: "Secure and Accurate AI", img: "glass-shield", alt: "A glass shield with a soft blue glow", text: "ISO 27001 certified and aligned with NIST Cybersecurity Framework 2.0. Kenja Filtered Retrieval and Contextual Agent Retrieval Generation give answers over 90% accurate." },
  { title: "Output the Way You Want It", img: "glass-cube", alt: "A glass cube holding a stack of softly glowing glass pages", text: "Connect Kenja to your website or chatbot, or have it write documents from your own templates in your preferred language." },
];

const deploy = [
  { icon: Building2, title: "On premises", text: "Kenja runs inside your own data center, for the strictest security reviews." },
  { icon: Cloud, title: "Cloud", text: "The quickest way to start, with the same access rules on every Room." },
  { icon: Layers, title: "Hybrid cloud", text: "Keep sensitive content on premises and run the rest in the cloud." },
];

const compare = [
  ["Kenja Rooms", "With task collaboration", "Full access, plus our services"],
  ["Retrieval augmented generation AI", "Included", "Advanced AI features"],
  ["Private corpora", "Several per organization", "Tailored to your processes"],
  ["Security", "Enterprise grade", "Advanced options for your regulations"],
  ["Storage", "5 GB per user", "Tailored"],
  ["Users", "Up to 10", "Tailored"],
  ["Internal system integration", "—", "Included"],
];

function Products() {
  const { open } = useContact();
  return (
    <Page>
      <PageHero eyebrow="Products" title="Plans for Teams / of Every Size" lead="Start with the Standard plan and try AI on your own documents, or work with us on an Enterprise system built around your processes." image="glass-panels" imageAlt="Frosted glass panels on a stone ledge, with a beam of light passing through them" />

      <Bento id="plans" label="Plans">
        {plans.map((p, i) => (
          <Tile key={p.name} as="article" tone={p.dark ? "dark" : "light"} label={`${p.name} plan`} icon={Package} delay={i * 0.06} className="sm:col-span-6 lg:col-span-6">
            {p.dark && <PixelField density={0.07} className="opacity-60" />}
            <div className="relative flex flex-1 flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-3xl">{p.name}</h2>
                <span className={cn("border-2 px-3 py-1 text-xs font-semibold", p.dark ? "border-pixel bg-pixel text-ink" : "border-ink bg-blue-soft text-primary")}>{p.tag}</span>
              </div>
              <p className="mt-6 text-2xl font-semibold leading-tight md:text-3xl">{p.title}</p>
              <p className={cn("mt-4", p.dark ? "text-night-muted" : "text-ink-2")}>{p.text}</p>
              <p className="font-pixel mt-8 text-[0.72rem] uppercase">What is included</p>
              <ul className="mt-4 flex-1 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center border-2", p.dark ? "border-pixel bg-pixel text-ink" : "border-ink bg-primary text-primary-foreground")}>
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <KnobButton variant={p.dark ? "light" : "dark"} onClick={() => open(p.message)}>
                  Contact Us
                </KnobButton>
              </div>
            </div>
          </Tile>
        ))}
        <Tile bleed label="Compare plans" icon={Table} className="overflow-x-auto pt-14 sm:col-span-6 lg:col-span-12">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Plan comparison</caption>
            <thead>
              <tr className="border-y-2 border-ink bg-canvas-2 text-xs uppercase">
                <th className="p-4 font-semibold">Feature</th>
                <th className="p-4 font-semibold">Standard</th>
                <th className="p-4 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((r) => (
                <tr key={r[0]} className="border-t-2 border-dashed border-border hover:bg-blue-soft">
                  <th className="p-4 font-medium">{r[0]}</th>
                  <td className="p-4 text-ink-2">{r[1]}</td>
                  <td className="p-4 text-ink-2">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tile>
      </Bento>

      <Bento id="what-you-get" label="What you get">
        <Tile tone="blue" label="For your teams" icon={Gift} className="justify-between gap-6 sm:col-span-6 lg:col-span-3">
          <TileHeading text="What Kenja Gives / Your Teams" />
          <p className="text-primary-foreground/85">Kenja Rooms keeps your content organized and shared safely. Kenja AI answers from it.</p>
        </Tile>
        {pillars.map((p, i) => (
          <Tile key={p.title} bleed delay={i * 0.06} className="sm:col-span-2 lg:col-span-3">
            <div className="aspect-[4/3] overflow-hidden border-b-2 border-ink">
              <img src={img(p.img)} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-2">{p.text}</p>
            </div>
          </Tile>
        ))}
      </Bento>

      <Bento id="deployment" label="Deployment">
        <Tile tone="dark" label="Deployment" icon={Settings} className="justify-end sm:col-span-6 lg:col-span-3">
          <TileHeading text="Run Kenja Where / You Need It" />
        </Tile>
        {deploy.map((d, i) => (
          <Tile key={d.title} tone={i === 1 ? "green" : "muted"} delay={i * 0.06} className="sm:col-span-2 lg:col-span-3">
            <span className="grid size-11 place-items-center bg-ink text-pixel">
              <d.icon className="size-5" />
            </span>
            <h3 className="mt-8 text-xl">{d.title}</h3>
            <p className="mt-2 text-sm text-ink-2">{d.text}</p>
          </Tile>
        ))}
      </Bento>

      <GetInTouch />
    </Page>
  );
}
