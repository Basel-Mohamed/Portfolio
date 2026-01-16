import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-6 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">{cert.title}</h3>
          {cert.date && <p className="text-gray-500 text-sm mt-1">{cert.date}</p>}
        </div>

        <div className="p-6">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full max-h-[70vh] object-contain rounded-xl border border-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
