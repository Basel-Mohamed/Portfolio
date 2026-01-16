import React from 'react';
import { Github, Linkedin, Mail,ChevronDown, Sparkles } from 'lucide-react';
import Particles from './Particles.jsx';
export default function Hero({scrollToSection, profilePic}) {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <circle cx="25" cy="25" r="2" fill="white" opacity="0.3" />
                            <line x1="25" y1="25" x2="75" y2="25" stroke="white" strokeWidth="0.5" opacity="0.2" />
                            <line x1="25" y1="25" x2="25" y2="75" stroke="white" strokeWidth="0.5" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <Particles />

            <div className="text-center max-w-4xl mx-auto relative z-10">
                <div className="mb-8">
                    {/* Profile Image */}
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 animate-scaleIn animate-pulse-glow">
                        <img
                            src={profilePic}
                            alt="Basel Mohamed Ahmed"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-fadeInUp">
                        Basel Mohamed Ahmed
                    </h1>

                    <div className="flex items-center justify-center gap-2 mb-6 animate-fadeInUp stagger-1">
                        <Sparkles className="w-6 h-6 text-gray-400" />
                        <p className="text-2xl md:text-3xl text-gray-300">Associate AI Engineer</p>
                        <Sparkles className="w-6 h-6 text-gray-400" />
                    </div>

                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto animate-fadeInUp stagger-2">
                        Specializing in NLP, Generative AI, and Machine Learning. Building intelligent solutions that transform data into actionable insights.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeInUp stagger-3">
                        <a href="mailto:baselmohamed937@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg">
                            <Mail className="w-5 h-5" />
                            Get in Touch
                        </a>
                        <a href="https://github.com/Basel-Mohamed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:border-gray-500">
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                    </div>
                </div>

                <button onClick={() => scrollToSection('about')} className="animate-bounce mt-8">
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                </button>
            </div>
        </section>
    );
}