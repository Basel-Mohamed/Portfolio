import React from 'react';
import { Mail, ChevronDown, Sparkles } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import theme from './styles/theme.js';
import { heroData } from "../data/portfolioData";


export default function Hero({ scrollToSection, profilePic }) {
  const { colors, fonts, radius } = theme;
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill={colors.effects.particle} opacity="0.3" />
              <line x1="25" y1="25" x2="75" y2="25" stroke={colors.effects.particle} strokeWidth="0.5" opacity="0.2" />
              <line x1="25" y1="25" x2="25" y2="75" stroke={colors.effects.particle} strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
        </svg>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <div 
            className="w-48 h-48 mx-auto mb-6 overflow-hidden animate-scaleIn animate-pulse-glow"
            style={{
              borderRadius: radius.full,
              borderWidth: '4px',
              borderStyle: 'solid',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <img
              src={profilePic}
              alt="Basel Mohamed Ahmed"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 
            className="text-5xl md:text-7xl mb-4 animate-fadeInUp"
            style={{
              fontWeight: fonts.weight.bold,
              background: `linear-gradient(to right, ${colors.gradient.from}, ${colors.gradient.via}, ${colors.gradient.to})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {heroData.name}
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6 animate-fadeInUp stagger-1">
            <Sparkles className="w-6 h-6" style={{ color: colors.text.tertiary }} />
            <p 
              className="text-2xl md:text-3xl"
              style={{ color: colors.text.secondary }}
            >
              {heroData.title}
            </p>
            <Sparkles className="w-6 h-6" style={{ color: colors.text.tertiary }} />
          </div>

          <p 
            className="text-lg mb-8 max-w-2xl mx-auto animate-fadeInUp stagger-2"
            style={{ color: colors.text.tertiary }}
          >
            {heroData.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeInUp stagger-3">
            <a 
              href={`mailto:${heroData.email}`} 
              className="flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: colors.interactive.buttonBg,
                color: colors.interactive.buttonText,
                borderRadius: radius.lg,
                fontWeight: fonts.weight.semibold
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.interactive.buttonHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.interactive.buttonBg}
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
            
            <a 
              href={heroData.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: colors.background.card,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: colors.border.hover,
                borderRadius: radius.lg,
                color: colors.text.primary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.background.cardHover;
                e.currentTarget.style.borderColor = colors.border.focus;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.background.card;
                e.currentTarget.style.borderColor = colors.border.hover;
              }}
            >
              <SiGithub className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('about')} 
          className="animate-bounce mt-8"
        >
          <ChevronDown className="w-8 h-8" style={{ color: colors.text.tertiary }} />
        </button>
      </div>
    </section>
  );
}