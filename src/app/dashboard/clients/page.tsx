import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'
import { Users, UserPlus, Search, FileText, ArrowRight } from 'lucide-react'

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

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 mt-1 text-sm">
            {clients.length} taxpayer{clients.length !== 1 ? 's' : ''} under your management
          </p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm"
        >
          <UserPlus size={16} />
          Add Client
        </Link>
      </div>

      {clients.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">No clients yet</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
            Start by onboarding your first taxpayer client to manage their tax filings and investments.
          </p>
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition"
          >
            <UserPlus size={16} />
            Add your first client
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">
                  Client
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">
                  PAN
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">
                  Phone
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">
                  Documents
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">
                  Returns
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">
                  Added
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {client.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{client.name}</div>
                        <div className="text-xs text-slate-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {client.pan ? (
                      <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {client.pan}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {client.phone || <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <FileText size={14} className="text-slate-400" />
                      {client._count.documents}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {client._count.taxReturns}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {format(new Date(client.createdAt), 'dd MMM yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="flex items-center gap-1 text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity hover:text-indigo-800"
                    >
                      View <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
