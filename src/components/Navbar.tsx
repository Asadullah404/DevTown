'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react'

interface NavbarProps {
  onStartProject: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06080e]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Minimalist Luxury Monogram */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.12] flex items-center justify-center transition-all duration-200 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/[0.06]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base font-bold tracking-tight text-white">
                DEV
              </span>
              <span className="text-base font-medium tracking-tight text-slate-400">
                TOWN
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-1">
              Web & AI Engineering
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#projects"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Portfolio
          </a>
          <a
            href="#services"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Services & Pricing
          </a>
          <a
            href="#capabilities"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Capabilities & Scale
          </a>
          <a
            href="#process"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Process
          </a>
          <a
            href="#trust"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Guarantees
          </a>
        </nav>

        {/* Header Action Button - Clean Tactile White Primary */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Projects</span>
          </div>

          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.5)] active:translate-y-0.5"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06080e]/95 border-b border-white/[0.08] px-4 pt-4 pb-6 space-y-3 backdrop-blur-2xl">
          <nav className="flex flex-col space-y-2">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Portfolio
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Services & Pricing
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Capabilities & Scale
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Process
            </a>
            <a
              href="#trust"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/[0.05] rounded-lg"
            >
              Guarantees
            </a>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onStartProject()
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 shadow-sm"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  )
}
