export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Key Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon; 
            return (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-gray-700 transition-all duration-500 opacity-0 animate-scaleIn hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gray-800 rounded-lg text-white">
                    <Icon className="w-6 h-6 text-white" /> 
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.company}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-gray-500 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
