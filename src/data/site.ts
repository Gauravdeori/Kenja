// All copy below comes from the Kenja website documentation (source of truth).
export const company = {
  name: "Kenja K.K.",
  tagline: "Secure, accurate AI for enterprises, built on your own content.",
  address: ["Moto Akasaka Building 9F", "1-7-10 Moto Akasaka", "Minato-ku, Tokyo, Japan"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Moto+Akasaka+Building+1-7-10+Moto+Akasaka+Minato-ku+Tokyo",
  phone: "+81 3-5413-6267",
  phoneHref: "tel:+81354136267",
  email: "contact@kenja.com",
  support: "https://kenjacorporation.freshdesk.com",
  tedxUrl: "https://www.youtube.com/results?search_query=Ted+Katagi+TEDxTokyo+Salon",
  social: {
    linkedin: "https://www.linkedin.com/company/kenja-k-k-/",
    youtube: "https://www.youtube.com/@kenjakk",
    facebook: "https://www.facebook.com/kenjakk",
  },
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/products", label: "Products" },
  { to: "/rfp-management", label: "RFP Management" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
] as const;

export const img = (name: string) => `/images/${name}.webp`;

export type Client = { name: string; slug: string; production?: boolean; note?: string };
export const clients: Client[] = [
  { name: "NTT Docomo Business", slug: "ntt-docomo-business", production: true, note: "Entire B2B billing center uses Kenja in production" },
  { name: "Morgan Stanley", slug: "morgan-stanley", production: true, note: "High-security NIST on-premise deployment" },
  { name: "Robert Walters", slug: "robert-walters", production: true, note: "Resume formatting for candidates and internal teams" },
  { name: "Dale Carnegie", slug: "dale-carnegie", production: true, note: "AI Classics with an augmented AI chatbot" },
  { name: "Trainocate", slug: "trainocate", production: true, note: "Leading-edge AI mentor and AI instructor" },
  { name: "NSSK", slug: "nssk", production: true, note: "Public sector reporting" },
  { name: "Keio University", slug: "keio-university" },
  { name: "Seven & i Holdings", slug: "seven-and-i-holdings" },
  { name: "YKK AP", slug: "ykk-ap" },
  { name: "Pacific Consultants", slug: "pacific-consultants" },
  { name: "Tech Mahindra", slug: "tech-mahindra" },
  { name: "Salomon", slug: "salomon" },
  { name: "Tuskegee University", slug: "tuskegee-university" },
  { name: "Randstad", slug: "randstad" },
  { name: "Tokio Marine", slug: "tokio-marine" },
];
export const logo = (slug: string) => `/images/logo-${slug}.png`;

export const testimonials = [
  { initials: "KK", name: "Kenshou Kojima", role: "CEO, PTS Consulting Japan", quote: "We are very happy business partners of Kenja. We have used their outstanding software in our office and have introduced Kenja to our customers. They have met and exceeded the standards of our demanding enterprise customers." },
  { initials: "RT", name: "Richard Tanaka", role: "CIO, Randstad", quote: "Kenja has proven itself to be a strong, versatile, and adaptable platform and service. I am particularly impressed by their commitment as a business partner to our success." },
  { initials: "RL", name: "Rhonda Lundin", role: "IPBA, customer since 2003", quote: "With Kenja, we can better communicate ongoing changes, and share documents and activities across our organization. Rooms gives us an online workspace where we can collaborate in one convenient location." },
  { initials: "JM", name: "Jonathan Morgan", role: "Co-founder and Chairman, Kobe International Blockchain Research Center", quote: "Kenja Rooms have the potential of becoming a turning point for work productivity and efficiency." },
];

export const useCases = [
  { title: "Customer Service", text: "Improve customer experience and operating costs by answering questions automatically, resolving issues faster and giving personal support at scale.", q: "How do I change the billing address on my contract?", img: "uc-customer-service", to: "/solutions" },
  { title: "Requests for Proposals", text: "Write high quality RFP responses faster with document generation, a library of templates and comments your whole team can work on.", q: "Draft our answer to the data security section.", img: "uc-rfp", to: "/rfp-management" },
  { title: "Real Estate", text: "Give tenants quick answers to their questions, clear move in steps and simpler contact with their property managers.", q: "When is rent due, and how can I pay it?", img: "uc-real-estate", to: "/solutions" },
  { title: "Recruiting", text: "Screen candidates, review resumes and match people to open roles faster, with resumes formatted the way your clients expect.", q: "Which candidates have led a team of ten or more?", img: "uc-recruiting", to: "/solutions" },
  { title: "Training", text: "Build a knowledge library and train your own AI only on the material you upload, for research, courses and in house training.", q: "Summarize module three for new starters.", img: "uc-training", to: "/solutions" },
  { title: "Due Diligence", text: "Review financials, legal documents and market data quickly, and find the risks and opportunities that matter.", q: "List every change of control clause in these contracts.", img: "uc-due-diligence", to: "/solutions" },
] as const;

export const faqs = [
  { q: "What is RAG?", a: "RAG stands for Retrieval Augmented Generation. Before the AI writes an answer, it searches a collection of documents for the passages that relate to the question, and then writes its answer from those passages. The answer is based on your documents instead of only on what the language model learned in training." },
  { q: "Why should my company care about RAG?", a: "RAG gives precise answers that come from your own material, with the source attached. Teams spend less time searching, new staff get up to speed faster, and decisions can draw on everything your organization already knows." },
  { q: "What is KFR?", a: "KFR stands for Kenja Filtered Retrieval. It is Kenja's version of RAG. After the search step, KFR filters the results again and passes only the most relevant passages to the language model. This raises the accuracy and relevance of the answers." },
  { q: "Where does my data live?", a: "You decide. Kenja runs on premises, in the cloud or in a hybrid cloud, and each corpus is only visible to the people you give access to." },
];

export const tedCareer = [
  { role: "Head of Private Equity Asia", org: "Fidelity Investments" },
  { role: "Chief Marketing Officer", org: "Vodafone Japan and Verizon Wireless (West)" },
  { role: "Global Head of Commercial Strategy", org: "Vodafone" },
  { role: "Earlier career", org: "IBM and Bain & Company" },
  { role: "MBA", org: "Harvard Business School" },
  { role: "Professor of digital transformation", org: "Nagoya University of Commerce and Business" },
];

export const contactTopics = ["Book a demo", "AI consulting", "RFP management", "On premises deployment", "Partnership", "Something else"];
