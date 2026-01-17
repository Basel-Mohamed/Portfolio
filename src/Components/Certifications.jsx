import React from "react";
import { Award } from "lucide-react";
import theme from './styles/theme';

export default function Certifications({ certifications, onCertClick }) {
  const { colors, fonts, radius } = theme;
  
  return (
    <section 
      id="certifications" 
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
          Certifications
        </h2>

        <div
          className="p-8 shadow-2xl opacity-0 animate-slideInLeft transition-all duration-300"
          style={{ 
            backgroundColor: colors.background.card,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border.default,
            borderRadius: radius['2xl'],
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
              <Award className="w-6 h-6" style={{ color: colors.text.primary }} />
            </div>

            <div className="w-full">
              <h3 
                className="text-2xl mb-4"
                style={{
                  fontWeight: fonts.weight.bold,
                  color: colors.text.primary
                }}
              >
                Certificates
              </h3>

              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => onCertClick?.(cert)}
                      className="w-full text-left text-sm flex items-start gap-2 transition"
                      style={{ color: colors.text.secondary }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.text.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.text.secondary}
                    >
                      <span className="mt-1" style={{ color: colors.text.muted }}>✓</span>

                      <span className="flex-1">
                        <span style={{ fontWeight: fonts.weight.medium }}>
                          {cert.title}
                        </span>
                        {cert.date && (
                          <span style={{ color: colors.text.muted }}>
                            {' • '}{cert.date}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}