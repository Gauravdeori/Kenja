import { createFileRoute } from "@tanstack/react-router";
import { Lock, Target, SlidersHorizontal, Shield, Hand, Layers, Wand2, Handshake, Star } from "lucide-react";
import { KnobButton, KnobLink } from "@/components/kenja/primitives";
import { FAQSection, GetInTouch, PageHero, StepTiles, TileHeading, UseCasesBento } from "@/components/kenja/sections";
import { Bento, ImageTile, Page, Tile } from "@/components/kenja/bento";
import { useContact } from "@/components/kenja/ContactDialog";
import { img } from "@/data/site";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions | Kenja" },
      { name: "description", content: "See how Kenja works: create a Room, share it, upload your content, train a private corpus and ask questions. Six reasons enterprises choose Kenja as their AI partner." },
      { property: "og:title", content: "Solutions | Kenja" },
      { property: "og:description", content: "Your own enterprise AI, ready in minutes. How Kenja works in five steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Solutions,
});

const steps = [
  { title: "Create a Room", text: "Create your Room, then add tiles to start working with your team. Shape the layout around the way your team already works." },
  { title: "Share your Room", text: "Our Access Control Layer gives you control over when, what and who can see your data. Share by department, team or single user." },
  { title: "Upload your content", text: "Drag and drop your documents into the Room." },
  { title: "Train your corpus", text: "Select some or all of the content in your Room to train a private corpus that answers only from what you uploaded." },
  { title: "Ask away", text: "Open a chat with Kenja AI and ask questions about your content. Answers come with their sources." },
];
const consulting = [
  { title: "Find the value", text: "We look at your teams and documents with you and pick the places where AI will help most." },
  { title: "Deploy", text: "We set up your expert system inside the workflows and tools your people already use." },
  { title: "Improve", text: "We keep tuning prompts, corpora and access rules as your needs change." },
];
const reasons = [
  { icon: Lock, title: "Confidentiality", text: "Create one corpus per department, project or team, so sensitive information is never open to the whole company. Access is controlled down to a single user." },
  { icon: Target, title: "Accuracy", text: "Kenja Filtered Retrieval (KFR) adds a second filtering step to standard RAG. It reads every uploaded document and keeps only the passages that answer the question." },
  { icon: SlidersHorizontal, title: "Control", text: "Choose which large language model to use. Our source code can be held in escrow, and blockchain certified access logs show that your data stays yours." },
  { icon: Shield, title: "Security", text: "A 13 year record with enterprise customers and their security reviews. Kenja follows NIST Cybersecurity Framework 2.0 and CIS controls, and is vetted by a top 3 investment bank." },
  { icon: Hand, title: "Ease of use", text: "Drag and drop your files and set up your own RAG in minutes. No technical background needed." },
  { icon: Layers, title: "Flexibility", text: "Connect Kenja to your internal systems and choose where it runs: on premises, in the cloud or in a hybrid cloud." },
];

function Solutions() {
  const { open } = useContact();
  return (
    <Page>
      <PageHero
        eyebrow="Solutions"
        title="Your Own Enterprise AI, / Ready in Minutes"
        lead="Kenja Rooms and Kenja AI give every team a private expert system that answers only from the documents it is allowed to see."
        actions={
          <>
            <KnobButton onClick={() => open("I would like to book a demo of Kenja.")}>Book a Demo</KnobButton>
            <KnobLink to="/products" variant="ghost">See Plans</KnobLink>
          </>
        }
        image="uc-training"
        imageAlt="A bright Tokyo office meeting room with a large screen and a long wooden table"
      />

      <Bento id="how-it-works" label="How it works">
        <Tile tone="blue" label="Setup" icon={Wand2} className="justify-between gap-6 sm:col-span-6 lg:col-span-4">
          <TileHeading text="Five Steps to / Your Own AI" />
          <p className="text-primary-foreground/85">Setting up takes five steps, and no technical background is needed.</p>
        </Tile>
        <StepTiles steps={steps} />
      </Bento>

      <Bento id="consulting" label="Consulting">
        <Tile tone="dark" label="A partner at every stage" icon={Handshake} className="gap-5 sm:col-span-6 lg:col-span-7">
          <div className="pixel-grid-dark pointer-events-none absolute inset-0" />
          <TileHeading text="A Partner at Every Stage / of Your AI Project" className="relative" />
          <p className="relative text-night-muted">In many organizations, valuable knowledge sits unused inside different departments and systems. We help you find where AI can add the most value, then support the deployment and keep improving it with you.</p>
        </Tile>
        <ImageTile src={img("server-room")} alt="A bright server room with white racks behind smoked glass doors" className="min-h-[320px] sm:col-span-6 lg:col-span-5 lg:row-span-4" caption="On premises, cloud or hybrid cloud. You choose where Kenja runs." />
        {consulting.map((c, i) => (
          <Tile key={c.title} tone={i === 1 ? "green" : "muted"} delay={i * 0.05} className="gap-2 sm:col-span-2 lg:col-span-7 lg:flex-row lg:items-baseline lg:gap-6">
            <span className="font-pixel text-[0.72rem] text-primary">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{c.text}</p>
            </div>
          </Tile>
        ))}
      </Bento>

      <Bento id="why-kenja" label="Why Kenja">
        <Tile tone="green" label="Six reasons" icon={Star} className="justify-between gap-6 sm:col-span-6 lg:col-span-6">
          <TileHeading text="Why Choose Kenja as / Your AI Partner?" />
          <p>These reasons come from 13 years of work with enterprise customers in Japan.</p>
        </Tile>
        {reasons.map((r, i) => (
          <Tile key={r.title} tone={i % 3 === 1 ? "muted" : "light"} delay={i * 0.04} className="group gap-3 sm:col-span-3 lg:col-span-3">
            <span className="grid size-11 place-items-center border-2 border-ink bg-pixel text-ink group-hover:bg-primary group-hover:text-primary-foreground">
              <r.icon className="size-5" />
            </span>
            <h3 className="mt-3 text-xl">{r.title}</h3>
            <p className="text-sm text-ink-2">{r.text}</p>
          </Tile>
        ))}
      </Bento>

      <UseCasesBento id="usecases" />
      <FAQSection />
      <GetInTouch />
    </Page>
  );
}
