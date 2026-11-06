import { createFileRoute } from "@tanstack/react-router";
import { FileText, Database, MessageSquare, LayoutGrid, Lock, ShieldCheck, ListChecks, Wand2 } from "lucide-react";
import { KnobButton } from "@/components/kenja/primitives";
import { GetInTouch, PageHero, StepTiles, TileHeading } from "@/components/kenja/sections";
import { Bento, Page, StatTile, Tile } from "@/components/kenja/bento";
import { useContact } from "@/components/kenja/ContactDialog";

export const Route = createFileRoute("/rfp-management")({
  head: () => ({
    meta: [
      { title: "RFP Management | Kenja" },
      { name: "description", content: "Write RFP responses faster with Kenja: expert corpora, AI first drafts, live comments, reusable templates and enterprise grade access control." },
      { property: "og:title", content: "RFP Management | Kenja" },
      { property: "og:description", content: "Streamline, collaborate and customize your RFPs with Kenja." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rfp,
});

const steps = [
  { title: "Receive the RFP", text: "Your team receives the RFP template from the purchasing department." },
  { title: "Assign and retrieve", text: "Assign each expert to their sections with tasks. Fixed text in the template stays as it is, and the rest is filled from the experts' corpora." },
  { title: "Expert corpora", text: "Each expert keeps a corpus of their own documents. An archive Room of past RFPs saves your team from writing the same answers again." },
  { title: "First draft", text: "Kenja's document generation writes a first draft of the response, using only the most relevant documents in each corpus." },
  { title: "Revise", text: "Your team comments on the draft live in Kenja Rooms. The comments become prompts, and Kenja AI revises the draft." },
  { title: "Finalize", text: "When the response is final, share it securely with the issuing body as a published website." },
];

const stats = [
  { n: "90%+", l: "accuracy in generated answers", tone: "dark" as const },
  { n: "13 years", l: "passing enterprise security reviews", tone: "blue" as const },
  { n: "ACL", l: "access control at user, team and department level", tone: "green" as const },
];

const columns = [
  { head: "Human in charge", items: [
    { icon: FileText, t: "Library of templates", d: "Turn past RFPs into templates you can reuse on every project, with less time spent on formatting and checking consistency." },
    { icon: Database, t: "Local corpora", d: "Give each user, team or department its own corpus, so information reaches only the right people and answers stay accurate." },
    { icon: MessageSquare, t: "Tailored prompts", d: "Prompts written by our experts around your team's needs, and tuned for specific sections of your RFPs." },
  ]},
  { head: "Team effort", items: [
    { icon: LayoutGrid, t: "Content management system", d: "Built on Kenja Rooms, our long standing content management system. Comment and suggest changes directly on documents, with far less back and forth." },
  ]},
  { head: "Enterprise grade security", items: [
    { icon: Lock, t: "Access Control Layer", d: "Decide at user, team or department level what each person can see and when." },
    { icon: ShieldCheck, t: "Security guidelines", d: "A 13 year record of passing enterprise security reviews. Kenja follows NIST Cybersecurity Framework 2.0 and CIS controls, and is vetted by a top 3 investment bank." },
  ]},
];
const items = columns.flatMap((c) => c.items.map((it) => ({ ...it, head: c.head })));

function Rfp() {
  const { open } = useContact();
  return (
    <Page>
      <PageHero
        eyebrow="RFP Management"
        title="Streamline, Collaborate and Customize Your RFPs"
        lead="Kenja helps your team write strong RFP responses in less time, with AI drafts built from your own past proposals and your experts' knowledge."
        actions={<KnobButton onClick={() => open("I would like to see Kenja's RFP management.")}>Book a Demo</KnobButton>}
        image="uc-rfp"
        imageAlt="An RFP response being reviewed on a laptop in a Tokyo office"
      />

      <Bento id="process" label="Process">
        <Tile tone="blue" label="Six steps" icon={Wand2} className="gap-4 sm:col-span-6 md:flex-row md:items-end md:justify-between lg:col-span-12">
          <TileHeading text="How an RFP Response / Comes Together" />
          <p className="text-primary-foreground/85 md:max-w-[36ch] md:text-right">Six steps, with your experts in charge at every one.</p>
        </Tile>
        <StepTiles steps={steps} />
      </Bento>

      <Bento label="Results">
        {stats.map((s, i) => (
          <StatTile key={s.n} value={s.n} text={s.l} tone={s.tone} delay={i * 0.06} className="sm:col-span-2 lg:col-span-4" />
        ))}
      </Bento>

      <Bento id="features" label="Features">
        <Tile tone="dark" label="Speed and precision" icon={ListChecks} className="justify-between gap-6 sm:col-span-6 lg:col-span-6">
          <TileHeading text="Made for Speed / and Precision" />
          <p className="text-night-muted">Every response matches your client's needs and your company's standards, and your team decides what goes out.</p>
        </Tile>
        {items.map((it, i) => (
          <Tile key={it.t} tone={i === 3 ? "green" : i % 2 ? "muted" : "light"} delay={i * 0.04} className="gap-3 sm:col-span-3 lg:col-span-3">
            <p className="font-pixel text-[0.72rem] uppercase text-primary">{it.head}</p>
            <span className="grid size-10 place-items-center border-2 border-ink bg-surface text-ink">
              <it.icon className="size-5" />
            </span>
            <h3 className="mt-2 text-lg">{it.t}</h3>
            <p className="text-sm text-ink-2">{it.d}</p>
          </Tile>
        ))}
      </Bento>

      <GetInTouch />
    </Page>
  );
}
