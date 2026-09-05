export interface Project {
  id: string
  title: string
  subtitle: string
  category: 'AI Automation' | 'Web Apps & Portals' | 'AI Multimedia' | 'SaaS & Lifestyle'
  badge: string
  tagline: string
  description: string
  detailedOverview: string
  clientValue: string
  keyFeatures: string[]
  technologies: string[]
  deliverables: string[]
  githubUrl: string
  demoUrl?: string
  status: 'Live Demo' | 'Production Code'
  accentColor: string
  glowColor: string
}

export interface Service {
  id: string
  title: string
  category: string
  description: string
  iconName: string
  startingPrice: string
  estimatedTime: string
  deliverables: string[]
  accentColor: string
}

export interface ProjectInquiry {
  projectType: string
  features: string[]
  description: string
  budgetRange: string
  timeline: string
  name: string
  email: string
  whatsapp: string
}
