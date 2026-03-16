import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { FaBrain, FaCode, FaCloud, FaTerminal, FaAward } from 'react-icons/fa6';
import { Link } from 'react-router';

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
          {/* STANDARDIZED TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.about.title}
          </h1>
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
              <FaBrain size={24} />
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
              <FaTerminal size={24} />
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
              <FaCode size={24} />
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
              <FaCloud size={24} />
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gray-50 dark:bg-[#0D1117] p-10 rounded-3xl border border-gray-200 dark:border-gray-800"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaAward size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Continuous Learning</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            I have earned over 18 professional certifications from institutions like Oracle, Coursera, and MaharaTech.
          </p>
          <Link
            to="/certifications"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            View All Certifications
          </Link>
        </motion.div>
      </div>
    </div>
  );
}