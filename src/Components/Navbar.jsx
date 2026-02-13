import React from 'react';
import theme from './styles/theme';

export default function Navbar({ isScrolled, activeSection, scrollToSection }) {
  const { colors, fonts } = theme;
  
  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-effect shadow-lg' : ''}`}
      style={{
        borderBottomStyle: 'solid',
        borderBottomColor: colors.border.default,
        backgroundColor: isScrolled ? colors.overlay.glass : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-xl"
            style={{
              fontWeight: fonts.weight.bold,
              background: `linear-gradient(to right, ${colors.gradient.from}, ${colors.gradient.to})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Basel Mohamed
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Certifications','Services', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="transition-all duration-300 relative group"
                style={{
                  color: activeSection === item.toLowerCase() ? colors.text.primary : colors.text.tertiary
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.interactive.linkHover}
                onMouseLeave={(e) => e.currentTarget.style.color = activeSection === item.toLowerCase() ? colors.text.primary : colors.text.tertiary}
              >
                {item}
                <span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 transform origin-left transition-transform duration-300"
                  style={{
                    backgroundColor: colors.accent.primary,
                    transform: activeSection === item.toLowerCase() ? 'scaleX(1)' : 'scaleX(0)'
                  }}
                ></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}