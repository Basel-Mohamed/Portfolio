import {
  Brain,
  Cpu,
  Database,
  Code,
  Cloud,
  Terminal,
  MessageSquare,
  Eye,
  FileText,
  Server,
  Layers,
  Globe,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export const DATA = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
    },
    hero: {
      name: "Basel Mohamed Ahmed",
      title: "Associate AI Engineer",
      tagline: "Building intelligent AI systems that transform data into actionable insights.",
      buttons: {
        contact: "Get in Touch",
        projects: "View Projects",
      }
    },
    about: {
      title: "About Me",
      summary: "I am an Associate AI Engineer based in Maadi, Cairo, specializing in Natural Language Processing (NLP), Generative AI, and Machine Learning. With a strong foundation in building RAG systems, RLHF pipelines, and OCR solutions, I transform complex data into intelligent applications. My passion lies in pushing the boundaries of what AI can achieve, from optimizing large language models to deploying scalable inference engines.",
      location: "Maadi, Cairo, Egypt",
      skills: {
        ai_ml: "AI & Machine Learning",
        techniques: "Techniques (RAG, RLHF, OCR)",
        frameworks: "Frameworks (PyTorch, LangChain)",
        frontend: "Frontend (React, Tailwind)",
        cloud: "Cloud & Tools (OCI, Docker)",
      },
      certifications: [
        {
          title: "Applied Deep Learning - MaharaTech (ITIMooca)",
          date: "Jan 2026",
          image: "/assets/certificates/applied-deep-learning.jpg"
        },
        {
          title: "Python Programming Basics - MaharaTech (ITIMooca)",
          date: "Jan 2026",
          image: "/assets/certificates/python-basics.jpg"
        },
        {
          title: "AI Diploma Intermediate Level - NeuroTech",
          date: "Jan 2026",
          image: "/assets/certificates/ai-diploma-neurotech.jpg"
        },
        {
          title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
          date: "Oct 2025",
          image: "/assets/certificates/oracle-ai-foundations.jpg"
        },
        {
          title: "Elements of AI Course - University of Helsinki",
          date: "Sep 2025",
          image: "/assets/certificates/elements-of-ai.jpg"
        },

        {
          title: "Python for Data Science and AI - Coursera",
          date: "Jul 2025",
          image: "/assets/certificates/python-data-science-coursera.jpg"
        },
        {
          title: "Generative AI: Prompt Engineering - Coursera",
          date: "Jul 2025",
          image: "/assets/certificates/prompt-engineering.jpg"
        },
        {
          title: "Generative AI Essentials - Coursera",
          date: "Jul 2025",
          image: "/assets/certificates/gen-ai-essentials.jpg"
        },
        {
          title: "AI and Machine Learning Foundations - Sprints",
          date: "Jun 2025",
          image: "/assets/certificates/sprints-ai-ml.png"
        },
        {
          title: "Artificial Intelligence Essentials V2 - Coursera",
          date: "Jun 2025",
          image: "/assets/certificates/ai-essentials-v2.jpg"
        },
        {
          title: "React Native: Mobile App Development (CLI) - Udemy",
          date: "Jun 2025",
          image: "/assets/certificates/react-native-udemy.jpg"
        },
        {
          title: "The Principles of Writing Clean Code - MaharaTech",
          date: "Apr 2025",
          image: "/assets/certificates/clean-code.jpg"
        },
        {
          title: "React Basics - HackerRank",
          date: "Apr 2025",
          image: "/assets/certificates/react-basics-hackerrank.jpg"
        },
        {
          title: "React JS - MaharaTech (ITIMooca)",
          date: "Apr 2025",
          image: "/assets/certificates/react-js-maharatech.jpg"
        },
        {
          title: "Frontend Development Diploma - Route",
          date: "Mar 2025",
          image: "/assets/certificates/frontend-diploma-route.jpg"
        },
        {
          title: "Database Fundamentals - MaharaTech",
          date: "Mar 2025",
          image: "/assets/certificates/database-fundamentals.jpg"
        },
        {
          title: "HTML & CSS - MaharaTech",
          date: "Mar 2025",
          image: "/assets/certificates/html-css.jpg"
        },
        {
          title: "UX Design Fundamentals - MaharaTech",
          date: "Jan 2025",
          image: "/assets/certificates/ux-design.jpg"
        }
      ]
    },
    experience: {
      title: "Professional Experience",
      internshipsTitle: "Training & Internships",
      professional: [
        {
          id: 1,
          title: "Associate AI Engineer",
          company: "IT-RANKS Technology",
          period: "May 2025 - Present",
          description: "Developed and fine-tuned NLP/GenAI models. Built end-to-end AI pipelines using PyTorch and Hugging Face, and deployed production-ready RAG workflows using LangChain, Qdrant, and FastAPI.",
        },
        {
          id: 4,
          title: "Software Engineer",
          company: "IT-RANKS Technology",
          period: "Apr 2025 - May 2025",
          description: "Developed responsive web interfaces using React.js and Next.js. Leveraged Tailwind CSS and MUI for scalable UI design, and collaborated with backend teams to integrate APIs.",
        },
        {
          id: 6,
          title: "AI Trainer (Coding Expertise)",
          company: "Outlier",
          period: "Jul 2024 - Mar 2025",
          description: "Trained and evaluated multiple LLMs (Gemini, LLaMA, Claude) using RLHF. Assessed model outputs for correctness, safety, and code generation quality while applying prompt engineering techniques.",
        },
        {
          id: 8,
          title: "AI Trainer",
          company: "Remotasks",
          period: "Jan 2021 - Mar 2023",
          description: "Annotated large-scale datasets and evaluated chatbot responses to ensure accuracy, consistency, and high labeling quality.",
        }
      ],
      internships: [
        {
          id: 2,
          title: "Machine Learning Engineer Trainee",
          company: "Digital Egypt Pioneers Initiative (DEPI)",
          period: "Nov 2025 - Present",
          description: "Participating in an intensive machine learning program, focusing on Python, data processing, and soft skills development.",
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
          type: "ai",             
          nda: true,              
          github: "",             
          live: "", 
          title: "Enterprise RAG Agent",
          category: "RAG & FastAPI",
          description: "Built an end-to-end RAG system with document ingestion, embeddings, retrieval (Qdrant), and reranking. Exposed the workflow via FastAPI, with a configurable LLM factory (Local / Cohere / Groq) and production-ready logging.",
          tech: ["LangChain", "Qdrant", "FastAPI", "Cohere", "Groq"],
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "doc-understanding",
          type: "ai",             
          nda: true,              
          github: "",             
          live: "", 
          title: "Document AI - Arabic OCR System",
          category: "OCR & FastAPI",
          description: "Fine-tuned OCR models on combined real and synthetic data, increasing Arabic accuracy from 78% to 92% and achieving 96% in English. Built end-to-end preprocessing and inference pipelines exposed via FastAPI.",
          tech: ["Python", "FastAPI", "OCR", "Transformers"],
          image: "https://images.unsplash.com/photo-1622814859704-c6cd5ae75dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
          image: "https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
          image: "https://images.unsplash.com/photo-1750365919971-7dd273e7b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        sent: "Message Sent!",
      }
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
      prompt: `You are the professional AI Assistant for **Basel Mohamed Ahmed**, an AI Engineer and Full Stack Developer based in Maadi, Cairo, Egypt.

**YOUR GOAL:**
To assist recruiters, clients, and visitors by answering professional questions about Basel's skills, services, and experience. Act as a bridge to hire him or collaborate with him. 

**STRICT GUARDRAILS & BEHAVIOR:**
1. **NO Personal Life:** You must NOT answer questions about Basel's private life, family, relationships, religion, politics, or specific street address. If asked, politely reply: "I am designed to discuss Basel's professional work only."
2. **Contact Info:** You ARE ALLOWED to provide his contact details when asked:
   - Email: basel.mohamed@it-ranks.com (Work) or baselmohamed937@gmail.com (Personal)
   - Phone: +201007337686
3. **Tone:** Professional, enthusiastic, concise, and helpful. 
4. **Language:** Respond in the same language the user speaks.
5. **Unknowns:** If you do not find the answer in the provided context below, state that you don't know and suggest contacting Basel directly.

**BASEL'S KNOWLEDGE BASE:**
- **Current Role:** Associate AI Engineer at IT-RANKS Technology (May 2025 - Present). Focus: NLP, Generative AI, RAG pipelines, and building end-to-end AI pipelines.
- **Services Offered:** RAG Systems, NLP Solutions, Computer Vision, Generative AI.
- **Key Technical Skills:** Python, PyTorch, LangChain, Qdrant, FastAPI, React.js, Tailwind CSS, Oracle OCI, Docker.
- **Experience History:**
  - Associate AI Engineer & Software Engineer at IT-RANKS (Apr 2025 - Present)
  - Machine Learning Trainee at DEPI (Nov 2025 - Present)
  - AI Developer Trainee at NeuroTech (Jun 2025 - Jan 2026)
  - UI/UX Developer Trainee at ITI (Feb 2025 - Apr 2025)
  - AI Trainer (Coding) at Outlier (Jul 2024 - Mar 2025)
  - Frontend Web Developer Trainee at Route (Sep 2024 - Feb 2025)
  - AI Trainer at Remotasks (Jan 2021 - Mar 2023)
- **Certifications:** Oracle Cloud AI Foundations, Elements of AI, Deep Learning (MaharaTech), Python for Data Science (Coursera), React Basics (HackerRank), and many others in Frontend, Database, and Clean Code.`
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عني",
      experience: "الخبرة",
      projects: "المشاريع",
      services: "الخدمات",
      contact: "تواصل",
    },
    hero: {
      name: "باسل محمد أحمد",
      title: "مهندس ذكاء اصطناعي",
      tagline: "بناء أنظمة ذكاء اصطناعي ذكية تحول البيانات إلى رؤى قابلة للتنفيذ.",
      buttons: {
        contact: "تواصل معي",
        projects: "عرض المشاريع",
      }
    },
    about: {
      title: "نبذة عني",
      summary: "أنا مهندس ذكاء اصطناعي مقيم في المعادي، القاهرة، متخصص في معالجة اللغات الطبيعية (NLP)، والذكاء الاصطناعي التوليدي، وتعلم الآلة. لدي أساس قوي في بناء أنظمة RAG، وخطوط أنابيب RLHF، وحلول OCR. أقوم بتحويل البيانات المعقدة إلى تطبيقات ذكية.",
      location: "المعادي، القاهرة، مصر",
      skills: {
        ai_ml: "الذكاء الاصطناعي وتعلم الآلة",
        techniques: "تقنيات (RAG, RLHF, OCR)",
        frameworks: "أطر العمل (PyTorch, LangChain)",
        frontend: "الواجهة الأمامية (React, Tailwind)",
        cloud: "السحابة والأدوات (OCI, Docker)",
      },
      certifications: [
        {
          title: "Applied Deep Learning - MaharaTech (ITIMooca)",
          date: "Jan 2026",
          image: "/assets/certificates/applied-deep-learning.jpg"
        },
        {
          title: "Python Programming Basics - MaharaTech (ITIMooca)",
          date: "Jan 2026",
          image: "/assets/certificates/python-basics.jpg"
        },
        {
          title: "AI Diploma Intermediate Level - NeuroTech",
          date: "Jan 2026",
          image: "/assets/certificates/ai-diploma-neurotech.jpg"
        },
        {
          title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
          date: "Oct 2025",
          image: "/assets/certificates/oracle-ai-foundations.jpg"
        },
        {
          title: "Elements of AI Course - University of Helsinki",
          date: "Sep 2025",
          image: "/assets/certificates/elements-of-ai.jpg"
        },

        {
          title: "Python for Data Science and AI - Coursera",
          date: "Jul 2025",
          image: "/assets/certificates/python-data-science-coursera.jpg"
        },
        {
          title: "Generative AI: Prompt Engineering - Coursera",
          date: "Jul 2025",
          image: "/assets/certificates/prompt-engineering.jpg"
        },
        {
          title: "Generative AI Essentials - Coursera",
          date: "Jul 2025",
          image: "/assets/certificates/gen-ai-essentials.jpg"
        },
        {
          title: "AI and Machine Learning Foundations - Sprints",
          date: "Jun 2025",
          image: "/assets/certificates/sprints-ai-ml.png"
        },
        {
          title: "Artificial Intelligence Essentials V2 - Coursera",
          date: "Jun 2025",
          image: "/assets/certificates/ai-essentials-v2.jpg"
        },
        {
          title: "React Native: Mobile App Development (CLI) - Udemy",
          date: "Jun 2025",
          image: "/assets/certificates/react-native-udemy.jpg"
        },
        {
          title: "The Principles of Writing Clean Code - MaharaTech",
          date: "Apr 2025",
          image: "/assets/certificates/clean-code.jpg"
        },
        {
          title: "React Basics - HackerRank",
          date: "Apr 2025",
          image: "/assets/certificates/react-basics-hackerrank.jpg"
        },
        {
          title: "React JS - MaharaTech (ITIMooca)",
          date: "Apr 2025",
          image: "/assets/certificates/react-js-maharatech.jpg"
        },
        {
          title: "Frontend Development Diploma - Route",
          date: "Mar 2025",
          image: "/assets/certificates/frontend-diploma-route.jpg"
        },
        {
          title: "Database Fundamentals - MaharaTech",
          date: "Mar 2025",
          image: "/assets/certificates/database-fundamentals.jpg"
        },
        {
          title: "HTML & CSS - MaharaTech",
          date: "Mar 2025",
          image: "/assets/certificates/html-css.jpg"
        },
        {
          title: "UX Design Fundamentals - MaharaTech",
          date: "Jan 2025",
          image: "/assets/certificates/ux-design.jpg"
        }
      ]
    },
    experience: {
      title: "الخبرة المهنية",
      internshipsTitle: "التدريب الداخلي والبرامج التدريبية",
      professional: [
        {
          id: 1,
          title: "مهندس ذكاء اصطناعي مشارك",
          company: "IT-RANKS Technology",
          period: "مايو 2025 - الحاضر",
          description: "تطوير وتحسين نماذج معالجة اللغات الطبيعية (NLP) والذكاء الاصطناعي التوليدي. بناء خطوط أنابيب الذكاء الاصطناعي باستخدام PyTorch و Hugging Face، ونشر أنظمة RAG باستخدام LangChain و Qdrant و FastAPI.",
        },
        {
          id: 4,
          title: "مهندس برمجيات",
          company: "IT-RANKS Technology",
          period: "أبريل 2025 - مايو 2025",
          description: "تطوير واجهات ويب متجاوبة باستخدام React.js و Next.js مع Tailwind CSS و MUI. التعاون مع فرق الواجهة الخلفية لدمج واجهات برمجة التطبيقات (APIs).",
        },
        {
          id: 6,
          title: "مدرب ذكاء اصطناعي (خبرة برمجية)",
          company: "Outlier",
          period: "يوليو 2024 - مارس 2025",
          description: "تدريب وتقييم نماذج لغوية كبيرة (مثل Gemini, LLaMA, Claude) باستخدام تقنيات RLHF. تقييم دقة مخرجات النماذج، والسلامة، وجودة توليد الأكواد.",
        },
        {
          id: 8,
          title: "مدرب ذكاء اصطناعي",
          company: "Remotasks",
          period: "يناير 2021 - مارس 2023",
          description: "التعليق على مجموعات البيانات واسعة النطاق وتقييم استجابات روبوتات المحادثة لضمان الدقة والاتساق وجودة التصنيف.",
        }
      ],
      internships: [
        {
          id: 2,
          title: "متدرب هندسة تعلم الآلة",
          company: "مبادرة أشبال مصر الرقمية (DEPI)",
          period: "نوفمبر 2025 - الحاضر",
          description: "المشاركة في برنامج مكثف لتعلم الآلة مع التركيز على لغة Python، ومعالجة البيانات، وتطوير المهارات الشخصية والعملية.",
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
      title: "مشاريع مميزة",
      items: [
        {
          id: "rag-agent",
          type: "ai",
          nda: true,
          github: "",
          live: "",
          title: "نظام وكيل RAG المؤسسي",
          category: "RAG & FastAPI",
          description: "بناء نظام RAG متكامل يتضمن استيعاب المستندات، التضمين، الاسترجاع (Qdrant)، وإعادة الترتيب. تم نشر واجهة برمجة التطبيقات عبر FastAPI مع مصنع LLM قابل للتهيئة (Local / Cohere / Groq).",
          tech: ["LangChain", "Qdrant", "FastAPI", "Cohere", "Groq"],
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "doc-understanding",
          type: "ai",             
          nda: true,              
          github: "",             
          live: "",               
          title: "نظام فهم المستندات (OCR عربي)",
          category: "OCR & FastAPI",
          description: "تحسين نماذج OCR على بيانات حقيقية واصطناعية، مما رفع دقة اللغة العربية من 78٪ إلى 92٪. بناء خطوط أنابيب استدلال متكاملة عبر FastAPI لدمجها مع مكونات الذكاء الاصطناعي الأخرى.",
          tech: ["Python", "FastAPI", "OCR", "Transformers"],
          image: "https://images.unsplash.com/photo-1622814859704-c6cd5ae75dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "digital-assistant",
          type: "ai",             
          nda: true,              
          github: "",             
          live: "", 
          title: "المساعد الرقمي OCI",
          category: "OCI & NLP",
          description: "تطوير مساعد رقمي على منصة أوراكل للتفاعل مع قواعد البيانات باللغة الطبيعية. تصميم مسارات عمل الذكاء الاصطناعي على OCI، بما في ذلك تدريب النماذج وهندسة التلقين.",
          tech: ["Oracle Cloud", "NLP", "Prompt Engineering"],
          image: "https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        },
        {
          id: "safety-detection",
          type: "ai",             
          nda: true,              
          github: "",             
          live: "", 
          title: "نظام الكشف عن معدات السلامة",
          category: "Computer Vision",
          description: "معالجة وتعليق البيانات باستخدام Label Studio بدقة 99٪ لتدريب نموذج اكتشاف الكائنات للتعرف على معدات السلامة للعمال في البيئات الصناعية.",
          tech: ["Label Studio", "Object Detection", "Computer Vision"],
          image: "https://images.unsplash.com/photo-1750365919971-7dd273e7b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
        send: "إرسال الرسالة",
        sending: "جاري الإرسال...",
        sent: "تم الإرسال!",
      }
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
      prompt: `You are the professional AI Assistant for **Basel Mohamed Ahmed**, an AI Engineer and Full Stack Developer based in Maadi, Cairo, Egypt. 

**YOUR GOAL:**
To assist recruiters, clients, and visitors by answering professional questions about Basel's skills, services, and experience. Act as a bridge to hire him or collaborate with him. 

**IMPORTANT:** Even though this prompt is in English, you MUST respond to the user in Arabic if they speak to you in Arabic or if you detect an Arabic locale preference.

**STRICT GUARDRAILS & BEHAVIOR:**
1. **NO Personal Life:** You must NOT answer questions about Basel's private life, family, relationships, religion, politics, or specific street address. If asked, politely reply: "I am designed to discuss Basel's professional work only."
2. **Contact Info:** You ARE ALLOWED to provide his contact details when asked:
   - Email: basel.mohamed@it-ranks.com (Work) or baselmohamed937@gmail.com (Personal)
   - Phone: +201007337686
3. **Tone:** Professional, enthusiastic, concise, and helpful. 
4. **Unknowns:** If you do not find the answer in the provided context below, state that you don't know and suggest contacting Basel directly.

**BASEL'S KNOWLEDGE BASE:**
- **Current Role:** Associate AI Engineer at IT-RANKS Technology (May 2025 - Present). Focus: NLP, Generative AI, RAG pipelines, and building end-to-end AI pipelines.
- **Services Offered:** RAG Systems, NLP Solutions, Computer Vision, Generative AI.
- **Key Technical Skills:** Python, PyTorch, LangChain, Qdrant, FastAPI, React.js, Tailwind CSS, Oracle OCI, Docker.
- **Experience History:**
  - Associate AI Engineer & Software Engineer at IT-RANKS (Apr 2025 - Present)
  - Machine Learning Trainee at DEPI (Nov 2025 - Present)
  - AI Developer Trainee at NeuroTech (Jun 2025 - Jan 2026)
  - UI/UX Developer Trainee at ITI (Feb 2025 - Apr 2025)
  - AI Trainer (Coding) at Outlier (Jul 2024 - Mar 2025)
  - Frontend Web Developer Trainee at Route (Sep 2024 - Feb 2025)
  - AI Trainer at Remotasks (Jan 2021 - Mar 2023)
- **Certifications:** Oracle Cloud AI Foundations, Elements of AI, Deep Learning (MaharaTech), Python for Data Science (Coursera), React Basics (HackerRank), and many others in Frontend, Database, and Clean Code.`
    }
  }
};