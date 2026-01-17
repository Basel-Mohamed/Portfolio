import React from 'react';
import theme from './styles/theme';

export default function Projects({ projects }) {
  const { colors, fonts, radius } = theme;
  
  return (
    <section 
      id="projects" 
      className="py-20 px-4"
      style={{ backgroundColor: colors.background.secondary }}
    >
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
          Key Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon; 
            return (
              <div
                key={index}
                className="p-8 shadow-2xl transition-all duration-500 opacity-0 animate-scaleIn hover:-translate-y-2 hover:shadow-2xl"
                style={{ 
                  backgroundColor: colors.background.card,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: colors.border.default,
                  borderRadius: radius['2xl'],
                  animationDelay: `${index * 0.15}s`, 
                  animationFillMode: "forwards" 
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
                    <Icon className="w-6 h-6" style={{ color: colors.text.primary }} /> 
                  </div>

                  <div>
                    <h3 
                      className="text-xl mb-1"
                      style={{
                        fontWeight: fonts.weight.bold,
                        color: colors.text.primary
                      }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: colors.text.tertiary }}
                    >
                      {project.company}
                    </p>
                  </div>
                </div>

                <p 
                  className="mb-4"
                  style={{ color: colors.text.secondary }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm transition-colors duration-300"
                      style={{
                        backgroundColor: colors.background.cardHover,
                        color: colors.text.secondary,
                        borderRadius: radius.full,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: colors.border.hover
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.border.focus}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border.hover}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
