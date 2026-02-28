import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';

export function Experience() {
  const { t } = useLanguage();

  // Helper component to render a single timeline to avoid repeating code
  const TimelineSection = ({ title, items, icon: Icon }: { title: string, items: any[], icon: any }) => (
    <div className="mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4">
          <Icon size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      </motion.div>

      <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 md:ml-6 rtl:mr-3 rtl:ml-0 rtl:border-r-2 rtl:border-l-0">
        {items.map((role: any, index: number) => (
          <motion.div 
            key={role.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="mb-12 ml-6 rtl:mr-6 rtl:ml-0 relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] rtl:-right-[31px] rtl:left-auto top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-[#0D1117] group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-300" />
            
            <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-blue-500/50 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{role.title}</h3>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium mt-1 sm:mt-0 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  <Calendar size={14} className="mr-1 rtl:ml-1 rtl:mr-0" />
                  {role.period}
                </div>
              </div>
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">{role.company}</div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {role.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Render Professional Experience */}
        <TimelineSection 
          title={t.experience.title} 
          items={t.experience.professional} 
          icon={Briefcase} 
        />

        {/* Render Internships & Training */}
        <TimelineSection 
          title={t.experience.internshipsTitle} 
          items={t.experience.internships} 
          icon={GraduationCap} 
        />

      </div>
    </div>
  );
}