// Blog posts. The writing below is drafted from the project experience described
// in this portfolio — TODO: review, edit and publish only what is genuinely yours.

export const posts = [
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
