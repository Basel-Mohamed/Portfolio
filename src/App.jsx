import React, { useState, useEffect } from 'react';
import profilePic from './assets/profile_pic.png';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Hero from './Components/Hero.jsx';
import About from './Components/About.jsx';
import Experience from './Components/Experience.jsx';
import Projects from './Components/Projects.jsx';
import Skills from './Components/Skills.jsx';
import Contact from './Components/Contact.jsx';
import Education from './Components/Education.jsx';
import Certifications from './Components/Certifications.jsx';
import CertificateModal from "./Components/CertificateModal.jsx";
import { certifications, experiences, projects, skills } from "./data/portfolioData.js";



export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [selectedCert, setSelectedCert] = useState(null);
  const openCertModal = (cert) => setSelectedCert(cert);
  const closeCertModal = () => setSelectedCert(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'certifications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };


return (
  <div className="bg-black min-h-screen text-white overflow-hidden">
    {/* <GlobalStyles /> */}

    <Navbar activeSection={activeSection} isScrolled={isScrolled} scrollToSection={scrollToSection} />

    <Hero scrollToSection={scrollToSection} profilePic={profilePic}/>
    <About/>
    <Experience experiences={experiences} />
    <Projects projects={projects} />
    <Skills skills={skills} />

    <Education />
    <Certifications certifications={certifications} onCertClick={openCertModal} />

    <Contact /> 
    <Footer />
    <CertificateModal cert={selectedCert} onClose={closeCertModal} />

  </div>
);

}