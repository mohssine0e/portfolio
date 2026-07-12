export interface Personal {
  name: string;
  title: string;
  email: string;
  location: string;
  description: string;
  headline: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  email: string;
  /** paths to the CV PDFs under public/, e.g. "/cv/mohssine-echlaihi-cv-en.pdf" */
  cv_en?: string;
  cv_fr?: string;
}

export interface TechnicalSkills {
  programming: string[];
  backend: string[];
  frontend: string[];
  databases: string[];
  devops_tools: string[];
  concepts: string[];
  other?: string[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  technologies: string[];
  responsibilities: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  github: string | null;
  live_demo: string | null;
  /** path to a real screenshot under public/, e.g. "/images/projects/foo.png"; null = placeholder */
  image: string | null;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  coursework?: string[];
  honors?: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  status?: string;
}

export interface LeadershipRole {
  title: string;
  organization: string;
  responsibilities: string[];
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface PortfolioData {
  personal: Personal;
  socials: Socials;
  technical_skills: TechnicalSkills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  leadership: { roles: LeadershipRole[] };
  languages: Language[];
  interests: string[];
}
