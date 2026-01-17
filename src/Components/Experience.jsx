import React from 'react';
import { Briefcase } from 'lucide-react';
import theme from './styles/theme';

export default function Experience({ experiences }) {
  const { colors, fonts, radius } = theme;
  
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-4xl mb-12 text-center"
          style={{
            fontWeight: fonts.weight.bold,
            background: `linear-gradient(to right, ${colors.gradient.from}, ${colors.gradient.to})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Professional Experience
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="p-8 shadow-2xl transition-all duration-500 opacity-0 animate-slideInRight hover:scale-[1.02] hover:shadow-2xl" 
              style={{ 
                backgroundColor: colors.background.card,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: colors.border.default,
                borderRadius: radius['2xl'],
                animationDelay: `${index * 0.2}s`, 
                animationFillMode: 'forwards'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.border.hover}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border.default}
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="p-3"
                  style={{
                    backgroundColor: colors.background.cardHover,
                    borderRadius: radius.lg
                  }}
                >
                  <Briefcase className="w-6 h-6" style={{ color: colors.text.primary }} />
                </div>
                
                <div className="flex-1">
                  <h3 
                    className="text-2xl"
                    style={{
                      fontWeight: fonts.weight.bold,
                      color: colors.text.primary
                    }}
                  >
                    {exp.title}
                  </h3>
                  <p 
                    className="text-lg"
                    style={{ color: colors.text.tertiary }}
                  >
                    {exp.company}
                  </p>
                  <p style={{ color: colors.text.muted }}>
                    {exp.period} | {exp.location}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 ml-16">
                {exp.achievements.map((achievement, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-2"
                    style={{ color: colors.text.secondary }}
                  >
                    <span>• {achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}