import React, { useEffect } from "react";
import { X } from "lucide-react";
import theme from './styles/theme';

export default function CertificateModal({ cert, onClose }) {
  const { colors, radius } = theme;
  
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: colors.overlay.modal }}
      onClick={onClose}
    >
      <div
        className="relative shadow-2xl max-w-4xl w-full overflow-hidden"
        style={{
          backgroundColor: colors.background.card,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: colors.border.default,
          borderRadius: radius['2xl']
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 transition"
          style={{
            borderRadius: radius.lg,
            backgroundColor: colors.background.cardHover
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.border.hover}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.background.cardHover}
          aria-label="Close"
        >
          <X className="w-5 h-5" style={{ color: colors.text.primary }} />
        </button>

        <div 
          className="p-6"
          style={{
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: colors.border.default
          }}
        >
          <h3 
            className="text-xl"
            style={{ 
              fontWeight: theme.fonts.weight.bold,
              color: colors.text.primary 
            }}
          >
            {cert.title}
          </h3>
          {cert.date && (
            <p 
              className="text-sm mt-1"
              style={{ color: colors.text.muted }}
            >
              {cert.date}
            </p>
          )}
        </div>

        <div className="p-6">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full max-h-[70vh] object-contain"
            style={{
              borderRadius: radius.xl,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.border.default
            }}
          />
        </div>
      </div>
    </div>
  );
}
