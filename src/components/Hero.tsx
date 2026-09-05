import React from 'react'
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

interface HeroProps {
  onStartProject: () => void
  onExploreDemos: () => void
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreDemos }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Fixed Pricing • 3–14 Day Delivery • Google AI Speed + CS Rigor</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Have an Idea?{' '}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            We’ll Build It Into Reality.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed mb-10">
          We turn business requirements into custom websites, web applications, 
          AI chatbots, and automated workflows. Transparent fixed quotes, no hourly bidding, and rapid delivery.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] active:translate-y-0.5"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreDemos}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-150"
          >
            <Play className="w-3.5 h-3.5 text-slate-400 fill-slate-400" />
            <span>Explore 4 Production Demos</span>
          </button>
        </div>

        {/* 4 Value Props */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          {[
            { title: 'Zero Hidden Fees', desc: 'Single fixed-price contract', icon: <ShieldCheck className="w-4 h-4 text-slate-300" /> },
            { title: 'Full Code Ownership', desc: '100% repository rights', icon: <CheckCircle2 className="w-4 h-4 text-slate-300" /> },
            { title: 'Rapid Turnaround', desc: '3 to 14 day milestones', icon: <Zap className="w-4 h-4 text-slate-300" /> },
            { title: 'Direct Access', desc: 'Direct engineer communication', icon: <CheckCircle2 className="w-4 h-4 text-slate-300" /> },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#090d18]/80 border border-white/[0.08] shadow-md">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h4 className="text-xs font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
