import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, LifeBuoy, Send } from "lucide-react";
import { PageHero } from "@/components/kenja/sections";
import { Bento, Page, Tile, type TileTone } from "@/components/kenja/bento";
import { ContactForm } from "@/components/kenja/ContactForm";
import { company } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Kenja" },
      { name: "description", content: "Contact Kenja in Tokyo. Book a demo, ask about our plans or reach support. Moto Akasaka Building 9F, Minato-ku, Tokyo. contact@kenja.com" },
      { property: "og:title", content: "Contact | Kenja" },
      { property: "og:description", content: "Talk to Kenja. Book a demo, ask about our plans or reach support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const cards: { icon: typeof MapPin; title: string; lines: string[]; link: { href: string; label: string; ext?: boolean }; tone: TileTone }[] = [
  { icon: MapPin, title: "Headquarters", lines: company.address, link: { href: company.mapsUrl, label: "Open in Google Maps ↗", ext: true }, tone: "light" },
  { icon: Phone, title: "Phone", lines: [company.phone], link: { href: company.phoneHref, label: "Call us →" }, tone: "green" },
  { icon: Mail, title: "Sales", lines: [company.email], link: { href: `mailto:${company.email}`, label: "Email us →" }, tone: "muted" },
  { icon: LifeBuoy, title: "Support", lines: ["Kenja customers can open a support ticket."], link: { href: company.support, label: "Submit a ticket ↗", ext: true }, tone: "light" },
];

function Contact() {
  return (
    <Page>
      <PageHero eyebrow="Contact" title="Talk to Kenja" lead="Fill in the form and one of our experts will get back to you. You can also call or email us directly." />
      <Bento label="Reach us">
        <Tile label="Send us a message" icon={Send} className="p-6 sm:col-span-6 md:p-10 lg:col-span-8 lg:row-span-4">
          <h2 className="text-3xl">Send us a message</h2>
          <p className="mb-8 mt-2 text-sm text-ink-2">Fields marked with * are required.</p>
          <ContactForm full idPrefix="page" />
        </Tile>
        {cards.map((c, i) => (
          <Tile key={c.title} tone={c.tone} label={c.title} icon={c.icon} delay={i * 0.05} className="sm:col-span-3 lg:col-span-4">
            {c.lines.map((l) => (
              <p key={l} className="text-sm">{l}</p>
            ))}
            <a href={c.link.href} {...(c.link.ext ? { target: "_blank", rel: "noreferrer" } : {})} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
              {c.link.label}
            </a>
          </Tile>
        ))}
      </Bento>
    </Page>
  );
}
