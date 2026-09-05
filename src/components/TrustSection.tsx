import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Lock, RefreshCw, Key, ShieldCheck } from 'lucide-react'

export const TrustSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const guarantees = [
    {
      icon: <Lock className="w-5 h-5 text-slate-200" />,
      title: 'Fixed-Price Guarantee',
      desc: 'No hourly rate creep or surprise invoices. If scope is unchanged, the price you agreed to is the only price you pay.',
    },
    {
      icon: <Key className="w-5 h-5 text-slate-200" />,
      title: '100% Code Ownership',
      desc: 'You receive full rights, source code, repository access, and credentials. We never lock you into proprietary platforms.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-slate-200" />,
      title: '30-Day Launch Warranty',
      desc: 'If any bug or glitch is found within 30 days of deployment, we fix it immediately at zero additional charge.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-slate-200" />,
      title: 'Direct Developer Access',
      desc: 'No non-technical middle managers or game of telephone. You communicate directly with the engineer building your product.',
    },
  ]

  const faqs = [
    {
      q: 'Do I need to have a design or technical specification ready?',
      a: 'Not at all. You just need to explain what business outcome you want in plain English. We handle the wireframes, technical architecture, and system design for you.',
    },
    {
      q: 'Can you deploy onto my Hostinger hosting plan?',
      a: 'Yes, absolutely! We configure and deploy the website or application directly onto your Hostinger account, configure SSL certificates, custom domain DNS, and ensure 100% uptime.',
    },
    {
      q: 'How do milestone payments work?',
      a: 'To ensure total safety for both sides, projects are typically broken into milestones: an initial deposit to begin development (e.g. 30–50%), followed by remaining milestones as you review and approve live working previews.',
    },
    {
      q: 'What if I need future updates or new features later on?',
      a: 'Because all code is written in clean, modern TypeScript, React, or Python with full documentation, you can easily hire us for ongoing feature sprints or have any developer pick it up immediately.',
    },
  ]

  return (
    <section id="trust" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Guarantees Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Guarantees & Assurances</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Working With Us Is Zero Risk
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            We operate on complete transparency, verifiable source code, and guaranteed deliverable outcomes.
          </p>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 bg-[#090d18]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 shadow-xl shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-400">
              Clear answers to common questions before starting a project.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="rounded-xl bg-[#090d18]/80 border border-white/[0.08] hover:border-white/[0.14] overflow-hidden transition-all duration-150"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
