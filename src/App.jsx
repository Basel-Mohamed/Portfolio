import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Brain, Database, Zap, Award, Briefcase, GraduationCap, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const experiences = [
    {
      title: "Associate AI Engineer",
      company: "IT-RANKS Technology",
      period: "April 2025 - Present",
      location: "New Cairo, Egypt",
      achievements: [
        "Developed and fine-tuned NLP and Generative AI models for information extraction and content generation",
        "Built end-to-end AI pipelines covering data preprocessing, model training, evaluation, and inference",
        "Conducted dataset creation and annotation activities to improve model accuracy",
        "Applied prompt engineering and continuous model refinement to enhance performance"
      ]
    },
    {
      title: "AI Trainer (Coding Expertise)",
      company: "Outlier",
      period: "July 2024 - March 2025",
      location: "Remote (USA)",
      achievements: [
        "Trained and evaluated LLMs including Gemini, GPT-3.5, LLaMA, Claude, and Tara using RLHF",
        "Conducted multi-dimensional assessment of model outputs for accuracy and safety",
        "Enhanced code generation and text outputs for instruction compliance"
      ]
    },
      {
      title: "AI Trainer",
      company: "Remotasks",
      period: "Jan 2021 - Mar 2023",
      location: "Remote (USA)",
      achievements: [
        "Refined chatbot responses to improve interaction quality and user engagement",
        "Reviewed and updated training data for accuracy, consistency, and relevance",
        "Annotated datasets to enhance AI model performance"
      ]
    }
  ];

  const projects = [
    {
      title: "Document Understanding System",
      company: "IT-RANKS",
      description: "Fine-tuned transformer-based OCR models for Arabic text recognition with complete data preprocessing and inference pipelines.",
      tech: ["PyTorch", "FastAPI", "Flask", "WebSocket", "Transformers"],
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Al Jasser Digital Assistant",
      company: "IT-RANKS",
      description: "Built a natural language database assistant on Oracle platform with end-to-end AI workflows and prompt engineering.",
      tech: ["Oracle OCI", "NLP", "LLM", "Database Integration"],
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Savola Safety Detection",
      company: "IT-RANKS",
      description: "Developed computer vision model for worker safety gear detection using annotated data from Label Studio.",
      tech: ["Computer Vision", "Object Detection", "Label Studio"],
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "R Eyes Optic Automation",
      company: "Freelance",
      description: "Real-time RAG-based automation model integrated with e-commerce, WhatsApp, and Meta for customer support.",
      tech: ["RAG", "WhatsApp API", "Meta API", "Real-time Processing"],
      icon: <Code className="w-6 h-6" />
    }
  ];

  const skills = [
    { category: "AI/ML", items: ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "Computer Vision"] },
    { category: "Frameworks", items: ["PyTorch", "Hugging Face", "TensorFlow", "FastAPI", "Flask"] },
    { category: "Techniques", items: ["RLHF", "RAG", "OCR", "Prompt Engineering", "Model Fine-tuning"] },
    { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "MUI", "Bootstrap"] },
    { category: "Tools", items: ["Label Studio", "Oracle OCI", "WebSocket", "Git", "Docker"] }
  ];

  const certifications = [
    "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    "Artificial Intelligence Diploma - Intermediate Level",
    "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    "Elements of AI For Business (Google)",
    "Python for Data Science and AI (IBM)",
    "AI and Machine Learning Foundations"
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Basel Mohamed
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-purple-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <Brain className="w-16 h-16 text-purple-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Basel Mohamed Ahmed
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-6">Associate AI Engineer</p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Specializing in NLP, Generative AI, and Machine Learning. Building intelligent solutions that transform data into actionable insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="mailto:baselmohamed937@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
              <a href="https://github.com/Basel-Mohamed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
          <button onClick={() => scrollToSection('about')} className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Junior AI Engineer with hands-on experience in NLP, Generative AI, and machine learning projects. 
              I specialize in developing and integrating AI models, including document understanding (OCR), 
              RAG pipelines, and reinforcement learning with human feedback (RLHF).
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Experienced in data preprocessing, annotation, model training, and evaluation using Python, PyTorch, 
              and Hugging Face Transformers. Certified Oracle Generative AI Professional with additional experience 
              in frontend development using React.js.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-400">Maadi, Cairo, Egypt</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-400">01007337686</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-400">baselmohamed937@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-lg">{exp.company}</p>
                    <p className="text-gray-400">{exp.period} | {exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-16">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      {/* <span className="text-purple-400 mt-2">•</span> */}
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
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Key Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-lg text-purple-400">
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-purple-400 text-sm">{project.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm">
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
      <section id="skills" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Core Competencies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-purple-400 mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-lg text-sm">
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
      <section id="education" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Education & Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Bachelor's Degree</h3>
                  <p className="text-purple-400">Civil Engineering</p>
                  <p className="text-gray-400">Helwan University • 2019-2024</p>
                  <p className="text-gray-400">Grade: Good</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Certifications</h3>
                  <ul className="space-y-2">
                    {certifications.map((cert, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-purple-400 mt-1">✓</span>
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
      <section id="contact" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Interested in collaborating or discussing AI projects? Feel free to reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:baselmohamed937@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all hover:scale-105">
              <Mail className="w-6 h-6" />
              <span className="font-semibold">Email Me</span>
            </a>
            <a href="https://www.linkedin.com/in/basel-mohamed-94972a334" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all hover:scale-105">
              <Linkedin className="w-6 h-6" />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a href="https://github.com/Basel-Mohamed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all hover:scale-105">
              <Github className="w-6 h-6" />
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 Basel Mohamed Ahmed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}