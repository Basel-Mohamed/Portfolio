import React, { useState, useEffect} from 'react';
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
import Chatbot from './Components/Chatbot.jsx';
import Services from './Components/Services.jsx';
import { certifications, experiences, projects, skills } from "./data/portfolioData.js";
import theme from './Components/styles/theme.js';
import FloatingLines from './Components/FloatingLines.jsx';
import Technologies from './Components/Technologies.jsx';

const BackgroundAnimation = React.memo(() => {
  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
      />
    </div>
  );
});
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const openCertModal = (cert) => setSelectedCert(cert);
  const closeCertModal = () => setSelectedCert(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setIsScrolled(scrolled);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'certifications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current && current !== activeSection) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, activeSection]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        backgroundColor: theme.colors.background.primary,
        color: theme.colors.text.primary,
        fontFamily: theme.fonts.family.primary
      }}
    >
      
      <BackgroundAnimation />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar activeSection={activeSection} isScrolled={isScrolled} scrollToSection={scrollToSection} />
        <Hero scrollToSection={scrollToSection} profilePic={profilePic} />
        <About />
        <Technologies/>
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Education />
        <Certifications certifications={certifications} onCertClick={openCertModal} />
        <Services/>
        <Contact />
        <Footer />
        <CertificateModal cert={selectedCert} onClose={closeCertModal} />
        <Chatbot />
      </div>

    </div>
  );
}