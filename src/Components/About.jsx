import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import theme from './styles/theme';

export default function About() {
  const { colors, fonts, radius } = theme;
  
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
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          About Me
        </h2>
        
        <div 
          className="p-8 shadow-2xl opacity-0 animate-fadeInUp stagger-2 transition-all duration-300"
          style={{ 
            backgroundColor: colors.background.card,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border.default,
            borderRadius: radius['2xl']
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.border.hover}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border.default}
        >
          <p 
            className="text-lg leading-relaxed mb-6"
            style={{ color: colors.text.secondary }}
          >
            Junior AI Engineer with hands-on experience in NLP, Generative AI, and machine learning projects.
            I specialize in developing and integrating AI models, including document understanding (OCR),
            RAG pipelines, and reinforcement learning with human feedback (RLHF).
          </p>
          
          <p 
            className="text-lg leading-relaxed mb-6"
            style={{ color: colors.text.secondary }}
          >
            Experienced in data preprocessing, annotation, model training, and evaluation using Python, PyTorch,
            and Hugging Face Transformers. Certified Oracle Generative AI Professional with additional experience
            in frontend development using React.js. Passionate about leveraging AI to build efficient, scalable, and practical solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: MapPin, label: "Location", value: "Maadi, Cairo, Egypt" },
              { icon: Phone, label: "Phone", value: "01007337686" },
              { icon: Mail, label: "Email", value: "baselmohamed937@gmail.com" }
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 opacity-0 animate-slideInLeft" 
                style={{ 
                  animationDelay: `${0.4 + i * 0.1}s`, 
                  animationFillMode: 'forwards' 
                }}
              >
                <item.icon 
                  className="w-6 h-6 flex-shrink-0 mt-1" 
                  style={{ color: colors.text.tertiary }}
                />
                <div>
                  <p 
                    style={{ 
                      fontWeight: fonts.weight.semibold,
                      color: colors.text.primary
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ color: colors.text.tertiary }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}