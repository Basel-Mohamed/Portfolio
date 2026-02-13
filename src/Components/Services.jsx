import React from 'react';
import { Code, Brain, Database, Zap, Layers, Bot, FileSearch, Sparkles } from 'lucide-react';
import theme from './styles/theme';
import { servicesData } from '../data/portfolioData';

export default function Services() {
  const { colors, fonts, radius } = theme;

  // Icon mapping
  const iconMap = {
    code: Code,
    brain: Brain,
    database: Database,
    zap: Zap,
    layers: Layers,
    bot: Bot,
    fileSearch: FileSearch,
    sparkles: Sparkles,
  };

  return (
    <section
      id="services"
      className="py-20 px-4 relative overflow-hidden"
      // Change: Set background to transparent
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.gradient.from}, transparent)`,
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.gradient.to}, transparent)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" style={{ color: colors.accent.primary }} />
            <h2
              className="text-5xl animate-fadeInUp"
              style={{
                fontFamily: fonts.family.heading,
                fontWeight: fonts.weight.bold,
                background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.via}, ${colors.gradient.to})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Services
            </h2>
            <Sparkles className="w-8 h-8" style={{ color: colors.accent.primary }} />
          </div>
          <p
            className="text-xl max-w-3xl mx-auto animate-fadeInUp stagger-1"
            style={{ color: colors.text.secondary }}
          >
            {servicesData.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <div
                key={index}
                className="group relative overflow-hidden opacity-0 animate-fadeInUp transition-all duration-500"
                style={{
                  backgroundColor: colors.background.card,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: colors.border.default,
                  borderRadius: radius['2xl'],
                  padding: '2rem',
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.border.hover;
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border.default;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.to})`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-16 h-16 mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    backgroundColor: `${colors.accent.primary}20`,
                    borderRadius: radius.xl,
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: colors.accent.primary }}
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-2xl mb-4 relative"
                  style={{
                    fontFamily: fonts.family.heading,
                    fontWeight: fonts.weight.bold,
                    color: colors.text.primary,
                  }}
                >
                  {service.title}
                </h3>

                <p
                  className="mb-6 relative leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 relative">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3"
                      style={{ color: colors.text.tertiary }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: colors.accent.primary }}
                      />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative corner element */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${colors.accent.primary}15 50%)`,
                    borderTopRightRadius: radius['2xl'],
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}