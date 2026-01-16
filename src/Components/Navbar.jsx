import React from 'react';
export default function Navbar({ isScrolled, activeSection, scrollToSection }) {
        return (
          <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-effect shadow-lg border-b border-gray-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Basel Mohamed
                </div>
                <div className="hidden md:flex space-x-8">
                  {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Certifications', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`transition-all duration-300 relative group ${
                        activeSection === item.toLowerCase()
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {item}
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${
                        activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        );
}