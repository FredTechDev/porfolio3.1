// Blog posts. The writing below is drafted from the project experience described
// in this portfolio — TODO: review, edit and publish only what is genuinely yours.

export const posts = [
  {
    slug: "building-kilele-archade-ai-learning-platform-kenya",
    title: "Building Kilele Archade: an AI Learning Platform for Kenya's CBC Curriculum",
    date: "2026-10-12",
    category: "Product Engineering",
    readingMinutes: 7,
    author: "Fredrick Onyango",
    relatedProjects: ["kilele-archade"],
    excerpt:
      "The full story behind kilelearchade.co.ke — why I built a CBC-focused AI tutor in Nairobi, how the product took shape, and what shipping a real platform for Kenyan students and teachers taught me.",
    body: [
      {
        h: "Why build an EdTech product in Kenya",
        p: [
          "The CBC competence-based curriculum asks students to explore, and teachers to guide across large classes with limited resources. Generic chatbots do not know the CBC syllabus, a Kenyan school's notes or a student's actual competence level. I wanted an AI tutor grounded in the material students are actually examined on — built here in Nairobi, shipping to real classrooms.",
          "Kilele Archade (kilelearchade.co.ke) is that product: document-based learning, an AI tutor that cites the source, quizzes with explanations, and separate dashboards for learners, teachers and parents.",
        ],
      },
      {
        h: "The architecture in one paragraph",
        p: [
          "React and TypeScript on the front. Supabase and PostgreSQL behind it — with pgvector holding embeddings next to the relational rows for subjects, levels and competences, so retrieval is a query, not a separate service. Curriculum documents flow through an ingestion pipeline into chunks and vectors; the tutor answers only from retrieved context, with a fallback provider layer so a single AI vendor outage never reaches a student.",
        ],
      },
      {
        h: "What the classrooms changed",
        p: [
          "Building alone gets you to 'it works'. Real users get you to 'it works for them'. Early teacher feedback moved the product more than any technical decision: answers had to show which document page they came from before teachers would trust the tutor at all; the tutor may explain and hint, but assessment sessions run with that context locked away.",
        ],
      },
      {
        h: "Solo, but not unmanaged",
        p: [
          "One engineer holding product, frontend, backend, AI pipeline and deployments forces boring choices: one database, one hosting story, scripts for anything done twice, and a retrieval bench (see the Lab) so configuration changes are measured instead of argued with myself.",
        ],
      },
      {
        h: "Where it goes from here",
        p: [
          "Kilele Archade is live at kilelearchade.co.ke and still evolving through classroom feedback. The next fronts are broader subject coverage, offline-friendly access for areas with patchy connectivity, and better analytics so a teacher sees a struggling student before report day does.",
        ],
      },
    ],
  },
  {
    slug: "role-based-dashboards-teachers-students-parents",
    title: "Role-Based Dashboards for Teachers, Students and Parents",
    date: "2026-08-20",
    category: "System Architecture",
    readingMinutes: 5,
    author: "Fredrick Onyango",
    relatedProjects: ["kilele-archade"],
    excerpt:
      "One learning platform, three very different users. How the teacher/student/parent model behind Kilele Archade was designed — roles, row-level security and the privacy boundaries between them.",
    body: [
      {
        h: "Three users, three different questions",
        p: [
          "A student opens the app asking 'what do I learn next?'. A teacher asks 'who is stuck?'. A parent asks 'is my child actually working?'. A single dashboard answering all three answers none of them well, so Kilele Archade ships one application with three distinct surfaces over the same data.",
        ],
      },
      {
        h: "The role model",
        p: [
          "Roles attach at the relationship level, not just the account level: a teacher belongs to a class, a parent is linked to specific students, a student is enrolled in subjects. Every request resolves what the caller can see through those links before any content query runs.",
        ],
      },
      {
        h: "Enforcing it with row-level security",
        p: [
          "Rather than trusting application code alone, visibility lives in Supabase policies: rows carry their class and linkage, and the database refuses reads that do not match the caller's role claims. A bug in one endpoint cannot turn into a data leak across the platform.",
        ],
      },
      {
        h: "The privacy boundary nobody mentions",
        p: [
          "A parent should see that a child is engaging and progressing — not every answer they got wrong in a private study session. The dashboards were deliberately asymmetric: learners get granular self-view, guardians get aggregated signals, teachers get class-level detail. Same events, three zoom levels.",
        ],
      },
      {
        h: "What I would reuse",
        p: [
          "Relationship-scoped roles, database-enforced visibility and zoom-level dashboards are not EdTech-specific. Any multi-sided product — clinics, gyms, tutoring, PropTech rentals like Apex — needs exactly this skeleton, and designing it early is much cheaper than retrofitting it after the first privacy conversation.",
        ],
      },
    ],
  },
  {
    slug: "building-a-rag-system-for-an-educational-platform",
    title: "Building a RAG System for an Educational Platform",
    date: "2026-06-18",
    category: "AI Engineering",
    readingMinutes: 7,
    author: "Fredrick Onyango",
    relatedProjects: ["kilele-archade"],
    excerpt:
      "How Kilele Archade grounds its AI tutor in actual curriculum documents — ingestion, chunking, pgvector retrieval and provider fallback — instead of letting a model answer from memory.",
    body: [
      {
        h: "The problem with 'chat, but for school'",
        p: [
          "A general chatbot answering a CBC question is guessing. It was not trained on your syllabus, it does not know your school's notes, and it cannot tell you which page an answer came from. For Kilele Archade the requirement was the opposite: every AI answer had to be traceable to real curriculum material.",
          "That is the case for Retrieval-Augmented Generation. The model does not answer from memory alone — it answers from retrieved context, and says where it got it.",
        ],
      },
      {
        h: "Ingestion: documents become searchable knowledge",
        p: [
          "Curriculum PDFs and notes go through a pipeline: text extraction, cleaning, then chunking sized for retrieval rather than for reading. Each chunk is embedded into a vector and stored in PostgreSQL with pgvector, next to the relational rows that describe the subject, level and competence it belongs to.",
          "Storing embeddings in the same database as the documents meant one security model (Supabase row-level security) and one backup story, instead of bolting on a separate vector service.",
        ],
      },
      {
        h: "Retrieval: nearest neighbours are only the start",
        p: [
          "A raw top-k similarity search returned chunks that were related but not always useful. Two changes mattered most: filtering candidates by curriculum metadata before vector similarity, and re-ranking the retrieved passages before they went into the prompt.",
          "The retrieval step became: filter to the right subject and level, pull nearest chunks with a pgvector index, re-rank, then assemble only the passages that fit the context budget.",
        ],
      },
      {
        h: "Generation: grounded answers with fallback",
        p: [
          "The prompt template instructs the model to answer only from the supplied context and cite sources. If no provider responds — outage, rate limit — the request falls through to a secondary provider rather than failing in front of a student.",
          "The fallback layer is deliberately boring: the same prompt, a different backend, and a log line so outages are visible instead of mysterious.",
        ],
      },
      {
        h: "What it bought us",
        p: [
          "Answers students can verify, a tutor that works across at least two AI providers without either being a single point of failure, and a pipeline where improving retrieval is an engineering task (better chunking, better ranking) rather than hoping a bigger model fixes it.",
        ],
      },
    ],
  },
  {
    slug: "designing-ai-powered-learning-systems",
    title: "Designing AI-Powered Learning Systems",
    date: "2026-04-30",
    category: "AI Engineering",
    readingMinutes: 6,
    author: "Fredrick Onyango",
    relatedProjects: ["kilele-archade"],
    excerpt:
      "What building Kilele Archade taught me about where AI genuinely helps learners — and where plain software engineering does the job better.",
    body: [
      {
        h: "Start from the learner, not the model",
        p: [
          "The first version of every question was: does this help a student understand a competence faster? Features like 'AI magic' that failed that question got cut. Dashboards, quizzes and document access did most of the heavy lifting before any model call was made.",
        ],
      },
      {
        h: "Where AI genuinely helped",
        p: [
          "Three places earned their keep: answering questions grounded in the student's own materials, generating revision variants from existing content, and explaining a wrong quiz answer in context. In each case the AI was amplifying content the platform already had, not replacing it.",
        ],
      },
      {
        h: "Where ordinary engineering helped more",
        p: [
          "Progress tracking, role management for teachers and parents, content versioning — none of that needs a model. Keeping those layers deterministic made the AI layer easier to trust, because the data going in and the audit coming out were exact.",
        ],
      },
      {
        h: "Assessment integrity",
        p: [
          "An AI tutor next to an assessment system is a design tension. The split that worked: the tutor can explain, hint and revise, but assessment sessions run against a locked context with no tutor access. Learners get help while they learn, not while they are being measured.",
        ],
      },
      {
        h: "The loop that matters",
        p: [
          "Watch where students actually struggle → change the smallest piece of the system that fixes it → measure again. Sometimes the fix is a better retrieval filter, sometimes it is one more sentence in a prompt, sometimes it is a plain UI change. Treating all three as the same engineering loop is the real lesson.",
        ],
      },
    ],
  },
  {
    slug: "postgresql-and-pgvector-for-ai-applications",
    title: "PostgreSQL and pgvector for AI Applications",
    date: "2026-02-14",
    category: "Databases",
    readingMinutes: 5,
    author: "Fredrick Onyango",
    relatedProjects: ["kilele-archade"],
    excerpt:
      "Why I chose to keep vectors and relational data in one PostgreSQL database — and what that trade actually costs and saves.",
    body: [
      {
        h: "The default move is a separate vector database. I didn't take it.",
        p: [
          "Every AI stack article assumes a dedicated vector store. But Kilele Archade's vectors describe rows that already live in PostgreSQL — documents, subjects, competences. Splitting them across two systems meant two security models, two backups and a sync problem I did not need.",
        ],
      },
      {
        h: "What one database buys you",
        p: [
          "Joins between embeddings and metadata are just SQL. Row-level security covers vectors and documents identically. Transactions mean a document and its embeddings appear or fail together. pgvector's index keeps similarity search fast enough for an app at this scale, and operational overhead stays close to zero.",
        ],
      },
      {
        h: "What it costs",
        p: [
          "At very large scale, dedicated vector engines offer features pgvector does not: advanced quantisation, GPU search, complex filtering strategies. The honest engineering answer is that the platform is nowhere near the point where that matters, and the simpler system is the correct one until evidence says otherwise.",
        ],
      },
      {
        h: "Practical notes",
        p: [
          "Pick an embedding dimension once and store it in a column, because changing models means re-embedding everything. Index after the corpus is big enough to matter, not before. Measure retrieval quality with a fixed question set before tuning anything.",
        ],
      },
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
