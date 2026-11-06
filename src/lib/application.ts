export type AppInput = { fullName: string; email: string; consent: boolean; cv: File | Blob | null };
export type AppErrors = Partial<Record<"fullName" | "email" | "consent" | "cv", string>>;

export const MAX_CV_BYTES = 10 * 1024 * 1024;

/** Checks real file content (magic bytes), not just the extension. */
export async function sniffCvType(file: Blob): Promise<"pdf" | "doc" | "docx" | null> {
  const part = file.slice(0, 8);
  const buf = typeof part.arrayBuffer === "function" ? await part.arrayBuffer() : await new Promise<ArrayBuffer>((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result as ArrayBuffer);
          r.onerror = rej;
          r.readAsArrayBuffer(part);
        });
  const b = new Uint8Array(buf);
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return "pdf"; // %PDF
  if (b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0) return "doc"; // OLE2
  if (b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04) return "docx"; // ZIP
  return null;
}

export async function validateApplication(v: AppInput): Promise<AppErrors> {
  const e: AppErrors = {};
  if (!v.fullName.trim()) e.fullName = "Please fill in your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email.";
  if (!v.cv) e.cv = "Please attach your CV.";
  else if (v.cv.size > MAX_CV_BYTES) e.cv = "Your CV must be 10 MB or smaller.";
  else if (!(await sniffCvType(v.cv))) e.cv = "Your CV must be a PDF, DOC or DOCX file.";
  if (!v.consent) e.consent = "Please agree to the privacy policy.";
  return e;
}
