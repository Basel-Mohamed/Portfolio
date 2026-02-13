import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import theme from "./styles/theme";
import { aboutData } from "../data/portfolioData";

export default function About() {
  const { colors, fonts, radius } = theme;

  // Map icon keys from data -> actual icon components
  const iconMap = {
    location: MapPin,
    phone: Phone,
    email: Mail,
  };

  return (
    <section
      id="about"
      className="py-20 px-4 relative"
      style={{ backgroundColor: colors.background.secondary }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl mb-12 text-center opacity-0 animate-fadeInUp"
          style={{
            fontFamily: fonts.family.heading,
            fontWeight: fonts.weight.bold,
            background: `linear-gradient(to right, ${colors.gradient.from}, ${colors.gradient.to})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          About Me
        </h2>

        <div
          className="p-8 shadow-2xl opacity-0 animate-fadeInUp stagger-2 transition-all duration-300"
          style={{
            backgroundColor: colors.background.card,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: colors.border.default,
            borderRadius: radius["2xl"],
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = colors.border.hover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = colors.border.default)
          }
        >
          {/* Paragraphs from data */}
          {aboutData.paragraphs?.map((text, i) => (
            <p
              key={i}
              className="text-lg leading-relaxed mb-6"
              style={{ color: colors.text.secondary }}
            >
              {text}
            </p>
          ))}

          {/* Info cards from data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {aboutData.info?.map((item, i) => {
              const Icon = iconMap[item.iconKey] || Mail; // fallback icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 opacity-0 animate-slideInLeft"
                  style={{
                    animationDelay: `${0.4 + i * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <Icon
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    style={{ color: colors.text.tertiary }}
                  />
                  <div>
                    <p
                      style={{
                        fontWeight: fonts.weight.semibold,
                        color: colors.text.primary,
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ color: colors.text.tertiary }}>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}