import React from "react";
import { GraduationCap } from "lucide-react";
import theme from './styles/theme';
import { educationData } from "../data/portfolioData";

export default function Education() {
  const { colors, fonts, radius } = theme;
  
  return (
    <section 
      id="education" 
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
          Education
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
              <GraduationCap className="w-6 h-6" style={{ color: colors.text.primary }} />
            </div>

            <div>
              <h3 
                className="text-2xl"
                style={{
                  fontWeight: fonts.weight.bold,
                  color: colors.text.primary
                }}
              >
                {educationData.degree}
              </h3>
              <p style={{ color: colors.text.tertiary }}>{educationData.field}</p>
              <p style={{ color: colors.text.muted }}>{educationData.university} • {educationData.period}</p>
              <p style={{ color: colors.text.muted }}>Grade: {educationData.grade}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}