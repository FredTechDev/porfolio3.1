// ---------------------------------------------------------------------------
// Single source of truth for identity, links and personal content.
// Search for "TODO" below and replace every placeholder with the real value.
// ---------------------------------------------------------------------------

export const SITE_URL = "https://fredrickonyango.vercel.app"; // TODO: final domain

export const profile = {
  name: "Fredrick Onyango",
  role: "Full-Stack Developer | Backend Engineer | AI/ML Engineer",
  shortRole: "Software Engineer | AI Builder | Product Innovator",
  location: "Kenya",
  tagline:
    "I build intelligent, scalable software solutions that transform real-world problems into practical digital products.",
  heroSupporting:
    "From system architecture and backend engineering to AI integration, databases, cloud infrastructure, and modern frontend development, I build technology with a focus on usability, scalability, and real-world impact.",
  email: "onyangofred1005@gmail.com",
  cvPath: "/Fredrick-Onyango-CV.pdf",
  github: "https://github.com/FredTechDev", // TODO: verify username
  linkedin: "https://www.linkedin.com/in/fredrickonyango", // TODO: verify slug
};

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const education = {
  // TODO: confirm institution, dates and qualification details.
  school: "Institution of Technology, Kenya",
  qualification: "Degree in Information Technology",
  status: "Currently studying",
};

export const philosophy = [
  "Understand the real problem before writing any code.",
  "Design the architecture first — the implementation follows the design.",
  "Ship working software, then improve it continuously.",
  "Prove capability with products and code, not claims.",
];

export const skillGroups = [
  {
    category: "Programming Languages",
    items: ["Java", "JavaScript", "TypeScript", "Python", "Go", "SQL", "C", "C++"],
  },
  {
    category: "Backend",
    items: ["Spring Boot", "Node.js", "Express.js", "Django"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "React Native"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "pgvector"],
  },
  {
    category: "AI / ML",
    items: [
      "Machine Learning",
      "Generative AI",
      "RAG",
      "Embeddings",
      "Vector Search",
      "LLM Integration",
      "AI APIs",
      "Computer Vision",
    ],
  },
  {
    category: "Cloud / DevOps",
    items: ["Docker", "Git", "GitHub", "Linux", "Cloudflare", "Render", "CI/CD"],
  },
];

export const experiences = [
  {
    role: "Developer",
    org: "Cine Creatives",
    period: "2025 — Present", // TODO: confirm dates
    type: "Employment",
    points: [
      "Develop and maintain web systems used by the business and its clients.",
      "Build backend services, integrate third-party APIs and manage deployments.",
      "Work across the stack: database design, API development and frontend delivery.",
      "Technologies: JavaScript/TypeScript, React, Node.js, PostgreSQL, cloud hosting.",
    ],
  },
  {
    role: "Founder & Lead Innovator",
    org: "Apex",
    period: "2025 — Present", // TODO: confirm dates
    type: "Product",
    points: [
      "Conceived Apex as a answer to real property-management pain points in Kenya.",
      "Own the product direction, system architecture and core technical decisions.",
      "Designed multi-tenant data models, role-based access control and reporting.",
      "Leading the build of tenant, payment, communication and operations workflows.",
    ],
  },
  {
    role: "Developer / Builder",
    org: "Kilele Archade",
    period: "2025 — Present", // TODO: confirm dates
    type: "Product",
    points: [
      "Building an AI-powered CBC-focused learning platform end to end.",
      "Designed and implemented the RAG pipeline: documents, embeddings, pgvector retrieval and LLM answers.",
      "Developed the React/TypeScript frontend and the Supabase/PostgreSQL backend.",
      "Integrated AI providers with fallback architecture, and Cloudinary for media.",
    ],
  },
];

export const achievements = [
  // TODO: replace with genuine achievements + proof links before launch.
  { title: "Launched Kilele Archade", detail: "Public AI learning platform live at kilelearchade.co.ke", kind: "Product" },
  { title: "Founded Apex", detail: "Property-management product from concept to working software", kind: "Product" },
  { title: "Hackathon participation", detail: "Built and presented prototypes at hackathons", kind: "Hackathon" },
];

export const currentlyLearning = [
  "Advanced Spring Boot",
  "AI Engineering",
  "Machine Learning",
  "Cloud Architecture",
  "Distributed Systems",
  "Data Engineering",
  "System Design",
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "AI & Engineering", to: "/ai-engineering" },
  { label: "Lab", to: "/lab" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
