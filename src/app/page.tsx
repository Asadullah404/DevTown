'use client'

import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Hero3DExperience } from '../components/Hero3DExperience'
import { ProjectsShowcase } from '../components/ProjectsShowcase'
import { ServicesSection } from '../components/ServicesSection'
import { SeoCapabilitiesSection } from '../components/SeoCapabilitiesSection'
import { HowItWorks } from '../components/HowItWorks'
import { TrustSection } from '../components/TrustSection'
import { IntakeWizard } from '../components/IntakeWizard'
import { Footer } from '../components/Footer'
import { ProjectModal } from '../components/ProjectModal'
import { Project } from '../types'

export default function Home() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  const scrollToQuote = () => {
    const el = document.getElementById('quote-wizard')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectService = (title: string) => {
    setSelectedServiceForQuote(title)
    scrollToQuote()
  }

  return (
    <main className="min-h-screen bg-[#06080e] text-foreground selection:bg-cyan-500/30 selection:text-white relative">
      {/* Sticky Navigation */}
      <Navbar onStartProject={scrollToQuote} />

      {/* 
        ========================================================================
        IMMERSIVE 3D SCROLL EXPERIENCE (FROM THE VERY START)
        Frame 0 begins right at the Hero! As the user scrolls:
        1. 3D floating glass monoliths drift in the background behind the Hero
        2. Camera accelerates into the cyber warp tunnel
        3. Camera docks squarely onto the HUD monitor frame with the 4 GitHub projects
        ========================================================================
      */}
      <Hero3DExperience
        onStartProject={scrollToQuote}
        onOpenProjectModal={(p) => setActiveModalProject(p)}
      />

      {/* All 4 Verified Production Projects (In-Depth Technical Cards) */}
      <ProjectsShowcase onSelectProjectForQuote={handleSelectService} />

      {/* 6 Core Productized Services & Transparent Pricing */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* Extreme SEO Capabilities & Scalable Architecture Matrix */}
      <SeoCapabilitiesSection onStartProject={scrollToQuote} />

      {/* Transparent 4-Step Process */}
      <HowItWorks onStartProject={scrollToQuote} />

      {/* Zero-Risk Guarantees & Interactive FAQ */}
      <TrustSection />

      {/* Interactive 4-Step Project Intake Wizard */}
      <IntakeWizard initialProjectType={selectedServiceForQuote} />

      {/* Global Project Drawer Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onBuildSimilar={handleSelectService}
      />

      {/* Footer */}
      <Footer />
    </main>
  )
}
