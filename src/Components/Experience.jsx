import React from 'react';
import { Briefcase } from 'lucide-react';
export default function Experience({ experiences }) {
  return (
   
   <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-gray-700 transition-all duration-500 opacity-0 animate-slideInRight hover:scale-[1.02] hover:shadow-2xl" style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                    <p className="text-gray-400 text-lg">{exp.company}</p>
                    <p className="text-gray-500">{exp.period} | {exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-16">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span>• {achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}