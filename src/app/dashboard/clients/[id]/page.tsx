import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  CreditCard,
  FileText,
  Building2,
  TrendingUp,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react'

async function getClient(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
        portfolios: { orderBy: { createdAt: 'desc' } },
        documents: { orderBy: { createdAt: 'desc' }, take: 5 },
        taxReturns: { orderBy: { taxYear: 'desc' } },
      },
    })
  } catch {
    return null
  }
}

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  DONE: { icon: CheckCircle2, color: 'text-emerald-600', label: 'Done' },
  PENDING: { icon: Clock, color: 'text-amber-500', label: 'Pending' },
  PROCESSING: { icon: Clock, color: 'text-blue-500', label: 'Processing' },
  FAILED: { icon: AlertCircle, color: 'text-red-500', label: 'Failed' },
}

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = await getClient(params.id)
  if (!client) notFound()

  const totalBalance = client.accounts.reduce((sum, a) => sum + a.balance, 0)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Back */}
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition"
      >
        <ArrowLeft size={16} /> Back to Clients
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 flex items-start gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {client.name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-slate-900">{client.name}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Mail size={13} /> {client.email}</span>
            {client.phone && <span className="flex items-center gap-1.5"><Phone size={13} /> {client.phone}</span>}
            {client.pan && (
              <span className="flex items-center gap-1.5">
                <CreditCard size={13} />
                <span className="font-mono">{client.pan}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> Since {format(new Date(client.createdAt), 'dd MMM yyyy')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
            Taxpayer
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Bank Accounts', value: client.accounts.length, icon: Building2, color: 'bg-sky-50 text-sky-600' },
          { label: 'Portfolio Items', value: client.portfolios.length, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Documents', value: client.documents.length, icon: FileText, color: 'bg-violet-50 text-violet-600' },
          { label: 'Tax Returns', value: client.taxReturns.length, icon: Calculator, color: 'bg-amber-50 text-amber-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color.split(' ')[0]}`}>
              <Icon size={18} className={color.split(' ')[1]} />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Documents */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <FileText size={16} className="text-violet-500" /> Documents
            </h2>
            <Link href={`/dashboard/documents?clientId=${client.id}`} className="text-xs text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {client.documents.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-slate-400">No documents uploaded yet</div>
            ) : (
              client.documents.map((doc) => {
                const s = statusConfig[doc.status] ?? statusConfig.PENDING
                const StatusIcon = s.icon
                return (
                  <div key={doc.id} className="px-5 py-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0 text-xs font-bold uppercase">
                      {doc.fileType.substring(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 truncate">{doc.fileName}</div>
                      <div className="text-xs text-slate-500">{doc.taxYear || 'No year'}</div>
                    </div>
                    <StatusIcon size={15} className={s.color} />
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Tax Returns */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Calculator size={16} className="text-amber-500" /> Tax Returns
            </h2>
            <Link href={`/dashboard/tax?clientId=${client.id}`} className="text-xs text-indigo-600 hover:underline">
              Compute
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {client.taxReturns.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-slate-400">No tax returns yet</div>
            ) : (
              client.taxReturns.map((tr) => (
                <div key={tr.id} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-800">AY {tr.taxYear}</div>
                    <div className="text-xs text-slate-500">{tr.itrType || 'ITR'} · {tr.regime} Regime</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-900">
                      ₹{tr.taxPayable.toLocaleString('en-IN')}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      tr.status === 'FILED'
                        ? 'bg-emerald-50 text-emerald-700'
                        : tr.status === 'DRAFT'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tr.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Building2 size={16} className="text-sky-500" /> Bank Accounts
            </h2>
            <div className="text-sm font-semibold text-slate-700">
              Total: ₹{totalBalance.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {client.accounts.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-slate-400">No bank accounts linked yet</div>
            ) : (
              client.accounts.map((acc) => (
                <div key={acc.id} className="px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                      <Building2 size={15} className="text-sky-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">{acc.bankName}</div>
                      <div className="text-xs text-slate-500 font-mono">****{acc.accountNumber.slice(-4)} · {acc.accountType}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    ₹{acc.balance.toLocaleString('en-IN')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
