import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Info, Send, Briefcase } from "lucide-react";
import { publicJobs, openJobs } from "@/data/jobs";
import { KnobButton, KnobLink } from "@/components/kenja/primitives";
import { ApplicationForm } from "@/components/kenja/ApplicationForm";
import { Bento, Page, Tile } from "@/components/kenja/bento";

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }) => {
    const job = publicJobs.find((j) => j.slug === params.slug);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    const j = loaderData?.job;
    if (!j) return { meta: [{ title: "Role unavailable | Kenja" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${j.title} | Careers at Kenja` },
        { name: "description", content: j.summary },
        { property: "og:title", content: `${j.title} | Kenja` },
        { property: "og:description", content: j.summary },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(j.status === "closed" ? [{ name: "robots", content: "noindex" }] : []),
      ],
      scripts: j.status === "open" ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "JobPosting", title: j.title, description: j.about, datePosted: j.posted, employmentType: j.jobType, hiringOrganization: { "@type": "Organization", name: "Kenja K.K." }, jobLocation: { "@type": "Place", address: j.location } }) }] : [],
    };
  },
  component: JobPage,
});

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-ink-2">
            <Check className="mt-1 size-4 shrink-0 text-primary" />
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}

function JobPage() {
  const { job } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const facts = [["Team", job.team], ["Location", job.location], ["Work style", job.workStyle], ["Job type", job.jobType], ["Salary", job.salary], ["Posted", job.posted]].filter((f) => f[1]);
  const others = openJobs.filter((j) => j.slug !== job.slug).slice(0, 3);
  return (
    <Page>
      <Bento>
        <Tile label="Careers" icon={Briefcase} className="gap-5 sm:col-span-6 lg:col-span-8">
          <Link to="/careers" className="inline-flex items-center gap-2 self-start border-2 border-ink bg-surface px-3 py-1 text-sm font-semibold shadow-[2px_2px_0_0_var(--ink)] hover:bg-pixel">
            <ArrowLeft className="size-4" /> All open roles
          </Link>
          <h1 className="text-display max-w-[18ch]">{job.title}</h1>
          <p className="max-w-[60ch] text-lead text-ink-2">{job.summary}</p>
          {job.status === "open" && (
            <div className="flex flex-wrap gap-4">
              <KnobLink to="/careers/$slug" params={{ slug: job.slug }} hash="apply">Apply now</KnobLink>
              <KnobButton
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                }}
              >
                {copied ? "Link copied" : "Copy link"}
              </KnobButton>
            </div>
          )}
        </Tile>
        <Tile tone="muted" label="Details" icon={Info} delay={0.05} className="sm:col-span-6 lg:col-span-4">
          <dl className="border-2 border-ink bg-surface text-sm">
            {facts.map(([k, v], i) => (
              <div key={k} className={i % 2 ? "grid grid-cols-[1fr_1.4fr] gap-3 bg-canvas-2 px-3 py-2" : "grid grid-cols-[1fr_1.4fr] gap-3 px-3 py-2"}>
                <dt className="text-ink-2">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          {others.length > 0 && (
            <div className="mt-6">
              <p className="font-pixel text-[0.72rem] uppercase text-ink-2">Other open roles</p>
              <ul className="mt-3 space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to="/careers/$slug" params={{ slug: o.slug }} className="text-primary hover:underline">
                      ▸ {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Tile>

        {job.status === "closed" && (
          <Tile tone="dark" className="sm:col-span-6 lg:col-span-12">
            <h2 className="text-3xl">This role is closed</h2>
            <p className="mt-2 text-night-muted">We are no longer taking applications for this role. Have a look at our other open roles.</p>
            <div className="mt-6">
              <KnobLink to="/careers" variant="light">See open roles</KnobLink>
            </div>
          </Tile>
        )}

        <Tile className="sm:col-span-6 md:p-10 lg:col-span-8">
          <section>
            <h2 className="text-2xl">About the role</h2>
            <p className="mt-4 text-ink-2">{job.about}</p>
          </section>
          <List title="What you will do" items={job.responsibilities} />
          <List title="What you bring" items={job.requirements} />
          <List title="Nice to have" items={job.niceToHave} />
          <List title="What we offer" items={job.benefits} />
        </Tile>

        {job.status === "open" && (
          <Tile id="apply" tone="light" label="Apply" icon={Send} className="scroll-mt-20 sm:col-span-6 md:p-10 lg:col-span-8">
            <h2 className="text-3xl">Apply for this role</h2>
            <p className="mb-6 mt-2 text-sm text-ink-2">Fields marked with * are required.</p>
            <ApplicationForm role={job.title} />
          </Tile>
        )}
      </Bento>
    </Page>
  );
}
