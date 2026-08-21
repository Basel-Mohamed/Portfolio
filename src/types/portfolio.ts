export interface ArchitectureStep {
  step: number;
  title: string;
  description: string;
  technologies: string[];
  keyHighlight?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface Project {
  id: string | number;
  category: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  type?: 'ai' | 'fullstack';
  nda?: boolean;
  github?: string;
  live?: string;
  metrics?: ProjectMetric[];
  architecture?: {
    overview: string;
    diagramTitle?: string;
    pipeline: ArchitectureStep[];
  };
}

export interface ExperienceItem {
  id: string | number;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  date: string;
  image: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ServiceItem {
  id?: string | number;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

export interface PortfolioContent {
  nav: Record<string, string>;
  hero: {
    name: string;
    title: string;
    tagline: string;
    image: string;
    buttons: {
      contact: string;
      projects: string;
    };
  };
  home: {
    skills: {
      genAi: { title: string; desc: string };
      ml: { title: string; desc: string };
      deploy: { title: string; desc: string };
      dev: { title: string; desc: string };
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  about: {
    title: string;
    summary: string;
    location: string;
    skills: Record<string, string>;
    learning: {
      title: string;
      desc: string;
      cta: string;
    };
    certifications_subtitle: string;
    certifications: CertificationItem[];
  };
  experience: {
    title: string;
    internshipsTitle?: string;
    professional?: ExperienceItem[];
    internships?: ExperienceItem[];
    items?: ExperienceItem[];
  };
  projects: {
    title: string;
    subtitle?: string;
    items: Project[];
  };
  certifications?: {
    title: string;
    subtitle: string;
    items: CertificationItem[];
  };
  services: {
    title: string;
    cta?: string;
    items: ServiceItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    form?: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      send?: string;
      sending?: string;
      success?: string;
      error?: string;
    };
    info?: {
      email?: string;
      phone?: string;
      location?: string;
    };
  };
  chatbot: {
    title: string;
    placeholder: string;
    prompt?: string;
    suggestions: string[];
  };
}
