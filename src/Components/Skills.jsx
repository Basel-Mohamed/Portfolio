import React from 'react';
import theme from './styles/theme';

export default function Skills({ skills }) {
  const { colors, fonts, radius } = theme;
  
  return (
    <section id="skills" className="py-20 px-4">
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
          Core Competencies
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <div 
              key={index} 
              className="p-6 shadow-2xl opacity-0 animate-fadeInUp transition-all duration-300" 
              style={{ 
                backgroundColor: colors.background.card,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: colors.border.default,
                borderRadius: radius['2xl'],
                animationDelay: `${index * 0.1}s`, 
                animationFillMode: 'forwards' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.border.hover}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border.default}
            >
              <h3 
                className="text-xl mb-4"
                style={{
                  fontWeight: fonts.weight.bold,
                  color: colors.text.primary
                }}
              >
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-sm transition-colors duration-300"
                    style={{
                      backgroundColor: colors.background.cardHover,
                      color: colors.text.secondary,
                      borderRadius: radius.lg
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.border.hover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.background.cardHover}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}