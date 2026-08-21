import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaXmark, FaDiagramProject, FaCheck } from 'react-icons/fa6';
import { Project } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';

interface ArchitectureModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ project, isOpen, onClose }: ArchitectureModalProps) {
  const { dir } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project || !project.architecture) return null;

  const { overview, diagramTitle, pipeline } = project.architecture;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[88vh] bg-white dark:bg-[#161b22] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#0D1117]/50 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                <FaDiagramProject size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {project.title}
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {diagramTitle || (dir === 'rtl' ? 'مخطط المعمارية' : 'System Architecture')}
                  </span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {dir === 'rtl' ? 'هندسة خط أنابيب الذكاء الاصطناعي ومسار معالجة البيانات' : 'End-to-end AI pipeline and data orchestration flow'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <FaXmark size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {/* Overview Box */}
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">
                {dir === 'rtl' ? 'نظرة عامة على المعمارية' : 'Architecture Overview'}
              </span>
              {overview}
            </div>

            {/* Pipeline Flow Steps */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
                <span>{dir === 'rtl' ? 'خطوات خط الأنابيب والمعالجة' : 'Pipeline Execution Steps'}</span>
                <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              </h4>

              <div className="relative space-y-6">
                {pipeline.map((step, idx) => {
                  const isLast = idx === pipeline.length - 1;
                  return (
                    <div key={step.step} className="relative flex flex-col md:flex-row gap-4 items-start group">
                      {/* Step Indicator & Line */}
                      <div className="flex items-center md:flex-col items-center gap-2 shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                          {step.step}
                        </div>
                        {!isLast && (
                          <div className="hidden md:block w-0.5 h-12 bg-gradient-to-b from-blue-600/50 to-transparent my-1" />
                        )}
                      </div>

                      {/* Step Content Card */}
                      <div className="flex-1 bg-gray-50 dark:bg-[#0D1117] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500/40 transition-all shadow-sm w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h5 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {step.title}
                          </h5>
                          {step.keyHighlight && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
                              <FaCheck size={10} /> {step.keyHighlight}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Technologies Tags */}
                        {step.technologies && step.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200/60 dark:border-gray-800/60">
                            {step.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 text-xs font-mono rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0D1117]/50 flex justify-end shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all"
            >
              {dir === 'rtl' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
