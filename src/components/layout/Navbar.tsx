import React from 'react';
import { NavLink } from 'react-router';
import { FaLanguage, FaBars, FaXmark, FaMoon, FaSun } from 'react-icons/fa6';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';

// Custom Animated Theme Slider Component (Smaller Size)
const ThemeSlider = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      dir="ltr" // Forces LTR so the graphics and text align exactly like the image regardless of app language
      className={clsx(
        "relative flex items-center h-8 w-[86px] rounded-full p-1 cursor-pointer transition-colors duration-500 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border-none outline-none",
        isDark 
          ? "bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] justify-start" 
          : "bg-gradient-to-r from-[#f59e0b] to-[#fde047] justify-end"
      )}
      aria-label="Toggle Theme"
    >
      {/* Background Text Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <div 
          className={clsx(
            "flex flex-col items-center justify-center leading-[1.1] transition-opacity duration-300",
            !isDark ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="text-[10px] font-black text-[#9a3412] tracking-wide">LIGHT</span>
          <span className="text-[8px] font-bold text-[#9a3412] tracking-wider">MODE</span>
        </div>
        <div 
          className={clsx(
            "flex flex-col items-center justify-center leading-[1.1] transition-opacity duration-300 pl-1.5",
            isDark ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="text-[10px] font-black text-[#bfdbfe] tracking-wide">DARK</span>
          <span className="text-[8px] font-bold text-[#bfdbfe] tracking-wider">MODE</span>
        </div>
      </div>

      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
      >
        {isDark ? (
          <FaMoon className="h-3.5 w-3.5 text-[#3b82f6]" />
        ) : (
          <FaSun className="h-3.5 w-3.5 text-[#f59e0b]" />
        )}
      </motion.div>
    </button>
  );
};

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.experience, path: '/experience' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.certifications, path: '/certifications' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo */}
            <NavLink to="/" className="text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 drop-shadow-sm">
              <span className="font-extrabold">Basel</span> <span className="font-medium">Mohamed</span>
            </NavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
            {/* Rich Animated Theme Slider */}
            <ThemeSlider theme={theme} toggleTheme={toggleTheme} />

            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1 font-medium text-sm"
              aria-label="Toggle Language"
            >
              <FaLanguage size={20} />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Rich Animated Theme Slider */}
            <ThemeSlider theme={theme} toggleTheme={toggleTheme} />
            
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-sm"
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#0D1117] border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}