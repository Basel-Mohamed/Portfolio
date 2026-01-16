import React from "react";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Education
        </h2>

          <div
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl opacity-0 animate-slideInLeft hover:border-gray-700 transition-all duration-300"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Bachelor&apos;s Degree</h3>
                <p className="text-gray-400">Civil Engineering</p>
                <p className="text-gray-500">Helwan University • 2019-2024</p>
                <p className="text-gray-500">Grade: Good</p>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
