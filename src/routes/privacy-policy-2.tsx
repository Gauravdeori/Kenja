import { createFileRoute } from "@tanstack/react-router";
import legal from "@/data/legal.json";
import { LegalPage } from "@/components/kenja/LegalPage";

export const Route = createFileRoute("/privacy-policy-2")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Kenja" },
      { name: "description", content: "How Kenja collects, uses and protects your personal data, and your privacy rights." },
      { property: "og:title", content: "Privacy Policy | Kenja" },
      { property: "og:description", content: "How Kenja collects, uses and protects your personal data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage title="Privacy Policy" updated="10 December 2024" blocks={legal.privacy as never} />,
});
