export type ContactInput = {
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  phone?: string;
  topic?: string;
  message: string;
  website?: string; // honeypot: must stay empty
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Rules from the documentation: first name 1–100, valid email, message 10–5000. */
export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  const first = v.firstName.trim();
  if (!first) e.firstName = "Please fill in your first name.";
  else if (first.length > 100) e.firstName = "First name must be 100 characters or fewer.";
  if ((v.lastName ?? "").trim().length > 100) e.lastName = "Last name must be 100 characters or fewer.";
  if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid work email.";
  const msg = v.message.trim();
  if (msg.length < 10) e.message = "Please write at least 10 characters.";
  else if (msg.length > 5000) e.message = "Please keep your message under 5000 characters.";
  return e;
}

export const isBot = (v: ContactInput) => Boolean(v.website && v.website.trim());

/** Fallback used while no backend is connected: opens the visitor's email app. */
export function contactMailto(v: ContactInput, to = "contact@kenja.com") {
  const subject = `Website enquiry: ${v.topic || "General"}${v.company ? ` (${v.company})` : ""}`;
  const body = [
    `Name: ${v.firstName} ${v.lastName ?? ""}`.trim(),
    `Email: ${v.email}`,
    v.company && `Company: ${v.company}`,
    v.phone && `Phone: ${v.phone}`,
    "",
    v.message,
  ]
    .filter((l): l is string => typeof l === "string")
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
