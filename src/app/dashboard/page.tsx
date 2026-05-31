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

export default async function DashboardPage() {
  const stats = await getStats()

  const statCards = [
    {
      label: 'Active Clients',
      value: stats.clientCount,
      icon: Users,
      color: 'from-indigo-500 to-violet-600',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
    },
    {
      label: 'Pending Returns',
      value: stats.pendingReturns,
      icon: FileText,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
    },
    {
      label: 'Documents Parsed',
      value: stats.docCount,
      icon: ScanLine,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
    },
    {
      label: 'Total Assets',
      value: '₹0',
      icon: IndianRupee,
      color: 'from-rose-500 to-pink-600',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
    },
  ]

  const quickActions = [
    {
      title: 'Add New Client',
      desc: 'Onboard a new taxpayer client',
      icon: FilePlus2,
      href: '/dashboard/clients/new',
      color: 'bg-indigo-600 hover:bg-indigo-700',
    },
    {
      title: 'Upload Document',
      desc: 'PDF, Excel, Image, Docs',
      icon: FileText,
      href: '/dashboard/documents',
      color: 'bg-violet-600 hover:bg-violet-700',
    },
    {
      title: 'Compute Tax',
      desc: 'Run tax engine for client',
      icon: Calculator,
      href: '/dashboard/tax',
      color: 'bg-amber-600 hover:bg-amber-700',
    },
    {
      title: 'View Portfolios',
      desc: 'Stocks, MF, Crypto & more',
      icon: TrendingUp,
      href: '/dashboard/portfolio',
      color: 'bg-emerald-600 hover:bg-emerald-700',
    },
    {
      title: 'Manage Accounts',
      desc: 'Bank, Demat, Trading',
      icon: Building2,
      href: '/dashboard/accounts',
      color: 'bg-sky-600 hover:bg-sky-700',
    },
    {
      title: 'Generate Report',
      desc: 'Export CA summary as PDF',
      icon: BarChart3,
      href: '/dashboard/reports',
      color: 'bg-rose-600 hover:bg-rose-700',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Good evening, CA</h1>
        <p className="text-slate-500 mt-1">Here&apos;s your financial overview for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, bg, text }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon size={20} className={text} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(({ title, desc, icon: Icon, href, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-xl ${color} text-white flex items-center justify-center shrink-0 transition-all`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 text-sm">{title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Clients section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Clients</h2>
          <Link href="/dashboard/clients" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          {stats.clientCount === 0 ? (
            <div className="text-center py-8">
              <Users size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">No clients yet.</p>
              <Link
                href="/dashboard/clients/new"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
              >
                <FilePlus2 size={16} /> Add your first client
              </Link>
            </div>
          ) : (
            <p className="text-slate-500 text-sm text-center py-4">
              You have {stats.clientCount} client{stats.clientCount > 1 ? 's' : ''}. &nbsp;
              <Link href="/dashboard/clients" className="text-indigo-600 hover:underline">View all →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
