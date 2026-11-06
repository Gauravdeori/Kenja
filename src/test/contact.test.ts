import { describe, expect, it } from "vitest";
import { validateContact, isBot } from "@/lib/contact";

const ok = { firstName: "Ted", email: "ted@example.com", message: "Hello, I want a demo." };

describe("contact form rules", () => {
  it("accepts a valid message", () => {
    expect(validateContact(ok)).toEqual({});
  });
  it("requires a first name", () => {
    expect(validateContact({ ...ok, firstName: " " }).firstName).toBeDefined();
  });
  it("rejects first names over 100 characters", () => {
    expect(validateContact({ ...ok, firstName: "a".repeat(101) }).firstName).toBeDefined();
  });
  it("requires a valid email", () => {
    expect(validateContact({ ...ok, email: "nope" }).email).toBeDefined();
  });
  it("requires a message of 10 to 5000 characters", () => {
    expect(validateContact({ ...ok, message: "short" }).message).toBeDefined();
    expect(validateContact({ ...ok, message: "a".repeat(5001) }).message).toBeDefined();
  });
  it("flags the honeypot", () => {
    expect(isBot({ ...ok, website: "spam.com" })).toBe(true);
  });
});
