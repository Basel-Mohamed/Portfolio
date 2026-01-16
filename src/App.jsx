import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Brain, Database, Zap, Award, Briefcase, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';
import profilePic from './assets/profile_pic.png';
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const experiences = [
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

  const projects = [
    {
      title: "Document Understanding System",
      company: "IT-RANKS",
      description: "Fine-tuned transformer-based and deep learning OCR models to enhance Arabic text recognition for production use cases. Built complete data preprocessing and inference pipelines and integrated models using FastAPI.",
      tech: ["PyTorch", "FastAPI", "Flask", "WebSocket", "Transformers", "OCR"],
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Al Jasser Digital Assistant",
      company: "IT-RANKS",
      description: "Developed a digital assistant on Oracle platform enabling natural language interaction with databases. Designed end-to-end AI workflows on OCI including model training and prompt engineering.",
      tech: ["Oracle OCI", "NLP", "LLM", "Prompt Engineering"],
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Savola Safety Detection",
      company: "IT-RANKS",
      description: "Annotated and preprocessed data using Label Studio to train a computer vision model with object detection for identifying worker safety gear from camera footage.",
      tech: ["Computer Vision", "Object Detection", "Label Studio"],
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "R Eyes Optic Automation",
      company: "Freelance",
      description: "Developed and deployed a real-time RAG-based automation model integrated with e-commerce system and connected to WhatsApp and Meta to automate customer support.",
      tech: ["RAG", "WhatsApp API", "Meta API", "Real-time Processing"],
      icon: <Code className="w-6 h-6" />
    }
  ];

  const skills = [
    { category: "AI/ML", items: ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "Computer Vision", "Model Training & Evaluation"] },
    { category: "AI Techniques", items: ["RLHF", "RAG", "OCR", "Prompt Engineering", "Data Preprocessing & Annotation"] },
    { category: "Frameworks", items: ["PyTorch", "Hugging Face Transformers", "TensorFlow", "FastAPI", "Flask"] },
    { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "MUI", "Bootstrap"] },
    { category: "Cloud & Tools", items: ["Oracle OCI", "Label Studio", "WebSocket", "Git", "Docker"] }
  ];

  const certifications = [
    "Oracle Cloud Infrastructure 2025 Generative AI Professional (Nov 2025)",
    "Artificial Intelligence Diploma - Intermediate Level (Nov 2025)",
    "Oracle Cloud Infrastructure 2025 AI Foundations Associate (Oct 2025)",
    "Elements of AI For Business - Google (Sep 2025)",
    "Python for Data Science and AI - IBM (Jul 2025)",
    "AI and Machine Learning Foundations - Sprints (Jun 2025)",
    "React Basics - HackerRank (Apr 2025)",
    "Frontend Development Diploma - Route (Mar 2025)"
  ];

  // Floating particles animation
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.2); }
        }
        .animate-float { animation: float linear infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .glass-effect {
          background: rgba(26, 26, 26, 0.8);
          backdrop-filter: blur(10px);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-effect shadow-lg border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Basel Mohamed
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-all duration-300 relative group ${
                    activeSection === item.toLowerCase()
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${
                    activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with AI Background */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        {/* AI Neural Network Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="white" opacity="0.3"/>
                <line x1="25" y1="25" x2="75" y2="25" stroke="white" strokeWidth="0.5" opacity="0.2"/>
                <line x1="25" y1="25" x2="25" y2="75" stroke="white" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        
        <Particles />
        
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="mb-8">
            {/* Profile Image */}
            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 animate-scaleIn animate-pulse-glow">
              <img 
                src={profilePic}
                alt="Basel Mohamed Ahmed" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-fadeInUp">
              Basel Mohamed Ahmed
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-6 animate-fadeInUp stagger-1">
              <Sparkles className="w-6 h-6 text-gray-400" />
              <p className="text-2xl md:text-3xl text-gray-300">Associate AI Engineer</p>
              <Sparkles className="w-6 h-6 text-gray-400" />
            </div>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto animate-fadeInUp stagger-2">
              Specializing in NLP, Generative AI, and Machine Learning. Building intelligent solutions that transform data into actionable insights.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeInUp stagger-3">
              <a href="mailto:baselmohamed937@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg">
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
              <a href="https://github.com/Basel-Mohamed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:border-gray-500">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
          
          <button onClick={() => scrollToSection('about')} className="animate-bounce mt-8">
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-950 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent opacity-0 animate-fadeInUp">
            About Me
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl opacity-0 animate-fadeInUp stagger-2 hover:border-gray-700 transition-all duration-300">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Junior AI Engineer with hands-on experience in NLP, Generative AI, and machine learning projects. 
              I specialize in developing and integrating AI models, including document understanding (OCR), 
              RAG pipelines, and reinforcement learning with human feedback (RLHF).
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Experienced in data preprocessing, annotation, model training, and evaluation using Python, PyTorch, 
              and Hugging Face Transformers. Certified Oracle Generative AI Professional with additional experience 
              in frontend development using React.js. Passionate about leveraging AI to build efficient, scalable, and practical solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { icon: MapPin, label: "Location", value: "Maadi, Cairo, Egypt" },
                { icon: Phone, label: "Phone", value: "01007337686" },
                { icon: Mail, label: "Email", value: "baselmohamed937@gmail.com" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 opacity-0 animate-slideInLeft" style={{animationDelay: `${0.4 + i * 0.1}s`, animationFillMode: 'forwards'}}>
                  <item.icon className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-gray-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-gray-700 transition-all duration-500 opacity-0 animate-slideInRight hover:scale-[1.02] hover:shadow-2xl" style={{animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards'}}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                    <p className="text-gray-400 text-lg">{exp.company}</p>
                    <p className="text-gray-500">{exp.period} | {exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-16">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span>• {achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Key Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-gray-700 transition-all duration-500 opacity-0 animate-scaleIn hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards'}}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gray-800 rounded-lg text-white">
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-gray-500 transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Core Competencies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl opacity-0 animate-fadeInUp hover:border-gray-700 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards'}}>
                <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl opacity-0 animate-slideInLeft hover:border-gray-700 transition-all duration-300" style={{animationFillMode: 'forwards'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Bachelor's Degree</h3>
                  <p className="text-gray-400">Civil Engineering</p>
                  <p className="text-gray-500">Helwan University • 2019-2024</p>
                  <p className="text-gray-500">Grade: Good</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl opacity-0 animate-slideInRight hover:border-gray-700 transition-all duration-300" style={{animationFillMode: 'forwards'}}>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-white mb-4">Certifications</h3>
                  <ul className="space-y-2">
                    {certifications.map((cert, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-gray-500 mt-1">✓</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Interested in collaborating or discussing AI projects? Feel free to reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:baselmohamed937@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110 font-semibold hover:shadow-xl">
              <Mail className="w-6 h-6" />
              <span>Email Me</span>
            </a>
            <a href="https://www.linkedin.com/in/basel-mohamed-94972a334" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:border-gray-500">
              <Linkedin className="w-6 h-6" />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a href="https://github.com/Basel-Mohamed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:border-gray-500">
              <Github className="w-6 h-6" />
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 Basel Mohamed Ahmed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}