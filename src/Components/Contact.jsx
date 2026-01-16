import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
export default function Contact() {
    return (
        <section id="contact" className="py-20 px-4">
         <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
             Let's Connect
           </h2>
           <p className="text-xl text-gray-300 mb-12">
             Interested in collaborating or discussing AI projects? Feel free to reach out!
           </p>
           <div className="flex flex-wrap justify-center gap-6">
             <a href="mailto:baselmohamed937@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-110 font-semibold hover:shadow-xl">
               <Mail className="w-6 h-6" />
               <span>Email Me</span>
             </a>
             <a href="https://www.linkedin.com/in/basel-mohamed-94972a334" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:border-gray-500">
               <Linkedin className="w-6 h-6" />
               <span className="font-semibold">LinkedIn</span>
             </a>
             <a href="https:github.com/Basel-Mohamed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:border-gray-500">
               <Github className="w-6 h-6" />
               <span className="font-semibold">GitHub</span>
             </a>
           </div>
         </div>
       </section>
    );
}