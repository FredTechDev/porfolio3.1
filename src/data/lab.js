// The Lab — smaller technical experiments. Each has enough substance to stand
// as its own page: what it tested, how it works, what came out of it.
// TODO: confirm repo URLs and add/remove experiments to match reality.

export const labExperiments = [
  {
    slug: "esp32-smart-weather-system",
    name: "ESP32 Smart Weather System",
    description:
      "An ESP32 station reading temperature, humidity and air quality, publishing over MQTT to a cloud dashboard — built to learn embedded data pipelines end to end.",
    stack: ["ESP32", "MQTT", "C++", "Cloud"],
    repo: "https://github.com/FredTechDev/esp32-weather", // TODO
    date: "2025-01-01",
    problem:
      "Weather apps give city-level forecasts. A school or homestead wants to know what the air is like outside that specific building — and generic IoT kits stopped at the phone app.",
    approach: [
      "An ESP32 samples DHT22 and air-quality sensors on a fixed interval, applies simple smoothing on-device, and publishes JSON payloads over MQTT so the transport survives flaky connections.",
      "A small cloud service subscribes to the topics, stores readings in PostgreSQL and exposes them to a dashboard — the same relational-plus-API shape used in the web projects, with an embedded device bolted on the front.",
    ],
    outcome:
      "A working sensor-to-database pipeline and first-hand constraints of embedded work: duty cycling, buffering through network drops, and keeping the device firmware dumb while putting intelligence server-side.",
  },
  {
    slug: "rag-strategy-bench",
    name: "RAG Strategy Bench",
    description:
      "Side-by-side evaluation of chunk sizes, embedding models and retrieval strategies on the same document set — the harness that picked Kilele Archade's retrieval settings.",
    stack: ["Python", "pgvector", "LLM APIs"],
    repo: "https://github.com/FredTechDev/rag-explorer", // TODO
    date: "2025-06-01",
    problem:
      "RAG demos look identical until you measure them. Picking chunk size or an embedding model by intuition means guessing with a production system on the line.",
    approach: [
      "One fixed question set with known-good source passages. The harness runs every configuration — chunk sizes, overlap, embedding model, top-k, metadata pre-filtering, re-ranking — through the same corpus and scores retrieval hits and answer faithfulness.",
      "Results land in PostgreSQL so each run is queryable: retrieval settings become a table you can diff instead of a Slack thread of vibes.",
    ],
    outcome:
      "The retrieval configuration shipped in Kilele Archade came from this bench: metadata-filtered pgvector search with re-ranking beat naive top-k on the same corpus. It also proved that improving retrieval is mostly an engineering task, not a bigger-model task.",
  },
  {
    slug: "ai-provider-fallback-harness",
    name: "AI Provider Fallback Harness",
    description:
      "A test rig that simulates provider failures — timeouts, rate limits, malformed responses — to verify transparent failover across LLM backends.",
    stack: ["Node.js", "TypeScript", "LLM APIs"],
    repo: "https://github.com/FredTechDev/provider-fallback", // TODO
    date: "2025-09-01",
    problem:
      "A single AI provider in the request path is a single point of failure. Failover code written against happy-path traffic is untested code.",
    approach: [
      "The harness fronts two providers with a fault injector: artificial latency, HTTP 429 bursts, truncated streams and invalid JSON. It asserts the caller always gets an answer, in bounded time, from whichever backend is healthy.",
      "Every failover is logged with the reason, so an outage window reads as a timeline instead of a mystery.",
    ],
    outcome:
      "The fallback layer running behind Kilele Archade's AI tutor was hardened here — same prompt, different backend, no student-facing error. The fault-injection pattern generalises to any multi-provider integration.",
  },
  {
    slug: "computer-vision-attendance",
    name: "Computer Vision Attendance",
    description:
      "Face-embedding based attendance prototype where every bit of processing stays on-device — no biometric data leaves the machine.",
    stack: ["Python", "OpenCV"],
    repo: "https://github.com/FredTechDev/vision-attendance", // TODO
    date: "2024-11-01",
    problem:
      "Roll-call attendance in a 40-student class burns teaching minutes. Cloud face recognition fixes that but ships biometric data to someone else's servers.",
    approach: [
      "Enrolment captures a few faces per student and stores embeddings locally; a marked session compares live camera frames against those embeddings with a cosine threshold, all on-device.",
      "The output is a simple CSV of present/absent with timestamps — the only record kept is attendance, never raw photos.",
    ],
    outcome:
      "A working privacy-first prototype and a sharper instinct for where on-device ML beats cloud ML — and honest awareness of its limits (lighting, angle, twins of a classroom).",
  },
  {
    slug: "automation-scripts-collection",
    name: "Automation Scripts Collection",
    description:
      "Deployment, data-cleaning and repo-automation scripts that removed daily manual chores across my projects.",
    stack: ["Bash", "Python", "CI/CD"],
    repo: "https://github.com/FredTechDev/automation", // TODO
    date: "2025-03-01",
    problem:
      "Repetitive glue work — migrations, seed data, release tagging, log triage — quietly eats hours every week and introduces mistakes when done by hand at 11pm.",
    approach: [
      "Each chore becomes one small script with a single job, committed and documented rather than living in shell history. The scripts compose into GitHub Actions where a task needed to run on every push or release.",
      "Data-cleaning helpers standardise how messy CSV exports get normalised before loading into PostgreSQL.",
    ],
    outcome:
      "A personal internal-tools library: fewer manual steps, reproducible deployments, and the habit of automating the second occurrence of any task instead of the tenth.",
  },
];

export function getLabExperiment(slug) {
  return labExperiments.find((x) => x.slug === slug);
}
