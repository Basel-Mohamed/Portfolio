import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CertificateModal } from './CertificateModal';

// Define the type for your certificate object
export interface Certificate {
  title: string;
  date?: string;
  image: string;
  url?: string;
}

interface CertificationsProps {
  certifications: Certificate[];
}

export function Certifications({ certifications }: CertificationsProps) {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Certifications</h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              variants={item}
              onClick={() => setSelectedCert(cert)}
              className="group relative flex flex-col p-6 bg-white dark:bg-[#161b22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Header: Icon + Date */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
                {cert.date && (
                   <span className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-[#0D1117]">
                     {cert.date}
                   </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-6 flex-grow text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h3>

              {/* Footer: Visual Call to Action */}
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  View Credential
                </span>
                <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal is rendered here so it can use the selected cert state */}
      <CertificateModal 
        cert={selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </section>
  );
}