import { useState } from 'react';
import { motion } from 'motion/react';
import { FaGithub, FaLock, FaDiagramProject } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '../../types/portfolio';
import { ArchitectureModal } from './ArchitectureModal';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  isLastOdd?: boolean;
}

export function ProjectCard({ project, index, isLastOdd }: ProjectCardProps) {
  const { dir } = useLanguage();
  const [isArchOpen, setIsArchOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1, type: "spring" }}
        className={`group bg-white dark:bg-[#161b22] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col w-full ${
          isLastOdd ? 'md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto' : ''
        }`}
      >
        <div className="aspect-video overflow-hidden relative">
          <img
            loading="lazy"
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Architecture flow badge if available */}
          {project.architecture && (
            <button
              onClick={() => setIsArchOpen(true)}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-blue-600 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-md"
              title={dir === 'rtl' ? 'عرض مخطط المعمارية' : 'View System Architecture'}
            >
              <FaDiagramProject size={13} />
              <span>{dir === 'rtl' ? 'المعمارية' : 'Architecture'}</span>
            </button>
          )}

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
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform shadow-lg"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform shadow-lg"
                    aria-label="Live Demo"
                  >
                    <FaExternalLinkAlt size={20} />
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {project.title}
            </h3>
          </div>

          {/* Quantitative Impact Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-gray-50 dark:bg-[#0D1117] border border-gray-100 dark:border-gray-800">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    {metric.label}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                      {metric.value}
                    </span>
                    {metric.change && (
                      <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold">
                        {metric.change}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed text-sm">
            {project.description}
          </p>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* --- MOBILE ACTION BUTTONS (Hidden on Desktop) --- */}
            <div className="md:hidden flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              {project.architecture && (
                <button
                  onClick={() => setIsArchOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-sm"
                >
                  <FaDiagramProject size={14} /> {dir === 'rtl' ? 'المعمارية' : 'Architecture'}
                </button>
              )}
              {project.nda ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold text-sm w-full justify-center">
                  <FaLock size={14} />
                  <span>Under NDA</span>
                </div>
              ) : (
                <>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      <FaGithub size={16} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                      <FaExternalLinkAlt size={14} /> Live
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive System Architecture Flow Modal */}
      <ArchitectureModal
        project={project}
        isOpen={isArchOpen}
        onClose={() => setIsArchOpen(false)}
      />
    </>
  );
}
