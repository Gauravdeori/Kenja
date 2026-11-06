export type JobStatus = "draft" | "open" | "closed";
export type Job = {
  slug: string;
  title: string;
  status: JobStatus;
  team: string;
  location: string;
  workStyle: "On site" | "Hybrid" | "Remote";
  jobType: "Full time" | "Part time" | "Contract" | "Internship";
  salary?: string;
  summary: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  posted: string;
};

// The documentation states no roles are open right now, so the list is empty
// and the careers page shows its empty state. Add jobs here (or via the CMS).
export const jobs: Job[] = [];
export const publicJobs = jobs.filter((j) => j.status !== "draft");
export const openJobs = jobs.filter((j) => j.status === "open");

export const hiringSteps = [
  { title: "Apply", text: "Send us your CV and a short message on this page." },
  { title: "First conversation", text: "If your experience fits the role, we contact you to arrange a first conversation." },
  { title: "Meet the team", text: "You meet the people you would work with, and you can ask them anything." },
  { title: "Offer", text: "If it is a good fit for both of us, we make you an offer." },
];
