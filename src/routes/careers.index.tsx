import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, MapPin, Shield, Search, ArrowUpRight, Briefcase, ListOrdered, Send, Star } from "lucide-react";
import { KnobLink } from "@/components/kenja/primitives";
import { PageHero, StepTiles, TileHeading } from "@/components/kenja/sections";
import { Bento, Page, Tile } from "@/components/kenja/bento";
import { PixelField } from "@/components/kenja/PixelField";
import { hiringSteps, openJobs } from "@/data/jobs";
import { fieldCls } from "@/components/kenja/ContactForm";

type S = { q?: string; team?: string; location?: string; workStyle?: string; jobType?: string };

export const Route = createFileRoute("/careers/")({
  validateSearch: (s: Record<string, unknown>): S => {
    const g = (k: string) => (typeof s[k] === "string" ? (s[k] as string) : undefined);
    return { q: g("q"), team: g("team"), location: g("location"), workStyle: g("workStyle"), jobType: g("jobType") };
  },
  head: () => ({
    meta: [
      { title: "Careers | Kenja" },
      { name: "description", content: "Work with Kenja, an enterprise AI company in Tokyo. See our open roles and send us your application." },
      { property: "og:title", content: "Careers | Kenja" },
      { property: "og:description", content: "Build secure AI for enterprises with Kenja in Tokyo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

const why = [
  { icon: Building2, title: "Used by enterprises", text: "Kenja is in production at NTT Docomo Business, Morgan Stanley, Robert Walters and Dale Carnegie." },
  { icon: Shield, title: "Security comes first", text: "Kenja is ISO 27001 certified. Our Access Control Layer decides who can reach each document." },
  { icon: MapPin, title: "Based in Tokyo", text: "Our headquarters are in Moto Akasaka, Minato-ku, Tokyo." },
];

const filters = [
  { key: "team", label: "Team" },
  { key: "location", label: "Location" },
  { key: "workStyle", label: "Work style" },
  { key: "jobType", label: "Job type" },
] as const;

function Careers() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/careers/" });
  const jobs = openJobs.filter(
    (j) =>
      (!search.q || j.title.toLowerCase().includes(search.q.toLowerCase())) &&
      filters.every((f) => !search[f.key] || j[f.key] === search[f.key]),
  );

  return (
    <Page>
      <PageHero
        eyebrow="Careers"
        title="Build secure AI / for enterprises"
        lead="Kenja is an enterprise AI company in Tokyo. Kenja Rooms keeps a company's content organized and shared safely, and Kenja AI answers from it."
        actions={
          <>
            {openJobs.length > 0 && <KnobLink to="/careers" hash="roles">All open roles ({openJobs.length})</KnobLink>}
            <KnobLink to="/careers/apply" variant={openJobs.length ? "ghost" : "dark"}>Send a general application</KnobLink>
          </>
        }
        image="uc-recruiting"
        imageAlt="A person in a suit at a round wooden table with a CV and a pen, in a bright meeting room"
      />

      <Bento id="why-kenja" label="Why Kenja">
        <Tile tone="dark" label="Work that matters" icon={Star} className="justify-between gap-6 sm:col-span-6 lg:col-span-3">
          <TileHeading text="Work that enterprises / rely on" />
          <p className="text-night-muted">We have worked with enterprise customers in Japan for 13 years.</p>
        </Tile>
        {why.map((w, i) => (
          <Tile key={w.title} tone={i === 1 ? "green" : "light"} delay={i * 0.06} className="sm:col-span-2 lg:col-span-3">
            <w.icon className="size-6 text-primary" />
            <h3 className="mt-8 text-xl">{w.title}</h3>
            <p className="mt-2 text-sm text-ink-2">{w.text}</p>
          </Tile>
        ))}
      </Bento>

      <Bento id="roles" label="Open roles">
        <Tile tone="blue" label="Find your role" icon={Briefcase} className="justify-between gap-6 sm:col-span-6 lg:col-span-4">
          <TileHeading text="Find your role" />
          <p className="text-primary-foreground/85">Choose a role to read more about it and apply.</p>
        </Tile>
        <Tile className="sm:col-span-6 lg:col-span-8">
          {openJobs.length > 0 && (
            <div className="mb-6 grid gap-3 md:grid-cols-5">
              <label className="relative md:col-span-1">
                <span className="sr-only">Search roles</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-2" />
                <input className={`${fieldCls} pl-10`} placeholder="Search roles" value={search.q ?? ""} onChange={(e) => navigate({ search: (s: S) => ({ ...s, q: e.target.value || undefined }), replace: true })} />
              </label>
              {filters.map((f) => (
                <label key={f.key}>
                  <span className="sr-only">{f.label}</span>
                  <select className={fieldCls} value={search[f.key] ?? ""} onChange={(e) => navigate({ search: (s: S) => ({ ...s, [f.key]: e.target.value || undefined }) })}>
                    <option value="">{f.label}: All</option>
                    {[...new Set(openJobs.map((j) => j[f.key]))].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          )}
          {jobs.length === 0 ? (
            <div className="relative flex-1 overflow-hidden border-2 border-dashed border-ink bg-canvas-2 p-10 text-center">
              <PixelField density={0.05} />
              <div className="relative">
                <h3 className="text-2xl">No open roles right now</h3>
                <p className="mt-2 text-ink-2">New roles appear here first, so please check back soon.</p>
              </div>
            </div>
          ) : (
            <ul className="border-2 border-ink">
              {jobs.map((j, i) => (
                <li key={j.slug} className={i > 0 ? "border-t-2 border-dashed border-border" : undefined}>
                  <Link to="/careers/$slug" params={{ slug: j.slug }} className="group flex items-center justify-between gap-4 p-5 hover:bg-primary hover:text-primary-foreground">
                    <div>
                      <h3 className="text-xl">{j.title}</h3>
                      <p className="mt-1 text-sm opacity-75">{[j.team, j.location, j.workStyle, j.jobType].join(" · ")}</p>
                    </div>
                    <ArrowUpRight className="size-5 group-hover:translate-x-[3px]" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Tile>
      </Bento>

      <Bento id="hiring-steps" label="After you apply">
        <Tile tone="muted" label="Hiring process" icon={ListOrdered} className="sm:col-span-6 lg:col-span-12">
          <TileHeading text="What happens / after you apply" />
        </Tile>
        <StepTiles steps={hiringSteps} perRow={4} />
      </Bento>

      <Bento id="general-application" label="General application">
        <Tile tone="dark" label="Not seeing the right role?" icon={Send} className="gap-5 sm:col-span-6 lg:col-span-8">
          <div className="pixel-grid-dark pointer-events-none absolute inset-0" />
          <TileHeading text="Not seeing the right role?" className="relative" />
          <p className="relative max-w-[56ch] text-night-muted">Send us a general application. Tell us about yourself and the kind of work you would like to do.</p>
        </Tile>
        <Tile tone="green" delay={0.06} className="items-start justify-end sm:col-span-6 lg:col-span-4">
          <KnobLink to="/careers/apply">Send a general application</KnobLink>
        </Tile>
      </Bento>
    </Page>
  );
}
