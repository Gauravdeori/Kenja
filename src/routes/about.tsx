import { createFileRoute } from "@tanstack/react-router";
import { Building2, GraduationCap, Play, User, Users } from "lucide-react";
import { KnobLink } from "@/components/kenja/primitives";
import { ClientMarquee, GetInTouch, PageHero, TileHeading } from "@/components/kenja/sections";
import { Bento, ImageTile, Page, StatTile, Tile } from "@/components/kenja/bento";
import { company, img } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Kenja" },
      { name: "description", content: "Kenja is a Tokyo based enterprise AI company led by founder and CEO Ted Katagi, with advisors Dave Plumer and Sandra Ro, and 13 years of work with enterprise customers." },
      { property: "og:title", content: "About | Kenja" },
      { property: "og:description", content: "Your strategic partner for enterprise AI, based in Tokyo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const numbers = [
  { n: "13 years", l: "serving enterprise customers in Japan", tone: "light" as const },
  { n: "6", l: "enterprises running Kenja in production", tone: "blue" as const },
  { n: "Tokyo", l: "headquarters in Moto Akasaka, Minato-ku", tone: "green" as const },
];

const advisors = [
  { name: "Dave Plumer", img: "dave-plumer", paras: ["Dave is Founder, Chairman and CEO of the Institute for Enterprise Value, and a board advisor for Kenja, Engage3 and Deco Lighting.", "He has built a career as a global CEO, chairman and board director, delivering growth and profitability for Fortune 500, venture backed and private equity companies. He holds an MBA from the Amos Tuck School of Business at Dartmouth College and a BA in Economics from Union College, New York."] },
  { name: "Sandra Ro", img: "sandra-ro", paras: ["Sandra is an advisor for Kenja and CEO of the Global Blockchain Business Council (GBBC), a Swiss non profit. She is also an angel investor, board member and co-founder of several start ups."] },
];

function About() {
  return (
    <Page>
      <PageHero
        eyebrow="About Kenja"
        title="Your Strategic Partner / for Enterprise AI"
        lead="Our mission is to help enterprises change the way they work, with AI solutions made for them that raise productivity and support growth. We hold ourselves to ethical practices and take the time to understand each client's challenges."
        image="ted-tedx"
        imageAlt="Ted Katagi speaking on stage at TEDxTokyo Salon"
        caption="Ted Katagi at TEDxTokyo Salon"
      />

      <Bento label="Kenja in numbers">
        {numbers.map((x, i) => (
          <StatTile key={x.n} value={x.n} text={x.l} tone={x.tone} delay={i * 0.06} className="sm:col-span-2 lg:col-span-4" />
        ))}
      </Bento>

      <Bento id="team" label="Our team">
        <ImageTile src={img("ted-katagi")} alt="Portrait of Ted Katagi, Founder and CEO of Kenja" className="min-h-[420px] sm:col-span-3 lg:col-span-4 lg:row-span-2" caption={<><span className="font-semibold">Ted Katagi</span> · Founder and CEO</>} />
        <Tile label="Founder and Chief Executive Officer" icon={User} delay={0.05} className="gap-5 sm:col-span-3 lg:col-span-5 lg:row-span-2">
          <TileHeading text="Ted Katagi" />
          <div className="space-y-4 text-ink-2">
            <p>Ted Katagi is the Chief Executive Officer of Kenja, a company that provides an AI enabled collaboration platform for enterprise customers.</p>
            <p>Before founding Kenja, he was Head of Private Equity Asia for Fidelity Investments, Chief Marketing Officer for Vodafone Japan and Verizon Wireless (West), and Global Head of Commercial Strategy for Vodafone. He also worked at IBM and Bain &amp; Company.</p>
          </div>
          <div className="mt-auto">
            <KnobLink href={company.tedxUrl} icon={<Play className="ml-0.5 size-3.5 fill-current" />}>
              Watch his TEDx talk
            </KnobLink>
          </div>
        </Tile>
        <ImageTile src={img("ted-gbbc")} alt="Ted Katagi speaking on a panel at GBBC Blockchain Central UNGA" delay={0.1} className="sm:col-span-3 lg:col-span-3" caption="GBBC Blockchain Central UNGA" />
        <Tile tone="dark" label="Education" icon={GraduationCap} delay={0.15} className="sm:col-span-3 lg:col-span-3">
          <p className="text-sm text-night-muted">Ted holds an MBA from Harvard Business School and serves as a professor of digital transformation at Nagoya University of Commerce and Business.</p>
        </Tile>
      </Bento>

      <Bento id="advisors" label="Advisors">
        <Tile tone="green" label="Advisors" icon={Users} className="justify-between gap-6 sm:col-span-6 lg:col-span-4">
          <TileHeading text="Our Advisors" />
          <p>Experienced leaders in enterprise value, finance and blockchain who guide Kenja's growth.</p>
        </Tile>
        {advisors.map((a, i) => (
          <Tile key={a.name} as="article" delay={i * 0.06} className="gap-4 sm:col-span-3 lg:col-span-4">
            <div className="flex items-center gap-4">
              <img src={img(a.img)} alt={`Portrait of ${a.name}`} loading="lazy" className="size-20 shrink-0 border-2 border-ink object-cover" />
              <div>
                <h3 className="text-2xl">{a.name}</h3>
                <p className="text-sm font-medium text-primary">Advisor</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-ink-2">
              {a.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Tile>
        ))}
      </Bento>

      <Bento id="clients" label="Clients">
        <Tile bleed label="Enterprise teams run on Kenja" icon={Building2} className="pb-5 pt-14 sm:col-span-6 lg:col-span-12">
          <ClientMarquee />
        </Tile>
      </Bento>

      <GetInTouch />
    </Page>
  );
}
