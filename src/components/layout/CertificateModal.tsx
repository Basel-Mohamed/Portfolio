import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaXmark } from "react-icons/fa6";
import { Certificate } from "./Certifications";

interface CertificateModalProps {
  cert: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ cert, onClose }: CertificateModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isPdf = cert?.image?.toLowerCase().endsWith('.pdf');

  return (
    <AnimatePresence>
      {cert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl overflow-hidden bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0D1117]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate pr-4">
                {cert.title}
              </h3>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 shrink-0"
                aria-label="Close modal"
              >
                <FaXmark className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-6 bg-gray-100 dark:bg-[#090c10] flex justify-center items-center">
              {isPdf ? (
                <iframe
                  src={`${cert.image}#toolbar=0`} 
                  title={cert.title}
                  className="w-full h-[80vh] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white"
                />
              ) : (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-w-full w-auto h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}