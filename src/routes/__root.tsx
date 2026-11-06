import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,

  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { ContactProvider } from "../components/kenja/ContactDialog";
import { SiteHeader } from "../components/kenja/SiteHeader";
import { SiteFooter } from "../components/kenja/SiteFooter";
import { SmoothScroll } from "../components/kenja/SmoothScroll";
import { NotFoundPage } from "../components/kenja/NotFoundPage";
import { pixelEase } from "../components/kenja/primitives";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md border-2 border-ink bg-surface p-8 text-center shadow-[6px_6px_0_0_var(--ink)]">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-primary px-4 py-2 shadow-[3px_3px_0_0_var(--ink)] text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border-2 border-ink bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kenja | Secure AI for enterprise knowledge" },
      { name: "description", content: "Kenja builds secure, accurate AI for enterprises, answering from your own documents with access control on every file." },
      { name: "author", content: "Kenja K.K." },
      { property: "og:site_name", content: "Kenja" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Pixelify+Sans:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ContactProvider>
        <SmoothScroll />
        <SiteHeader />
        {/* content column sits to the right of the fixed sidebar */}
        <div className="lg:pl-60">
          <PageTransition>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </PageTransition>
          <SiteFooter />
        </div>
      </ContactProvider>
    </QueryClientProvider>
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <motion.main
      id="main"
      key={path}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: pixelEase }}
    >
      {children}
    </motion.main>
  );
}
