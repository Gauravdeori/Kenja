import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Canvas of tiny square pixels on a 24px grid. Some twinkle on their own and
 * pixels near the pointer light up (the "pixel cursor" effect).
 */
export function PixelField({ className, density = 0.08, interactive = true }: { className?: string; density?: number; interactive?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const green = styles.getPropertyValue("--pixel").trim() || "#A8D96C";
    const blue = styles.getPropertyValue("--primary").trim() || "#456BFA";
    const G = 24;
    let w = 0, h = 0, cells: { x: number; y: number; p: number; s: number; c: string }[] = [];
    const mouse = { x: -999, y: -999 };
    let raf = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = [];
      for (let x = 0; x < w; x += G) for (let y = 0; y < h; y += G) if (Math.random() < density) cells.push({ x, y, p: Math.random() * Math.PI * 2, s: 0.4 + Math.random(), c: Math.random() < 0.7 ? green : blue });
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const c of cells) {
        const tw = reduce ? 0.5 : (Math.sin(t / 900 * c.s + c.p) + 1) / 2;
        const d = Math.hypot(c.x - mouse.x, c.y - mouse.y);
        const near = interactive ? Math.max(0, 1 - d / 140) : 0;
        const a = Math.min(1, tw * 0.45 + near);
        if (a < 0.04) continue;
        ctx.globalAlpha = a;
        ctx.fillStyle = c.c;
        const size = 4 + Math.round(near * 2) * 2; // 4, 6 or 8px: grows in whole-pixel steps
        ctx.fillRect(c.x + (G - size) / 2, c.y + (G - size) / 2, size, size);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    resize();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [density, interactive]);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
