import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import {
  Users,
  FileText,
  ScanLine,
  IndianRupee,
  ArrowRight,
  TrendingUp,
  Calculator,
  Building2,
  BarChart3,
  FilePlus2,
  ArrowUpRight,
  Zap,
  Clock,
  CheckCircle2,
} from 'lucide-react'

async function getStats() {
  try {
    const [clientCount, docCount, returnCount] = await Promise.all([
      prisma.user.count({ where: { role: 'TAXPAYER' } }),
      prisma.document.count(),
      prisma.taxReturn.count({ where: { status: 'DRAFT' } }),
    ])
    return { clientCount, docCount, pendingReturns: returnCount }
  } catch {
    return { clientCount: 0, docCount: 0, pendingReturns: 0 }
  }
}

const recentActivity = [
  { icon: <CheckCircle2 size={14} className="text-emerald-400" />, text: 'Form 16 parsed for Ravi Shankar', time: '2 min ago', dot: 'dot-green' },
  { icon: <Clock size={14} className="text-amber-400" />,          text: 'ITR-2 review pending for Priya Nair', time: '18 min ago', dot: 'dot-amber' },
  { icon: <Zap size={14} className="text-indigo-400" />,           text: 'Capital gains computed for Arjun Mehta', time: '1 hr ago', dot: 'dot-green' },
  { icon: <FileText size={14} className="text-blue-400" />,        text: 'Bank statement uploaded — 3 files', time: '3 hrs ago', dot: 'dot-slate' },
]

export default async function DashboardPage() {
  const stats = await getStats()

  const statCards = [
    {
      label: 'Active Clients',
      value: stats.clientCount || 0,
      sub: '+2 this week',
      icon: Users,
      accent: '#6366f1',
      accentBg: 'rgba(99,102,241,0.12)',
      trend: '+8%',
      up: true,
    },
    {
      label: 'Pending Returns',
      value: stats.pendingReturns || 0,
      sub: 'Need attention',
      icon: FileText,
      accent: '#f59e0b',
      accentBg: 'rgba(245,158,11,0.12)',
      trend: '-3',
      up: false,
    },
    {
      label: 'Docs Parsed',
      value: stats.docCount || 0,
      sub: 'AI processed',
      icon: ScanLine,
      accent: '#10b981',
      accentBg: 'rgba(16,185,129,0.12)',
      trend: '+24%',
      up: true,
    },
    {
      label: 'Total Assets',
      value: '₹0',
      sub: 'Across all clients',
      icon: IndianRupee,
      accent: '#8b5cf6',
      accentBg: 'rgba(139,92,246,0.12)',
      trend: 'Track →',
      up: true,
    },
  ]

  const quickActions = [
    { title: 'Add New Client',    desc: 'Onboard a taxpayer',       icon: FilePlus2,  href: '/dashboard/clients/new', accent: '#6366f1' },
    { title: 'Upload Document',   desc: 'PDF, Excel, Image, Docs',  icon: FileText,   href: '/dashboard/documents',   accent: '#8b5cf6' },
    { title: 'Compute Tax',       desc: 'Run tax engine',           icon: Calculator, href: '/dashboard/tax',         accent: '#f59e0b' },
    { title: 'View Portfolios',   desc: 'Stocks, MF, Crypto & more',icon: TrendingUp, href: '/dashboard/portfolio',   accent: '#10b981' },
    { title: 'Manage Accounts',   desc: 'Bank, Demat, Trading',     icon: Building2,  href: '/dashboard/accounts',    accent: '#0ea5e9' },
    { title: 'Generate Report',   desc: 'Export CA summary as PDF', icon: BarChart3,  href: '/dashboard/reports',     accent: '#f43f5e' },
  ]

  const barData = [35, 50, 40, 75, 60, 88, 65, 80, 55, 92, 78, 100]
  const barLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  return (
    <div className="p-7 fade-in" style={{ minHeight: '100vh', background: '#07091a' }}>
      
      {/* ── Top Header ────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Good evening, CA 👋</h1>
          <p className="text-sm mt-1" style={{ color: '#4b5563' }}>
            Here's your financial overview — <span style={{ color: '#6366f1' }}>3 items need attention today</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
            AY 2025–26
          </div>
          <Link href="/dashboard/clients/new" className="btn-primary text-sm">
            <FilePlus2 size={14} />
            Add Client
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
        {statCards.map(({ label, value, sub, icon: Icon, accent, accentBg, trend, up }) => (
          <div key={label} className="card card-hover p-5 rounded-2xl relative overflow-hidden group">
            {/* subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accentBg }}>
                <Icon size={18} style={{ color: accent }} />
              </div>
              <span className="text-xs font-semibold flex items-center gap-0.5" style={{ color: up ? '#10b981' : '#f59e0b' }}>
                {up ? <ArrowUpRight size={12} /> : null}
                {trend}
              </span>
            </div>
            
            <div className="text-2xl font-extrabold text-white mb-0.5" style={{ letterSpacing: '-0.02em' }}>
              {value}
            </div>
            <div className="text-xs font-semibold text-white mb-0.5">{label}</div>
            <div className="text-xs" style={{ color: '#374151' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Main Content Grid ─────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-7">
        
        {/* Revenue Bar Chart */}
        <div className="col-span-2 card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-white">Revenue Overview</h2>
              <p className="text-xs mt-0.5" style={{ color: '#374151' }}>Monthly billing — FY 2025-26</p>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
              This Year ▾
            </div>
          </div>
          
          {/* Chart */}
          <div className="flex items-end gap-1.5 h-32 mb-3">
            {barData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar cursor-pointer">
                <div
                  className="w-full rounded-t-sm transition-all duration-200 group-hover/bar:opacity-100"
                  style={{
                    height: `${h}%`,
                    background: i === barData.length - 1
                      ? 'linear-gradient(to top, #6366f1, #8b5cf6)'
                      : 'rgba(99,102,241,0.2)',
                    opacity: i === barData.length - 1 ? 1 : 0.7,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {barLabels.map((l) => (
              <span key={l} className="text-[9px] flex-1 text-center" style={{ color: '#374151' }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-white">Recent Activity</h2>
            <span className="text-xs" style={{ color: '#4b5563' }}>Today</span>
          </div>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-snug" style={{ color: '#9ca3af' }}>{a.text}</p>
                  <p className="text-[10px] mt-1" style={{ color: '#374151' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/documents" className="mt-5 flex items-center gap-1 text-xs font-semibold" style={{ color: '#6366f1' }}>
            View all activity <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* ── Quick Actions ─────────────────────────────────── */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {quickActions.map(({ title, desc, icon: Icon, href, accent }) => (
            <Link
              key={href}
              href={href}
              className="card card-hover rounded-xl p-4 flex flex-col items-start gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${accent}18`, border: `1px solid ${accent}25` }}>
                <Icon size={16} style={{ color: accent }} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">{title}</div>
                <div className="text-[10px] mt-0.5 leading-tight" style={{ color: '#374151' }}>{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Recent Clients ────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Recent Clients</h2>
          <Link href="/dashboard/clients" className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#6366f1' }}>
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="card rounded-2xl overflow-hidden">
          {stats.clientCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Users size={26} style={{ color: '#374151' }} />
              </div>
              <p className="text-sm font-semibold text-white mb-1">No clients yet</p>
              <p className="text-xs mb-6" style={{ color: '#374151' }}>Start by adding your first client</p>
              <Link href="/dashboard/clients/new" className="btn-primary text-xs">
                <FilePlus2 size={13} /> Add your first client
              </Link>
            </div>
          ) : (
            <p className="text-sm text-center py-8" style={{ color: '#374151' }}>
              You have <span className="font-bold text-white">{stats.clientCount}</span> client{stats.clientCount > 1 ? 's' : ''}. &nbsp;
              <Link href="/dashboard/clients" style={{ color: '#6366f1' }} className="font-semibold hover:underline">View all →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
