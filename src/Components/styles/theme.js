// theme.js - Centralized theme configuration

const theme = {
  // Color Palette
  colors: {
    // Primary backgrounds
    background: {
      primary: '#000000',      // Main background (black)
      secondary: '#030712',    // Section backgrounds (gray-950)
      card: '#111827',         // Card backgrounds (gray-900)
      cardHover: '#1F2937',    // Card hover state (gray-800)
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF',      // Main text (white)
      secondary: '#D1D5DB',    // Secondary text (gray-300)
      tertiary: '#9CA3AF',     // Tertiary text (gray-400)
      muted: '#6B7280',        // Muted text (gray-500)
    },
    
    // Border colors
    border: {
      default: '#1F2937',      // Default borders (gray-800)
      hover: '#374151',        // Hover state borders (gray-700)
      focus: '#4B5563',        // Focus state borders (gray-600)
    },
    
    // Accent colors
    accent: {
      primary: '#FFFFFF',      // Primary accent (white)
      secondary: '#000000',    // Secondary accent (black)
    },
    
    // Gradient colors
    gradient: {
      from: '#FFFFFF',         // Gradient start (white)
      via: '#D1D5DB',          // Gradient middle (gray-300)
      to: '#9CA3AF',           // Gradient end (gray-400)
    },
    
    // Interactive elements
    interactive: {
      buttonBg: '#FFFFFF',
      buttonText: '#000000',
      buttonHover: '#E5E7EB',  // gray-200
      linkHover: '#E5E7EB',    // gray-200
    },
    
    // Overlays
    overlay: {
      modal: 'rgba(0, 0, 0, 0.7)',
      glass: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Particles and effects
    effects: {
      particle: '#FFFFFF',
      particleOpacity: '0.2',
      glow: '#FFFFFF',
    }
  },
  
  // Typography
  fonts: {
    // Font families
    family: {
      primary: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    
    // Font sizes
    size: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    
    // Font weights
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Spacing
  spacing: {
    section: {
      py: 'py-20',
      px: 'px-4',
    },
    card: {
      p: 'p-8',
      gap: 'gap-4',
    },
  },
  
  // Border radius
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

// Helper function to get CSS variable string
export const getCSSVars = () => {
  return {
    '--color-bg-primary': theme.colors.background.primary,
    '--color-bg-secondary': theme.colors.background.secondary,
    '--color-bg-card': theme.colors.background.card,
    '--color-bg-card-hover': theme.colors.background.cardHover,
    '--color-text-primary': theme.colors.text.primary,
    '--color-text-secondary': theme.colors.text.secondary,
    '--color-text-tertiary': theme.colors.text.tertiary,
    '--color-text-muted': theme.colors.text.muted,
    '--font-primary': theme.fonts.family.primary,
    '--font-heading': theme.fonts.family.heading,
  };
};

// Helper functions for inline styles
export const getColors = () => theme.colors;
export const getFonts = () => theme.fonts;
export const getSpacing = () => theme.spacing;
export const getRadius = () => theme.radius;
export const getShadows = () => theme.shadows;
export const getTransitions = () => theme.transitions;

export default theme;