export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string;
  tech: string[];
  link: string;
  image?: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Customer Support Voice Agent",
    description: "Built a real-time Agentic AI Voice Agent using Twilio, Deepgram, OpenAI, and SQLite for complaint booking, tracking, escalation, and sentiment-aware responses.",
    highlights: "Deployed bilingual (English + Hindi) telephony support with persistent storage, reducing manual workload by 70% and achieving <2s latency.",
    tech: ["Twilio", "Deepgram", "OpenAI", "SQLite", "Python", "FastAPI"],
    link: "https://github.com/aks-hit/Customer_Support_Voice_agent",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: "2",
    title: "Real-Time Sign Language to Text and Speech Conversion",
    description: "Developed an ASL recognition system using MediaPipe, OpenCV, and a CNN model with 95% accuracy on 30+ gestures.",
    highlights: "Integrated Tkinter GUI + text-to-speech with 1.5s latency, enabling accessibility for 100+ test users.",
    tech: ["MediaPipe", "OpenCV", "TensorFlow", "CNN", "Python", "Tkinter"],
    link: "#",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: "3",
    title: "CI/CD Pipeline for Drug Classification Model",
    description: "Engineered a Random Forest classifier (95% accuracy) and automated CI/CD with GitHub Actions + CML for monitoring and evaluation.",
    highlights: "Deployed model to Hugging Face Hub with real-time accessibility for 1000+ users, ensuring reproducibility and governance.",
    tech: ["Random Forest", "GitHub Actions", "CML", "Hugging Face", "MLOps"],
    link: "https://github.com/aks-hit/CICD-for-ML",
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: "4",
    title: "Shulk: Financial Management Platform",
    description: "Spearheaded development of an AI-driven financial advisory platform, delivering personalized strategies to 1000+ users.",
    highlights: "Built with modern AI/ML techniques to provide intelligent financial insights and recommendations.",
    tech: ["AI/ML", "Python", "FastAPI", "React", "PostgreSQL"],
    link: "#",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "5",
    title: "Machine Learning for Diabetes Prediction",
    description: "Developed a 92% accurate SVM-based diabetes predictor with a Streamlit interface receiving 500+ user interactions in the first month.",
    highlights: "Deployed with interactive visualizations and real-time predictions for healthcare professionals.",
    tech: ["SVM", "Streamlit", "Scikit-learn", "Pandas", "Python"],
    link: "https://diabetespredicting.streamlit.app/",
    gradient: "from-indigo-500 to-purple-600"
  }
];