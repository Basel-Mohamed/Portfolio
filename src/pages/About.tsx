import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mail, Brain, Code, Cloud, Terminal } from 'lucide-react';
import { Certifications } from '../components/layout/Certifications';

export function About() {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.about.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {t.about.summary}
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-500">

          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={item} className="p-6 bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
              <Brain size={24} />
            </div>
            <h3 className="text-lg font-bold mb-3">{t.about.skills.ai_ml}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>Neural Networks</li>
              <li>Predictive Analytics</li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="p-6 bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <Terminal size={24} />
            </div>
            <h3 className="text-lg font-bold mb-3">{t.about.skills.techniques}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>RAG Systems</li>
              <li>RLHF</li>
              <li>OCR</li>
              <li>Prompt Engineering</li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="p-6 bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
              <Code size={24} />
            </div>
            <h3 className="text-lg font-bold mb-3">{t.about.skills.frameworks}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>PyTorch</li>
              <li>LangChain</li>
              <li>FastAPI</li>
              <li>Qdrant / ChromaDB</li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="p-6 bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400">
              <Cloud size={24} />
            </div>
            <h3 className="text-lg font-bold mb-3">{t.about.skills.cloud}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Oracle OCI</li>
              <li>Docker</li>
              <li>Git / GitHub</li>
              <li>Linux / Bash</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Dynamic Certifications from context */}
        <Certifications certifications={t.about.certifications} />
      </div>
    </div>
  );
}