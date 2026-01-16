import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code, Brain, Database, Zap, Award, Briefcase, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';

export default function About() {
    return (
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
                <div key={i} className="flex items-start gap-3 opacity-0 animate-slideInLeft" style={{ animationDelay: `${0.4 + i * 0.1}s`, animationFillMode: 'forwards' }}>
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
    );
}