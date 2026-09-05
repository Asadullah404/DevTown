import React from 'react'
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Bot, 
  Server, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Globe,
  Database
} from 'lucide-react'

interface SeoCapabilitiesSectionProps {
  onStartProject: () => void
}

export const SeoCapabilitiesSection: React.FC<SeoCapabilitiesSectionProps> = ({ onStartProject }) => {
  const pillars = [
    {
      id: 'make-site',
      badge: '01 • Make & Build',
      title: 'Make Your Site & Web Application',
      headline: 'From Raw Idea to Production Software in 3–14 Days',
      description:
        'Whether you need to make a high-converting business website, a custom SaaS MVP, or a client portal, we build clean, modern, responsive applications from scratch with zero boilerplate bloat.',
      capabilities: [
        'Custom Next.js 14 & React 18 frontend architecture',
        'Mobile-first responsive design for all screen resolutions',
        'Stripe & PayPal payment gateway integrations',
        'Secure user authentication & role-based access control (RBAC)',
      ],
      keywords: 'make site, build website, create web app, custom web development',
      icon: <Layers className="w-5 h-5 text-slate-200" />,
    },
    {
      id: 'scale-site',
      badge: '02 • Scale & Optimize',
      title: 'Scale Your Site & Infrastructure',
      headline: 'Engineered to Handle 100,000+ Users Without Slowing Down',
      description:
        'Slow load times kill conversions. We build and refactor web applications with sub-second page loads, Core Web Vitals 99+ scores, database indexing, and static edge pre-rendering.',
      capabilities: [
        'Static Site Generation (SSG) & Incremental Static Regeneration',
        'Database query optimization (PostgreSQL, Supabase, Firebase)',
        'Edge caching, asset minification & WebP frame compression',
        'Stress-tested architecture that prevents server crashes under spikes',
      ],
      keywords: 'scale site, scale web application, website performance, speed optimization',
      icon: <TrendingUp className="w-5 h-5 text-slate-200" />,
    },
    {
      id: 'automate-workflows',
      badge: '03 • Automate & AI',
      title: 'Automate Workflows with AI Agents',
      headline: 'Replace 20+ Hours of Manual Work with Autonomous Code',
      description:
        'We engineer autonomous Python & Node.js pipelines that scrape data, synthesize content with LLMs (OpenAI, Claude, Google AI), and trigger automated WhatsApp and email alerts.',
      capabilities: [
        'Autonomous web scrapers & data harvesting pipelines',
        'Custom conversational AI chatbots & customer support bots',
        'Automated WordPress REST API content publishers with SEO scoring',
        'Real-time WhatsApp, Telegram & Email webhook notifications',
      ],
      keywords: 'AI automation agency, LLM integration, automated workflows, AI chatbots',
      icon: <Bot className="w-5 h-5 text-slate-200" />,
    },
    {
      id: 'deploy-infrastructure',
      badge: '04 • Deploy & Host',
      title: 'Deploy to Hostinger, Cloud & VPS',
      headline: 'Zero-Downtime Deployment with 100% Code Ownership',
      description:
        'We handle full deployment directly onto your Hostinger plan, Vercel, or custom VPS. We configure custom domain DNS, SSL certificates, and hand over complete repository access.',
      capabilities: [
        'Direct Hostinger public_html configuration & zero-config export',
        'Custom domain DNS pointing, SSL certificate installation & CDN',
        'Docker containerized deployment for backend workers & databases',
        'Complete GitHub repository handover with full documentation',
      ],
      keywords: 'Hostinger web deployment, cloud web engineering, VPS setup, code ownership',
      icon: <Server className="w-5 h-5 text-slate-200" />,
    },
  ]

  const techMatrix = [
    { category: 'Frontend & UI', items: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML5 Semantic'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Python FastAPI', 'REST APIs', 'Webhooks', 'OAuth2', 'Stripe Billing'] },
    { category: 'AI & Machine Learning', items: ['OpenAI GPT-4o', 'Anthropic Claude', 'Google AI', 'LangChain', 'Neural TTS Voice', 'Wav2Lip'] },
    { category: 'Databases & Storage', items: ['PostgreSQL', 'Supabase', 'Firebase Firestore', 'Redis Cache', 'Google Drive API'] },
    { category: 'Deployment & Hosting', items: ['Hostinger Hosting', 'Vercel Edge', 'Docker', 'Linux VPS', 'Cloudflare DNS & SSL'] },
    { category: 'SEO & Performance', items: ['Schema.org JSON-LD', 'Core Web Vitals 99+', 'WebP Compression', 'OpenGraph Meta', 'XML Sitemaps'] },
  ]

  return (
    <section id="capabilities" className="py-24 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Search Intent & Engineering Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Make, Automate & Scale Your Software
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Every business has two critical requirements: <strong className="text-white font-semibold">make a site or web app that works flawlessly</strong>, 
            and <strong className="text-white font-semibold">scale that site to handle growth without breaking</strong>. Here is how we engineer both.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {pillars.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-2xl p-6 sm:p-8 bg-[#090d18]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 flex flex-col justify-between group shadow-xl shadow-black/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.1] text-slate-300">
                    {pillar.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    {pillar.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-slate-100 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-cyan-400/90 mb-3">
                  {pillar.headline}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Capability Checklist */}
                <div className="space-y-2 mb-6">
                  {pillar.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Keywords & Action */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[200px] sm:max-w-xs">
                  Target: {pillar.keywords}
                </span>
                <button
                  onClick={onStartProject}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-cyan-300 transition-colors shrink-0"
                >
                  <span>Build This</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Searchable Technology Matrix */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#090d18]/60 border border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Full-Stack Architecture & Technology Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Modern, robust, and indexable tech stacks we build with to ensure lifetime maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techMatrix.map((matrix, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-3">
                  {matrix.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {matrix.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
