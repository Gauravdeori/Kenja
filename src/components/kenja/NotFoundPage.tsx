import { TriangleAlert } from "lucide-react";
import { KnobButton, KnobLink } from "./primitives";
import { PixelField } from "./PixelField";
import { useContact } from "./ContactDialog";
import { Bento, Page, Tile } from "./bento";

export function NotFoundPage() {
  const { open } = useContact();
  return (
    <Page className="min-h-[80vh] justify-center">
      <Bento>
        <Tile label="Error 404" icon={TriangleAlert} className="min-h-[360px] justify-end gap-5 sm:col-span-6 lg:col-span-8">
          <PixelField density={0.12} />
          <div className="relative">
            <h1 className="text-display max-w-[15ch]">We could not find that page</h1>
            <p className="mt-5 max-w-[52ch] text-lead text-ink-2">The page may have moved when we rebuilt our website. These links will take you to the main parts of the site.</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <KnobLink to="/">Go to the home page</KnobLink>
              <KnobLink to="/blog" variant="light">Read the blog</KnobLink>
              <KnobButton variant="ghost" onClick={() => open()}>
                Contact us
              </KnobButton>
            </div>
          </div>
        </Tile>
        <Tile tone="blue" delay={0.06} className="items-center justify-center sm:col-span-6 lg:col-span-4">
          <p className="font-pixel text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none">404</p>
        </Tile>
      </Bento>
    </Page>
  );
}
