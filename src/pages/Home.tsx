import React from 'react';
import { motion } from 'motion/react';
import { 
  FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaTerminal, 
  FaBrain, FaServer, FaMicrochip, FaDatabase, FaCode, FaGlobe, FaWandMagicSparkles 
} from 'react-icons/fa6';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { t, dir } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  // Flying AI Icons Configuration
  const floatingIcons = [
    { Icon: FaBrain, top: '15%', left: '10%', color: 'text-purple-500/30 dark:text-purple-400/20', delay: 0, size: 64 },
    { Icon: FaMicrochip, top: '20%', right: '12%', color: 'text-blue-500/30 dark:text-blue-400/20', delay: 1, size: 56 },
    { Icon: FaDatabase, bottom: '20%', left: '15%', color: 'text-green-500/30 dark:text-green-400/20', delay: 2, size: 48 },
    { Icon: FaCode, bottom: '25%', right: '15%', color: 'text-orange-500/30 dark:text-orange-400/20', delay: 1.5, size: 52 },
    { Icon: FaWandMagicSparkles, top: '45%', left: '5%', color: 'text-yellow-500/30 dark:text-yellow-400/20', delay: 0.5, size: 40 },
    { Icon: FaGlobe, top: '50%', right: '8%', color: 'text-indigo-500/30 dark:text-indigo-400/20', delay: 2.5, size: 60 },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-gray-50 dark:bg-[#0D1117] overflow-hidden">
        
        {/* Animated Abstract Background Shapes */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]" 
          />
        </div>

        {/* Flying AI Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {floatingIcons.map((iconData, index) => (
            <motion.div
              key={index}
              className={`absolute ${iconData.color}`}
              style={{ 
                top: iconData.top, 
                left: iconData.left, 
                right: iconData.right, 
                bottom: iconData.bottom 
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, 15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6,
                delay: iconData.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <iconData.Icon size={iconData.size} />
            </motion.div>
          ))}
        </div>

        {/* Hero Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Left Content (Text & Buttons) */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="flex-1 text-center lg:text-start w-full"
            >
              <motion.h1 variants={item} className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                <span className="block text-gray-900 dark:text-white mb-2">{t.hero.name}</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient bg-300%">
                  {t.hero.title}
                </span>
              </motion.h1>
              
              <motion.p variants={item} className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.hero.tagline}
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 flex-wrap">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link 
                    to="/contact"
                    className="w-full px-8 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  >
                    {t.hero.buttons.contact} <FaArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <a
                    href="https://drive.usercontent.google.com/u/0/uc?id=1vZiVfNVylmzwwh5FzFpEdZn2VC7uufIs&export=download" 
                    download="Basel_Mohamed_CV.pdf"
                    className="w-full px-8 py-3.5 bg-white dark:bg-[#161b22] text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FaDownload size={18} /> CV
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link
                    to="/projects"
                    className="w-full px-6 py-3.5 bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-xl transition-all font-bold flex items-center justify-center"
                  >
                    {t.hero.buttons.projects}
                  </Link>
                </motion.div>

                {/* Social Links */}
                <div className="flex gap-4 w-full sm:w-auto justify-center mt-2 sm:mt-0 sm:ml-2 sm:rtl:mr-2 sm:rtl:ml-0 sm:pl-6 sm:rtl:pr-6 sm:border-l sm:rtl:border-r sm:border-gray-200 dark:sm:border-gray-800">
                  <motion.a 
                    whileHover={{ scale: 1.1, y: -2 }} 
                    whileTap={{ scale: 0.9 }}
                    href="https://github.com/Basel-Mohamed" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-3 bg-white dark:bg-[#161b22] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <FaGithub size={24} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1, y: -2 }} 
                    whileTap={{ scale: 0.9 }}
                    href="https://www.linkedin.com/in/basel-mohamed-94972a334/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-3 bg-white dark:bg-[#161b22] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <FaLinkedin size={24} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content (Profile Picture) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="flex-1 flex justify-center lg:justify-end w-full mt-10 lg:mt-0"
            >
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 group"
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Tech Ring Background */}
                <div className="absolute -inset-4 border-2 border-dashed border-blue-500/30 dark:border-blue-400/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute -inset-8 border-2 border-dashed border-purple-500/20 dark:border-purple-400/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
                
                {/* Animated Glow Behind Image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient bg-300% blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                
                {/* Actual Image */}
                <img
                  src="/profile_pic.png" 
                  alt="Basel Mohamed"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-[#0D1117] shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-24 bg-white dark:bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-[#0D1117] border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <FaBrain size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Generative AI</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">LLMs, RAG Systems, Prompt Engineering, RLHF</p>
            </motion.div>

             <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-[#0D1117] border border-gray-100 dark:border-gray-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <FaTerminal size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Machine Learning</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">PyTorch, Scikit-learn, Computer Vision, OCR</p>
            </motion.div>

             <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-[#0D1117] border border-gray-100 dark:border-gray-800 hover:border-green-500/50 dark:hover:border-green-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <FaServer size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Deployment</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Docker, FastAPI, Oracle OCI, Cloud Architecture</p>
            </motion.div>

             <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-[#0D1117] border border-gray-100 dark:border-gray-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <FaCode size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Development</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Python, React, TypeScript, Tailwind CSS</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-24 bg-gray-50 dark:bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">{t.projects.title}</h2>
              <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
            </div>
            <Link to="/projects" className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group">
              View All <FaArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.projects.items.slice(0, 2).map((project: any, index: number) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, type: "spring" }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative bg-white dark:bg-[#161b22] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{project.category}</span>
                      <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

           <div className="mt-10 text-center sm:hidden">
            <Link to="/projects" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group">
              View All <FaArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-[#161b22] relative overflow-hidden">
         {/* Animated Top Border */}
         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient bg-300%" />
         
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 text-center relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Ready to transform your data into intelligence?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you need a custom RAG system, an NLP solution, or a predictive model, I can help you build it.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all shadow-xl hover:shadow-blue-500/25 duration-300"
              >
                Let's Work Together
              </Link>
            </motion.div>
         </motion.div>
      </section>
    </div>
  );
}