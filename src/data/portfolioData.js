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
    location: "New Cairo, Cairo, Egypt",
    achievements: [
      "Developed and fine-tuned NLP and Generative AI models for real-world business applications including information extraction, natural language querying, and automated content generation",
      "Built end-to-end AI pipelines covering data preprocessing, dataset creation, model training, evaluation, and inference to ensure production-ready performance",
      "Created and annotated datasets with structured labeling, cleaning, and preprocessing techniques to improve model accuracy and robustness",
      "Applied prompt engineering, continuous model refinement, and performance analysis to enhance response quality and real-world effectiveness"
    ]
  },
  {
    title: "Frontend Developer",
    company: "IT-RANKS Technology",
    period: "Apr 2025 - May 2025",
    location: "Cairo, Egypt · Hybrid",
    achievements: [
      "Developed responsive, high-performance web interfaces using React.js and Next.js",
      "Built scalable UI components using Tailwind CSS, MUI, and Bootstrap",
      "Collaborated with backend teams to integrate APIs and optimize application performance"
    ]
  },
  {
    title: "Machine Learning Engineer Trainee",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Nov 2025 - Present",
    location: "Cairo, Egypt · Hybrid",
    achievements: [
      "Hands-on training in Machine Learning, Deep Learning, and NLP using supervised and unsupervised learning techniques",
      "Worked with CNNs, RNNs, Transformers, GANs, and time-series models through practical projects",
      "Applied Python, NumPy, Pandas, and Scikit-Learn for real-world ML problem solving",
      "Developed strong foundations in model evaluation, data analysis, teamwork, and communication"
    ]
  },
  {
    title: "AI Developer Trainee",
    company: "NeuroTech",
    period: "Jun 2025 - Jan 2026",
    location: "Dokki, Giza, Egypt · On-site",
    achievements: [
      "Trained and evaluated NLP, Computer Vision, and Generative AI models including LLM-based systems",
      "Worked with Transformers, CNNs, and RNN architectures for applied AI tasks",
      "Built data preprocessing and experimentation pipelines using Python and ML libraries",
      "Gained practical experience with Oracle Cloud Infrastructure (OCI) and AI deployment workflows"
    ]
  },
  {
    title: "UI/UX Developer Trainee",
    company: "Information Technology Institute (ITI)",
    period: "Feb 2025 - Apr 2025",
    location: "Cairo University · Hybrid",
    achievements: [
      "Designed and developed responsive UI/UX solutions using React, Next.js, HTML, CSS, and JavaScript",
      "Translated UI/UX designs into functional front-end components with a focus on usability and performance",
      "Worked with SQL and databases to support data-driven web applications"
    ]
  },
  {
    title: "AI Trainer (Coding Expertise)",
    company: "Outlier",
    period: "Jul 2024 - Mar 2025",
    location: "Remote",
    achievements: [
      "Trained and evaluated Large Language Models including GPT-3.5, Gemini, Claude, LLaMA, and Tara using RLHF",
      "Performed multi-dimensional evaluation of model outputs focusing on correctness, instruction adherence, writing quality, and safety",
      "Applied prompt engineering techniques to optimize model responses and behavior",
      "Reviewed and improved code generation and text outputs to meet project and safety requirements"
    ]
  },
  {
    title: "Frontend Web Developer Trainee",
    company: "Route",
    period: "Sep 2024 - Feb 2025",
    location: "Maadi, Cairo, Egypt · On-site",
    achievements: [
      "Built responsive websites using HTML, CSS, JavaScript, Bootstrap, Tailwind, and React.js",
      "Used Git and GitHub for version control and collaborative development",
      "Worked with Figma to convert UI/UX designs into functional front-end components"
    ]
  },
  {
    title: "AI Trainer",
    company: "Remotasks",
    period: "Jan 2021 - Mar 2023",
    location: "Remote",
    achievements: [
      "Reviewed, annotated, and refined chatbot data to improve AI model training quality",
      "Enhanced chatbot responses to increase user engagement and interaction quality",
      "Evaluated and improved model outputs through structured data analysis and annotation"
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

// ---------- Services ----------
export const servicesData = {
  subtitle: "Comprehensive AI and development solutions tailored to transform your business with cutting-edge technology",
  services: [
    {
      title: "Machine Learning Models",
      description: "Custom ML solutions designed to solve complex business problems with data-driven insights and predictions.",
      icon: "brain",
      features: [
        "Supervised & unsupervised learning models",
        "Time series forecasting and analysis",
        "Classification and regression systems",
        "Model optimization and hyperparameter tuning",
        "End-to-end MLOps pipeline setup"
      ]
    },
    {
      title: "RAG Systems",
      description: "Advanced Retrieval-Augmented Generation systems that combine the power of LLMs with your custom knowledge base.",
      icon: "fileSearch",
      features: [
        "Custom knowledge base integration",
        "Real-time information retrieval",
        "Context-aware response generation",
        "Multi-document question answering",
        "Scalable vector database implementation"
      ]
    },
    {
      title: "NLP Solutions",
      description: "Natural Language Processing systems that understand, interpret, and generate human language with precision.",
      icon: "sparkles",
      features: [
        "Text classification and sentiment analysis",
        "Named Entity Recognition (NER)",
        "Document summarization and extraction",
        "Chatbots and conversational AI",
        "Multilingual text processing"
      ]
    },
    {
      title: "Computer Vision",
      description: "Intelligent image and video analysis systems that automate visual recognition and processing tasks.",
      icon: "zap",
      features: [
        "Object detection and tracking",
        "Image classification and segmentation",
        "OCR and document understanding",
        "Facial recognition and analysis",
        "Custom vision model training"
      ]
    },
    {
      title: "Generative AI",
      description: "Cutting-edge generative models for content creation, automation, and creative AI applications.",
      icon: "bot",
      features: [
        "LLM fine-tuning and customization",
        "Prompt engineering and optimization",
        "Content generation systems",
        "AI-powered automation workflows",
        "Custom GPT and chatbot development"
      ]
    },
    {
      title: "Web Development",
      description: "Modern, responsive web applications built with the latest frontend technologies and best practices.",
      icon: "code",
      features: [
        "React.js and Next.js development",
        "Responsive UI/UX implementation",
        "API integration and optimization",
        "Performance optimization",
        "Progressive Web Apps (PWA)"
      ]
    }
  ]
};