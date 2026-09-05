import React, { useState } from 'react'
import { PROJECTS } from '../data/projects'
import { Project } from '../types'
import { ProjectModal } from './ProjectModal'
import { ArrowUpRight, Github, CheckCircle2 } from 'lucide-react'

interface ProjectsShowcaseProps {
  onSelectProjectForQuote: (title: string) => void
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProjectForQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  const categories = ['All', 'AI Automation', 'Web Apps & Portals', 'AI Multimedia', 'SaaS & Lifestyle']

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Proven Execution • Real Source Code</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Production Software We've Built
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            We don't show generic mockups or unverified templates. Here are four real production-grade 
            systems demonstrating AI automation pipelines, enterprise dashboards, and full-stack web applications.
          </p>
        </div>

        {/* Category Filter Tabs - Apple / Linear Segmented Control */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] max-w-fit mx-auto mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl p-6 sm:p-8 bg-[#090d18]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 flex flex-col justify-between group shadow-xl shadow-black/40 relative overflow-hidden"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.1] text-slate-300">
                    {project.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                    {project.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300 font-medium mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Features Bullets */}
                <div className="space-y-2 mb-6">
                  {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-slate-400">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions Footer - Clean Tactile White Primary */}
              <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>Technical Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-slate-300 hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onSelectProjectForQuote(project.title)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] active:translate-y-0.5"
                  >
                    Request Similar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Drawer */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onBuildSimilar={onSelectProjectForQuote}
      />
    </section>
  )
}
