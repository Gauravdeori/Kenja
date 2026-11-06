import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";

export function SmoothScroll() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    (window as unknown as { __lenis?: Lenis }).__lenis?.scrollTo(0, { immediate: true });
  }, [path]);
  return null;
}
