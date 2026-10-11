// ---------------------------------------------------------------------------
// Featured projects with full case-study content, plus secondary work.
// TODO markers indicate facts to confirm before launch (repo URLs, dates).
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: "kilele-archade",
    name: "Kilele Archade",
    featured: true,
    status: "Live product",
    summary:
      "An AI-powered CBC-focused learning platform providing intelligent learning assistance, revision, assessments, educational resources and personalised learning.",
    problem:
      "Kenyan CBC students need guided, curriculum-aware learning support that goes beyond static notes — help that adapts to the learner, the subject and the competence being worked on.",
    tags: ["EdTech", "AI", "RAG", "Full-stack"],
    stack: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "Cloudinary",
      "Cloudflare AI",
      "AI/LLM providers",
      "RAG",
      "Embeddings",
      "Vector search",
    ],
    live: "https://kilelearchade.co.ke",
    repo: "https://github.com/FredTechDev/kilele-archade", // TODO: final repo URL
    role: "Full-stack developer — architecture, AI pipeline, backend and frontend",
    caseStudy: {
      overview:
        "Kilele Archade is a CBC-focused learning platform that combines curriculum-aware AI tutoring with document-based learning, quizzes, assessments, dashboards for students, teachers and parents, and PDF learning resources.",
      problem:
        "Learners revise from scattered resources with no feedback loop; teachers manage content manually; parents have little visibility. Generic chat assistants do not understand the CBC structure or a school's own materials.",
      solution:
        "A platform where learning documents are ingested, chunked and embedded into a vector store. When a student asks a question, the system retrieves the most relevant curriculum context and answers against it — grounded, cited and CBC-aware — instead of answering from a model's raw memory.",
      role: [
        "Designed the overall system architecture and data model.",
        "Built the RAG pipeline: document ingestion, chunking, embedding generation and pgvector retrieval.",
        "Implemented the AI provider layer with fallback across providers for reliability.",
        "Developed the React/TypeScript frontend and Supabase backend: auth, roles, content management.",
        "Integrated Cloudinary for media storage and delivery.",
      ],
      features: [
        "AI tutor grounded in curriculum documents (RAG)",
        "CBC-aware learning paths and competences",
        "PDF learning resources with document-based Q&A",
        "Smart revision and practice quizzes / assessments",
        "Student dashboards with progress tracking",
        "Teacher content management",
        "Parent visibility features",
        "Live learning functionality",
      ],
      architecture: [
        "Student / Teacher / Parent",
        "React + TypeScript frontend",
        "Supabase API & Auth (row-level security)",
        "Application logic & role checks",
        "Document retrieval — pgvector similarity search",
        "Relevant curriculum context assembled",
        "LLM provider with fallback chain",
        "Grounded response + citations",
      ],
      stackNote:
        "PostgreSQL with pgvector doubles as the relational store and the vector index, keeping the platform on one database under Supabase's auth and storage model.",
      challenges: [
        "AI answers drifting away from the actual curriculum when context retrieval is weak.",
        "Provider outages or rate limits taking the tutor offline.",
        "Keeping document retrieval fast as the resource library grows.",
        "Designing one data model that serves students, teachers and parents with very different permissions.",
      ],
      solutions: [
        "Tuned chunking and embedding strategy per document type and re-ranked retrieved passages before prompting, so answers stay grounded in curriculum material.",
        "Built a provider fallback layer: if the primary LLM fails or is throttled, the request transparently moves to a secondary provider (including Cloudflare AI).",
        "Used pgvector indexes and precomputed embeddings at ingestion time, keeping queries to nearest-neighbour lookups rather than recomputation.",
        "Modelled roles around Supabase row-level security so each actor only ever queries the rows they own or are assigned.",
      ],
      results:
        "Kilele Archade is live at kilelearchade.co.ke with the AI tutor, document learning, quizzes and role dashboards forming the core of the product, and continues to evolve through real classroom feedback.",
      links: [
        { label: "Live Website", href: "https://kilelearchade.co.ke" },
        { label: "GitHub", href: "https://github.com/FredTechDev/kilele-archade" }, // TODO
      ],
    },
  },
  {
    slug: "apex",
    name: "Apex",
    featured: true,
    status: "In active development",
    summary:
      "A rental management and property automation platform simplifying property, tenant, payment, reporting, communication and operational workflows.",
    problem:
      "Small and mid-size landlords and property managers track rents, vacancies and repairs in notebooks and spreadsheets — leading to missed payments, lost tenant records and no operational visibility.",
    tags: ["PropTech", "SaaS", "Automation", "Founder"],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "M-PESA Daraja API",
      "SMS integration",
      "Cloud hosting",
    ],
    live: "https://apexstates.cinecreatives.org",
    repo: null, // private product repo — intentionally not linked
    role: "Founder & lead developer — product concept, architecture and core implementation",
    caseStudy: {
      overview:
        "Apex is a cloud-based rental management platform: properties and units, tenants and leases, rent and payment tracking with balances, vacancies, repair requests, notifications over SMS, reporting, and role-based access across the organisation.",
      problem:
        "Property management in Kenya is largely manual. Rent reconciliation happens by memory or paper, tenants chase landlords for repairs, and owners cannot see the state of their portfolio — arrears, vacancies, maintenance load — in one place.",
      solution:
        "One system of record for the property business. Every unit has a lifecycle (occupied, vacant, under maintenance); every payment posts against a tenant ledger producing live balances; repair requests, reminders and reports fall out of the same data model.",
      role: [
        "Defined the product concept from conversations with working landlords.",
        "Designed the multi-property data model and role-based access architecture.",
        "Implemented core modules: properties/units, tenants, rent ledger and payment tracking.",
        "Built notification workflows (SMS reminders for rent and repairs).",
        "Integrated M-PESA payment flows where implemented and structured reporting on top of the ledger.",
      ],
      features: [
        "Property, unit and tenant management",
        "Rent invoicing, payment tracking and live balances",
        "Vacancy tracking",
        "Repair requests and maintenance workflow",
        "SMS notifications for rent and repairs",
        "Operational and financial reports",
        "Role-based access control (owner, manager, tenant-facing views)",
        "M-PESA / payment integration",
        "Cloud-based infrastructure",
      ],
      architecture: [
        "Owner / Manager / Tenant",
        "React frontend",
        "API layer with authentication",
        "Role-based authorisation",
        "Business logic — leases, ledger, maintenance",
        "PostgreSQL (properties, tenants, payments)",
        "External services — M-PESA, SMS gateway",
        "Reports & notifications",
      ],
      stackNote:
        "The payment ledger is append-only by design: balances are derived from recorded transactions, never edited directly, so reports always reconcile.",
      challenges: [
        "Modelling rent arrears, partial payments and adjustments without corrupting balances.",
        "Making SMS reminders reliable and idempotent when gateways retry.",
        "Giving multiple staff members correct, scoped visibility without leaking data across properties.",
      ],
      solutions: [
        "Ledger approach: every payment and adjustment is a transaction row; tenant balance is a derived sum, which makes partial payments and corrections natural and auditable.",
        "Notification jobs carry idempotency keys so a retried gateway call never double-texts a tenant.",
        "Access control is evaluated per property membership plus role, enforced in the API layer rather than the UI.",
      ],
      results:
        "Apex is in active development with the core property, tenant and payment modules built, being hardened with real landlords before public launch. The live product is at apexstates.cinecreatives.org; administrative credentials and private dashboards are never exposed from this portfolio.",
      links: [
        { label: "Live Demo", href: "https://apexstates.cinecreatives.org" },
        { label: "Case study enquiry", href: "mailto:fredrickonyango.dev@example.com?subject=Apex%20enquiry" }, // TODO: real email
      ],
    },
  },
  {
    slug: "mediflow",
    name: "MediFlow",
    featured: true,
    status: "Prototype",
    summary:
      "A clinic workflow prototype for patient records, appointments and queue management — built to explore appointment scheduling and role-scoped clinical data.",
    problem:
      "Small clinics juggle paper registers for appointments and patient follow-ups, creating queues and lost history.",
    tags: ["HealthTech", "Backend", "Full-stack"],
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    live: null, // TODO: demo URL if deployed
    repo: "https://github.com/FredTechDev/mediflow", // TODO: confirm
    role: "Sole developer",
    caseStudy: {
      overview:
        "MediFlow prototypes patient registration, appointment scheduling and a consultation queue for small clinics.",
      problem: "Paper-based scheduling makes clinic flow slow and records hard to retrieve.",
      solution:
        "A shared digital queue: reception books, doctors see an ordered waiting list, and visit history is searchable per patient.",
      role: ["Designed the schema and API", "Built the staff UI", "Implemented scheduling and queue logic"],
      features: ["Patient records", "Appointments", "Live queue", "Visit history"],
      architecture: [
        "Reception / Clinician",
        "React frontend",
        "Express API with auth",
        "Clinic logic — scheduling, queue",
        "PostgreSQL",
      ],
      stackNote: "Deliberately small: one service, one database, boring technology.",
      challenges: ["Modelling recurring and ad-hoc appointments in one timeline."],
      solutions: [
        "Appointments normalise to time slots with a status lifecycle, so walk-ins and bookings share the queue.",
      ],
      results: "Prototype complete; not yet deployed in a live clinic.",
      links: [{ label: "GitHub", href: "https://github.com/FredTechDev/mediflow" }], // TODO
    },
  },
];

// Secondary work — deliberately light: description, stack, GitHub | Live Demo.
export const otherProjects = [
  {
    category: "AI / Machine Learning",
    items: [
      {
        name: "CourseMate RAG Explorer",
        description:
          "Experiment harness for testing chunking, embedding and re-ranking strategies on study documents.",
        stack: ["Python", "pgvector", "LLM APIs"],
        repo: "https://github.com/FredTechDev/rag-explorer", // TODO
        live: null,
      },
      {
        name: "Vision Attendance Prototype",
        description:
          "Camera-based attendance experiment using face embeddings with privacy-focused local processing.",
        stack: ["Python", "OpenCV", "Machine Learning"],
        repo: "https://github.com/FredTechDev/vision-attendance", // TODO
        live: null,
      },
      {
        name: "Marketsignal Predictor",
        description: "Time-series forecasting experiment comparing classical and ML approaches on price data.",
        stack: ["Python", "scikit-learn", "Pandas"],
        repo: "https://github.com/FredTechDev/marketsignal", // TODO
        live: null,
      },
    ],
  },
  {
    category: "Data",
    items: [
      {
        name: "County Data Dashboard",
        description: "Public county-level data cleaning, joining and visualisation for exploratory analysis.",
        stack: ["Python", "SQL", "Visualization"],
        repo: "https://github.com/FredTechDev/county-data", // TODO
        live: null,
      },
      {
        name: "Querybench",
        description:
          "PostgreSQL indexing playground: seeded datasets, measured query plans, before/after index experiments.",
        stack: ["PostgreSQL", "SQL", "Docker"],
        repo: "https://github.com/FredTechDev/querybench", // TODO
        live: null,
      },
    ],
  },
  {
    category: "Software Engineering",
    items: [
      {
        name: "Ledger API",
        description: "Double-entry bookkeeping REST API with reporting endpoints and test coverage.",
        stack: ["Spring Boot", "PostgreSQL", "REST"],
        repo: "https://github.com/FredTechDev/ledger-api", // TODO
        live: null,
      },
      {
        name: "Devflow CLI",
        description: "Developer productivity CLI chaining repo setup, env checks and deploy shortcuts.",
        stack: ["Node.js", "TypeScript"],
        repo: "https://github.com/FredTechDev/devflow-cli", // TODO
        live: null,
      },
      {
        name: "Sync Mobile App",
        description: "React Native companion app syncing offline-first task data with a REST backend.",
        stack: ["React Native", "Node.js", "SQLite"],
        repo: "https://github.com/FredTechDev/sync-app", // TODO
        live: null,
      },
    ],
  },
  {
    category: "IoT",
    items: [
      {
        name: "ESP32 Weather Node",
        description:
          "ESP32 station reading environmental sensors and publishing over MQTT to a cloud collector.",
        stack: ["ESP32", "C++", "MQTT"],
        repo: "https://github.com/FredTechDev/esp32-weather", // TODO
        live: null,
      },
    ],
  },
  {
    category: "Hackathons",
    items: [
      {
        name: "Hackathon prototypes",
        description:
          "Rapid builds produced at hackathons — kept here as evidence of shipping under time pressure.",
        stack: ["Varies"],
        repo: "https://github.com/FredTechDev?tab=repositories", // TODO
        live: null,
      },
    ],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
