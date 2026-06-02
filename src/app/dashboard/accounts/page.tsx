import { prisma } from '@/lib/prisma'
import { Building2, Plus, Search, CreditCard, PiggyBank, Landmark, MoreHorizontal, Wallet } from 'lucide-react'

const accountTypeConfig: Record<string, { icon: any; label: string; color: string; bg: string }> = {
  SAVINGS:     { icon: PiggyBank, label: 'Savings',     color: '#6366f1', bg: 'rgba(99,102,241,0.15)'  },
  CURRENT:     { icon: Landmark,  label: 'Current',     color: '#0ea5e9', bg: 'rgba(14,165,233,0.15)'  },
  CREDIT_CARD: { icon: CreditCard,label: 'Credit Card', color: '#ef4444', bg: 'rgba(239,68,68,0.15)'   },
  DEMAT:       { icon: Building2, label: 'Demat',       color: '#10b981', bg: 'rgba(16,185,129,0.15)'  },
  TRADING:     { icon: Wallet,    label: 'Trading',     color: '#f59e0b', bg: 'rgba(245,158,11,0.15)'  },
}

async function getAccounts() {
  try {
    return await prisma.bankAccount.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { balance: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function AccountsPage() {
  const accounts = await getAccounts()

  const displayAccounts = accounts.length > 0 ? accounts : [
    { id: '1', accountType: 'SAVINGS',     bankName: 'HDFC Bank',   accountNumber: '00123456789',    balance: 245000,   currency: 'INR', user: { name: 'Ravi Shankar' } },
    { id: '2', accountType: 'CURRENT',     bankName: 'ICICI Bank',  accountNumber: '98765432100',    balance: 1250500,  currency: 'INR', user: { name: 'Priya Nair' } },
    { id: '3', accountType: 'CREDIT_CARD', bankName: 'SBI Card',    accountNumber: '4532XXXXXXXX1234',balance: -45000,  currency: 'INR', user: { name: 'Arjun Mehta' } },
    { id: '4', accountType: 'DEMAT',       bankName: 'Zerodha',     accountNumber: 'ZER0009876',     balance: 842000,   currency: 'INR', user: { name: 'Sunita Rao' } },
  ]

  const totalBalance   = displayAccounts.reduce((a, c) => a + c.balance, 0)
  const creditCard     = displayAccounts.filter(a => a.accountType === 'CREDIT_CARD').reduce((a, c) => a + Math.abs(c.balance), 0)
  const assetBalance   = displayAccounts.filter(a => a.balance > 0).reduce((a, c) => a + c.balance, 0)

  return (
    <div className="p-7 fade-in" style={{ minHeight: '100vh', background: '#07091a' }}>
      
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Accounts</h1>
          <p className="text-sm mt-1" style={{ color: '#4b5563' }}>Overview of all linked client financial accounts</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus size={15} /> Add Account
        </button>
      </div>

      {/* ── Summary Cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        
        {/* Total balance – gradient card */}
        <div className="rounded-2xl p-6 relative overflow-hidden col-span-1"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.3)' }}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#a5b4fc' }}>Total Balance</span>
              <Building2 size={16} style={{ color: '#a5b4fc', opacity: 0.7 }} />
            </div>
            <div className="text-3xl font-extrabold text-white" style={{ letterSpacing: '-0.03em' }}>
              ₹{totalBalance.toLocaleString('en-IN')}
            </div>
            <div className="text-xs mt-2" style={{ color: 'rgba(165,180,252,0.6)' }}>Across {displayAccounts.length} linked accounts</div>
          </div>
        </div>

        <div className="card rounded-2xl p-6" style={{ borderTop: '2px solid #10b981' }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#374151' }}>Asset Balance</div>
          <div className="text-2xl font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>
            ₹{assetBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-xs mt-1" style={{ color: '#059669' }}>Bank + Demat + Trading</div>
        </div>

        <div className="card rounded-2xl p-6" style={{ borderTop: '2px solid #ef4444' }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#374151' }}>Credit Outstanding</div>
          <div className="text-2xl font-extrabold" style={{ color: '#f87171', letterSpacing: '-0.02em' }}>
            ₹{creditCard.toLocaleString('en-IN')}
          </div>
          <div className="text-xs mt-1" style={{ color: '#374151' }}>Credit cards & dues</div>
        </div>
      </div>

      {/* ── Accounts Table ──────────────────────────────── */}
      <div className="card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-sm font-bold text-white">All Accounts</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={13} style={{ color: '#4b5563' }} />
            <input type="text" placeholder="Search accounts..." className="input pl-8 w-48 py-2 text-xs"
              style={{ background: 'rgba(255,255,255,0.04)' }} />
          </div>
        </div>
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>Account Details</th>
              <th>Client</th>
              <th>Type</th>
              <th className="text-right">Balance</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {displayAccounts.map((acc) => {
              const cfg = accountTypeConfig[acc.accountType] || accountTypeConfig.SAVINGS
              const Icon = cfg.icon
              const isNegative = acc.balance < 0
              return (
                <tr key={acc.id} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: cfg.bg }}>
                        <Icon size={17} style={{ color: cfg.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{acc.bankName}</div>
                        <div className="text-[10px] font-mono mt-0.5" style={{ color: '#374151' }}>
                          ****{acc.accountNumber.slice(-4)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#6b7280' }}>{(acc as any).user?.name || 'Unknown'}</td>
                  <td>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                      {cfg.label}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="font-bold" style={{ color: isNegative ? '#ef4444' : '#e2e8f0' }}>
                      ₹{Math.abs(acc.balance).toLocaleString('en-IN')}
                    </div>
                    {isNegative && <div className="text-[10px] mt-0.5" style={{ color: '#ef4444' }}>Due</div>}
                  </td>
                  <td>
                    <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280' }}>
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
