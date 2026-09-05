import React from 'react'
import { Project } from '../types'
import { X, Github, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onBuildSimilar: (projectTitle: string) => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onBuildSimilar }) => {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop with heavy blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl my-8 bg-[#090d18] border border-white/[0.12] rounded-2xl shadow-2xl shadow-black/80 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.1] text-slate-300">
            {project.badge}
          </span>
          <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {project.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-300 font-medium mb-6">
          {project.tagline}
        </p>

        {/* Business ROI Box */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Business ROI & Impact
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {project.clientValue}
            </p>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Architecture & Execution
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.detailedOverview}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Core Technical Highlights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-200"
              >
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-8">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose()
              onBuildSimilar(project.title)
            }}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 transition-all duration-150 active:translate-y-0.5"
          >
            <span>Request a Project Like This</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] flex items-center justify-center gap-2 transition-all duration-150"
          >
            <Github className="w-4 h-4" />
            <span>Inspect Repository</span>
          </a>
        </div>
      </div>
    </div>
  )
}
