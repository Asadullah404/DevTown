import React from 'react'
import { FileText, Calculator, Code2, Rocket, ArrowRight } from 'lucide-react'

interface HowItWorksProps {
  onStartProject: () => void
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartProject }) => {
  const steps = [
    {
      number: '01',
      title: 'Tell Us Your Goals',
      description:
        'Describe what you want to achieve in plain English through our 2-minute questionnaire. No complex technical specifications needed.',
      icon: <FileText className="w-5 h-5 text-slate-200" />,
    },
    {
      number: '02',
      title: 'Scope & Fixed Quote',
      description:
        'We review your requirements and send an exact architectural roadmap, delivery timeline, and a single fixed-price quote with zero hidden fees.',
      icon: <Calculator className="w-5 h-5 text-slate-200" />,
    },
    {
      number: '03',
      title: 'Rapid Development & Previews',
      description:
        'Development begins immediately. You receive private live preview URLs to test features and give feedback as modules are completed.',
      icon: <Code2 className="w-5 h-5 text-slate-200" />,
    },
    {
      number: '04',
      title: 'Deploy & Complete Handover',
      description:
        'We deploy your project directly to your hosting (Hostinger, Vercel, VPS), configure domain & SSL, and hand over 100% repository rights.',
      icon: <Rocket className="w-5 h-5 text-slate-200" />,
    },
  ]

  return (
    <section id="process" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Clear Milestones • Zero Guesswork</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            How Working With Us Works
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            No endless meetings or opaque agency processes. Here is our direct 4-step framework.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="rounded-2xl p-6 sm:p-7 bg-[#090d18]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 flex flex-col justify-between relative group shadow-xl shadow-black/40"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-bold font-mono text-slate-400 group-hover:text-white transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all group-hover:border-white/[0.16] group-hover:bg-white/[0.07]">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA banner below process - Clean Minimalist Surface */}
        <div className="mt-14 p-8 rounded-2xl bg-[#090d18]/90 border border-white/[0.1] shadow-2xl text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-xl font-bold text-white mb-1">
              Have an active project in mind?
            </h4>
            <p className="text-sm text-slate-400">
              Submit your idea and receive a free scope breakdown and fixed quote within 24 hours.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="shrink-0 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] flex items-center gap-2 active:translate-y-0.5"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
