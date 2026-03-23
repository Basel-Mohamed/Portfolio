import React from 'react';
import { motion } from 'motion/react';
import { FaGithub, FaLock } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';

export interface ProjectType {
  id: string | number;
  category: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  nda?: boolean;
  github?: string;
  live?: string;
  type?: string;
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  isLastOdd: boolean;
}

export function ProjectCard({ project, index, isLastOdd }: ProjectCardProps) {
  return (
    <motion.div 
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
}
