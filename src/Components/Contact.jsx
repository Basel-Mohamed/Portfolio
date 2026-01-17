import React from 'react';
import { Mail } from 'lucide-react';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import theme from './styles/theme';

export default function Contact() {
  const { colors, fonts, radius} = theme;
  
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className="text-4xl mb-8"
          style={{
            fontWeight: fonts.weight.bold,
            background: `linear-gradient(to right, ${colors.gradient.from}, ${colors.gradient.to})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Let's Connect
        </h2>
        
        <p 
          className="text-xl mb-12"
          style={{ color: colors.text.secondary }}
        >
          Interested in collaborating or discussing AI projects? Feel free to reach out!
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="mailto:baselmohamed937@gmail.com" 
            className="flex items-center gap-3 px-8 py-4 transition-all duration-300 hover:scale-110 hover:shadow-xl"
            style={{
              backgroundColor: colors.interactive.buttonBg,
              color: colors.interactive.buttonText,
              borderRadius: radius.lg,
              fontWeight: fonts.weight.semibold
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.interactive.buttonHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.interactive.buttonBg}
          >
            <Mail className="w-6 h-6" />
            <span>Email Me</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/basel-mohamed-94972a334" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-8 py-4 transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: colors.background.card,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.border.hover,
              borderRadius: radius.lg,
              fontWeight: fonts.weight.semibold,
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
            <SiLinkedin className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
          
          <a 
            href="https://github.com/Basel-Mohamed" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-8 py-4 transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: colors.background.card,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.border.hover,
              borderRadius: radius.lg,
              fontWeight: fonts.weight.semibold,
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
            <SiGithub className="w-6 h-6" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}