import React from 'react'
import { SERVICES } from '../data/services'
import { Globe, LayoutGrid, Bot, Zap, BarChart3, Cpu, Check, ArrowRight, Clock, Tag } from 'lucide-react'

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-slate-200"
    switch (name) {
      case 'Globe':
        return <Globe className={iconClass} />
      case 'LayoutGrid':
        return <LayoutGrid className={iconClass} />
      case 'Bot':
        return <Bot className={iconClass} />
      case 'Zap':
        return <Zap className={iconClass} />
      case 'BarChart3':
        return <BarChart3 className={iconClass} />
      case 'Cpu':
        return <Cpu className={iconClass} />
      default:
        return <Globe className={iconClass} />
    }
  }

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Direct Engineering • Fixed Scope</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            What Can We Build For You?
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            You don't need to know the technical jargon. Just describe what you want to achieve, 
            and we'll engineer the exact solution with fixed pricing and guaranteed timelines.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl p-6 sm:p-7 bg-[#090d18]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 flex flex-col justify-between group shadow-xl shadow-black/40 relative overflow-hidden"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all group-hover:border-white/[0.16] group-hover:bg-white/[0.07]">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-400">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Scope Includes:
                  </p>
                  {service.deliverables.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Pricing & Action */}
              <div className="pt-5 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    <span>From <strong className="text-white font-semibold">{service.startingPrice}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{service.estimatedTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 active:translate-y-0.5"
                >
                  <span>Get Scope & Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
