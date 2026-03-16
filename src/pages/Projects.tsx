import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { FaGithub, FaLock } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';

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
                  
                  {/* --- DESKTOP HOVER OVERLAY (Hidden on Mobile) --- */}
                  <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-4">
                    {project.nda ? (
                      <div className="flex items-center gap-2 px-6 py-3 bg-red-600/90 text-white rounded-full font-bold tracking-wide backdrop-blur-sm shadow-lg">
                        <FaLock size={16} />
                        <span>NDA</span>
                      </div>
                    ) : (
                      <>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform shadow-lg">
                            <FaGithub size={20} />
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                            <FaExternalLinkAlt size={20} />
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
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                      {project.tech.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* --- MOBILE ACTION BUTTONS (Hidden on Desktop) --- */}
                    <div className="md:hidden flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                      {project.nda ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold text-sm w-full justify-center">
                          <FaLock size={14} />
                          <span>Under NDA</span>
                        </div>
                      ) : (
                        <>
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
                              <FaGithub size={16} /> Code
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                              <FaExternalLinkAlt size={14} /> Live Demo
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
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