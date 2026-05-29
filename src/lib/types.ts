export type SkillLevel = "Débutant" | "Intermédiaire" | "Avancé";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export type SkillCategories = Record<string, Skill[]>;

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Formation {
  title: string;
  school: string;
  level: string;
  dates: string;
}

export interface Experience {
  title: string;
  company: string;
  type: string;
  dates: string;
  description: string;
}

export type ProjectCategory = "Full Stack" | "UI/UX" | "Web3" | "Creative";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  audit: string;
  challenge: string;
  strategy: string;
  result: string;
  accent?: string;
  hero?: boolean;
  repo?: string;
}

export interface Identity {
  name: string;
  age: number;
  title: string;
  tagline: string;
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
  linkedin: string;
}

export interface CvData {
  identity: Identity;
  contact: Contact;
  languages: LanguageItem[];
  skills: SkillCategories;
  certifications: string[];
  formations: Formation[];
  experiences: Experience[];
  profile: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  languages?: string[];
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
}

export const LEVEL_PROGRESS: Record<SkillLevel, number> = {
  Débutant: 35,
  Intermédiaire: 65,
  Avancé: 92,
};
