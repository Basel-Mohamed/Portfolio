import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Services() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  const handleRequest = (serviceTitle: string) => {
    navigate(`/contact?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">{t.services.title}</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.services.items.map((service: any, index: number) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#161b22] rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {service.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleRequest(service.title)}
                className="w-full py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group"
              >
                {t.services.cta}
                <ArrowRight size={18} className={`transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
