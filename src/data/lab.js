// The Lab — smaller technical experiments. Each is short: description, stack, GitHub.
// TODO: confirm repo URLs and add/remove experiments to match reality.

export const labExperiments = [
  {
    name: "ESP32 Smart Weather System",
    description:
      "IoT experiment using environmental sensors, MQTT, and cloud services to collect and process environmental data.",
    stack: ["ESP32", "MQTT", "C++", "Cloud"],
    repo: "https://github.com/FredTechDev/esp32-weather", // TODO
  },
  {
    name: "RAG Strategy Bench",
    description:
      "Side-by-side evaluation of chunk sizes, embedding models and retrieval strategies on the same document set.",
    stack: ["Python", "pgvector", "LLM APIs"],
    repo: "https://github.com/FredTechDev/rag-explorer", // TODO
  },
  {
    name: "AI Provider Fallback Harness",
    description:
      "Test rig that simulates provider failures to verify transparent failover across LLM backends.",
    stack: ["Node.js", "TypeScript", "LLM APIs"],
    repo: "https://github.com/FredTechDev/provider-fallback", // TODO
  },
  {
    name: "Computer Vision Attendance",
    description: "Face-embedding based attendance prototype with all processing kept on-device.",
    stack: ["Python", "OpenCV"],
    repo: "https://github.com/FredTechDev/vision-attendance", // TODO
  },
  {
    name: "Automation Scripts Collection",
    description: "Deployment, data-cleaning and repo-automation scripts that removed daily manual chores.",
    stack: ["Bash", "Python", "CI/CD"],
    repo: "https://github.com/FredTechDev/automation", // TODO
  },
];
