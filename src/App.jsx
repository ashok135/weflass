import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import {
  Search,
  Target,
  Share2,
  FileText,
  Layout,
  Palette,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Layers,
  Users,
  Zap,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  MessageCircle,
  ShoppingBag,
  Home,
  GraduationCap,
  Stethoscope,
  UtensilsCrossed,
  Cpu,
  Briefcase,
  Store,
  Check,
  Sliders,
  ArrowUpRight,
  Activity,
  Award,
} from 'lucide-react'

// --- 7 DISCIPLINE CAPABILITIES (VERBATIM CLIENT DATA) ---
const SERVICES_DATA = [
  {
    id: 'ppc',
    num: '01',
    title: 'Paid Advertising (PPC)',
    short: 'Paid Acquisition',
    tag: 'PPC & Performance',
    desc: 'Google Ads, Meta Ads, LinkedIn Ads, and YouTube campaigns focused on lowering acquisition costs and maximizing return on ad spend.',
    deliverables: [
      'Google Search, Shopping & Performance Max',
      'Meta (Instagram & FB) Dynamic Creative Testing',
      'High-Intent LinkedIn B2B Account Funnels',
      'Server-Side CAPI Tracking & Fraud Click Filtering',
    ],
    kpi: '4.8x Average Return on Ad Spend (ROAS)',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    iconColor: 'bg-blue-600',
    icon: Target,
    image: '/hero-growth.jpg',
  },
  {
    id: 'seo',
    num: '02',
    title: 'Search Engine Optimization (SEO)',
    short: 'Organic Search',
    tag: 'Organic Dominance',
    desc: 'Technical audits, keyword strategy, content optimization, and link building to improve organic visibility and sustained traffic.',
    deliverables: [
      'Core Web Vitals & Deep Technical Site Audits',
      'High-Intent Commercial Keyword Mapping',
      'Semantic Content Optimization & Schema Markup',
      'Authority Backlink Building & Digital PR',
    ],
    kpi: '+240% Organic Traffic Growth',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    iconColor: 'bg-emerald-600',
    icon: Search,
    hasTicker: true,
  },
  {
    id: 'web',
    num: '03',
    title: 'Web Design & Development',
    short: 'Web Engineering',
    tag: 'Digital Architecture',
    desc: 'High-converting landing pages, e-commerce stores, and custom websites designed for speed, user experience, and measurable conversions.',
    deliverables: [
      'Next.js & Vite High-Performance Frontends',
      'Mobile-First CRO Funnel Architectures',
      'Sub-Second Page Load Speed Optimization',
      'Shopify & Custom E-Commerce Integrations',
    ],
    kpi: '0.38s Core Web Vitals LCP Benchmark',
    badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    iconColor: 'bg-cyan-600',
    icon: Layout,
    image: '/bento-web.jpg',
  },
  {
    id: 'analytics',
    num: '04',
    title: 'Analytics & Conversion Optimization',
    short: 'Analytics & CRO',
    tag: 'Intelligence & Funnel Science',
    desc: 'Dashboards, A/B testing, and funnel analysis to turn data into actionable, profitable decisions and eliminate revenue drop-offs.',
    deliverables: [
      'GA4 & Server-Side Event Attribution Setup',
      'Live 24/7 Client Executive Dashboards',
      'Friction & Heatmap User Behavior Audits',
      'Multivariate A/B Testing Pipelines',
    ],
    kpi: '+45% Full-Funnel Conversion Lift',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    iconColor: 'bg-indigo-600',
    icon: BarChart3,
    hasCroSimulator: true,
  },
  {
    id: 'social',
    num: '05',
    title: 'Social Media Marketing',
    short: 'Social Media',
    tag: 'Community & Organic',
    desc: 'Organic and paid social strategies that build brand presence, engage audiences, and drive real community growth across platforms.',
    deliverables: [
      'Viral Short-Form Reels & Video Direction',
      'Multi-Platform Editorial Publishing Calendars',
      'Active Community Moderation & Outreach',
      'Targeted Creator & Influencer Collaborations',
    ],
    kpi: '+320% Social Engagement Surge',
    badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
    iconColor: 'bg-sky-600',
    icon: Share2,
    image: '/hero-growth.jpg',
  },
  {
    id: 'content',
    num: '06',
    title: 'Content Marketing',
    short: 'Content & Editorial',
    tag: 'Editorial Authority',
    desc: 'Blog posts, case studies, whitepapers, and video scripts crafted to attract, educate, and convert your ideal customers.',
    deliverables: [
      'High-Authority SEO Topic Cluster Strategy',
      'B2B Customer Case Study Storytelling',
      'High-Conversion Video & Reel Scripts',
      'Downloadable Whitepapers & Industry Guides',
    ],
    kpi: '3.4x Longer On-Page Session Duration',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    iconColor: 'bg-amber-600',
    icon: FileText,
    image: '/campaign-hub.jpg',
  },
  {
    id: 'branding',
    num: '07',
    title: 'Branding & Creative',
    short: 'Branding & Creative',
    tag: 'Brand Identity',
    desc: 'Brand identity, messaging frameworks, and visual assets that make your business memorable and trustworthy in crowded markets.',
    deliverables: [
      'Logo Systems & Complete Brand Guidelines',
      'Strategic Value Proposition Messaging',
      'High-CTR Performance Ad Creative Assets',
      'Omnichannel Visual Identity Libraries',
    ],
    kpi: '+62% Creative Click-Through Lift',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    iconColor: 'bg-rose-600',
    icon: Palette,
    image: '/bento-creative.jpg',
  },
]

// SERP Ticker Items
const SERP_TICKER_ITEMS = [
  { keyword: 'SEO Agency Puducherry', rank: '#1', volume: '1,800/mo', intent: 'Commercial' },
  { keyword: 'D2C Meta Ads Agency India', rank: '#1', volume: '3,400/mo', intent: 'High-Intent' },
  { keyword: 'High-Ticket B2B Funnels', rank: '#2', volume: '2,100/mo', intent: 'Commercial' },
  { keyword: 'PPC Conversion Specialist', rank: '#1', volume: '4,200/mo', intent: 'Transactional' },
  { keyword: 'Real Estate Lead Generation', rank: '#1', volume: '2,900/mo', intent: 'Transactional' },
  { keyword: 'E-commerce CRO Audit', rank: '#2', volume: '3,800/mo', intent: 'Commercial' },
]

// Case Study Reel Cards
const REEL_CARDS = [
  {
    client: 'D2C Footwear',
    category: 'Paid Performance',
    headline: 'Scaling from ₹8L to ₹42L/Month at 5.2x ROAS',
    metric: '₹42L+ Net Revenue',
    badge: 'Meta & Google Ads',
  },
  {
    client: 'Luxury Villas Puducherry',
    category: 'Real Estate Growth',
    headline: 'Pre-Launch Sellout of 28 Villas in 45 Days',
    metric: '420 Qualified Buyers',
    badge: 'Paid Funnels & WhatsApp',
  },
  {
    client: 'B2B Enterprise SaaS',
    category: 'Enterprise Demand',
    headline: '180+ Enterprise Demo Calls with Zero Waste',
    metric: '₹1.8 Cr Pipeline',
    badge: 'LinkedIn & Content',
  },
  {
    client: 'Multi-Specialty Clinic',
    category: 'Healthcare & Clinics',
    headline: '450% Boost in Monthly Inbound Patient Bookings',
    metric: 'Local Dominance',
    badge: 'Local SEO & CRO',
  },
  {
    client: 'EdTech Accelerator',
    category: 'Web Architecture',
    headline: 'Sub-Second CRO Landing Page Transformation',
    metric: '+58% Conversion Rate',
    badge: 'Next.js & Analytics',
  },
]

// 5-Step Approach Framework
const APPROACH_STEPS = [
  {
    num: '01',
    name: 'Discover',
    tagline: 'Deep Business Immersion',
    desc: 'We learn your business, audience, competitors, and goals. We analyze where your past marketing succeeded or leaked revenue.',
  },
  {
    num: '02',
    name: 'Strategize',
    tagline: 'Tailored Growth Roadmap',
    desc: 'We build a tailored roadmap with clear KPIs and timelines. We avoid generic packages and allocate budget where it yields return.',
  },
  {
    num: '03',
    name: 'Execute',
    tagline: 'Precision Campaign Launch',
    desc: 'Specialists launch campaigns across channels that matter. Designers, copywriters, and media buyers push high-converting creative.',
  },
  {
    num: '04',
    name: 'Measure & Optimize',
    tagline: 'Continuous Daily Tuning',
    desc: 'We track performance continuously and refine for better results. We scale winning ad creatives, prune waste, and optimize bids.',
  },
  {
    num: '05',
    name: 'Report',
    tagline: 'Transparent Executive Clarity',
    desc: 'Honest, jargon-free reporting so you always know where your money goes. Live dashboards, transparent attribution, and direct contact.',
  },
]

// 5 Core Pillars
const WHY_US_PILLARS = [
  {
    num: '01',
    title: 'Results Over Vanity',
    desc: 'We care about leads, sales, and revenue — not just clicks, impressions, or vanity awards.',
    metric: 'Real Revenue',
  },
  {
    num: '02',
    title: 'Transparent Communication',
    desc: 'No hidden fees, no opaque dashboards. You know what we do, why we do it, and what it achieves.',
    metric: '100% Visibility',
  },
  {
    num: '03',
    title: 'Tailored Strategies',
    desc: 'Every business is unique. We craft custom plans aligned with your industry, budget, and growth phase.',
    metric: 'Zero Templates',
  },
  {
    num: '04',
    title: 'Integrated Expertise',
    desc: 'From SEO and PPC to content and code, our team covers every touchpoint of your digital presence.',
    metric: 'Full Spectrum',
  },
  {
    num: '05',
    title: 'Long-Term Partnership',
    desc: 'We succeed when you succeed. We work alongside you as an extension of your internal growth team.',
    metric: 'High Retention',
  },
]

// Industries We Serve
const INDUSTRIES = [
  { name: 'E-commerce & D2C', icon: ShoppingBag, desc: 'High-converting ad funnels, catalog scaling, and retention.' },
  { name: 'Real Estate & Builders', icon: Home, desc: 'High-ticket lead qualification, virtual tours, and local targeting.' },
  { name: 'Education & EdTech', icon: GraduationCap, desc: 'Student enrollment cycles, webinar funnels, and admission leads.' },
  { name: 'Healthcare & Clinics', icon: Stethoscope, desc: 'Patient trust acquisition, local SEO maps, and appointment pipelines.' },
  { name: 'Hospitality & Travel', icon: UtensilsCrossed, desc: 'Direct booking strategies, seasonal campaigns, and influencer buzz.' },
  { name: 'SaaS & Tech Startups', icon: Cpu, desc: 'CAC reduction, product-led inbound content, and B2B pipeline velocity.' },
  { name: 'Professional Services', icon: Briefcase, desc: 'Authority positioning, LinkedIn ABM, and consultation calls.' },
  { name: 'Local Businesses', icon: Store, desc: 'Google Map Pack ranking, local phone leads, and foot traffic.' },
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [croToggled, setCroToggled] = useState(true)
  const [monthlyBudget, setMonthlyBudget] = useState(150000)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    monthlyBudget: '₹1,00,000 - ₹3,00,000',
    serviceInterest: 'Paid Advertising (PPC)',
    message: '',
  })

  // Google Gemini-style Auto-Advancing Progress Bar (Pauses on hover/interaction)
  useEffect(() => {
    if (isPaused) return

    const interval = 50
    const duration = 4500 // 4.5 seconds per capability card
    const step = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveServiceIndex((curr) => (curr + 1) % SERVICES_DATA.length)
          return 0
        }
        return prev + step
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isPaused, activeServiceIndex])

  // ROI Calculator Math
  const estimatedClicks = Math.round(monthlyBudget / 22)
  const convRate = croToggled ? 0.046 : 0.021
  const estimatedLeads = Math.round(estimatedClicks * convRate)
  const estimatedRevenue = Math.round(monthlyBudget * (croToggled ? 4.8 : 2.2))

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#4F46E5', '#10B981', '#0F172A'],
    })
  }

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const selectService = (index) => {
    setActiveServiceIndex(index)
    setProgress(0)
  }

  const nextService = () => {
    const nextIdx = (activeServiceIndex + 1) % SERVICES_DATA.length
    selectService(nextIdx)
  }

  const prevService = () => {
    const prevIdx = (activeServiceIndex - 1 + SERVICES_DATA.length) % SERVICES_DATA.length
    selectService(prevIdx)
  }

  const currentService = SERVICES_DATA[activeServiceIndex]
  const CurrentIcon = currentService.icon

  return (
    <main className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 cold-grid-bg selection:bg-slate-900 selection:text-white">
      {/* 1. SIMPLE, COMPACT MINIMALIST HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('top')}
              className="text-xl font-black tracking-tight text-slate-950 font-heading flex items-center gap-1 cursor-pointer"
            >
              <span>WeFlass</span>
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
            </button>
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 pl-2 border-l border-slate-200">
              Puducherry
            </span>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <button onClick={() => scrollTo('capabilities')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Capabilities
            </button>
            <button onClick={() => scrollTo('reel')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Live Reel
            </button>
            <button onClick={() => scrollTo('approach')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Approach
            </button>
            <button onClick={() => scrollTo('why-us')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Why Us
            </button>
            <button onClick={() => scrollTo('calculator')} className="hover:text-blue-600 transition-colors cursor-pointer">
              Calculator
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-blue-600 transition-colors cursor-pointer">
              About
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:9487671057"
              className="text-xs font-mono font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+91 9487671057</span>
            </a>
            <button
              onClick={() => scrollTo('audit')}
              className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold tracking-wide uppercase transition-all shadow-xs cursor-pointer active:scale-98"
            >
              Claim Audit
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-6 py-4 space-y-2.5 shadow-xl text-xs font-bold text-slate-700">
            <button onClick={() => scrollTo('capabilities')} className="w-full text-left py-2 border-b border-slate-100 flex justify-between">
              <span>Capabilities (7 Services)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button onClick={() => scrollTo('reel')} className="w-full text-left py-2 border-b border-slate-100 flex justify-between">
              <span>Live Case Reel</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button onClick={() => scrollTo('approach')} className="w-full text-left py-2 border-b border-slate-100 flex justify-between">
              <span>5-Step Approach</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button onClick={() => scrollTo('calculator')} className="w-full text-left py-2 border-b border-slate-100 flex justify-between">
              <span>Growth Calculator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button onClick={() => scrollTo('about')} className="w-full text-left py-2 border-b border-slate-100 flex justify-between">
              <span>About WeFlass</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => scrollTo('audit')}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider text-center"
              >
                Claim Free Growth Audit
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. COMPACT, PUNCHY CINEMATIC HERO */}
      <section id="top" className="relative pt-10 pb-12 md:pt-14 md:pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-5 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>WEFLASS DIGITAL</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-600 font-bold">GROWTH AGENCY</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-mono">PUDUCHERRY</span>
          </div>

          {/* 2-Line Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 font-heading leading-[1.1]">
            Turn Online Attention Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
              Measurable Growth.
            </span>
          </h1>

          {/* Thesis */}
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            WeFlass combines <strong className="text-slate-900 font-bold">strategy</strong>,{' '}
            <strong className="text-slate-900 font-bold">creativity</strong>, and{' '}
            <strong className="text-slate-900 font-bold">data</strong> to build marketing that reaches{' '}
            <span className="text-blue-600 font-semibold underline decoration-blue-200 underline-offset-4">the right audience</span>, at{' '}
            <span className="text-indigo-600 font-semibold underline decoration-indigo-200 underline-offset-4">the right moment</span>, with{' '}
            <span className="text-emerald-600 font-semibold underline decoration-emerald-200 underline-offset-4">the right message</span>.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            From startups finding their first customers to established businesses scaling into new markets,
            we treat every client’s goals as our own.
          </p>

          {/* CTAs */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => scrollTo('audit')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Book Free Growth Audit</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </button>

            <button
              onClick={() => scrollTo('capabilities')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Capabilities</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Compact Proof Numbers */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left border-t border-slate-200/80">
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-slate-950 font-heading">4.8x</div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Average ROAS</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-slate-950 font-heading">₹12 Cr+</div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Managed Ad Spend</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-slate-950 font-heading">+240%</div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Organic SEO Lift</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-slate-950 font-heading">98%</div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GEMINI-STYLE CAPABILITIES SHOWCASE: ONLY ONE CARD IS REVEALED ON THE RIGHT */}
      {/* Clean, compact, native, zero scroll-traps or broken spacers */}
      <section
        id="capabilities"
        className="py-14 md:py-18 max-w-7xl mx-auto px-6 border-t border-slate-200/70"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT COLUMN: 7 DISCIPLINE SELECTORS WITH LIVE FILLING PROGRESS BAR */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-blue-200">
                What We Do • 7 Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading tracking-tight leading-tight">
                Engineered For Direct Commercial Impact.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Select or watch each capability reveal. Each channel is synchronized to turn traffic into compounding revenue.
              </p>
            </div>

            {/* Interactive 7-Discipline Navigation Tabs with Live Progress Indicator */}
            <div className="p-2 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
              {SERVICES_DATA.map((s, idx) => {
                const isActive = activeServiceIndex === idx
                return (
                  <button
                    key={s.id}
                    onClick={() => selectService(idx)}
                    className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs font-bold transition-all relative overflow-hidden cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {/* Gemini-style progress bar filling along the bottom of the active tab */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      ></div>
                    )}
                    <div className="flex items-center gap-2.5">
                      <span className={`font-mono text-[11px] ${isActive ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                        {s.num}
                      </span>
                      <span>{s.title}</span>
                    </div>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Quick Inquire Action */}
            <div className="p-3.5 rounded-2xl bg-[#F1F5F9] border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Capability Focus</div>
                <div className="text-xs font-mono font-bold text-slate-800">
                  {currentService.short} • <span className="text-blue-600">{currentService.kpi}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, serviceInterest: currentService.title }))
                  scrollTo('audit')
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: ONLY ONE CARD IS REVEALED IN THE FRAME (GEMINI STYLE) */}
          <div className="lg:col-span-7">
            <div
              key={currentService.id}
              className="animate-card-reveal p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-950/5 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${currentService.iconColor} text-white flex items-center justify-center shadow-xs`}>
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Discipline {currentService.num} of 07
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-heading">
                      {currentService.title}
                    </h3>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${currentService.badgeColor}`}>
                  {currentService.tag}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                {currentService.desc}
              </p>

              {/* Visual Showcase */}
              {currentService.image && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-4 bg-slate-950 h-48 sm:h-52 group/pan">
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className="w-full h-[140%] object-cover object-top pan-image-on-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <div className="w-full flex items-center justify-between text-white">
                      <div className="text-xs font-mono font-bold text-emerald-400">
                        {currentService.kpi}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono">
                        Hover to explore ↓
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO SERP Ticker */}
              {currentService.hasTicker && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-4 relative overflow-hidden h-40">
                  <div className="absolute top-2 right-3 z-10 px-2 py-0.5 rounded bg-white text-[10px] font-mono font-bold text-slate-500 border border-slate-200">
                    Live SERP Feed
                  </div>
                  <div className="vertical-ticker space-y-2">
                    {[...SERP_TICKER_ITEMS, ...SERP_TICKER_ITEMS].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900">{item.keyword}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.volume} • {item.intent}</div>
                        </div>
                        <div className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-100">
                          {item.rank}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics CRO Simulator */}
              {currentService.hasCroSimulator && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-indigo-100 mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600 font-mono text-[11px]">Funnel Conversion Model:</span>
                    <button
                      onClick={() => setCroToggled(!croToggled)}
                      className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold cursor-pointer hover:bg-indigo-700"
                    >
                      {croToggled ? 'View Baseline' : 'Activate WeFlass CRO'}
                    </button>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Visitor-to-Lead Conversion</span>
                      <span className="font-bold text-slate-950 font-mono">
                        {croToggled ? '4.8% (WeFlass CRO)' : '2.1% (Standard Baseline)'}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          croToggled ? 'w-[88%] bg-indigo-600' : 'w-[38%] bg-slate-400'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Deliverables Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-100">
                {currentService.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* Card Controls */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevService}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                    title="Previous Card"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextService}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                    title="Next Card"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 pl-1">
                    {activeServiceIndex + 1} / {SERVICES_DATA.length}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, serviceInterest: currentService.title }))
                    scrollTo('audit')
                  }}
                  className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire For This Discipline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPACT LIVE CASE STUDY REEL */}
      <section id="reel" className="py-12 bg-white border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              Verified Case Milestones
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
              Real Impact Across Industries.
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400">
            *Hover any card to inspect verified commercial metrics.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="marquee-track flex gap-4 px-6">
            {[...REEL_CARDS, ...REEL_CARDS].map((c, i) => (
              <div
                key={i}
                className="w-[300px] sm:w-[350px] shrink-0 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                      {c.category}
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      {c.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">{c.client}</div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                    {c.headline}
                  </h4>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Milestone</div>
                    <div className="text-lg font-black text-slate-950 font-heading">{c.metric}</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-950 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR 5-STEP APPROACH */}
      <section id="approach" className="py-12 md:py-16 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            Our 5-Step Approach
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading tracking-tight">
            How We Build Compounding Growth.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            A systematic, disciplined framework designed to turn marketing from an expense into your most profitable sales channel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {APPROACH_STEPS.map((step) => (
            <div
              key={step.num}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-400 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="text-2xl font-black text-slate-300 font-mono group-hover:text-blue-600 transition-colors mb-1.5">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-slate-950 font-heading mb-0.5">{step.name}</h3>
                <div className="text-[10px] font-mono font-semibold text-blue-600 mb-1.5">{step.tagline}</div>
                <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Phase {step.num}</span>
                <Check className="w-3 h-3 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE WEFLASS */}
      <section id="why-us" className="py-12 md:py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-white/15">
              Why Choose WeFlass
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
              Built on Transparency. Driven by Results.
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              We reject vanity metrics, generic agency retainers, and opaque monthly reports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {WHY_US_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-blue-400 mb-1.5">{pillar.metric}</div>
                  <h3 className="text-sm font-bold text-white font-heading mb-1">{pillar.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between items-center">
                  <span>Pillar {pillar.num}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPACT ROI CALCULATOR */}
      <section id="calculator" className="py-12 md:py-16 max-w-7xl mx-auto px-6">
        <div className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 6 cols */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider border border-blue-200">
                Interactive ROI Estimator
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-heading">
                Calculate Your Potential Return.
              </h2>
              <p className="text-slate-600 text-xs">
                Slide your anticipated monthly ad budget to project estimated qualified leads and revenue based on WeFlass performance benchmarks.
              </p>

              {/* Slider */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 uppercase font-mono">Monthly Budget:</span>
                  <span className="text-lg font-black text-blue-600 font-mono">
                    ₹{monthlyBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>₹25,000</span>
                  <span>₹5,00,000</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">Include WeFlass CRO Funnel Tuning</div>
                  <div className="text-[10px] text-slate-500">+128% conversion velocity multiplier</div>
                </div>
                <button
                  onClick={() => setCroToggled(!croToggled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    croToggled ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                      croToggled ? 'left-6' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>

            {/* Right 6 cols */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3.5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                <span className="text-[10px] font-mono uppercase text-slate-400">Projected Monthly Output</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  {croToggled ? '4.8x Active ROAS' : '2.2x Baseline'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Estimated Target Clicks</div>
                  <div className="text-lg font-black font-heading mt-0.5">{estimatedClicks.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Qualified Leads / Orders</div>
                  <div className="text-lg font-black font-heading text-emerald-400 mt-0.5">
                    {estimatedLeads.toLocaleString('en-IN')}+
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Commercial Pipeline</div>
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 font-heading mt-0.5">
                  ₹{estimatedRevenue.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={() => scrollTo('audit')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer"
              >
                Inquire For Custom Growth Blueprint
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INDUSTRIES WE SERVE */}
      <section id="industries" className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              Industries We Serve
            </div>
            <h2 className="text-2xl font-black text-slate-950 font-heading tracking-tight">
              Tailored Sector Playbooks.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-slate-400 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-950 font-heading mb-0.5">{ind.name}</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
                  <div className="pt-2.5 mt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Sector 0{i + 1}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. ABOUT US: MISSION & VISION */}
      <section id="about" className="py-12 md:py-16 max-w-7xl mx-auto px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
                About WeFlass
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                Your Dedicated Growth Partner.
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                WeFlass is a digital marketing agency based in Puducherry, India. We help brands turn online attention
                into measurable growth through an uncompromising mix of strategy, creativity, and data engineering.
              </p>
              <div className="space-y-1 text-[11px] font-mono text-slate-400 pt-1">
                <div>Location: Puducherry, India</div>
                <div>Email: weflass.agency@gmail.com</div>
                <div>Phone: +91 9487671057</div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono uppercase font-bold text-blue-400">Our Mission</div>
                <h3 className="text-sm font-black text-white font-heading">Simple, Transparent, Results-Driven.</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  To make digital marketing simple, transparent, and results-driven, so every business can compete and grow online.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono uppercase font-bold text-emerald-400">Our Vision</div>
                <h3 className="text-sm font-black text-white font-heading">A Trusted Growth Partner.</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  To be a trusted growth partner for ambitious brands, known for honest reporting and long-term client relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COMPACT AUDIT FORM */}
      <section id="audit" className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center space-y-1.5 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider border border-blue-200">
              Claim Free Growth Audit
            </div>
            <h2 className="text-2xl font-black text-slate-950 font-heading">
              Ready to Scale Your Brand?
            </h2>
            <p className="text-slate-600 text-xs max-w-md mx-auto">
              Tell us about your business. We will analyze your digital footprint and present a custom roadmap — free with zero obligation.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-3xl bg-slate-50 border border-emerald-200 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-950 font-heading">Audit Request Received!</h3>
              <p className="text-slate-600 max-w-sm mx-auto text-xs leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our senior strategists are
                reviewing your request and will reach out within 24 hours.
              </p>
              <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href={`https://wa.me/919487671057?text=Hi%20WeFlass%2C%20I%20just%20submitted%20the%20audit%20form%20for%20${encodeURIComponent(
                    formData.website || formData.name
                  )}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 shadow-2xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Krishnan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-700">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 94876 71057"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-700">Website or Brand URL</label>
                  <input
                    type="text"
                    placeholder="e.g. www.yourbrand.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-700">Primary Discipline</label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
                  >
                    <option>Paid Advertising (PPC)</option>
                    <option>Search Engine Optimization (SEO)</option>
                    <option>Web Design & Development</option>
                    <option>Analytics & Conversion Optimization (CRO)</option>
                    <option>Social Media Marketing</option>
                    <option>Content Marketing</option>
                    <option>Branding & Creative</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-700">Monthly Ad Budget</label>
                  <select
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
                  >
                    <option>₹50,000 - ₹1,00,000</option>
                    <option>₹1,00,000 - ₹3,00,000</option>
                    <option>₹3,00,000 - ₹7,00,000</option>
                    <option>₹7,00,000 - ₹15,00,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-700">Growth Goals</label>
                <textarea
                  rows="2"
                  placeholder="Tell us what you want to achieve..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:outline-none text-xs text-slate-900"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Submit & Claim Free Audit
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 11. COMPACT AGENCY FOOTER */}
      <footer className="bg-slate-950 text-white pt-8 pb-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-slate-800">
            <div className="md:col-span-5 space-y-2">
              <div className="text-lg font-black tracking-tight text-white font-heading flex items-center gap-1">
                <span>WeFlass</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              </div>
              <p className="text-slate-400 text-xs max-w-sm">
                WeFlass is a digital marketing agency that helps brands turn online attention into measurable growth. Puducherry, India.
              </p>
              <div className="space-y-0.5 text-[11px] font-mono text-slate-400 pt-0.5">
                <div>Email: weflass.agency@gmail.com</div>
                <div>Direct: +91 9487671057</div>
                <div>Location: Puducherry, India</div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <div className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">Capabilities</div>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>Paid Advertising (PPC)</li>
                <li>Search Engine Optimization (SEO)</li>
                <li>Web Design & Development</li>
                <li>Analytics & CRO</li>
                <li>Social Media Marketing</li>
                <li>Content Marketing</li>
                <li>Branding & Creative</li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2">
              <div className="text-xs font-mono uppercase font-bold text-slate-300 tracking-wider">Fast Contact</div>
              <p className="text-xs text-slate-400">
                Connect directly with agency leadership for immediate consultation.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="tel:9487671057"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3 text-blue-400" />
                  <span>Call Direct</span>
                </a>
                <a
                  href="https://wa.me/919487671057"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
            <div>© {new Date().getFullYear()} WeFlass Digital Marketing Agency. All rights reserved.</div>
            <div className="flex gap-4">
              <span>Puducherry, India</span>
              <span>www.weflass.com</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
