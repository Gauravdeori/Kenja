import { describe, expect, it } from "vitest";
import { validateApplication, MAX_CV_BYTES } from "@/lib/application";

const pdf = new Blob([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31])]);
const base = { fullName: "A B", email: "a@b.co", consent: true, cv: pdf };

describe("job application rules", () => {
  it("accepts a real PDF", async () => {
    expect(await validateApplication(base)).toEqual({});
  });
  it("rejects a file whose content is not PDF/DOC/DOCX", async () => {
    const fake = new Blob([new TextEncoder().encode("hello world")]);
    expect((await validateApplication({ ...base, cv: fake })).cv).toBeDefined();
  });
  it("rejects files over 10 MB", async () => {
    const big = new Blob([new Uint8Array([0x25, 0x50, 0x44, 0x46]), new Uint8Array(MAX_CV_BYTES)]);
    expect((await validateApplication({ ...base, cv: big })).cv).toBeDefined();
  });
  it("requires privacy consent", async () => {
    expect((await validateApplication({ ...base, consent: false })).consent).toBeDefined();
  });
});
