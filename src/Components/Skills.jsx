import React from 'react';
export default function Skills({ skills }) {
    return (
              <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Core Competencies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl opacity-0 animate-fadeInUp hover:border-gray-700 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                <h3 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}