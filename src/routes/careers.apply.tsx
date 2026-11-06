import { createFileRoute } from "@tanstack/react-router";
import { FileUser, ListOrdered } from "lucide-react";
import { PageHero } from "@/components/kenja/sections";
import { Bento, Page, Tile } from "@/components/kenja/bento";
import { ApplicationForm } from "@/components/kenja/ApplicationForm";
import { hiringSteps } from "@/data/jobs";

export const Route = createFileRoute("/careers/apply")({
  head: () => ({
    meta: [
      { title: "Send a general application | Kenja" },
      { name: "description", content: "Tell Kenja about yourself and the kind of role you are looking for." },
      { property: "og:title", content: "Send a general application | Kenja" },
      { property: "og:description", content: "Apply to work at Kenja in Tokyo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Apply,
});

function Apply() {
  return (
    <Page>
      <PageHero eyebrow="Careers" title="Send a general application" lead="Tell us about yourself and the kind of role you are looking for. Fields marked with * are required." />
      <Bento label="Application">
        <Tile label="Your details" icon={FileUser} className="p-6 sm:col-span-6 md:p-10 lg:col-span-8">
          <ApplicationForm />
        </Tile>
        <Tile tone="dark" label="Next steps" icon={ListOrdered} delay={0.06} className="self-start sm:col-span-6 lg:sticky lg:top-6 lg:col-span-4">
          <h2 className="text-2xl">What happens after you apply</h2>
          <ol className="mt-6 space-y-5">
            {hiringSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-pixel pt-1 text-[0.72rem] text-pixel">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-night-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Tile>
      </Bento>
    </Page>
  );
}
