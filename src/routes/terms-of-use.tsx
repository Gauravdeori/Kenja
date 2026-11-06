import { createFileRoute } from "@tanstack/react-router";
import legal from "@/data/legal.json";
import { LegalPage } from "@/components/kenja/LegalPage";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Kenja" },
      { name: "description", content: "The terms that apply when you use Kenja websites, services and applications." },
      { property: "og:title", content: "Terms of Use | Kenja" },
      { property: "og:description", content: "Terms of use for Kenja services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage title="Terms of Use" updated="11 December 2024" blocks={legal.terms as never} />,
});
