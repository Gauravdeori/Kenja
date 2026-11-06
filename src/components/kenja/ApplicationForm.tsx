import { useRef, useState } from "react";
import { Check, Upload } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Field, fieldCls } from "./ContactForm";
import { KnobButton, PixelLoader } from "./primitives";
import { validateApplication, type AppErrors } from "@/lib/application";
import { cn } from "@/lib/utils";

export function ApplicationForm({ role = "General application" }: { role?: string }) {
  const [errors, setErrors] = useState<AppErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const ref = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("website") ?? "")) return setState("done");
    const errs = await validateApplication({
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      consent: fd.get("consent") === "on",
      cv: file,
    });
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    await new Promise((r) => setTimeout(r, 700));
    const body = ["fullName", "email", "phone", "location", "links", "message"].map((k) => `${k}: ${fd.get(k) ?? ""}`).join("\n");
    window.location.href = `mailto:contact@kenja.com?subject=${encodeURIComponent(`Application: ${role}`)}&body=${encodeURIComponent(body + "\n\n(Please attach your CV to this email.)")}`;
    setState("done");
  }

  if (state === "done")
    return (
      <div className="rounded-[20px] bg-canvas-2 p-8 text-center">
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-pixel text-ink"><Check className="size-5" /></span>
        <h3 className="text-2xl">Thank you for applying</h3>
        <p className="mt-2 text-ink-2">Your email app should open with your application. Please attach your CV before sending.</p>
      </div>
    );

  return (
    <form ref={ref} noValidate onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="a-fullName" required error={errors.fullName}>
          <input id="a-fullName" name="fullName" autoComplete="name" className={fieldCls} aria-invalid={!!errors.fullName} />
        </Field>
        <Field label="Email" name="a-email" required error={errors.email}>
          <input id="a-email" name="email" type="email" autoComplete="email" className={fieldCls} aria-invalid={!!errors.email} />
        </Field>
        <Field label="Phone" name="a-phone">
          <input id="a-phone" name="phone" type="tel" className={fieldCls} />
        </Field>
        <Field label="Location" name="a-location">
          <input id="a-location" name="location" className={fieldCls} />
        </Field>
      </div>
      <Field label="Portfolio, LinkedIn or GitHub" name="a-links">
        <input id="a-links" name="links" type="url" placeholder="https://" className={fieldCls} />
      </Field>
      <Field label="CV (PDF, DOC or DOCX, up to 10 MB)" name="a-cv" required error={errors.cv}>
        <span className={cn("flex cursor-pointer items-center gap-3 border-2 border-dashed border-ink bg-surface px-4 py-4 hover:border-primary", errors.cv && "border-destructive")}>
          <Upload className="size-4 text-primary" />
          <span className="text-sm text-ink-2">{file ? file.name : "Choose a file"}</span>
          <input id="a-cv" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </span>
      </Field>
      <Field label="Message" name="a-message">
        <textarea id="a-message" name="message" rows={5} className={fieldCls} />
      </Field>
      <div aria-hidden className="absolute -left-[9999px]"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="flex items-start gap-3 text-sm text-ink-2">
        <input type="checkbox" name="consent" className="mt-1 size-4 accent-[var(--primary)]" aria-invalid={!!errors.consent} />
        <span>
          I agree to Kenja processing my data as described in the{" "}
          <Link to="/privacy-policy-2" className="text-primary underline">privacy policy ↗</Link>. <span className="text-primary">*</span>
          {errors.consent && <span className="block text-destructive">{errors.consent}</span>}
        </span>
      </label>
      <div className="mt-2">
        <KnobButton type="submit" disabled={state === "sending"} icon={state === "sending" ? <PixelLoader /> : undefined}>
          {state === "sending" ? "Sending" : "Send application"}
        </KnobButton>
      </div>
    </form>
  );
}
