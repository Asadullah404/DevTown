import React from 'react'
import { Sparkles, Github, Mail } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070e] border-t border-white/[0.08] pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.12] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base font-bold tracking-tight text-white">
                  DEV
                </span>
                <span className="text-base font-medium tracking-tight text-slate-400">
                  TOWN
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              We engineer high-performing web applications, AI chatbots, client portals, 
              and automated workflows. Fixed quotes, zero scope creep, and rapid delivery.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/Asadullah404"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:onlyarmor123isallowed@gmail.com"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
                title="Email Inquiry"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Portfolio Demos
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Capabilities & Scale
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors">
                  Guarantees & FAQ
                </a>
              </li>
              <li>
                <a href="#quote-wizard" className="hover:text-white transition-colors">
                  Start a Project
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>High-Performance Web Apps</li>
              <li>AI Automation Pipelines</li>
              <li>Enterprise Dashboards & Portals</li>
              <li>Custom AI Agents & Chatbots</li>
              <li>Payment & Third-Party APIs</li>
              <li>Hostinger & VPS Deployment</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} DevTown. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with Next.js, React & TypeScript</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              100% Client Code Ownership
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
