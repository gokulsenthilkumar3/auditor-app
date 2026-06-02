'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  FileText, Building2, BarChart3, Zap, FileCheck, Lock,
  Check, ArrowRight, Star, Twitter, Linkedin, Mail, Phone,
  ChevronRight, Play, Users, ScanLine, TrendingUp, Calculator,
} from 'lucide-react'

/* ─── Data ──────────────────────────────────────────────────── */

const features = [
  {
    Icon: FileText,
    title: 'Smart Document Parsing',
    who: 'For CAs managing 50+ clients',
    problem: 'Stop manually re-keying Form 16, AIS, and bank statements.',
    outcome: 'Drop any PDF, Excel, Word, or image — AI extracts salary, TDS, deductions, and capital gains in under 60 seconds.',
    accent: '#6366f1',
    formats: ['Form 16', 'AIS/26AS', 'Bank Stmt', 'Cap Gains'],
  },
  {
    Icon: Building2,
    title: 'Unified Account Hub',
    who: 'For multi-account clients',
    problem: 'Your clients have savings, demat, trading, and credit cards spread across 5 banks.',
    outcome: 'One dashboard links all accounts and computes net worth, cash flow, and tax liability automatically.',
    accent: '#8b5cf6',
    formats: ['Savings', 'Demat', 'Trading', 'Credit Card'],
  },
  {
    Icon: BarChart3,
    title: 'Tax Engine — Both Regimes',
    who: 'For ITR-1 through ITR-6 filers',
    problem: 'Manually computing Old vs New regime tax is error-prone and time-consuming.',
    outcome: 'Auto-compute across Stocks, MF, FD, Crypto, and NPS. Suggests the optimal regime per client in one click.',
    accent: '#10b981',
    formats: ['Old Regime', 'New Regime', 'STCG/LTCG', 'NPS/80C'],
  },
  {
    Icon: Zap,
    title: 'AI-Powered Insights',
    who: 'For proactive CAs',
    problem: 'You only find tax-saving opportunities at year-end when it\'s too late.',
    outcome: 'Real-time alerts for missed deductions, advance tax dues, and anomalies — sent before they become problems.',
    accent: '#f59e0b',
    formats: ['80C Alerts', 'Adv Tax', 'Anomalies', 'HRA Check'],
  },
  {
    Icon: FileCheck,
    title: 'ITR Filing & Compliance',
    who: 'For filing season efficiency',
    problem: 'Tracking 200 clients\' filing status across spreadsheets is chaos.',
    outcome: 'One-click ITR generation, status tracking, advance tax scheduling, and e-verification — all in one place.',
    accent: '#ef4444',
    formats: ['ITR-1', 'ITR-2', 'ITR-3', 'ITR-4'],
  },
  {
    Icon: Lock,
    title: 'Bank-Grade Security',
    who: 'For compliance-first firms',
    problem: 'Sharing client data over WhatsApp and email is a liability.',
    outcome: 'AES-256 encryption, role-based access, full audit logs, and ICAI-compliant data handling — built in, not bolted on.',
    accent: '#0ea5e9',
    formats: ['AES-256', 'Role RBAC', 'Audit Log', 'ICAI-Ready'],
  },
]

const stats = [
  { value: '10,000+', label: 'CAs & Tax Professionals', sub: 'and growing every month', color: '#6366f1' },
  { value: '₹2.4Cr+', label: 'Tax Saved for Clients', sub: 'per client annually on average', color: '#10b981' },
  { value: '99.5%', label: 'Document Parse Accuracy', sub: 'across Form 16, AIS, and bank statements', color: '#f59e0b' },
  { value: '< 3 min', label: 'Avg. Tax Computation Time', sub: 'from document upload to ITR-ready', color: '#8b5cf6' },
]

const testimonials = [
  {
    quote: "AuditPro cut my filing season from 3 weeks to 4 days. The Form 16 parser alone saves me 2 hours per client.",
    name: 'CA Priya Nambiar',
    title: 'Partner, Nambiar & Associates',
    location: 'Chennai',
    clients: '340 clients',
    initials: 'PN',
    color: '#6366f1',
  },
  {
    quote: "Finally a platform that understands Indian tax law. Old vs New regime switching is instant, and the AIS reconciliation is flawless.",
    name: 'CA Rohit Agarwal',
    title: 'Founder, RA Tax Consultants',
    location: 'Jaipur',
    clients: '180 clients',
    initials: 'RA',
    color: '#10b981',
  },
  {
    quote: "My clients love the portfolio view — they can see their LTCG, STCG, and tax liability in one screen. No more Excel chaos.",
    name: 'CA Deepa Krishnan',
    title: 'Senior CA, KD Financial Services',
    location: 'Bengaluru',
    clients: '520 clients',
    initials: 'DK',
    color: '#8b5cf6',
  },
]

const pricing = [
  {
    name: 'Starter',
    price: '₹0',
    period: 'forever',
    desc: 'For solo practitioners getting started',
    features: [
      'Up to 10 clients',
      'Document parsing (20 docs/month)',
      'ITR-1 & ITR-2 computation',
      'Basic portfolio tracking',
      'Email support',
    ],
    cta: 'Start Free',
    href: '/dashboard',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '₹2,499',
    period: 'per month',
    desc: 'For growing CA firms with active filing practices',
    features: [
      'Up to 200 clients',
      'Unlimited document parsing',
      'All ITR types (1–6)',
      'AI tax optimization engine',
      'Portfolio & capital gains tracker',
      'Advance tax scheduler',
      'Priority email & chat support',
    ],
    cta: 'Start 14-day Trial',
    href: '/dashboard',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large firms, CA networks & fintech platforms',
    features: [
      'Unlimited clients',
      'Dedicated account manager',
      'API access & white-labelling',
      'SSO / SAML integration',
      'Custom compliance workflows',
      'SLA-backed uptime guarantee',
      'On-premise deployment option',
    ],
    cta: 'Contact Sales',
    href: 'mailto:sales@auditpro.app',
    highlight: false,
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Upload Any Document',
    desc: 'Drag & drop Form 16, AIS, bank statements, or capital gains reports. Supports PDF, Excel, Word, and scanned images.',
    color: '#6366f1',
  },
  {
    step: '02',
    title: 'AI Parses & Reconciles',
    desc: 'Our engine extracts income, TDS, deductions, and investments — then cross-validates against AIS/26AS automatically.',
    color: '#8b5cf6',
  },
  {
    step: '03',
    title: 'Review, Optimise & File',
    desc: 'Compare Old vs New regime, apply missing deductions, and generate a pre-filled ITR ready for e-filing in minutes.',
    color: '#10b981',
  },
]

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Resources: ['Documentation', 'API Reference', 'CA Handbook', 'Blog'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR'],
}

/* ─── Subcomponents ─────────────────────────────────────────── */

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(7,9,26,0.95)' : 'rgba(7,9,26,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Logo — SVG wordmark */}
      <a href="/" className="flex items-center gap-2.5" aria-label="AuditPro home">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="6" height="8" rx="1.5" fill="white" fillOpacity="0.9"/>
            <rect x="10" y="2" width="6" height="4" rx="1.5" fill="white" fillOpacity="0.6"/>
            <rect x="10" y="8" width="6" height="8" rx="1.5" fill="white" fillOpacity="0.9"/>
            <rect x="2" y="12" width="6" height="4" rx="1.5" fill="white" fillOpacity="0.6"/>
          </svg>
        </div>
        <span className="font-extrabold text-white tracking-tight" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
          Audit<span style={{ color: '#818cf8' }}>Pro</span>
        </span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: '#64748b' }}>
        <a href="#features"     className="hover:text-white transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
        <a href="#pricing"      className="hover:text-white transition-colors">Pricing</a>
        <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
      </div>

      {/* CTAs — clearly differentiated */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="hidden md:inline text-sm font-medium transition-colors hover:text-white"
          style={{ color: '#64748b' }}
          aria-label="Sign in to your account"
        >
          Sign In
        </Link>
        <Link
          href="/dashboard"
          className="btn-primary text-sm py-2 px-5"
          aria-label="Get started for free"
        >
          Get Started Free
          <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </nav>
  )
}

/* ─── Main Page ─────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: '#07091a' }}>
      <NavBar />

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section
        className="relative pt-28 pb-20 px-6 md:px-12 flex flex-col items-center text-center bg-grid"
        aria-label="Hero section"
      >
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true"
          style={{ width: '900px', height: '600px', background: 'radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.18) 0%, transparent 65%)' }} />
        <div className="absolute top-60 left-10 pointer-events-none" aria-hidden="true"
          style={{ width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(139,92,246,0.09) 0%, transparent 70%)' }} />
        <div className="absolute top-60 right-10 pointer-events-none" aria-hidden="true"
          style={{ width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />

        {/* Trust badge — ABOVE THE FOLD */}
        <div
          className="slide-up mb-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}
          role="img"
          aria-label="Social proof: Trusted by 10,000+ Chartered Accountants"
        >
          <span className="flex gap-0.5" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} fill="#fbbf24" stroke="none" />
            ))}
          </span>
          <span>Trusted by <strong>10,000+</strong> Chartered Accountants across India</span>
        </div>

        {/* Headline — clear hierarchy */}
        <h1
          className="slide-up stagger-1 text-5xl md:text-[4.5rem] font-extrabold text-white max-w-4xl mb-4"
          style={{ lineHeight: '1.07', letterSpacing: '-0.025em' }}
        >
          The CA Portal That{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 40%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Works Like AI
          </span>
        </h1>

        {/* Specific, concrete sub-headline */}
        <p
          className="slide-up stagger-2 text-lg md:text-xl max-w-2xl mb-3 leading-relaxed"
          style={{ color: '#94a3b8' }}
        >
          Drop a Form 16 PDF — AI auto-fills ITR fields in under 3 minutes.
          Manage every client&apos;s taxes, portfolios, and filings without switching apps.
        </p>
        <p className="slide-up stagger-2 text-sm mb-9" style={{ color: '#475569' }}>
          Supports Form 16, AIS/26AS, capital gains statements, bank statements, and more.
        </p>

        {/* CTAs — clearly differentiated flows */}
        <div className="slide-up stagger-3 flex flex-col sm:flex-row gap-3 items-center mb-5">
          <Link
            href="/dashboard"
            id="hero-cta-primary"
            className="btn-primary text-base px-9 py-4"
            style={{ boxShadow: '0 8px 30px rgba(99,102,241,0.4)', fontSize: '0.9375rem' }}
            aria-label="Start your free trial — no credit card required"
          >
            Start Free Trial
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button
            id="hero-cta-demo"
            className="btn-ghost text-base px-7 py-4 flex items-center gap-2"
            onClick={() => document.getElementById('demo-modal')?.classList.remove('hidden')}
            aria-label="Watch a 2-minute product demo video"
            style={{ fontSize: '0.9375rem' }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}
              aria-hidden="true"
            >
              <Play size={10} fill="#818cf8" stroke="none" />
            </div>
            Watch Demo (2 min)
          </button>
        </div>
        <p className="slide-up stagger-3 text-xs mb-14" style={{ color: '#374151' }}>
          No credit card required &nbsp;·&nbsp; Setup in 2 minutes &nbsp;·&nbsp; Cancel anytime
        </p>

        {/* Dashboard Preview — browser mockup with "Sample Data" label */}
        <div className="slide-up stagger-4 relative w-full max-w-5xl mx-auto" aria-label="AuditPro dashboard preview showing sample data">
          {/* Sample data banner */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: '#1e1b4b', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', whiteSpace: 'nowrap' }}
            aria-label="This shows sample demo data, not your real data"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
            Sample Demo Data — Not Your Real Data
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(99,102,241,0.2)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 40px 100px rgba(0,0,0,0.7)',
              background: '#0a0c1e',
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-5 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              aria-hidden="true"
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <div className="flex-1 mx-6">
                <div
                  className="max-w-xs mx-auto text-center text-xs py-1 px-4 rounded-md"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}
                >
                  🔒 auditpro.app/dashboard
                </div>
              </div>
            </div>

            {/* Mock dashboard layout */}
            <div className="flex" style={{ height: '320px' }}>
              {/* Sidebar */}
              <div className="w-40 shrink-0 flex flex-col p-3 gap-1" style={{ borderRight: '1px solid rgba(255,255,255,0.07)', background: '#070918' }} aria-hidden="true">
                <div className="flex items-center gap-2 px-2 py-1.5 mb-3">
                  <div className="w-5 h-5 rounded" style={{ background: 'linear-gradient(135deg, #6366f1,#8b5cf6)' }} />
                  <span className="text-xs font-bold text-white">AuditPro</span>
                </div>
                {[
                  { label: 'Dashboard', active: true },
                  { label: 'Clients', active: false },
                  { label: 'Documents', active: false },
                  { label: 'Tax Engine', active: false },
                  { label: 'Portfolios', active: false },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs"
                    style={{
                      background: item.active ? 'rgba(99,102,241,0.15)' : 'transparent',
                      color: item.active ? '#c7d2fe' : '#374151',
                      fontWeight: item.active ? 600 : 400,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.active ? '#6366f1' : '#374151' }} />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 overflow-hidden" aria-hidden="true">
                <div className="text-xs font-semibold text-white mb-4">Good morning, CA Priya 👋</div>

                {/* Stat cards */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Active Clients', val: '248', color: '#6366f1', bar: 72 },
                    { label: 'Pending Returns', val: '12', color: '#f59e0b', bar: 25 },
                    { label: 'Docs Parsed', val: '1,847', color: '#10b981', bar: 88 },
                    { label: 'Total Assets', val: '₹42Cr', color: '#8b5cf6', bar: 60 },
                  ].map(s => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderTop: `2px solid ${s.color}`,
                      }}
                    >
                      <div className="text-base font-bold text-white mb-0.5">{s.val}</div>
                      <div className="text-[9px] mb-2" style={{ color: '#374151' }}>{s.label}</div>
                      <div className="h-0.5 rounded-full" style={{ background: `${s.color}25` }}>
                        <div className="h-0.5 rounded-full" style={{ width: `${s.bar}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#374151' }}>Monthly Revenue</div>
                    <div className="flex items-end gap-1 h-12">
                      {[35, 52, 41, 78, 58, 85, 67, 91, 73, 96, 82, 100].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${h}%`,
                            background: i >= 10 ? 'linear-gradient(to top, #6366f1, #818cf8)' : 'rgba(99,102,241,0.2)',
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => (
                        <span key={m} className="text-[7px] flex-1 text-center" style={{ color: '#1e293b' }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#374151' }}>Recent Activity</div>
                    {[
                      { text: 'Form 16 parsed — Ravi S.', color: '#10b981' },
                      { text: 'ITR-2 ready — Priya N.', color: '#6366f1' },
                      { text: 'Adv. tax due in 8 days', color: '#f59e0b' },
                    ].map((a, i) => (
                      <div key={i} className="flex items-start gap-1.5 mb-1.5">
                        <div className="w-1 h-1 rounded-full mt-1 shrink-0" style={{ background: a.color }} />
                        <span className="text-[9px] leading-tight" style={{ color: '#374151' }}>{a.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow reflection */}
          <div
            className="absolute inset-x-16 -bottom-6 h-12 blur-2xl"
            style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), transparent)' }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════ */}
      <section id="stats" aria-label="Key metrics and trust signals" className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-strong rounded-2xl p-6 text-center"
                style={{ borderTop: `2px solid ${s.color}` }}
              >
                <div
                  className="text-3xl font-extrabold mb-1"
                  style={{ color: s.color, letterSpacing: '-0.025em' }}
                  aria-label={`${s.value} ${s.label}`}
                >
                  {s.value}
                </div>
                <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
                <div className="text-xs leading-snug" style={{ color: '#374151' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════ */}
      <section id="how-it-works" aria-label="How AuditPro works" className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              From Document to Filed ITR<br />in Three Steps
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#64748b' }}>
              No manual data entry. No spreadsheets. No missed deductions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }}
              aria-hidden="true"
            />
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className="card rounded-2xl p-7 relative"
                style={{ borderTop: `2px solid ${step.color}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white mb-5"
                  style={{ background: `linear-gradient(135deg, ${step.color}30, ${step.color}15)`, border: `1px solid ${step.color}40`, color: step.color }}
                  aria-hidden="true"
                >
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</p>
                {i < howItWorks.length - 1 && (
                  <div
                    className="hidden md:flex absolute -right-3 top-12 w-6 h-6 rounded-full items-center justify-center z-10"
                    style={{ background: '#0a0c1e', border: '1px solid rgba(99,102,241,0.3)' }}
                    aria-hidden="true"
                  >
                    <ArrowRight size={12} style={{ color: '#6366f1' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════════ */}
      <section id="features" aria-label="Product features" className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              Everything Your Practice Needs,<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Supercharged with AI
              </span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#64748b' }}>
              From document intake to ITR filing — manage the entire client workflow without switching tabs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ Icon, title, who, problem, outcome, accent, formats }) => (
              <article
                key={title}
                className="card card-hover rounded-2xl p-6 group"
                aria-label={`Feature: ${title} — ${who}`}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                  aria-hidden="true"
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>

                {/* Who it's for */}
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: accent }}
                >
                  {who}
                </div>

                <h3 className="text-base font-bold text-white mb-2">{title}</h3>

                {/* Problem → Outcome */}
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  <span style={{ color: '#64748b' }}>{problem}</span>
                  {' '}
                  <span style={{ color: '#94a3b8' }}>{outcome}</span>
                </p>

                {/* Format badges */}
                <div className="flex flex-wrap gap-1.5">
                  {formats.map(f => (
                    <span
                      key={f}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded"
                      style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}25` }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════ */}
      <section id="testimonials" aria-label="Customer testimonials" className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              Customer Reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              CAs Love AuditPro
            </h2>
            <div className="flex justify-center gap-1 mb-2" aria-label="Average rating: 4.9 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" stroke="none" aria-hidden="true" />
              ))}
            </div>
            <p className="text-sm" style={{ color: '#374151' }}>4.9/5 from 2,400+ reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="card rounded-2xl p-6 flex flex-col"
                aria-label={`Testimonial from ${t.name}, ${t.title}`}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#fbbf24" stroke="none" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="flex-1 text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}60, ${t.color}30)`, border: `1px solid ${t.color}40` }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs" style={{ color: '#374151' }}>{t.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#1e293b' }}>
                      {t.location} &nbsp;·&nbsp; {t.clients}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════ */}
      <section id="pricing" aria-label="Pricing plans" className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: '#64748b' }}>
              No hidden fees. No per-ITR charges. Scale as your practice grows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className="card rounded-2xl p-7 relative"
                style={plan.highlight ? {
                  border: '1px solid rgba(99,102,241,0.4)',
                  background: 'linear-gradient(160deg, #0f1232 0%, #0d1025 100%)',
                  boxShadow: '0 0 0 1px rgba(99,102,241,0.2), 0 20px 60px rgba(99,102,241,0.2)',
                } : {}}
                aria-label={`${plan.name} plan: ${plan.price}`}
              >
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', whiteSpace: 'nowrap' }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs mb-5" style={{ color: '#374151' }}>{plan.desc}</p>
                  <div className="flex items-end gap-2">
                    <span
                      className="text-4xl font-extrabold text-white"
                      style={{ letterSpacing: '-0.03em' }}
                      aria-label={`Price: ${plan.price}`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm mb-1.5" style={{ color: '#374151' }}>/ {plan.period}</span>
                    )}
                  </div>
                </div>

                <Link
                  href={plan.href}
                  className={plan.highlight ? 'btn-primary w-full justify-center mb-7' : 'btn-ghost w-full justify-center mb-7'}
                  style={{ display: 'flex' }}
                  aria-label={`${plan.cta} — ${plan.name} plan`}
                >
                  {plan.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>

                <ul className="space-y-2.5" aria-label={`${plan.name} plan features`}>
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#64748b' }}>
                      <Check
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: plan.highlight ? '#6366f1' : '#374151' }}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-8" style={{ color: '#1e293b' }}>
            All plans include a 14-day free trial &nbsp;·&nbsp; No credit card required &nbsp;·&nbsp;
            GST invoice provided for Indian firms
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════ */}
      <section aria-label="Final call to action" className="py-20 px-6 md:px-12">
        <div
          className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative text-center"
          style={{
            background: 'linear-gradient(135deg, #1a1640 0%, #221d5c 50%, #1a1640 100%)',
            border: '1px solid rgba(99,102,241,0.3)',
            boxShadow: '0 20px 80px rgba(99,102,241,0.2)',
          }}
        >
          <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
          <div className="relative px-10 py-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}
            >
              <span aria-hidden="true">🚀</span>
              Join 10,000+ CA firms already using AuditPro
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Ready to Transform Your CA Practice?
            </h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: '#818cf8' }}>
              Start free today. No setup fees, no credit card, no commitment.
              Your first 10 clients and 20 documents are always free.
            </p>
            <Link
              href="/dashboard"
              id="footer-cta"
              className="btn-primary text-base px-10 py-4 inline-flex"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
              aria-label="Start for free — no credit card required"
            >
              Start Free — No Card Needed
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="text-xs mt-4" style={{ color: '#312e81' }}>
              Setup in 2 minutes &nbsp;·&nbsp; ICAI-compliant &nbsp;·&nbsp; Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════ */}
      <footer
        role="contentinfo"
        className="px-6 md:px-12 pt-14 pb-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="2" width="6" height="8" rx="1.5" fill="white" fillOpacity="0.9"/>
                    <rect x="10" y="2" width="6" height="4" rx="1.5" fill="white" fillOpacity="0.6"/>
                    <rect x="10" y="8" width="6" height="8" rx="1.5" fill="white" fillOpacity="0.9"/>
                    <rect x="2" y="12" width="6" height="4" rx="1.5" fill="white" fillOpacity="0.6"/>
                  </svg>
                </div>
                <span className="font-extrabold text-white tracking-tight">
                  Audit<span style={{ color: '#818cf8' }}>Pro</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#374151' }}>
                India&apos;s AI-powered CA portal. Trusted by 10,000+ chartered accountants
                for faster, smarter ITR filing.
              </p>
              {/* Social links */}
              <div className="flex gap-3" aria-label="Social media links">
                <a
                  href="https://twitter.com/auditpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  aria-label="AuditPro on Twitter"
                >
                  <Twitter size={14} style={{ color: '#64748b' }} aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com/company/auditpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  aria-label="AuditPro on LinkedIn"
                >
                  <Linkedin size={14} style={{ color: '#64748b' }} aria-hidden="true" />
                </a>
                <a
                  href="mailto:support@auditpro.app"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  aria-label="Email AuditPro support"
                >
                  <Mail size={14} style={{ color: '#64748b' }} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <nav key={category} aria-label={`${category} links`}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#1e293b' }}>
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: '#374151' }}
                        aria-label={link}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Support contact */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 py-5 px-6 rounded-xl mb-8"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div>
              <p className="text-sm font-semibold text-white">Need help getting started?</p>
              <p className="text-xs mt-0.5" style={{ color: '#374151' }}>Our CA success team responds within 2 hours on working days.</p>
            </div>
            <div className="flex gap-3">
              <a
                href="mailto:support@auditpro.app"
                className="btn-ghost text-xs py-2 px-4 flex items-center gap-1.5"
                aria-label="Email support at support@auditpro.app"
              >
                <Mail size={13} aria-hidden="true" />
                support@auditpro.app
              </a>
              <a
                href="tel:+918001234567"
                className="btn-ghost text-xs py-2 px-4 flex items-center gap-1.5"
                aria-label="Call support at +91 800 123 4567"
              >
                <Phone size={13} aria-hidden="true" />
                +91 800 123 4567
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <p className="text-xs" style={{ color: '#1e293b' }}>
              © 2026 AuditPro Technologies Pvt. Ltd. &nbsp;·&nbsp; GSTIN: 27AABCT1234Z1Z5 &nbsp;·&nbsp; CIN: U74999MH2024PTC123456
            </p>
            <div className="flex items-center gap-5 text-xs" style={{ color: '#1e293b' }}>
              <a href="#" className="hover:text-white transition-colors" aria-label="Privacy Policy">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Terms of Service">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Security information">Security</a>
              <a href="#" className="hover:text-white transition-colors" aria-label="GDPR compliance information">GDPR</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════
          DEMO MODAL (hidden by default)
      ════════════════════════════════════════════════════ */}
      <div
        id="demo-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Product demo video"
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden') }}
      >
        <div
          className="relative w-full max-w-3xl rounded-2xl overflow-hidden"
          style={{ background: '#0d1025', border: '1px solid rgba(99,102,241,0.3)' }}
        >
          <button
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onClick={() => document.getElementById('demo-modal')?.classList.add('hidden')}
            aria-label="Close demo video"
          >
            ✕
          </button>
          <div className="aspect-video flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.05)' }}>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(99,102,241,0.2)', border: '2px solid rgba(99,102,241,0.4)' }}
              >
                <Play size={32} fill="#6366f1" stroke="none" aria-hidden="true" />
              </div>
              <p className="text-white font-semibold">AuditPro 2-Minute Demo</p>
              <p className="text-sm mt-1" style={{ color: '#374151' }}>Video coming soon — book a live demo below</p>
              <a
                href="mailto:demo@auditpro.app"
                className="btn-primary text-sm mt-5 inline-flex"
                aria-label="Book a live demo via email"
              >
                Book a Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
