import aiDiploma from "../assets/certificates/ai-diploma-intermediate.jpeg";
import ociAI from "../assets/certificates/oci-ai-foundations.jpg";
import elementsAI from "../assets/certificates/elements-of-ai-business-google.jpg";
import pythonAI from "../assets/certificates/python-data-science-ai-ibm.jpg";
import aiML from "../assets/certificates/ai-ml-foundations-sprints.png";
import reactBasics from "../assets/certificates/react-basics-hackerrank.jpg";
import frontendDiploma from "../assets/certificates/frontend-diploma-route.jpg";

import { Code, Brain, Database, Zap } from "lucide-react";

// -------------- certifications --------------------
export const certifications = [
  { title: "Artificial Intelligence Diploma – Intermediate Level", date: "Jan 2025", image: aiDiploma },
  { title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate", date: "Oct 2025", image: ociAI },
  { title: "Elements of AI For Business – Google", date: "Sep 2025", image: elementsAI },
  { title: "Python for Data Science and AI – IBM", date: "Jul 2025", image: pythonAI },
  { title: "AI and Machine Learning Foundations – Sprints", date: "Jun 2025", image: aiML },
  { title: "React Basics – HackerRank", date: "Apr 2025", image: reactBasics },
  { title: "Frontend Development Diploma – Route", date: "Mar 2025", image: frontendDiploma },
];

// -------------- experiences --------------------
export const experiences = [
  {
    title: "Associate AI Engineer",
    company: "IT-RANKS Technology",
    period: "May 2025 - Present",
    location: "Cairo, Egypt",
    achievements: [
      "Developed and fine-tuned range of NLP and Generative AI models to support diverse business applications, including information extraction, natural language querying, and automated content generation",
      "Built end-to-end AI pipelines covering data preprocessing, model training, evaluation, and inference to ensure high model performance and reliability",
      "Conducted dataset creation and annotation activities, improving model accuracy through targeted preprocessing, cleaning, and structured labelling",
      "Applied prompt engineering, continuous model refinement, and performance analysis to enhance model understanding, response quality, and real-world effectiveness"
    ]
  },
  {
    title: "Frontend Developer",
    company: "IT-RANKS Technology",
    period: "April 2025 - May 2025",
    location: "Cairo, Egypt",
    achievements: [
      "Developed responsive, high-performance web interfaces using React.js and Next.js, leveraging Tailwind CSS, MUI, and Bootstrap for modern, scalable UI design",
      "Implemented contemporary UI/UX principles to deliver polished and user-friendly applications",
      "Collaborated with backend teams to integrate APIs and optimize application performance and reliability"
    ]
  },
  {
    title: "AI Trainer",
    company: "Outlier",
    period: "July 2024 - March 2025",
    location: "Remote",
    achievements: [
      "Trained and evaluated multiple large language models, including Gemini, GPT-3.5, LLaMA, Claude, and Tara, leveraging RLHF to enhance response accuracy, domain comprehension, and adherence to safety guidelines",
      "Conducted multi-dimensional assessment and preference ranking of model outputs, evaluating correctness, instruction adherence, writing quality, and safety while applying prompt engineering techniques to optimize responses",
      "Reviewed and enhanced practical code generation and text outputs, ensuring responses were concise, instruction-compliant, and aligned with project requirements"
    ]
  }
];

// -------------- Projects --------------------
export const projects = [
  {
    title: "Document Understanding System",
    company: "IT-RANKS",
    description:
      "Fine-tuned transformer-based and deep learning OCR models to enhance Arabic text recognition for production use cases. Built complete data preprocessing and inference pipelines and integrated models using FastAPI.",
    tech: ["PyTorch", "FastAPI", "Flask", "WebSocket", "Transformers", "OCR"],
    icon: Database,
  },
  {
    title: "Al Jasser Digital Assistant",
    company: "IT-RANKS",
    description: "Developed a digital assistant on Oracle platform enabling natural language interaction with databases. Designed end-to-end AI workflows on OCI including model training and prompt engineering.",
    tech: ["Oracle OCI", "NLP", "LLM", "Prompt Engineering"],
    icon: Brain,
  },
  {
    title: "Savola Safety Detection",
    company: "IT-RANKS",
    description: "Annotated and preprocessed data using Label Studio to train a computer vision model with object detection for identifying worker safety gear from camera footage.",
    tech: ["Computer Vision", "Object Detection", "Label Studio"],
    icon: Zap,
  },
  {
    title: "R Eyes Optic Automation",
    company: "Freelance",
    description: "Developed and deployed a real-time RAG-based automation model integrated with e-commerce system and connected to WhatsApp and Meta to automate customer support.",
    tech: ["RAG", "WhatsApp API", "Meta API", "Real-time Processing"],
    icon: Code,
  },
];

// -------------- Skills --------------------
export const skills = [
  { category: "AI/ML", items: ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "Computer Vision", "Model Training & Evaluation"] },
  { category: "AI Techniques", items: ["RLHF", "RAG", "OCR", "Prompt Engineering", "Data Preprocessing & Annotation"] },
  { category: "Frameworks", items: ["PyTorch", "Hugging Face Transformers", "TensorFlow", "FastAPI", "Flask"] },
  { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "MUI", "Bootstrap"] },
  { category: "Cloud & Tools", items: ["Oracle OCI", "Label Studio", "WebSocket", "Git", "Docker"] },
];

// ---------- Hero ----------
export const heroData = {
  name: "Basel Mohamed Ahmed",
  title: "Associate AI Engineer",
  subtitle:
    "Specializing in NLP, Generative AI, and Machine Learning. Building intelligent solutions that transform data into actionable insights.",
  email: "baselmohamed937@gmail.com",
  github: "https://github.com/Basel-Mohamed",
};

// ---------- About ----------
export const aboutData = {
  paragraphs: [
    "Associate AI Engineer with hands-on experience in NLP, Generative AI, and machine learning projects. I specialize in document understanding (OCR), RAG pipelines, and RLHF.",
    "Experienced in data preprocessing, annotation, model training, and evaluation using Python, PyTorch, and Hugging Face Transformers. Strong background in frontend development with React.js."
  ],
  info: [
    { iconKey: "location", label: "Location", value: "Maadi, Cairo, Egypt" },
    { iconKey: "phone", label: "Phone", value: "01007337686" },
    { iconKey: "email", label: "Email", value: "baselmohamed937@gmail.com" },
  ],
};

// ---------- Education ----------
export const educationData = {
  degree: "Bachelor's Degree",
  field: "Civil Engineering",
  university: "Helwan University",
  period: "2019 – 2024",
  grade: "Good",
};