import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AppWindow, Menu, ShieldCheck, X } from "lucide-react";
import { company, nav } from "@/data/site";
import { KnobButton, Logo, pixelEase } from "./primitives";
import { useContact } from "./ContactDialog";
import { navIcons } from "./bento";
import { cn } from "@/lib/utils";

const links = [...nav, { to: "/contact", label: "Contact" } as const];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {links.map((n) => {
        const Icon = navIcons[n.to] ?? AppWindow;
        return (
          <li key={n.to}>
            <Link
              to={n.to}
              onClick={onNavigate}
              activeOptions={{ exact: n.to === "/" }}
              className="group flex items-center gap-3 border-2 border-transparent px-3 py-2 text-[1rem] text-ink-2 hover:border-ink hover:bg-pixel hover:text-ink data-[status=active]:border-ink data-[status=active]:bg-ink data-[status=active]:text-night-foreground"
            >
              <Icon className="size-4 shrink-0" strokeWidth={2.25} />
              {n.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SidebarFooter({ onAction }: { onAction?: () => void }) {
  const { open } = useContact();
  return (
    <div className="space-y-4">
      <div className="border-2 border-ink bg-canvas-2 p-3 text-xs">
        <p className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="size-4 text-pixel-deep" /> ISO 27001 certified
        </p>
        <p className="mt-1 text-ink-2">NIST CSF 2.0 aligned</p>
      </div>
      <KnobButton
        variant="blue"
        size="sm"
        className="w-full justify-between"
        onClick={() => {
          onAction?.();
          open("I would like to book a demo of Kenja.");
        }}
      >
        Book a Demo
      </KnobButton>
      <a href={`mailto:${company.email}`} className="block truncate text-xs text-ink-2 hover:text-primary">
        {company.email}
      </a>
    </div>
  );
}

/** Fixed left sidebar on desktop; a top bar with a slide-out drawer on small screens. */
export function SiteHeader() {
  const [drawer, setDrawer] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setDrawer(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-night-foreground">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-60 flex-col border-r-2 border-ink bg-surface lg:flex">
        <Link to="/" aria-label="Kenja home" className="flex h-[72px] shrink-0 items-center border-b-2 border-ink px-5 hover:bg-pixel">
          <Logo className="h-7" />
        </Link>
        <nav aria-label="Main" className="min-h-0 flex-1 overflow-y-auto p-3">
          <p className="font-pixel mb-3 px-3 text-[0.72rem] uppercase text-ink-2">Menu</p>
          <NavList />
        </nav>
        <div className="shrink-0 border-t-2 border-ink p-4">
          <SidebarFooter />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-3 border-b-2 border-ink bg-surface px-3 lg:hidden">
        <Link to="/" aria-label="Kenja home" className="px-1">
          <Logo className="h-6" />
        </Link>
        <button
          type="button"
          aria-label={drawer ? "Close menu" : "Open menu"}
          aria-expanded={drawer}
          aria-controls="nav-drawer"
          onClick={() => setDrawer((d) => !d)}
          className="pixel-press grid size-10 place-items-center border-2 border-ink bg-surface"
        >
          {drawer ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-night/60 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside
              id="nav-drawer"
              className={cn("fixed bottom-0 left-0 top-14 z-50 flex w-[min(300px,85vw)] flex-col border-r-2 border-ink bg-surface lg:hidden")}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: pixelEase }}
            >
              <nav aria-label="Main" className="min-h-0 flex-1 overflow-y-auto p-3">
                <NavList onNavigate={() => setDrawer(false)} />
              </nav>
              <div className="border-t-2 border-ink p-4">
                <SidebarFooter onAction={() => setDrawer(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
