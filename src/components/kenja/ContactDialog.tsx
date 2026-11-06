import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Logo, pixelEase } from "./primitives";

type Ctx = { open: (message?: string) => void };
const ContactCtx = createContext<Ctx>({ open: () => {} });
export const useContact = () => useContext(ContactCtx);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; message: string; origin: { x: number; y: number } }>({ open: false, message: "", origin: { x: 0, y: 0 } });
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((message = "") => {
    const el = document.activeElement as HTMLElement | null;
    returnFocus.current = el;
    const r = el?.getBoundingClientRect();
    setState({ open: true, message, origin: r ? { x: r.left + r.width / 2 - window.innerWidth / 2, y: r.top + r.height / 2 - window.innerHeight / 2 } : { x: 0, y: 0 } });
  }, []);
  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    setTimeout(() => returnFocus.current?.focus(), 50);
  }, []);

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [state.open, close]);

  return (
    <ContactCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-night/70" onClick={close} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              className="relative max-h-[92vh] w-full max-w-[580px] overflow-y-auto border-2 border-ink bg-surface p-6 shadow-[8px_8px_0_0_var(--ink)] sm:p-8"
              initial={{ opacity: 0, scale: 0.2, x: state.origin.x, y: state.origin.y }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: pixelEase }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center bg-ink">
                    <Logo tone="light" className="h-4" />
                  </span>
                  <div>
                    <h2 id="contact-title" className="text-2xl">Talk to Kenja</h2>
                    <p className="text-sm text-ink-2">Tell us what you need and our team will get back to you.</p>
                  </div>
                </div>
                <button onClick={close} aria-label="Close" className="pixel-press grid size-10 shrink-0 place-items-center border-2 border-ink bg-surface hover:bg-pixel">
                  <X className="size-4" />
                </button>
              </div>
              <ContactForm initialMessage={state.message} idPrefix="dlg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactCtx.Provider>
  );
}
