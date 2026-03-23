import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from '../components/features/ProjectCard';

export function Projects() {
  const { t, dir } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'ai' | 'fullstack'>('ai');

  const tabLabels = {
    ai: dir === 'rtl' ? 'مشاريع الذكاء الاصطناعي' : 'AI Projects',
    fullstack: dir === 'rtl' ? 'مشاريع الواجهات' : 'Full Stack Projects',
  };

  const filteredProjects = t.projects.items.filter((project: any) => project.type === activeCategory);

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          {/* STANDARDIZED TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.projects.title}
          </h1>
        </motion.div>

        {/* --- CATEGORY TOGGLE --- */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-[#161b22] p-1 rounded-full inline-flex border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveCategory('ai')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === 'ai' 
                  ? 'bg-blue-600 shadow-md text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tabLabels.ai}
            </button>
            <button
              onClick={() => setActiveCategory('fullstack')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === 'fullstack' 
                  ? 'bg-blue-600 shadow-md text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tabLabels.fullstack}
            </button>
          </div>
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: any, index: number) => {
            const isLastOdd = index === filteredProjects.length - 1 && filteredProjects.length % 2 !== 0;

            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                isLastOdd={isLastOdd} 
              />
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No projects found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}