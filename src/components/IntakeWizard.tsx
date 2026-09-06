'use client'

import React, { useState, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { ProjectInquiry } from '../types'
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  MessageSquare, 
  Mail, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react'
import confetti from 'canvas-confetti'

interface IntakeWizardProps {
  initialProjectType?: string
}

// DevTown Formspree Form ID: mgaelodz (https://formspree.io/f/mgaelodz)
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || 'mgaelodz'
const PRIMARY_EMAIL = 'm.asadullah.10.0.0.01@gmail.com'
const WHATSAPP_NUMBER = '923022111051'

export const IntakeWizard: React.FC<IntakeWizardProps> = ({ initialProjectType = '' }) => {
  const [step, setStep] = useState<number>(1)
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)

  // Form State
  const [formData, setFormData] = useState<ProjectInquiry>({
    projectType: initialProjectType || 'High-Performance Website',
    features: [],
    description: '',
    budgetRange: '$300 – $750',
    timeline: '1 – 2 Weeks',
    name: '',
    email: '',
    whatsapp: '',
  })

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }))
    }
  }, [initialProjectType])

  const projectTypes = [
    'High-Performance Website',
    'Custom Web Application / Portal',
    'AI Chatbot / Assistant',
    'Workflow & Business Automation',
    'Business Dashboard & Invoicing',
    'Something Custom / Not Sure',
  ]

  const availableFeatures = [
    'User Authentication & Accounts',
    'Payment Processing (Stripe/PayPal)',
    'Database & Admin Dashboard',
    'AI Chat / LLM Integration',
    'Automated WhatsApp Alerts',
    'Automated Email Notifications',
    'PDF Invoices & Excel Reports',
    'Third-Party API Integration',
    'SEO & Social Media Meta Tags',
    'Mobile-First Responsive Layout',
  ]

  const budgetOptions = [
    'Under $300',
    '$300 – $750',
    '$750 – $1,500',
    '$1,500+',
    'Not sure / Need advice',
  ]

  const timelineOptions = [
    'Urgent (Within 7 Days)',
    '1 – 2 Weeks',
    '2 – 4 Weeks',
    'Flexible timeline',
  ]

  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature)
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      }
    })
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  // Clean formatted text for WhatsApp and Email
  const buildEmailSubject = () => {
    return `New Project Inquiry: ${formData.projectType} - ${formData.name}`
  }

  const buildEmailBody = () => {
    return `Hi Asadullah,\n\n` +
      `I would like to get a fixed-price quote and roadmap for a new project with DevTown:\n\n` +
      `--------------------------------------------------\n` +
      `PROJECT DETAILS\n` +
      `--------------------------------------------------\n` +
      `• Project Type: ${formData.projectType}\n` +
      `• Target Budget: ${formData.budgetRange}\n` +
      `• Target Launch Timeline: ${formData.timeline}\n` +
      `• Key Scope / Features:\n  - ${formData.features.join('\n  - ') || 'Standard package'}\n\n` +
      `• Project Overview / Goals:\n${formData.description || 'No additional details provided'}\n\n` +
      `--------------------------------------------------\n` +
      `CLIENT CONTACT\n` +
      `--------------------------------------------------\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• WhatsApp / Phone: ${formData.whatsapp || 'Not provided'}\n\n` +
      `Looking forward to your fixed scope breakdown.\n`
  }

  const buildWhatsAppText = () => {
    return `*New Project Inquiry for DevTown*%0A%0A` +
      `*Project Type:* ${formData.projectType}%0A` +
      `*Features Needed:* ${formData.features.join(', ') || 'Standard package'}%0A` +
      `*Budget Range:* ${formData.budgetRange}%0A` +
      `*Timeline:* ${formData.timeline}%0A` +
      `*Description:* ${formData.description || 'Details to be discussed'}%0A%0A` +
      `*Client Name:* ${formData.name}%0A` +
      `*Client Email:* ${formData.email}%0A` +
      `*Client WhatsApp:* ${formData.whatsapp || 'Not provided'}`
  }

  useEffect(() => {
    if (state.succeeded) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [state.succeeded])

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      alert('Please enter your name and email address')
      return
    }

    // Also submit to Formspree in background so lead is always archived in Formspree dashboard
    try {
      await handleSubmit({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp || 'Not provided',
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        features: formData.features.join(', ') || 'Standard Scope',
        description: formData.description || 'Details to be discussed',
        _replyto: formData.email,
        _subject: `New DevTown Lead: ${formData.projectType} from ${formData.name}`,
      })
    } catch (err) {
      console.warn('Background Formspree dispatch:', err)
    }

    const message = buildWhatsAppText()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const getGmailWebUrl = () => {
    const subject = encodeURIComponent(buildEmailSubject())
    const body = encodeURIComponent(buildEmailBody())
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PRIMARY_EMAIL}&su=${subject}&body=${body}`
  }

  return (
    <section id="quote-wizard" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Container - Clean Architectural Card */}
        <div className="rounded-2xl p-6 sm:p-10 bg-[#090d18]/90 border border-white/[0.1] shadow-2xl shadow-black/60 relative overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Direct Inquiry • 24hr Scope & Quote</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Start Your Project
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Answer 4 quick questions. We'll analyze your goals and send a clear scope breakdown, 
              fixed-price quote, and delivery timeline within 24 hours.
            </p>

            {/* Step Progress Pills */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-150 ${
                      step === s
                        ? 'bg-white text-slate-950 font-bold shadow-sm ring-2 ring-white/20'
                        : step > s
                        ? 'bg-white/[0.12] text-slate-200 border border-white/[0.2]'
                        : 'bg-white/[0.04] text-slate-500 border border-white/[0.08]'
                    }`}
                  >
                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`w-6 sm:w-10 h-[1px] transition-colors ${
                        step > s ? 'bg-white/30' : 'bg-white/[0.08]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submitted Success Screen */}
          {state.succeeded ? (
            <div className="py-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">
                Inquiry Sent Successfully!
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Thank you, <strong>{formData.name}</strong>. Your project specifications have been received and recorded directly. 
                We are reviewing your requirements and will reply to <strong className="text-white">{formData.email}</strong> within 24 hours.
              </p>

              {/* Direct Quick-Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-slate-950 bg-[#25d366] hover:bg-[#20bd5a] transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_2px_8px_rgba(37,211,102,0.25)]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+92 302 2111051)</span>
                </a>

                <a
                  href={getGmailWebUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Web Gmail</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  reset()
                  setStep(1)
                  setFormData({
                    projectType: initialProjectType || 'High-Performance Website',
                    features: [],
                    description: '',
                    budgetRange: '$300 – $750',
                    timeline: '1 – 2 Weeks',
                    name: '',
                    email: '',
                    whatsapp: '',
                  })
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Hidden fields ensuring all multi-step selections are submitted to Formspree */}
              <input type="hidden" name="projectType" value={formData.projectType} />
              <input type="hidden" name="features" value={formData.features.join(', ') || 'Standard Scope'} />
              <input type="hidden" name="budgetRange" value={formData.budgetRange} />
              <input type="hidden" name="timeline" value={formData.timeline} />
              <input type="hidden" name="_replyto" value={formData.email} />
              <input type="hidden" name="_subject" value={`New DevTown Lead: ${formData.projectType} from ${formData.name}`} />
              {/* STEP 1: Project Type */}
              {step === 1 && (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 text-center">
                    Step 1: What type of project are you looking to build?
                  </h3>
                  <p className="text-xs text-slate-400 text-center mb-6">
                    Select the option closest to your vision.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`p-4 rounded-xl text-left border transition-all duration-150 flex items-center justify-between ${
                            isSelected
                              ? 'bg-white/[0.08] border-white/[0.24] text-white shadow-sm ring-1 ring-white/20'
                              : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:border-white/[0.14] hover:text-slate-200 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {type}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-white bg-white text-slate-950 font-bold'
                                : 'border-white/20'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-slate-950" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Key Features Required */}
              {step === 2 && (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 text-center">
                    Step 2: What key features do you require?
                  </h3>
                  <p className="text-xs text-slate-400 text-center mb-6">
                    Select all that apply. (We can adjust this during our review).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {availableFeatures.map((feat) => {
                      const isSelected = formData.features.includes(feat)
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => toggleFeature(feat)}
                          className={`p-3.5 rounded-xl text-left border transition-all duration-150 flex items-center justify-between ${
                            isSelected
                              ? 'bg-white/[0.08] border-white/[0.24] text-white shadow-sm ring-1 ring-white/20'
                              : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:border-white/[0.14] hover:text-slate-200 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                            {feat}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-white bg-white text-slate-950 font-bold'
                                : 'border-white/20'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-slate-950" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Budget Range & Timeline */}
              {step === 3 && (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 text-center">
                    Step 3: Budget Range & Target Timeline
                  </h3>
                  <p className="text-xs text-slate-400 text-center mb-6">
                    Helps us scope the exact deliverables and architecture to match your requirements.
                  </p>

                  {/* Budget */}
                  <div className="mb-6">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5 font-mono">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      Approximate Budget:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                            formData.budgetRange === b
                              ? 'bg-white/[0.08] border-white/[0.24] text-white shadow-sm ring-1 ring-white/20'
                              : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:border-white/[0.14] hover:text-slate-200 hover:bg-white/[0.05]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-8">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Target Timeline:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {timelineOptions.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: t })}
                          className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                            formData.timeline === t
                              ? 'bg-white/[0.08] border-white/[0.24] text-white shadow-sm ring-1 ring-white/20'
                              : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:border-white/[0.14] hover:text-slate-200 hover:bg-white/[0.05]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Description & Contact Details */}
              {step === 4 && (
                <div className="animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 text-center">
                    Step 4: Describe Your Project & Contact Info
                  </h3>
                  <p className="text-xs text-slate-400 text-center mb-6">
                    Where should we send your fixed-price quote and scope breakdown?
                  </p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                        Brief Project Description:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="e.g. We need a modern client dashboard with authentication, Stripe subscription billing, and automated notifications..."
                        className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/[0.1] text-white placeholder-slate-600 focus:outline-none focus:border-white/30 text-xs sm:text-sm transition-all"
                      />
                      <ValidationError prefix="Description" field="description" errors={state.errors} className="text-xs text-rose-400 mt-1 font-mono" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                          Your Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex Morgan"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-white/[0.1] text-white placeholder-slate-600 focus:outline-none focus:border-white/30 text-xs sm:text-sm transition-all"
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-rose-400 mt-1 font-mono" />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-white/[0.1] text-white placeholder-slate-600 focus:outline-none focus:border-white/30 text-xs sm:text-sm transition-all"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-400 mt-1 font-mono" />
                      </div>

                      <div>
                        <label htmlFor="whatsapp" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                          WhatsApp / Phone
                        </label>
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="text"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#050811] border border-white/[0.1] text-white placeholder-slate-600 focus:outline-none focus:border-white/30 text-xs sm:text-sm transition-all"
                        />
                        <ValidationError prefix="WhatsApp" field="whatsapp" errors={state.errors} className="text-xs text-rose-400 mt-1 font-mono" />
                      </div>
                    </div>

                    <ValidationError errors={state.errors} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs mt-4" />
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={state.submitting}
                    className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center gap-1.5 transition-all duration-150 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] flex items-center gap-2 active:translate-y-0.5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      disabled={state.submitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-950 bg-[#25d366] hover:bg-[#20bd5a] transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_2px_8px_rgba(37,211,102,0.25)] flex items-center justify-center gap-2 active:translate-y-0.5 disabled:opacity-60"
                    >
                      {state.submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MessageSquare className="w-4 h-4" />
                      )}
                      <span>Send Direct via WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 active:translate-y-0.5 disabled:opacity-60"
                    >
                      {state.submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
