import React, { useEffect } from "react";
import { X, Download } from "lucide-react";
import theme from './styles/theme';

export default function CertificateModal({ cert, onClose }) {
  const { colors, radius, fonts } = theme;
  
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fadeIn"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker dim for focus
        backdropFilter: 'blur(8px)' // Blurs the background content
      }}
      onClick={onClose}
    >
      <div
        className="relative shadow-2xl max-w-5xl w-full overflow-hidden animate-scaleIn"
        style={{
          backgroundColor: colors.background.primary,
          border: `1px solid ${colors.border.focus}`, // Highlight border
          borderRadius: radius.xl
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div 
          className="flex items-center justify-between p-4 px-6"
          style={{
            borderBottom: `1px solid ${colors.border.default}`,
            backgroundColor: colors.background.secondary
          }}
        >
          <div>
            <h3 
              className="text-lg"
              style={{ fontWeight: fonts.weight.semibold, color: colors.text.primary }}
            >
              {cert.title}
            </h3>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 transition-colors duration-200 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" style={{ color: colors.text.secondary }} />
          </button>
        </div>

        {/* Image Area */}
        <div className="p-1 bg-black/50 flex justify-center">
          <img
            src={cert.image}
            alt={cert.title}
            className="max-h-[80vh] w-auto object-contain shadow-lg"
            style={{ borderRadius: radius.lg }}
          />
        </div>
      </div>
    </div>
  );
}