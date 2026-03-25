import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { FaRegCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { CertificateModal } from '../components/layout/CertificateModal';
import { useSEO } from '../hooks/useSEO';

export function Certifications() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  useSEO({
    title: 'Certifications - Basel Mohamed | AI & Cloud Learning',
    description: 'Professional certifications earned by Basel Mohamed in Artificial Intelligence, Machine Learning, Cloud Computing, and Full Stack Development.',
    url: '/certifications',
  });

  const categories = useMemo(() => {
    const allCategories = t.about.certifications.map((cert: any) => cert.category || "Other");
    return ["All", ...Array.from(new Set(allCategories))];
  }, [t.about.certifications]);

  const filteredCertifications = useMemo(() => {
    if (activeCategory === "All") return t.about.certifications;
    return t.about.certifications.filter((cert: any) => (cert.category || "Other") === activeCategory);
  }, [activeCategory, t.about.certifications]);

  return (
    <div className="py-20 min-h-screen bg-gray-50 dark:bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* STANDARDIZED TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.nav.certifications}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.about.certifications_subtitle || "A comprehensive overview of my continuous learning journey across AI, Full Stack Development, and Cloud Technologies."}
          </p>
        </motion.div>

        {/* --- RESPONSIVE CATEGORY TOGGLE (Projects Style) --- */}
        <div className="flex md:justify-center mb-12 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
          <div className="bg-gray-100 dark:bg-[#161b22] p-1 rounded-full inline-flex border border-gray-200 dark:border-gray-800 w-max">
            {categories.map((category: any) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 md:px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert: any, index: number) => (
            <motion.div
              key={`${cert.title}-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white dark:bg-[#161b22] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img 
                  loading="lazy"
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Desktop Hover Overlay */}
                <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors items-center justify-center">
                  <FaExternalLinkAlt className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300" size={32} />
                </div>
                
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  {cert.category || "Other"}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-3 min-h-[3rem] group-hover:text-blue-500 transition-colors">
                  {cert.title}
                </h3>
                
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800/50 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaRegCalendarAlt size={14} />
                    <span>{cert.date}</span>
                  </div>
                  
                  {/* Mobile Tap Indicator */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <span>View</span>
                    <FaExternalLinkAlt size={10} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCertifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12"
          >
            No certifications found in this category yet.
          </motion.div>
        )}
      </div>

      <CertificateModal 
        cert={selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </div>
  );
}