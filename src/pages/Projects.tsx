import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Github, ExternalLink, Lock } from 'lucide-react';

export function Projects() {
  const { t, dir } = useLanguage();
  // State to track which category is currently selected
  const [activeCategory, setActiveCategory] = useState<'ai' | 'fullstack'>('ai');

  // We define the tab text here based on the language direction
  const tabLabels = {
    ai: dir === 'rtl' ? 'مشاريع الذكاء الاصطناعي' : 'AI Projects',
    fullstack: dir === 'rtl' ? 'مشاريع الواجهات' : 'Full Stack Projects',
  };

  // Filter the projects based on the active category
  // Make sure your data.ts items have a `type: 'ai'` or `type: 'fullstack'` property
  const filteredProjects = t.projects.items.filter((project: any) => project.type === activeCategory);

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-6">{t.projects.title}</h1>
        </motion.div>

        {/* --- CATEGORY TOGGLE --- */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-[#161b22] p-1 rounded-full inline-flex border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveCategory('ai')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === 'ai' 
                  ? 'bg-blue-600 shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tabLabels.ai}
            </button>
            <button
              onClick={() => setActiveCategory('fullstack')}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === 'fullstack' 
                  ? 'bg-blue-600 shadow-md'
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
            // Updated to check the length of filteredProjects, not the whole list
            const isLastOdd = index === filteredProjects.length - 1 && filteredProjects.length % 2 !== 0;

            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white dark:bg-[#161b22] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col w-full ${
                  isLastOdd ? 'md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto' : ''
                }`}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  {/* --- HOVER OVERLAY --- */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.nda ? (
                      // NDA State
                      <div className="flex items-center gap-2 px-6 py-3 bg-red-600/90 text-white rounded-full font-bold tracking-wide backdrop-blur-sm shadow-lg">
                        <Lock size={18} />
                        <span>NDA</span>
                      </div>
                    ) : (
                      // Links State
                      <>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform shadow-lg">
                            <Github size={20} />
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Show a fallback if a category has no projects */}
        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No projects found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}