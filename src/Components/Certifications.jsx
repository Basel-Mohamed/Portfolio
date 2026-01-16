import React from "react";
import { Award } from "lucide-react";

export default function Certifications({ certifications, onCertClick }) {
  return (
    <section id="certifications" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Certifications
        </h2>


          <div
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl opacity-0 animate-slideInLeft hover:border-gray-700 transition-all duration-300"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>

              <div className="w-full">
                <h3 className="text-2xl font-bold text-white mb-4">Certificates</h3>

                <ul className="space-y-3">
                  {certifications.map((cert, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => onCertClick?.(cert)}
                        className="w-full text-left text-gray-300 text-sm flex items-start gap-2 hover:text-white transition"
                      >
                        <span className="text-gray-500 mt-1">✓</span>

                        <span className="flex-1">
                          <span className="font-medium">{cert.title}</span>
                          {cert.date && (
                            <span className="text-gray-500"> • {cert.date}</span>
                          )}
                          <span className="ml-2 text-xs text-gray-500 underline">
                            View
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>          
        </div>
    </section>
  );
}
