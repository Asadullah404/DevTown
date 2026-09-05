'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, ArrowDown, ExternalLink, Github, Sparkles, Check, Zap, ShieldCheck } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import { Project } from '../types'

interface Hero3DExperienceProps {
  onStartProject: () => void
  onOpenProjectModal: (project: Project) => void
}

export const Hero3DExperience: React.FC<Hero3DExperienceProps> = ({
  onStartProject,
  onOpenProjectModal,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [seq1Images, setSeq1Images] = useState<HTMLImageElement[]>([])
  const [seq2Images, setSeq2Images] = useState<HTMLImageElement[]>([])
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)

  const totalSeq1 = 72
  const totalSeq2 = 72

  // Preload frames for both sequences
  useEffect(() => {
    let isMounted = true

    const loadSequence = (folder: string, count: number, setter: (imgs: HTMLImageElement[]) => void) => {
      const imgs: HTMLImageElement[] = []
      for (let i = 0; i < count; i++) {
        const img = new Image()
        const frameNum = String(i).padStart(3, '0')
        img.src = `/frames/${folder}/frame_${frameNum}.webp`
        imgs.push(img)
      }
      if (isMounted) setter(imgs)
    }

    loadSequence('sequence1', totalSeq1, setSeq1Images)
    loadSequence('sequence2', totalSeq2, setSeq2Images)

    return () => {
      isMounted = false
    }
  }, [])

  // Track scroll position through the 3D runway
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalDist = rect.height - windowHeight

      if (totalDist <= 0) return

      const current = -rect.top
      const prog = Math.max(0, Math.min(1, current / totalDist))
      setScrollProgress(prog)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Draw current frame on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let currentImg: HTMLImageElement | null = null

    if (scrollProgress < 0.4) {
      if (seq1Images.length > 0) {
        const subProg = scrollProgress / 0.4
        const frameIdx = Math.min(totalSeq1 - 1, Math.floor(subProg * (totalSeq1 - 1)))
        currentImg = seq1Images[frameIdx]
      }
    } else {
      if (seq2Images.length > 0) {
        const subProg = (scrollProgress - 0.4) / 0.6
        const frameIdx = Math.min(totalSeq2 - 1, Math.floor(subProg * (totalSeq2 - 1)))
        currentImg = seq2Images[frameIdx]
      }
    }

    if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
      const cw = canvas.width
      const ch = canvas.height
      const iw = currentImg.naturalWidth
      const ih = currentImg.naturalHeight

      const scale = Math.max(cw / iw, ch / ih)
      const sw = iw * scale
      const sh = ih * scale
      const sx = (cw - sw) / 2
      const sy = (ch - sh) / 2

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(currentImg, sx, sy, sw, sh)
    }
  }, [scrollProgress, seq1Images, seq2Images])

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const currentProject = PROJECTS[activeProjectIndex]

  // Transition stage between Hero and Projects
  const transitionStart = 0.24
  const transitionEnd = 0.56
  const isInTransition = scrollProgress >= transitionStart && scrollProgress <= transitionEnd
  
  let transitionOpacity = 0
  if (scrollProgress >= transitionStart && scrollProgress < 0.38) {
    transitionOpacity = (scrollProgress - transitionStart) / (0.38 - transitionStart)
  } else if (scrollProgress >= 0.38 && scrollProgress <= 0.46) {
    transitionOpacity = 1
  } else if (scrollProgress > 0.46 && scrollProgress <= transitionEnd) {
    transitionOpacity = 1 - (scrollProgress - 0.46) / (transitionEnd - 0.46)
  }

  // 3D Flip & Docking
  const flipStart = 0.58
  const flipEnd = 0.80
  const flipFactor = Math.max(0, Math.min(1, (scrollProgress - flipStart) / (flipEnd - flipStart)))

  const cardRotateX = (1 - flipFactor) * 55
  const cardScale = 0.70 + flipFactor * 0.30
  const cardBlur = (1 - flipFactor) * 16
  const cardOpacity = Math.min(1, flipFactor * 1.8)
  const cardTranslateY = (1 - flipFactor) * 45

  const isCardVisible = scrollProgress >= 0.56

  return (
    <div ref={containerRef} className="relative h-[350vh] w-full bg-[#06080e]">
      {/* Sticky full-screen 3D viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center [perspective:1200px]">
        {/* Canvas Video Scrubber */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient Dark Gradient for Luxury Depth & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080e]/85 via-transparent to-[#06080e]/95 pointer-events-none" />

        {/* 
          ========================================================================
          STAGE 1: THE HERO (Extreme Clean, Luxury Minimalism)
          ========================================================================
        */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center transition-all duration-300 pointer-events-none z-10"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3.6),
            transform: `translateY(-${scrollProgress * 140}px) scale(${1 - scrollProgress * 0.12})`,
            pointerEvents: scrollProgress < 0.22 ? 'auto' : 'none',
          }}
        >
          <div className="max-w-4xl mx-auto pt-12 sm:pt-16">
            {/* Status Pill - Refined Monochrome Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-slate-300 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Fixed Price • 3–14 Day Delivery • Google AI Speed + CS Rigor</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Have an Idea?{' '}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                We’ll Build It Into Reality.
              </span>
            </h1>

            {/* Subhead */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed mb-8 px-2">
              We build, automate, and scale custom web applications, high-performance websites, AI chatbots, 
              and cloud workflows. Transparent fixed quotes, zero hourly billing creep, and rapid 3–14 day delivery.
            </p>

            {/* Dual CTAs - Tactile Pure White + Charcoal Glass */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto px-4">
              <button
                onClick={onStartProject}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_2px_4px_rgba(0,0,0,0.5)] active:translate-y-0.5"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] backdrop-blur-md transition-all duration-150"
              >
                <Play className="w-3.5 h-3.5 text-slate-400 fill-slate-400" />
                <span>Explore 4 Production Demos</span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
              <span>Scroll to navigate 3D space</span>
              <ArrowDown className="w-3.5 h-3.5 text-slate-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          STAGE 2: NARRATIVE IN-BETWEEN CHAPTER (Clean Architectural Minimalism)
          ========================================================================
        */}
        {isInTransition && (
          <div
            className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 text-center pointer-events-none z-10 transition-all duration-200"
            style={{
              opacity: transitionOpacity,
              transform: `scale(${0.96 + scrollProgress * 0.08})`,
            }}
          >
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#090d18]/90 border border-white/[0.1] backdrop-blur-2xl shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono font-medium text-slate-300 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>ENGINEERING PIPELINE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                From Raw Ideas To Battle-Tested Software
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-lg mx-auto">
                No endless meetings or junior guesswork. We design, architect, and deliver 
                production-ready platforms using modern web standards and Google AI acceleration.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-4">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-1">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Fixed Scope</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">Zero hidden fees or hourly billing surprises.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live Previews</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">Test working milestones as they are engineered.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>100% Yours</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">Full code ownership & Hostinger deployment.</p>
                </div>
              </div>

              <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
                <span>Entering Production Showcase</span>
                <ArrowDown className="w-3 h-3 animate-bounce" />
              </p>
            </div>
          </div>
        )}

        {/* 
          ========================================================================
          STAGE 3: 3D FLIP DOCKING CARD (Linear / Apple Premium Aesthetic)
          ========================================================================
        */}
        {isCardVisible && (
          <div
            className="absolute inset-0 flex flex-col justify-center items-center px-3 sm:px-6 lg:px-8 z-20"
            style={{
              pointerEvents: flipFactor > 0.35 ? 'auto' : 'none',
            }}
          >
            <div
              className="w-[96vw] sm:w-[92vw] md:w-[86vw] lg:w-[68vw] max-w-[1220px] max-h-[85vh] sm:max-h-[82vh] lg:max-h-[720px] rounded-2xl bg-[#080c16]/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-y-auto transition-all duration-150 relative"
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardTranslateY}px) scale(${cardScale}) rotateX(${cardRotateX}deg)`,
                transformOrigin: '50% 85%',
                filter: `blur(${cardBlur}px)`,
                willChange: 'transform, filter, opacity',
              }}
            >
              {/* Refined Segmented Control Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-4 shrink-0 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                {PROJECTS.map((proj, idx) => {
                  const isActive = activeProjectIndex === idx
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProjectIndex(idx)}
                      className={`p-2.5 rounded-lg text-left transition-all duration-150 ${
                        isActive
                          ? 'bg-white/[0.08] border border-white/[0.16] text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02] border border-transparent'
                      }`}
                    >
                      <span className="block text-[10px] font-mono text-slate-500 font-medium mb-0.5">
                        0{idx + 1}
                      </span>
                      <span className="block text-xs font-semibold truncate">
                        {proj.title}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Project Spotlight View */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] flex-1 overflow-y-auto">
                {/* Left Column: Project Information */}
                <div className="lg:col-span-2 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.1] text-slate-300">
                        {currentProject.badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/[0.03]">
                        {currentProject.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Verified Code
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                      {currentProject.description}
                    </p>

                    {/* Key Features Bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {currentProject.keyFeatures.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/[0.06]">
                    <span className="text-xs font-mono text-slate-500">Stack:</span>
                    {currentProject.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: ROI & Actions */}
                <div className="flex flex-col justify-between lg:border-l lg:border-white/[0.06] lg:pl-6 pt-3 lg:pt-0 space-y-4">
                  {/* Business Value Box */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider mb-1">
                      Business Value
                    </p>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {currentProject.clientValue}
                    </p>
                  </div>

                  {/* Action Buttons - Clean Tactile White + Refined Glass */}
                  <div className="space-y-2.5">
                    <button
                      onClick={() => onOpenProjectModal(currentProject)}
                      className="w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 active:translate-y-0.5"
                    >
                      <span>Inspect Technical Specs</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] transition-all flex items-center justify-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View GitHub Repository</span>
                    </a>

                    <button
                      onClick={() => scrollToSection('projects')}
                      className="w-full py-1 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Scroll to view full catalog</span>
                      <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
