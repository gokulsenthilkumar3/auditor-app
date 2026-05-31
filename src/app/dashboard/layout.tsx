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
    <div className="flex min-h-screen bg-[#f1f4f9]">
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
    <aside className="w-64 shrink-0 flex flex-col h-screen sticky top-0 bg-[#0c1220]">
      {/* Logo */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-base shadow-lg shadow-indigo-900/40">
            🧾
          </div>
          <div>
            <p className="font-bold text-white text-sm tracking-tight">Auditor App</p>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">CA Portal</p>
          </div>
        </div>
      </div>

      {/* CA Profile chip */}
      <div className="mx-3 mb-2">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
            CA
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold leading-tight truncate">Admin User</p>
            <p className="text-slate-500 text-[10px] leading-tight">Chartered Accountant</p>
          </div>
          <Sparkles size={12} className="text-indigo-400 shrink-0 ml-auto" />
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-600 px-3 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon, exact }) => {
                const active = isActive(href, exact)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                      active
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-300 rounded-r-full" />
                    )}
                    <Icon size={16} className={active ? 'text-indigo-200' : 'text-slate-500 group-hover:text-slate-300'} />
                    <span className="flex-1">{label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-white/5 space-y-0.5">
        <Link
          href="/dashboard/notifications"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all relative"
        >
          <Bell size={16} className="text-slate-500" />
          <span>Notifications</span>
          <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all"
        >
          <Settings size={16} className="text-slate-500" />
          <span>Settings</span>
        </Link>
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
