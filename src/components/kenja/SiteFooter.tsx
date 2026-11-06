import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, MapPin, Phone, Youtube, Compass } from "lucide-react";
import { company } from "@/data/site";
import { KnobButton, Logo } from "./primitives";
import { useContact } from "./ContactDialog";
import { Bento, Tile } from "./bento";

const footerNav = [
  { to: "/solutions", label: "Solutions" },
  { to: "/products", label: "Products" },
  { to: "/rfp-management", label: "RFP Management" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const { open } = useContact();
  return (
    <footer className="mx-auto w-full max-w-[1440px] px-3 pb-6 md:px-5">
      <Bento label="Kenja K.K.">
        <Tile tone="dark" className="sm:col-span-6 lg:col-span-4">
          <div className="pixel-grid-dark pointer-events-none absolute inset-0" />
          <div className="relative">
            <Logo tone="light" />
            <p className="mt-4 max-w-[30ch] text-sm text-night-muted">{company.tagline}</p>
            <div className="mt-6">
              <KnobButton size="sm" variant="blue" onClick={() => open("I would like to book a demo of Kenja.")}>
                Book a Demo
              </KnobButton>
            </div>
          </div>
        </Tile>
        <Tile label="Navigation" icon={Compass} className="sm:col-span-3 lg:col-span-3">
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 lg:grid-cols-1">
              {footerNav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:bg-pixel">
                    ▸ {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Tile>
        <Tile label="Location" icon={MapPin} tone="muted" className="sm:col-span-3 lg:col-span-3">
          <address className="not-italic leading-relaxed">
            {company.address.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
          <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
            Open in Google Maps ↗
          </a>
        </Tile>
        <Tile label="Contact" icon={Phone} tone="green" className="sm:col-span-6 lg:col-span-2">
          <a href={company.phoneHref} className="block font-semibold hover:underline">{company.phone}</a>
          <a href={`mailto:${company.email}`} className="block break-all hover:underline">{company.email}</a>
          <div className="mt-4 flex gap-2">
            {[
              { href: company.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: company.social.youtube, icon: Youtube, label: "YouTube" },
              { href: company.social.facebook, icon: Facebook, label: "Facebook" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-9 place-items-center border-2 border-ink bg-surface hover:bg-ink hover:text-night-foreground">
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </Tile>
        <Tile tone="muted" className="flex-row flex-wrap items-center justify-between gap-3 !py-3 text-sm text-ink-2 sm:col-span-6 lg:col-span-12">
          <span>© 2026 Kenja K.K. All rights reserved.</span>
          <span className="flex gap-5">
            <Link to="/terms-of-use" className="hover:text-ink">Terms of Use</Link>
            <Link to="/privacy-policy-2" className="hover:text-ink">Privacy Policy</Link>
          </span>
        </Tile>
      </Bento>
    </footer>
  );
}
