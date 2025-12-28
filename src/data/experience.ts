export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  logo?: string;
  color: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "AI Developer Intern",
    company: "YourAllyStack",
    period: "Sept 2025 - Present",
    points: [
      "Built an AI-driven interview question generation engine with RESTful APIs using Google Gemini and OpenAI models, automating domain-specific questions and multi-level follow-ups, reducing manual interview setup by 90%.",
      "Optimized LLM latency and system throughput through prompt compression, token usage tracking, and model routing, achieving 70-80% faster response times and improved platform stability."
    ],
    color: "cyan"
  },
  {
    id: "2",
    role: "DeepLearning Research Intern",
    company: "Institute of Infrastructure Research And Management",
    period: "June 2024 - July 2024",
    points: [
      "Researched ML/DL-based sleep stage classification, achieving up to 86% accuracy using non-invasive PPG.",
      "Developed and implemented ML models with residual convolutional blocks and temporal convolutional networks, improving predictive accuracy by 10-15% compared to traditional methods.",
      "Orchestrated data cleaning and preprocessing workflows with Pandas and Scikit-learn, resulting in a 15% reduction in model error rate by eliminating noise in sleep stage classification datasets."
    ],
    color: "purple"
  }
];
