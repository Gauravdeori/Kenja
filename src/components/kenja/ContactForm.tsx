import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { contactMailto, isBot, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { contactTopics } from "@/data/site";
import { KnobButton, PixelLoader } from "./primitives";
import { cn } from "@/lib/utils";

export const fieldCls =
  "w-full border-2 border-ink bg-surface px-4 py-3 text-[1rem] text-ink outline-none placeholder:text-ink-2/60 focus:border-primary focus:shadow-[4px_4px_0_0_var(--primary)] aria-[invalid=true]:border-destructive";

export function Field({ label, name, required, error, children }: { label: string; name: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="block" htmlFor={name}>
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
      {error && (
        <span id={`${name}-err`} className="mt-1.5 block text-sm text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}

export function ContactForm({ full = false, initialMessage = "", idPrefix = "c" }: { full?: boolean; initialMessage?: string; idPrefix?: string }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const id = (n: string) => `${idPrefix}-${n}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd.entries()) as unknown as ContactInput;
    if (isBot(v)) {
      setState("done");
      return;
    }
    const errs = validateContact(v);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    try {
      await new Promise((r) => setTimeout(r, 700));
      window.location.href = contactMailto(v);
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state === "done" ? (
        <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[20px] bg-canvas-2 p-8 text-center">
          <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-pixel text-ink">
            <Check className="size-5" />
          </span>
          <h3 className="text-2xl">Thank you</h3>
          <p className="mt-2 text-ink-2">Your email app should open with your message ready to send. Our team will get back to you soon.</p>
        </motion.div>
      ) : (
        <motion.form key="form" ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-4" exit={{ opacity: 0 }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" name={id("firstName")} required error={errors.firstName}>
              <input id={id("firstName")} name="firstName" autoComplete="given-name" className={fieldCls} aria-invalid={!!errors.firstName} />
            </Field>
            <Field label="Last name" name={id("lastName")} error={errors.lastName}>
              <input id={id("lastName")} name="lastName" autoComplete="family-name" className={fieldCls} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Work email" name={id("email")} required error={errors.email}>
              <input id={id("email")} name="email" type="email" autoComplete="email" className={fieldCls} aria-invalid={!!errors.email} />
            </Field>
            <Field label="Company" name={id("company")}>
              <input id={id("company")} name="company" autoComplete="organization" className={fieldCls} />
            </Field>
          </div>
          {full && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone" name={id("phone")}>
                <input id={id("phone")} name="phone" type="tel" autoComplete="tel" className={fieldCls} />
              </Field>
              <Field label="Topic" name={id("topic")}>
                <select id={id("topic")} name="topic" className={fieldCls} defaultValue="">
                  <option value="">Choose a topic</option>
                  {contactTopics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>
          )}
          <Field label="How can we help?" name={id("message")} required error={errors.message}>
            <textarea id={id("message")} name="message" rows={full ? 6 : 4} defaultValue={initialMessage} className={cn(fieldCls, "resize-y")} aria-invalid={!!errors.message} />
          </Field>
          <div aria-hidden className="absolute -left-[9999px]">
            <label>
              Leave this empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {state === "error" && <p className="text-sm text-destructive">Something went wrong. Please email contact@kenja.com.</p>}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-2">
              You can also email{" "}
              <a className="text-primary underline underline-offset-2" href="mailto:contact@kenja.com">
                contact@kenja.com
              </a>
              .
            </p>
            <KnobButton type="submit" variant="dark" disabled={state === "sending"} icon={state === "sending" ? <PixelLoader /> : undefined}>
              {state === "sending" ? "Sending" : "Send message"}
            </KnobButton>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
