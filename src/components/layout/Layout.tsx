import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { useLanguage } from '../../context/LanguageContext';
import { AIChatbot } from '../features/AIChatbot';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D1117] text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-gray-800 py-12 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              {/* Updated Logo Styling */}
              <h3 className="text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-4 drop-shadow-sm">
                <span className="font-extrabold">Basel</span> <span className="font-medium">Mohamed</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
                {t.hero.tagline}
              </p>
            </div>
            
            <div className="md:text-center">
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t.nav.contact}</h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <a href="mailto:baselmohamed937@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">baselmohamed937@gmail.com</a>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <div className="flex space-x-4 rtl:space-x-reverse mb-4">
                <a href="https://github.com/Basel-Mohamed" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <FaGithub size={20} />
                </a>
                <a href="https://linkedin.com/in/basel-mohamed-94972a334" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-500">
            <p>© 2026 Basel Mohamed Ahmed. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <AIChatbot />
    </div>
  );
}