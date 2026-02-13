import React from "react";
import { Award, Eye, ExternalLink } from "lucide-react";
import theme from './styles/theme';

export default function Certifications({ certifications, onCertClick }) {
  const { colors, fonts, radius, shadows } = theme;
  
  return (
    <section 
      id="certifications" 
      className="py-24 px-6"
      style={{ backgroundColor: colors.background.secondary }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-4xl mb-12 text-center animate-fadeInUp"
          style={{
            fontWeight: fonts.weight.bold,
            background: `linear-gradient(to right, ${colors.gradient.from}, ${colors.gradient.to})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="group relative flex flex-col p-6 transition-all duration-300 cursor-pointer animate-fadeInUp"
              style={{ 
                backgroundColor: colors.background.card,
                border: `1px solid ${colors.border.default}`,
                borderRadius: radius.xl,
                animationDelay: `${i * 100}ms`
              }}
              onClick={() => onCertClick?.(cert)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent.primary;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = shadows.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border.default;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Header: Icon + Date */}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-lg transition-colors duration-300"
                  style={{ backgroundColor: colors.background.cardHover }}
                >
                  <Award 
                    className="w-6 h-6" 
                    style={{ color: colors.accent.primary }} 
                  />
                </div>
                {cert.date && (
                   <span 
                     className="text-xs px-2 py-1 rounded-full border"
                     style={{ 
                       borderColor: colors.border.default,
                       color: colors.text.tertiary 
                     }}
                   >
                     {cert.date}
                   </span>
                )}
              </div>

              {/* Title */}
              <h3 
                className="text-lg mb-4 flex-grow"
                style={{
                  fontWeight: fonts.weight.semibold,
                  color: colors.text.primary
                }}
              >
                {cert.title}
              </h3>

              {/* Footer: Visual Call to Action */}
              <div 
                className="mt-auto pt-4 border-t flex items-center justify-between group-hover:opacity-100 transition-opacity"
                style={{ 
                  borderColor: colors.border.default,
                }}
              >
                <span 
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: colors.text.muted }}
                >
                  View Credential
                </span>
                <ExternalLink 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  style={{ color: colors.accent.primary }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}