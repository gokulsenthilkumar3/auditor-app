'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  Calculator,
  TrendingUp,
  Building2,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard',  href: '/dashboard',           icon: LayoutDashboard, exact: true },
      { label: 'Clients',    href: '/dashboard/clients',   icon: Users },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Documents',  href: '/dashboard/documents', icon: FileText },
      { label: 'Accounts',   href: '/dashboard/accounts',  icon: Building2 },
      { label: 'Portfolios', href: '/dashboard/portfolio', icon: TrendingUp },
    ],
  },
  {
    label: 'Tax & Reports',
    items: [
      { label: 'Tax Engine', href: '/dashboard/tax',       icon: Calculator },
      { label: 'Reports',    href: '/dashboard/reports',   icon: BarChart3 },
    ],
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#07091a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  )
}

function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  return (
    <aside
      className="w-[220px] shrink-0 flex flex-col h-screen sticky top-0"
      style={{
        background: '#0a0c1e',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ── Logo ─────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
            }}
          >
            🧾
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight tracking-tight">AuditPro</p>
            <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: '#4b5563' }}>CA Portal</p>
          </div>
        </div>
      </div>

      {/* ── CA Profile chip ───────────────────────────── */}
      <div className="px-3 mb-5">
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            CA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold leading-tight truncate">Admin User</p>
            <p className="text-[10px] leading-tight" style={{ color: '#4b5563' }}>Chartered Accountant</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" style={{ boxShadow: '0 0 6px #10b981' }} />
        </div>
      </div>

      {/* ── Nav Groups ───────────────────────────────── */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p
              className="text-[10px] font-bold tracking-widest uppercase px-3 mb-2"
              style={{ color: '#374151' }}
            >
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon, exact }) => {
                const active = isActive(href, exact)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`sidebar-nav-link ${active ? 'active' : ''}`}
                  >
                    <Icon
                      size={15}
                      className={active ? 'text-indigo-400' : 'text-slate-600'}
                      style={{ transition: 'color 0.15s' }}
                    />
                    <span className="flex-1 truncate">{label}</span>
                    {active && (
                      <ChevronRight size={12} className="text-indigo-500 shrink-0" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── AI Tip Banner ─────────────────────────────── */}
      <div className="px-3 mb-3">
        <div
          className="rounded-xl p-3"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.12))',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={12} className="text-indigo-400" />
            <span className="text-[11px] font-bold text-indigo-300">AI Insight</span>
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: '#6b7280' }}>
            3 clients have advance tax due in 12 days.
          </p>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────── */}
      <div
        className="px-3 py-3 space-y-0.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <Link
          href="/dashboard/notifications"
          className="sidebar-nav-link"
        >
          <Bell size={15} className="text-slate-600" />
          <span className="flex-1">Notifications</span>
          <span
            className="text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0"
            style={{ background: '#ef4444', color: 'white' }}
          >
            3
          </span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="sidebar-nav-link"
        >
          <Settings size={15} className="text-slate-600" />
          <span>Settings</span>
        </Link>
        <button
          className="sidebar-nav-link w-full text-left hover:!bg-red-500/10 hover:!text-red-400"
        >
          <LogOut size={15} className="text-slate-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
