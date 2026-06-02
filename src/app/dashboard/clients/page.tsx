import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'
import { Users, UserPlus, FileText, ArrowRight, TrendingUp } from 'lucide-react'

async function getClients() {
  try {
    const clients = await prisma.user.findMany({
      where: { role: 'TAXPAYER' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        pan: true,
        createdAt: true,
        _count: {
          select: {
            documents: true,
            taxReturns: true,
          },
        },
      },
    })
    return clients
  } catch {
    return []
  }
}

// Color palette for client avatars
const avatarColors = [
  { bg: 'rgba(99,102,241,0.2)',   color: '#818cf8' },
  { bg: 'rgba(16,185,129,0.2)',   color: '#34d399' },
  { bg: 'rgba(245,158,11,0.2)',   color: '#fbbf24' },
  { bg: 'rgba(239,68,68,0.2)',    color: '#f87171' },
  { bg: 'rgba(14,165,233,0.2)',   color: '#38bdf8' },
  { bg: 'rgba(139,92,246,0.2)',   color: '#a78bfa' },
]

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="p-7 fade-in" style={{ minHeight: '100vh', background: '#07091a' }}>
      
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Clients</h1>
          <p className="text-sm mt-1" style={{ color: '#4b5563' }}>
            {clients.length} taxpayer{clients.length !== 1 ? 's' : ''} under your management
          </p>
        </div>
        <Link href="/dashboard/clients/new" className="btn-primary text-sm">
          <UserPlus size={15} />
          Add Client
        </Link>
      </div>

      {/* ── Summary Chips ──────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {[
          { label: 'All Clients', count: clients.length, active: true },
          { label: 'Active', count: clients.length, active: false },
          { label: 'Pending ITR', count: 0, active: false },
        ].map(chip => (
          <button
            key={chip.label}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={chip.active
              ? { background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }
              : { background: 'rgba(255,255,255,0.04)', color: '#4b5563', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {chip.label}
            <span className="rounded-full px-1.5 py-0.5 text-[10px]"
              style={chip.active
                ? { background: 'rgba(99,102,241,0.3)', color: '#c7d2fe' }
                : { background: 'rgba(255,255,255,0.06)', color: '#374151' }
              }>
              {chip.count}
            </span>
          </button>
        ))}
      </div>

      {clients.length === 0 ? (
        /* Empty state */
        <div className="card rounded-2xl flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Users size={32} style={{ color: '#6366f1' }} />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">No clients yet</h2>
          <p className="text-sm text-center max-w-xs mb-8" style={{ color: '#4b5563' }}>
            Start by onboarding your first taxpayer client to manage their tax filings and investments.
          </p>
          <Link href="/dashboard/clients/new" className="btn-primary">
            <UserPlus size={15} /> Add your first client
          </Link>
        </div>
      ) : (
        <div className="card rounded-2xl overflow-hidden">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>PAN</th>
                <th>Phone</th>
                <th>Documents</th>
                <th>Returns</th>
                <th>Added</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => {
                const color = avatarColors[i % avatarColors.length]
                return (
                  <tr key={client.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ background: color.bg, color: color.color }}
                        >
                          {client.name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm">{client.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#374151' }}>{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {client.pan ? (
                        <span className="font-mono text-xs px-2 py-1 rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.07)' }}>
                          {client.pan}
                        </span>
                      ) : (
                        <span style={{ color: '#374151' }}>—</span>
                      )}
                    </td>
                    <td style={{ color: '#6b7280' }}>{client.phone || <span style={{ color: '#374151' }}>—</span>}</td>
                    <td>
                      <div className="flex items-center gap-1.5" style={{ color: '#6b7280' }}>
                        <FileText size={13} style={{ color: '#4b5563' }} />
                        <span>{client._count.documents}</span>
                      </div>
                    </td>
                    <td>
                      <span className="font-medium" style={{ color: '#6b7280' }}>{client._count.taxReturns}</span>
                    </td>
                    <td style={{ color: '#4b5563', fontSize: '11px' }}>
                      {format(new Date(client.createdAt), 'dd MMM yyyy')}
                    </td>
                    <td>
                      <Link
                        href={`/dashboard/clients/${client.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: '#6366f1' }}
                      >
                        View <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
