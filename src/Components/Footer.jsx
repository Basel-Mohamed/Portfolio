import React from 'react';
import theme from './styles/theme';

export default function Footer() {
  const { colors } = theme;
  
  return (
    <footer 
      className="py-8 px-4"
      style={{
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: colors.border.default
      }}
    >
      <div 
        className="max-w-6xl mx-auto text-center"
        style={{ color: colors.text.tertiary }}
      >
        <p>© 2025 Basel Mohamed Ahmed. All rights reserved.</p>
      </div>
    </footer>
  );
}
