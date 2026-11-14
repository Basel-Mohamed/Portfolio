// Project Images
import ocrProject from '../assets/projects/ocr.jpg';
import ragProject from '../assets/projects/rag.jpg';
import odaProject from '../assets/projects/oda.jpg';
import safetyProject from '../assets/projects/safety.jpg';
import project1 from '../assets/projects/project-1.png';
import project2 from '../assets/projects/project-2.png';
import project3 from '../assets/projects/project-3.png';
import project4 from '../assets/projects/project-4.png';
import project7 from '../assets/projects/project-7.png';
import oilSalesImage from '../assets/projects/oil-sales.jpg';
import churnImage from '../assets/projects/churn-prediction.jpg';
import roomImage from '../assets/projects/Room.png';
import meayarImage from '../assets/projects/meayar.jpg';
import orchestratorImage from '../assets/projects/conversational-orchestrator.jpg';
import hrAgentImage from '../assets/projects/hr-self-service-agent.jpg';

// Certificate Images
import certAppliedDeepLearning from '../assets/certificates/applied-deep-learning.jpg';
import certPythonBasics from '../assets/certificates/python-basics.jpg';
import certAiDiplomaNeurotech from '../assets/certificates/ai-diploma-neurotech.jpg';
import certOracleAiFoundations from '../assets/certificates/oracle-ai-foundations.jpg';
import certElementsOfAi from '../assets/certificates/elements-of-ai.jpg';
import certPythonDataScienceCoursera from '../assets/certificates/python-data-science-coursera.jpg';
import certPromptEngineering from '../assets/certificates/prompt-engineering.jpg';
import certGenAiEssentials from '../assets/certificates/gen-ai-essentials.jpg';
import certSprintsAiMl from '../assets/certificates/sprints-ai-ml.png';
import certAiEssentialsV2 from '../assets/certificates/ai-essentials-v2.jpg';
import certReactNativeUdemy from '../assets/certificates/react-native-udemy.jpg';
import certCleanCode from '../assets/certificates/clean-code.jpg';
import certReactBasicsHackerrank from '../assets/certificates/react-basics-hackerrank.jpg';
import certReactJsMaharatech from '../assets/certificates/react-js-maharatech.jpg';
import certFrontendDiplomaRoute from '../assets/certificates/frontend-diploma-route.jpg';
import certDatabaseFundamentals from '../assets/certificates/database-fundamentals.jpg';
import certHtmlCss from '../assets/certificates/html-css.jpg';
import certUxDesign from '../assets/certificates/ux-design.jpg';
import certDepiMlEngineer from '../assets/certificates/depi-ml-engineer.jpg';
import certDepiBusinessEnglish from '../assets/certificates/depi-business-english.jpg';
import { PortfolioContent } from '../types/portfolio';
import { CHATBOT_PROMPT } from './chatbotPrompt';

export const DATA: { en: PortfolioContent; ar: PortfolioContent } = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      certifications: "Certifications",
      services: "Services",
      contact: "Contact",
    },
    hero: {
      name: "Basel Mohamed",
      title: "AI Engineer · Gen AI Specialist",
      tagline: "Building intelligent AI systems that transform data into actionable insights.",
      image: "/profile_pic.jpg",
      buttons: {
        contact: "Get in Touch",
        projects: "View Projects",
      }
    },
    home: {
      skills: {
        genAi: { title: "Generative AI & LLMs", desc: "RAG, Agentic AI, Multi-Agent Systems, Prompt Engineering, Fine-tuning, RLHF" },
        ml: { title: "LLM Serving & Inference", desc: "vLLM, SGLang, llama.cpp, Ollama, GPU Serving" },
        deploy: { title: "Backend & Deployment", desc: "Python, FastAPI, Docker, Oracle EBS, Observability" },
        dev: { title: "Frameworks & Data", desc: "LangChain, LangGraph, PyTorch, Hugging Face, Qdrant, React" }
      },
      cta: {
        title: "Ready to transform your data into intelligence?",
        subtitle: "Whether you need a custom RAG system, an NLP solution, or a predictive model, I can help you build it.",
        button: "Let's Work Together"
      }
    },
    about: {
      title: "About Me",
      summary: "I am an AI Engineer with 3+ years of experience in AI, based in Maadi, Cairo, and a graduate of the ITI and DEPI (Machine Learning Engineer) programs. I build and deploy production-grade Generative AI systems end to end: RAG pipelines with Qdrant hybrid search and reranking, LangGraph multi-agent orchestration, and ERP-integrated transactional agents. I serve LLMs with vLLM, SGLang, llama.cpp, and Ollama across GPU and CPU deployments, and fine-tune models with PyTorch and Hugging Face, including Arabic OCR models that went from 78% to 92% accuracy.",
      location: "Maadi, Cairo, Egypt",
      skills: {
        ai_ml: "AI & Machine Learning",
        techniques: "LLM Serving & Inference",
        frameworks: "Libraries & Frameworks",
        frontend: "Frontend Development",
        cloud: "Backend & Deployment",
      },
      learning: {
        title: "Continuous Learning",
        desc: "I have earned 20 professional certifications from institutions like Oracle, DEPI, and Coursera.",
        cta: "View All Certifications"
      },
      certifications_subtitle: "A comprehensive overview of my continuous learning journey across AI, Full Stack Development, and Cloud Technologies.",
      certifications: [
        {
          title: "Microsoft Machine Learning Engineer - DEPI",
          date: "Jul 2026",
          image: certDepiMlEngineer,
          featured: true,
          category: "AI & Data Science"
        },
        {
          title: "Business English Track - DEPI",
          date: "Jul 2026",
          image: certDepiBusinessEnglish,
          category: "Others"
        },
        {
          title: "Applied Deep Learning - MaharaTech (ITIMooca)",
          date: "Jan 2026",
          image: certAppliedDeepLearning,
          category: "AI & Data Science"
        },
        {
          title: "Python Programming Basics - MaharaTech (ITIMooca)",
          date: "Jan 2026",
          image: certPythonBasics,
          category: "AI & Data Science"
        },
        {
          title: "AI Diploma Intermediate Level - NeuroTech",
          date: "Jan 2026",
          image: certAiDiplomaNeurotech,
          featured: true,
          category: "AI & Data Science"
        },
        {
          title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
          date: "Oct 2025",
          image: certOracleAiFoundations,
          featured: true,
          category: "AI & Data Science"
        },
        {
          title: "Elements of AI Course - University of Helsinki",
          date: "Sep 2025",
          image: certElementsOfAi,
          category: "AI & Data Science"
        },
        {
          title: "Python for Data Science and AI - Coursera",
          date: "Jul 2025",
          image: certPythonDataScienceCoursera,
          category: "AI & Data Science"
        },
        {
          title: "Generative AI: Prompt Engineering - Coursera",
          date: "Jul 2025",
          image: certPromptEngineering,
          category: "AI & Data Science"
        },
        {
          title: "Generative AI Essentials - Coursera",
          date: "Jul 2025",
          image: certGenAiEssentials,
          category: "AI & Data Science"
        },
        {
          title: "AI and Machine Learning Foundations - Sprints",
          date: "Jun 2025",
          image: certSprintsAiMl,
          category: "AI & Data Science"
        },
        {
          title: "Artificial Intelligence Essentials V2 - Coursera",
          date: "Jun 2025",
          image: certAiEssentialsV2,
          category: "AI & Data Science"
        },
        {
          title: "React Native: Mobile App Development (CLI) - Udemy",
          date: "Jun 2025",
          image: certReactNativeUdemy,
          category: "Full Stack"
        },
        {
          title: "The Principles of Writing Clean Code - MaharaTech",
          date: "Apr 2025",
          image: certCleanCode,
          category: "Others"
        },
        {
          title: "React Basics - HackerRank",
          date: "Apr 2025",
          image: certReactBasicsHackerrank,
          category: "Full Stack"
        },
        {
          title: "React JS - MaharaTech (ITIMooca)",
          date: "Apr 2025",
          image: certReactJsMaharatech,
          category: "Full Stack"
        },
        {
          title: "Frontend Development Diploma - Route",
          date: "Mar 2025",
          image: certFrontendDiplomaRoute,
          category: "Full Stack"
        },
        {
          title: "Database Fundamentals - MaharaTech",
          date: "Mar 2025",
          image: certDatabaseFundamentals,
          category: "Full Stack"
        },
        {
          title: "HTML & CSS - MaharaTech",
          date: "Mar 2025",
          image: certHtmlCss,
          category: "Full Stack"
        },
        {
          title: "UX Design Fundamentals - MaharaTech",
          date: "Jan 2025",
          image: certUxDesign,
          category: "Others"
        }
      ]
    },
    experience: {
      title: "Professional Experience",
      internshipsTitle: "Training & Internships",
      professional: [
        {
          id: 1,
          title: "AI Engineer",
          company: "IT-RANKS Technology",
          period: "Apr 2025 - Present",
          description: "Builds Generative AI, local LLM, and production AI solutions for KSA and Gulf-region clients. Designed and deployed RAG services with LangChain, Qdrant retrieval, reranking, and FastAPI, plus a configurable inference layer across local models, Cohere, and Groq, with production logging and observability.",
        },
        {
          id: 9,
          title: "AI Engineer (Part-time)",
          company: "Ad Value",
          period: "Mar 2026 - Present",
          description: "Benchmarks state-of-the-art AI models for creative teams, including ElevenLabs, Hugging Face models, GPT Image, and Nano Banana Pro. Runs prompt-engineering sessions and AI workshops, trains teams on Claude Skills, custom GPTs, and Gemini Gems, and builds automated lead-generation workflows.",
        },
        {
          id: 6,
          title: "AI Trainer",
          company: "Outlier (Scale AI)",
          period: "Jul 2024 - Mar 2025",
          description: "Evaluated and ranked outputs from Gemini, GPT-3.5, LLaMA, and Claude using RLHF, safety, and quality criteria. Improved code and text generation through structured feedback, prompt optimization, and rigorous quality review.",
        },
        {
          id: 8,
          title: "Data Annotator",
          company: "Remotasks",
          period: "Jan 2021 - Mar 2023",
          description: "Annotated and reviewed large-scale ML and computer-vision datasets for accuracy, consistency, and labeling quality. Improved chatbot responses through evaluation, rewriting, and structured data validation.",
        }
      ],
      internships: [
        {
          id: 2,
          title: "Machine Learning Engineer Trainee",
          company: "Digital Egypt Pioneers Initiative (DEPI)",
          period: "Nov 2025 - Jul 2026",
          description: "Completed the Microsoft Machine Learning Engineer track, an intensive program covering Python, data processing, machine learning, and soft skills.",
        },
        {
          id: 3,
          title: "AI Developer Trainee",
          company: "NeuroTech",
          period: "Jun 2025 - Jan 2026",
          description: "Gained hands-on experience in AI development, focusing on Python programming, attention to detail, and applied machine learning models.",
        },
        {
          id: 5,
          title: "UI/UX Developer Trainee",
          company: "Information Technology Institute (ITI)",
          period: "Feb 2025 - Apr 2025",
          description: "Trained in UI/UX development track, focusing on React and modern user interface design principles.",
        },
        {
          id: 7,
          title: "Frontend Web Developer Trainee",
          company: "Route",
          period: "Sep 2024 - Feb 2025",
          description: "Built responsive websites using HTML, CSS, JavaScript, and React.js. Translated Figma designs into functional front-end components and managed projects using Git/GitHub.",
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      items: [
        {
          id: "rag-agent",
          featured: true,
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "Enterprise RAG & LLM Inference Platform",
          category: "RAG & LLM Serving",
          description: "Built an end-to-end RAG pipeline covering ingestion, embeddings, Qdrant retrieval, reranking, and answer generation, exposed through FastAPI with configurable local, Cohere, and Groq inference and production logging. Engineered a dual-path inference layer using llama.cpp for CPU deployments and vLLM for GPU serving, and benchmarked LLMs, embedding models, and rerankers on quality, latency, and throughput.",
          tech: ["LangChain", "Qdrant", "FastAPI", "vLLM", "llama.cpp", "Cohere", "Groq", "Python"],
          image: ragProject,
          metrics: [
            { label: "Time to First Token", value: "< 380ms" },
            { label: "Context Recall", value: "96.4%", change: "+18%" },
            { label: "Indexed Chunks", value: "100k+" }
          ]
        },
        {
          id: "meayar",
          type: "ai",
          image: meayarImage,
          nda: true,
          github: "",
          live: "",
          title: "MEAYAR - Employee Assessment System",
          category: "Agentic AI",
          description: "An agentic platform for technical employee assessment built with LangChain and LangGraph. Six specialized agents handle skill profiling, question generation, evaluation, weakness analysis, and course recommendations, automating competency-gap analysis and generating personalized learning paths from internal company knowledge and course data.",
          tech: ["LangChain", "LangGraph", "Multi-Agent Systems", "Python"]
        },
        {
          id: "conversational-orchestrator",
          type: "ai",
          image: orchestratorImage,
          nda: true,
          github: "",
          live: "",
          title: "Enterprise Conversational Orchestrator",
          category: "Agentic AI",
          description: "An orchestrator agent that coordinates specialized sub-agents (a RAG knowledge agent, a transactional ERP agent, and a general Q&A agent) behind a single chat interface. Intent-based routing and query rewriting resolve follow-up questions and send each request to the right agent, with conversation context persisted across turns.",
          tech: ["LangGraph", "Multi-Agent Orchestration", "Query Routing", "Conversation Memory", "Python"]
        },
        {
          id: "hr-self-service-agent",
          type: "ai",
          image: hrAgentImage,
          nda: true,
          github: "",
          live: "",
          title: "HR Self-Service Agent",
          category: "Agentic AI & ERP",
          description: "A conversational agent integrated with the enterprise ERP (Oracle EBS) that submits employee requests such as leave and overtime through chat. It combines deterministic, validated submission flows with a natural-language experience, collecting and confirming required fields before posting to the ERP. The integration is configuration-driven, so new request types are added without changing the agent logic.",
          tech: ["Oracle EBS", "ERP Integration", "Agentic AI", "Python"]
        },
        {
          id: "doc-understanding",
          featured: true,
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "Document AI - Arabic OCR & Extraction System",
          category: "OCR & Vision",
          description: "Fine-tuned Vision Transformer OCR models on combined real and synthetic datasets, increasing Arabic character accuracy from 78% to 92% and achieving 96% in English with automated deskewing and normalization pipelines.",
          tech: ["Python", "FastAPI", "Vision Transformers", "OpenCV", "PyTorch"],
          image: ocrProject,
          metrics: [
            { label: "Arabic Accuracy", value: "92.0%", change: "+14%" },
            { label: "English Accuracy", value: "96.0%" },
            { label: "Time to First Token", value: "420ms" }
          ]
        },
        {
          id: "ai-5",
          type: "ai",
          title: "Oil Sales Prediction & Intelligence System",
          category: "Generative AI & ML",
          image: oilSalesImage,
          description: "An end-to-end AI solution combining a Random Forest Regression model for edible oil sales prediction with an LLM-integrated chat interface. It achieves an R² score of ~0.98 and is served via a FastAPI REST API for real-time inference and conversational insights.",
          tech: ["Python", "Machine Learning", "Random Forest", "LLM", "FastAPI"],
          github: "https://github.com/Basel-Mohamed/oil-sales-regression-model",
          live: "https://ai-machine-learning-hub.vercel.app/model/oil-sales",
          metrics: [
            { label: "Model R² Score", value: "0.98" },
            { label: "Inference Time", value: "< 45ms" },
            { label: "Serving", value: "FastAPI REST" }
          ]
        },
        {
          id: "ai-6",
          type: "ai",
          title: "Customer Churn Prediction & AI Assistant",
          category: "Generative AI & ML",
          image: churnImage,
          description: "An AI solution combining an Ensemble Voting Classifier (Gradient Boosting, Logistic Regression, AdaBoost) with an LLM-powered conversational agent via the Groq API. It predicts customer churn and provides a chat interface for marketing teams to assess risk.",
          tech: ["Python", "LLM", "Ensemble Learning", "FastAPI", "Groq API"],
          github: "https://github.com/Basel-Mohamed/churn-classification-ensemble",
          live: "https://ai-machine-learning-hub.vercel.app/model/churn",
          metrics: [
            { label: "ROC-AUC Score", value: "0.94" },
            { label: "Precision", value: "91.5%" },
            { label: "LLM Engine", value: "Groq LLaMA 3" }
          ]
        },
        {
          id: "digital-assistant",
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "OCI Digital Assistant",
          category: "OCI & NLP",
          description: "Developed a digital assistant on the Oracle platform, enabling natural language interaction with the database. Designed end-to-end AI workflows on OCI, including model training and prompt engineering.",
          tech: ["Oracle Cloud", "NLP", "Prompt Engineering"],
          image: odaProject
        },
        {
          id: "safety-detection",
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "Industrial Safety Gear Detection",
          category: "Computer Vision",
          description: "Annotated and preprocessed datasets using Label Studio, achieving ~99% labeling accuracy to support training an object detection model for worker safety gear detection.",
          tech: ["Label Studio", "Object Detection", "Computer Vision"],
          image: safetyProject
        },
        {
          id: "fs-1",
          type: "fullstack",
          title: "A Personal Video Editor Portfolio",
          category: "Web Development",
          image: project1,
          description: "A fully responsive personal portfolio website built with React, Tailwind CSS, and JavaScript. It features a modern design to showcase projects, skills, and contact information, offering a seamless user experience across all devices.",
          tech: ["React", "Tailwind CSS", "JavaScript", "React-Icons", "Motion", "CSS"],
          github: "https://github.com/Basel-Mohamed/abdelrhman-portfolio",
          live: "https://abdelrhman-portfolio-ten.vercel.app/"
        },
        {
          id: "fs-6",
          featured: true,
          type: "fullstack",
          title: "ROOM APP Marketplace",
          category: "Full Stack Development",
          image: roomImage,
          description: "The premier digital marketplace in the UAE connecting over 200k+ users with verified service providers for design, construction, and furnishing. Built a full-stack platform featuring vendor profiles, tiered subscription plans, and a secure application workflow for business verification.",
          tech: ["React", "Tailwind CSS", "Framer Motion", "React Icons", "CSS", "Node.js"],
          live: "https://roomapp.ae"
        },
        {
          id: "fs-4",
          type: "fullstack",
          title: "FreshCart",
          category: "Web Development",
          image: project4,
          description: "A modern, responsive e-commerce platform offering a seamless shopping experience. Features include secure user authentication, an advanced product catalog with filtering, a dynamic shopping cart, and wishlist management with real-time updates using React Query.",
          tech: ["React.js", "Tailwind CSS", "React Query", "Context API", "Formik", "Axios"],
          github: "https://github.com/Basel-Mohamed/fresh-cart",
          live: "https://fresh-cart-sigma-ashen.vercel.app/"
        },
        {
          id: "fs-7",
          type: "fullstack",
          title: "A Personal Frontend Portfolio",
          category: "Web Development",
          image: project7,
          description: "A fully responsive personal portfolio website built with React, Tailwind CSS, and JavaScript. It features a modern design to showcase projects, skills, and contact information, offering a seamless user experience across all devices.",
          tech: ["React", "Tailwind CSS", "JavaScript", "React-Icons", "CSS"],
          github: "https://github.com/Basel-Mohamed/My_Portfolio",
          live: "https://my-portfolio-v2-olive-delta.vercel.app/"
        },
        {
          id: "fs-3",
          type: "fullstack",
          title: "Daniels Website",
          category: "Web Development",
          image: project3,
          description: "A responsive personal portfolio website built with HTML, CSS, and Bootstrap, based on a Figma design, showcasing skills in converting designs into functional web interfaces.",
          tech: ["HTML", "CSS", "Bootstrap"],
          github: "https://github.com/Basel-Mohamed/Daniels-Website",
          live: "https://basel-mohamed.github.io/Daniels-Website/"
        },
        {
          id: "fs-2",
          type: "fullstack",
          title: "Simple CRUD System",
          category: "Web Development",
          image: project2,
          description: "Simple CRUD (Create, Read, Update, Delete) system implemented using HTML, CSS, JavaScript, and Bootstrap.",
          tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
          github: "https://github.com/Basel-Mohamed/Simple-crud-system",
          live: "https://basel-mohamed.github.io/Simple-crud-system/"
        },
      ]
    },
    services: {
      title: "Services",
      cta: "Request This Service",
      items: [
        {
          id: "ml-models",
          title: "Machine Learning Models",
          description: "Custom ML model development, training, and deployment for predictive analytics.",
          features: ["Data Preprocessing", "Model Training", "Hyperparameter Tuning"]
        },
        {
          id: "rag-systems",
          title: "RAG Systems",
          description: "Building intelligent search systems that ground LLM responses in your private data.",
          features: ["Vector Databases", "Semantic Search", "Hallucination Reduction"]
        },
        {
          id: "nlp-solutions",
          title: "NLP Solutions",
          description: "Advanced text analysis, sentiment analysis, and chatbot development.",
          features: ["Named Entity Recognition", "Sentiment Analysis", "Text Classification"]
        },
        {
          id: "cv-solutions",
          title: "Computer Vision",
          description: "Image recognition and object detection systems for automation.",
          features: ["Object Detection", "Image Segmentation", "OCR Integration"]
        }
      ]
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's build something intelligent together.",
    },
    chatbot: {
      title: "AI Assistant",
      placeholder: "Ask me anything...",
      suggestions: [
        "Tell me about your RAG experience",
        "What AI services do you offer?",
        "Show me your certifications",
        "Do you work with Arabic NLP?"
      ],
      prompt: CHATBOT_PROMPT
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عني",
      experience: "الخبرة",
      projects: "المشاريع",
      certifications: "الشهادات",
      services: "الخدمات",
      contact: "تواصل",
    },
    hero: {
      name: "باسل محمد",
      title: "مهندس ذكاء اصطناعي · متخصص في الذكاء الاصطناعي التوليدي",
      tagline: "بناء أنظمة ذكاء اصطناعي ذكية تحول البيانات إلى رؤى قابلة للتنفيذ.",
      image: "/profile_pic.jpg",
      buttons: {
        contact: "تواصل معي",
        projects: "عرض المشاريع",
      }
    },
    home: {
      skills: {
        genAi: { title: "الذكاء الاصطناعي التوليدي والنماذج اللغوية", desc: "RAG, Agentic AI, Multi-Agent Systems, Prompt Engineering, Fine-tuning, RLHF" },
        ml: { title: "تشغيل النماذج والاستدلال", desc: "vLLM, SGLang, llama.cpp, Ollama, GPU Serving" },
        deploy: { title: "الواجهات الخلفية والنشر", desc: "Python, FastAPI, Docker, Oracle EBS, Observability" },
        dev: { title: "أطر العمل والبيانات", desc: "LangChain, LangGraph, PyTorch, Hugging Face, Qdrant, React" }
      },
      cta: {
        title: "هل أنت مستعد لتحويل بياناتك إلى ذكاء حقيقي؟",
        subtitle: "سواء كنت بحاجة إلى نظام RAG مخصص، أو حل لمعالجة اللغات الطبيعية (NLP)، أو نموذج تنبؤي، يمكنني مساعدتك في بنائه.",
        button: "دعنا نعمل معاً"
      }
    },
    about: {
      title: "نبذة عني",
      summary: "أنا مهندس ذكاء اصطناعي بخبرة تزيد على 3 سنوات في المجال، مقيم في المعادي، القاهرة، وخريج برنامجي ITI و DEPI (مهندس تعلم الآلة). أبني وأنشر أنظمة ذكاء اصطناعي توليدي جاهزة للإنتاج من البداية للنهاية: أنظمة RAG بالبحث الهجين وإعادة الترتيب عبر Qdrant، وتنسيق الوكلاء المتعددين باستخدام LangGraph، ووكلاء معاملات مرتبطين بأنظمة ERP. أشغّل النماذج اللغوية عبر vLLM و SGLang و llama.cpp و Ollama على GPU و CPU، وأدرّب النماذج باستخدام PyTorch و Hugging Face، ومنها نماذج OCR عربية ارتفعت دقتها من 78% إلى 92%.",
      location: "المعادي، القاهرة، مصر",
      skills: {
        ai_ml: "الذكاء الاصطناعي وتعلم الآلة",
        techniques: "تشغيل النماذج والاستدلال",
        frameworks: "أطر العمل والمكتبات",
        frontend: "تطوير واجهات المستخدم",
        cloud: "الواجهات الخلفية والنشر",
      },
      learning: {
        title: "التعلم المستمر",
        desc: "حصلت على 20 شهادة مهنية من مؤسسات مثل Oracle و DEPI و Coursera.",
        cta: "عرض كل الشهادات"
      },
      certifications_subtitle: "نظرة شاملة على رحلة التعلم المستمر عبر الذكاء الاصطناعي وتطوير الويب والتقنيات السحابية.",
      certifications: [
        {
          title: "مهندس تعلم الآلة من مايكروسوفت - DEPI",
          date: "يوليو 2026",
          image: certDepiMlEngineer,
          featured: true,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "مسار اللغة الإنجليزية للأعمال - DEPI",
          date: "يوليو 2026",
          image: certDepiBusinessEnglish,
          category: "أخرى"
        },
        {
          title: "التعلم العميق التطبيقي - مهارة تك (ITIMooca)",
          date: "يناير 2026",
          image: certAppliedDeepLearning,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "أساسيات برمجة بايثون - مهارة تك (ITIMooca)",
          date: "يناير 2026",
          image: certPythonBasics,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "دبلومة الذكاء الاصطناعي المستوى المتوسط - NeuroTech",
          date: "يناير 2026",
          image: certAiDiplomaNeurotech,
          featured: true,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "مساعد معتمد في أساسيات الذكاء الاصطناعي من البنية التحتية السحابية لأوراكل 2025",
          date: "أكتوبر 2025",
          image: certOracleAiFoundations,
          featured: true,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "دورة عناصر الذكاء الاصطناعي - جامعة هلسنكي",
          date: "سبتمبر 2025",
          image: certElementsOfAi,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "بايثون لعلوم البيانات والذكاء الاصطناعي - كورسيرا",
          date: "يوليو 2025",
          image: certPythonDataScienceCoursera,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "الذكاء الاصطناعي التوليدي: هندسة الأوامر - كورسيرا",
          date: "يوليو 2025",
          image: certPromptEngineering,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "أساسيات الذكاء الاصطناعي التوليدي - كورسيرا",
          date: "يوليو 2025",
          image: certGenAiEssentials,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "أساسيات الذكاء الاصطناعي وتعلم الآلة - Sprints",
          date: "يونيو 2025",
          image: certSprintsAiMl,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "أساسيات الذكاء الاصطناعي الإصدار الثاني - كورسيرا",
          date: "يونيو 2025",
          image: certAiEssentialsV2,
          category: "الذكاء الاصطناعي وعلوم البيانات"
        },
        {
          title: "React Native: تطوير تطبيقات الهاتف - يوديمي",
          date: "يونيو 2025",
          image: certReactNativeUdemy,
          category: "تطوير متكامل (Full Stack)"
        },
        {
          title: "مبادئ كتابة الكود النظيف - مهارة تك",
          date: "أبريل 2025",
          image: certCleanCode,
          category: "أخرى"
        },
        {
          title: "أساسيات React - HackerRank",
          date: "أبريل 2025",
          image: certReactBasicsHackerrank,
          category: "تطوير متكامل (Full Stack)"
        },
        {
          title: "React JS - مهارة تك (ITIMooca)",
          date: "أبريل 2025",
          image: certReactJsMaharatech,
          category: "تطوير متكامل (Full Stack)"
        },
        {
          title: "دبلومة تطوير واجهات المستخدم - Route",
          date: "مارس 2025",
          image: certFrontendDiplomaRoute,
          category: "تطوير متكامل (Full Stack)"
        },
        {
          title: "أساسيات قواعد البيانات - مهارة تك",
          date: "مارس 2025",
          image: certDatabaseFundamentals,
          category: "تطوير متكامل (Full Stack)"
        },
        {
          title: "HTML & CSS - مهارة تك",
          date: "مارس 2025",
          image: certHtmlCss,
          category: "تطوير متكامل (Full Stack)"
        },
        {
          title: "أساسيات تصميم تجربة المستخدم (UX) - مهارة تك",
          date: "يناير 2025",
          image: certUxDesign,
          category: "أخرى"
        }
      ]
    },
    experience: {
      title: "الخبرة المهنية",
      internshipsTitle: "التدريب الداخلي والبرامج التدريبية",
      professional: [
        {
          id: 1,
          title: "مهندس ذكاء اصطناعي",
          company: "IT-RANKS Technology",
          period: "أبريل 2025 - الحاضر",
          description: "بناء حلول الذكاء الاصطناعي التوليدي والنماذج اللغوية المحلية وأنظمة الإنتاج لعملاء في السعودية والخليج. تصميم ونشر خدمات RAG باستخدام LangChain والاسترجاع عبر Qdrant وإعادة الترتيب و FastAPI، مع طبقة استدلال قابلة للتكوين بين النماذج المحلية و Cohere و Groq، وتسجيل ومراقبة على مستوى الإنتاج.",
        },
        {
          id: 9,
          title: "مهندس ذكاء اصطناعي (دوام جزئي)",
          company: "Ad Value",
          period: "مارس 2026 - الحاضر",
          description: "تقييم أحدث نماذج الذكاء الاصطناعي لفرق الإبداع، ومنها ElevenLabs ونماذج Hugging Face و GPT Image و Nano Banana Pro. تقديم جلسات هندسة الأوامر وورش عمل الذكاء الاصطناعي، وتدريب الفرق على Claude Skills و custom GPTs و Gemini Gems، وبناء مسارات مؤتمتة لتوليد العملاء المحتملين.",
        },
        {
          id: 6,
          title: "مدرب ذكاء اصطناعي",
          company: "Outlier (Scale AI)",
          period: "يوليو 2024 - مارس 2025",
          description: "تقييم وترتيب مخرجات Gemini و GPT-3.5 و LLaMA و Claude وفق معايير RLHF والسلامة والجودة. تحسين توليد الأكواد والنصوص عبر ملاحظات منظمة وتحسين الأوامر ومراجعة دقيقة للجودة.",
        },
        {
          id: 8,
          title: "مُعلِّق بيانات",
          company: "Remotasks",
          period: "يناير 2021 - مارس 2023",
          description: "تعليق ومراجعة مجموعات بيانات واسعة النطاق لتعلم الآلة والرؤية الحاسوبية لضمان الدقة والاتساق وجودة التصنيف. تحسين استجابات روبوتات المحادثة عبر التقييم وإعادة الصياغة والتحقق المنظم من البيانات.",
        }
      ],
      internships: [
        {
          id: 2,
          title: "متدرب هندسة تعلم الآلة",
          company: "مبادرة أشبال مصر الرقمية (DEPI)",
          period: "نوفمبر 2025 - يوليو 2026",
          description: "إتمام مسار مهندس تعلم الآلة من مايكروسوفت، وهو برنامج مكثف يغطي Python ومعالجة البيانات وتعلم الآلة والمهارات الشخصية.",
        },
        {
          id: 3,
          title: "متدرب تطوير الذكاء الاصطناعي",
          company: "NeuroTech",
          period: "يونيو 2025 - يناير 2026",
          description: "اكتساب خبرة عملية في تطوير الذكاء الاصطناعي، مع التركيز على برمجة Python وتطبيق نماذج تعلم الآلة.",
        },
        {
          id: 5,
          title: "متدرب تطوير واجهات وتجربة المستخدم (UI/UX)",
          company: "معهد تكنولوجيا المعلومات (ITI)",
          period: "فبراير 2025 - أبريل 2025",
          description: "تدريب مكثف في مسار تطوير UI/UX مع التركيز على React ومبادئ تصميم واجهات المستخدم الحديثة.",
        },
        {
          id: 7,
          title: "متدرب تطوير واجهات الويب الأمامية",
          company: "Route",
          period: "سبتمبر 2024 - فبراير 2025",
          description: "بناء مواقع ويب متجاوبة باستخدام HTML و CSS و JavaScript و React.js. تحويل تصميمات Figma إلى مكونات فعالة وإدارة المشاريع عبر Git/GitHub.",
        }
      ]
    },
    projects: {
      title: "المشاريع المميزة",
      items: [
        {
          id: "rag-agent",
          featured: true,
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "منصة RAG واستدلال النماذج اللغوية للمؤسسات",
          category: "RAG وتشغيل النماذج",
          description: "بناء مسار RAG متكامل يشمل استيعاب المستندات والتضمين والاسترجاع عبر Qdrant وإعادة الترتيب وتوليد الإجابات، متاح عبر FastAPI مع استدلال قابل للتكوين (محلي / Cohere / Groq) وتسجيل على مستوى الإنتاج. تصميم طبقة استدلال ثنائية المسار باستخدام llama.cpp على CPU و vLLM على GPU، مع قياس أداء النماذج اللغوية ونماذج التضمين وإعادة الترتيب من حيث الجودة وزمن الاستجابة والإنتاجية.",
          tech: ["LangChain", "Qdrant", "FastAPI", "vLLM", "llama.cpp", "Cohere", "Groq", "Python"],
          image: ragProject,
          metrics: [
            { label: "زمن أول رمز (TTFT)", value: "< 380ms" },
            { label: "دقة السياق", value: "96.4%", change: "+18%" },
            { label: "المقاطع المفهرسة", value: "100k+" }
          ]
        },
        {
          id: "meayar",
          type: "ai",
          image: meayarImage,
          nda: true,
          github: "",
          live: "",
          title: "معيار - نظام تقييم الموظفين",
          category: "الوكلاء الأذكياء",
          description: "منصة وكلاء أذكياء للتقييم التقني للموظفين مبنية باستخدام LangChain و LangGraph. ستة وكلاء متخصصين يتولون تحليل المهارات وتوليد الأسئلة والتقييم وتحليل نقاط الضعف وترشيح الدورات، مع أتمتة تحليل فجوات الكفاءة وتوليد مسارات تعلم مخصصة من معرفة الشركة الداخلية وبيانات الدورات.",
          tech: ["LangChain", "LangGraph", "Multi-Agent Systems", "Python"]
        },
        {
          id: "conversational-orchestrator",
          type: "ai",
          image: orchestratorImage,
          nda: true,
          github: "",
          live: "",
          title: "منسّق المحادثات للمؤسسات",
          category: "الوكلاء الأذكياء",
          description: "وكيل منسّق يدير وكلاء فرعيين متخصصين (وكيل معرفة RAG، ووكيل معاملات ERP، ووكيل أسئلة عامة) خلف واجهة محادثة واحدة. التوجيه حسب نية المستخدم وإعادة صياغة الاستعلام يحلّان الأسئلة التابعة ويرسلان كل طلب إلى الوكيل المناسب، مع حفظ سياق المحادثة عبر الأدوار.",
          tech: ["LangGraph", "Multi-Agent Orchestration", "Query Routing", "Conversation Memory", "Python"]
        },
        {
          id: "hr-self-service-agent",
          type: "ai",
          image: hrAgentImage,
          nda: true,
          github: "",
          live: "",
          title: "وكيل الخدمة الذاتية للموارد البشرية",
          category: "الوكلاء الأذكياء و ERP",
          description: "وكيل محادثة مرتبط بنظام ERP للمؤسسة (Oracle EBS) يقدّم طلبات الموظفين مثل الإجازات والعمل الإضافي عبر المحادثة. يجمع بين مسارات تقديم محددة ومُتحقَّق منها وتجربة لغة طبيعية سهلة، فيجمع الحقول المطلوبة ويؤكدها قبل إرسالها إلى ERP. التكامل قائم على الإعدادات، فتُضاف أنواع طلبات جديدة دون تغيير منطق الوكيل.",
          tech: ["Oracle EBS", "ERP Integration", "Agentic AI", "Python"]
        },
        {
          id: "doc-understanding",
          featured: true,
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "الذكاء الاصطناعي للمستندات - نظام OCR واستخراج البيانات باللغة العربية",
          category: "OCR والرؤية الحاسوبية",
          description: "تحسين نماذج Vision Transformer للتعرف الضوئي على الحروف باستخدام بيانات حقيقية واصطناعية، مما رفع دقة اللغة العربية من 78% إلى 92% وتحقيق 96% في الإنجليزية مع تصحيح تلقائي للإمالة والضوضاء.",
          tech: ["Python", "FastAPI", "Vision Transformers", "OpenCV", "PyTorch"],
          image: ocrProject,
          metrics: [
            { label: "دقة اللغة العربية", value: "92.0%", change: "+14%" },
            { label: "دقة اللغة الإنجليزية", value: "96.0%" },
            { label: "زمن أول رمز (TTFT)", value: "420ms" }
          ]
        },
        {
          id: "ai-5",
          type: "ai",
          title: "نظام توقع مبيعات الزيوت والذكاء التحليلي",
          category: "الذكاء الاصطناعي التوليدي والتعلم الآلي",
          image: oilSalesImage,
          description: "حل ذكاء اصطناعي متكامل يجمع بين نموذج انحدار (Random Forest) لتوقع مبيعات زيوت الطعام مع واجهة محادثة مدمجة بنماذج لغوية كبيرة (LLM). يحقق دقة تصل إلى ~0.98 ويتم تشغيله عبر واجهة FastAPI لتوفير التوقعات والرؤى في الوقت الفعلي.",
          tech: ["Python", "Machine Learning", "Random Forest", "LLM", "FastAPI"],
          github: "https://github.com/Basel-Mohamed/oil-sales-regression-model",
          live: "https://ai-machine-learning-hub.vercel.app/model/oil-sales",
          metrics: [
            { label: "معامل الدقة R²", value: "0.98" },
            { label: "زمن الاستدلال", value: "< 45ms" },
            { label: "بنية النشر", value: "FastAPI REST" }
          ]
        },
        {
          id: "ai-6",
          type: "ai",
          title: "توقع تسرب العملاء ومساعد ذكاء اصطناعي",
          category: "الذكاء الاصطناعي التوليدي والتعلم الآلي",
          image: churnImage,
          description: "حل ذكاء اصطناعي يجمع بين نموذج تصنيف مجمع (Ensemble) ومساعد يعتمد على النماذج اللغوية الكبيرة (LLM) عبر واجهة Groq. يقوم بتوقع تسرب العملاء ويوفر واجهة محادثة لفرق التسويق لتقييم المخاطر بسهولة.",
          tech: ["Python", "LLM", "Ensemble Learning", "FastAPI", "Groq API"],
          github: "https://github.com/Basel-Mohamed/churn-classification-ensemble",
          live: "https://ai-machine-learning-hub.vercel.app/model/churn",
          metrics: [
            { label: "مقياس ROC-AUC", value: "0.94" },
            { label: "الدقة Precision", value: "91.5%" },
            { label: "محرك التوليد", value: "Groq LLaMA 3" }
          ]
        },
        {
          id: "digital-assistant",
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "المساعد الرقمي لـ OCI",
          category: "OCI و NLP",
          description: "تطوير مساعد رقمي على منصة أوراكل (Oracle)، يتيح التفاعل بلغة طبيعية مع قاعدة البيانات. تصميم مسارات عمل متكاملة للذكاء الاصطناعي على السحابة (OCI)، بما في ذلك تدريب النماذج وهندسة الأوامر (Prompt Engineering).",
          tech: ["Oracle Cloud", "NLP", "Prompt Engineering"],
          image: odaProject
        },
        {
          id: "safety-detection",
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "اكتشاف معدات السلامة الصناعية",
          category: "الرؤية الحاسوبية",
          description: "تعليق ومعالجة مجموعات البيانات باستخدام Label Studio، وتحقيق دقة تصنيف تصل إلى ~99% لدعم تدريب نموذج اكتشاف الكائنات للتعرف على معدات سلامة العمال.",
          tech: ["Label Studio", "Object Detection", "Computer Vision"],
          image: safetyProject
        },
        {
          id: "fs-1",
          type: "fullstack",
          title: "موقع سيرة ذاتية لمحرر فيديو",
          category: "تطوير الويب",
          image: project1,
          description: "موقع سيرة ذاتية شخصي متجاوب بالكامل مبني باستخدام React و Tailwind CSS و JavaScript. يتميز بتصميم عصري لعرض المشاريع والمهارات ومعلومات الاتصال، مما يوفر تجربة مستخدم سلسة عبر جميع الأجهزة.",
          tech: ["React", "Tailwind CSS", "JavaScript", "React-Icons", "Motion", "CSS"],
          github: "https://github.com/Basel-Mohamed/abdelrhman-portfolio",
          live: "https://abdelrhman-portfolio-ten.vercel.app/"
        },
        {
          id: "fs-6",
          featured: true,
          type: "fullstack",
          title: "تطبيق روم (ROOM APP)",
          category: "تطوير متكامل (Full Stack)",
          image: roomImage,
          description: "السوق الرقمي الأول في الإمارات الذي يربط أكثر من 200 ألف مستخدم بمزودي الخدمات المعتمدين في مجالات التصميم والبناء والمفروشات. تم بناء منصة متكاملة تتميز بملفات تعريف للبائعين، وخطط اشتراك متدرجة، ونظام آمن لتقديم طلبات توثيق الشركات.",
          tech: ["React", "Tailwind CSS", "Framer Motion", "React Icons", "CSS", "Node.js"],
          live: "https://roomapp.ae"
        },
        {
          id: "fs-4",
          type: "fullstack",
          title: "فريش كارت (FreshCart)",
          category: "تطوير الويب",
          image: project4,
          description: "منصة تجارة إلكترونية حديثة ومتجاوبة تقدم تجربة تسوق سلسة. تشمل الميزات مصادقة آمنة للمستخدمين، كتالوج منتجات متقدم مع إمكانية التصفية، عربة تسوق ديناميكية، وإدارة قائمة الرغبات مع تحديثات في الوقت الفعلي باستخدام React Query.",
          tech: ["React.js", "Tailwind CSS", "React Query", "Context API", "Formik", "Axios"],
          github: "https://github.com/Basel-Mohamed/fresh-cart",
          live: "https://fresh-cart-sigma-ashen.vercel.app/"
        },
        {
          id: "fs-7",
          type: "fullstack",
          title: "موقع سيرة ذاتية لمطور واجهات",
          category: "تطوير الويب",
          image: project7,
          description: "موقع سيرة ذاتية شخصي متجاوب بالكامل مبني باستخدام React و Tailwind CSS و JavaScript. يتميز بتصميم عصري لعرض المشاريع والمهارات ومعلومات الاتصال، مما يوفر تجربة مستخدم سلسة عبر جميع الأجهزة.",
          tech: ["React", "Tailwind CSS", "JavaScript", "React-Icons", "CSS"],
          github: "https://github.com/Basel-Mohamed/My_Portfolio",
          live: "https://my-portfolio-v2-olive-delta.vercel.app/"
        },
        {
          id: "fs-3",
          type: "fullstack",
          title: "موقع Daniels",
          category: "تطوير الويب",
          image: project3,
          description: "موقع سيرة ذاتية شخصي متجاوب مبني باستخدام HTML و CSS و Bootstrap، بناءً على تصميم Figma، يعرض المهارات في تحويل التصاميم إلى واجهات ويب عملية.",
          tech: ["HTML", "CSS", "Bootstrap"],
          github: "https://github.com/Basel-Mohamed/Daniels-Website",
          live: "https://basel-mohamed.github.io/Daniels-Website/"
        },
        {
          id: "fs-2",
          type: "fullstack",
          title: "نظام CRUD بسيط",
          category: "تطوير الويب",
          image: project2,
          description: "نظام بسيط لإنشاء وقراءة وتحديث وحذف البيانات (CRUD) مبرمج باستخدام HTML و CSS و JavaScript و Bootstrap.",
          tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
          github: "https://github.com/Basel-Mohamed/Simple-crud-system",
          live: "https://basel-mohamed.github.io/Simple-crud-system/"
        },
      ]
    },
    services: {
      title: "الخدمات",
      cta: "اطلب هذه الخدمة",
      items: [
        {
          id: "ml-models",
          title: "نماذج تعلم الآلة",
          description: "تطوير وتدريب ونشر نماذج تعلم الآلة المخصصة للتحليلات التنبؤية.",
          features: ["معالجة البيانات", "تدريب النماذج", "تحسين المعاملات"]
        },
        {
          id: "rag-systems",
          title: "أنظمة RAG",
          description: "بناء أنظمة بحث ذكية تربط استجابات النماذج اللغوية ببياناتك الخاصة.",
          features: ["قواعد بيانات المتجهات", "البحث الدلالي", "تقليل الهلوسة"]
        },
        {
          id: "nlp-solutions",
          title: "حلول NLP",
          description: "تحليل النصوص المتقدم، تحليل المشاعر، وتطوير روبوتات المحادثة.",
          features: ["التعرف على الكيانات", "تحليل المشاعر", "تصنيف النصوص"]
        },
        {
          id: "cv-solutions",
          title: "الرؤية الحاسوبية",
          description: "أنظمة التعرف على الصور واكتشاف الأشياء للأتمتة.",
          features: ["اكتشاف الأشياء", "تجزئة الصور", "دمج OCR"]
        }
      ]
    },
    contact: {
      title: "تواصل معي",
      subtitle: "دعنا نبني شيئاً ذكياً معاً.",
    },
    chatbot: {
      title: "مساعد ذكاء اصطناعي",
      placeholder: "اسألني أي شيء...",
      suggestions: [
        "حدثني عن خبرتك في RAG",
        "ما هي خدمات الذكاء الاصطناعي التي تقدمها؟",
        "أرني شهاداتك",
        "هل تعمل مع معالجة اللغة العربية؟"
      ],
      prompt: CHATBOT_PROMPT
    }
  }
};