import { prisma } from '@/lib/prisma'
import { TrendingUp, Plus, ArrowUpRight, ArrowDownRight, Activity, IndianRupee } from 'lucide-react'

async function getPortfolios() {
  try {
    return await prisma.portfolio.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

const assetTypeConfig: Record<string, { label: string; color: string; bg: string }> = {
  STOCK:       { label: 'Stock',   color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
  MUTUAL_FUND: { label: 'MF',     color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  CRYPTO:      { label: 'Crypto', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  FD:          { label: 'FD',     color: '#0ea5e9', bg: 'rgba(14,165,233,0.15)' },
  BOND:        { label: 'Bond',   color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  NFT:         { label: 'NFT',    color: '#f43f5e', bg: 'rgba(244,63,94,0.15)'  },
}

export default async function PortfolioPage() {
  const portfolios = await getPortfolios()

  const displayPortfolios = portfolios.length > 0 ? portfolios : [
    { id: '1', assetType: 'STOCK',       name: 'Reliance Industries',       symbol: 'RELIANCE', quantity: 50,     avgBuyPrice: 2400,    currentPrice: 2850,    user: { name: 'Ravi Shankar' } },
    { id: '2', assetType: 'MUTUAL_FUND', name: 'Parag Parikh Flexi Cap',    symbol: 'PPFAS',    quantity: 1250.45,avgBuyPrice: 45.2,    currentPrice: 68.4,    user: { name: 'Priya Nair' } },
    { id: '3', assetType: 'CRYPTO',      name: 'Bitcoin',                   symbol: 'BTC',      quantity: 0.15,   avgBuyPrice: 3500000, currentPrice: 5200000, user: { name: 'Arjun Mehta' } },
    { id: '4', assetType: 'FD',          name: 'SBI Fixed Deposit',         symbol: 'SBI-FD',   quantity: 1,      avgBuyPrice: 500000,  currentPrice: 535000,  user: { name: 'Sunita Rao' } },
  ]

  const totalInvested = displayPortfolios.reduce((acc, curr) => acc + (curr.quantity * curr.avgBuyPrice), 0)
  const currentValue  = displayPortfolios.reduce((acc, curr) => acc + (curr.quantity * (curr.currentPrice || curr.avgBuyPrice)), 0)
  const unrealizedGain = currentValue - totalInvested
  const gainPercent = (unrealizedGain / totalInvested) * 100
  const isPositive = unrealizedGain >= 0

  return (
    <div className="p-7 fade-in" style={{ minHeight: '100vh', background: '#07091a' }}>
      
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Investment Portfolios</h1>
          <p className="text-sm mt-1" style={{ color: '#4b5563' }}>Track stocks, mutual funds, and assets across clients</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus size={15} /> Add Asset
        </button>
      </div>

      {/* ── Summary Cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        <div className="card rounded-2xl p-6" style={{ borderTop: '2px solid #6366f1' }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#374151' }}>Total Invested</div>
          <div className="text-2xl font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>
            ₹{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="card rounded-2xl p-6" style={{ borderTop: '2px solid #8b5cf6' }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#374151' }}>Current Value</div>
          <div className="text-2xl font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>
            ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="card rounded-2xl p-6" style={{ borderTop: `2px solid ${isPositive ? '#10b981' : '#ef4444'}` }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#374151' }}>Unrealized P&L</div>
          <div className="flex items-end gap-3">
            <div className="text-2xl font-extrabold" style={{ color: isPositive ? '#10b981' : '#ef4444', letterSpacing: '-0.02em' }}>
              {isPositive ? '+' : '-'}₹{Math.abs(unrealizedGain).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <div className="flex items-center gap-0.5 mb-0.5 text-sm font-semibold" style={{ color: isPositive ? '#10b981' : '#ef4444' }}>
              {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(gainPercent).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* ── Holdings Table ──────────────────────────────── */}
      <div className="card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Activity size={16} style={{ color: '#6366f1' }} />
          <h2 className="text-sm font-bold text-white">Top Holdings</h2>
          <div className="ml-auto text-xs px-2.5 py-1 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
            Live Prices
          </div>
        </div>
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Client</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Avg. Buy</th>
              <th className="text-right">LTP</th>
              <th className="text-right">P&L</th>
            </tr>
          </thead>
          <tbody>
            {displayPortfolios.map((item) => {
              const invested = item.quantity * item.avgBuyPrice
              const current  = item.quantity * (item.currentPrice || item.avgBuyPrice)
              const pnl      = current - invested
              const pnlPct   = (pnl / invested) * 100
              const gain     = pnl >= 0
              const at       = assetTypeConfig[item.assetType] || { label: item.assetType, color: '#6b7280', bg: 'rgba(107,114,128,0.15)' }

              return (
                <tr key={item.id}>
                  <td>
                    <div className="font-semibold text-white text-sm">{item.name}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: at.bg, color: at.color }}>
                        {at.label}
                      </span>
                      {item.symbol && <span className="text-[10px] font-mono" style={{ color: '#374151' }}>{item.symbol}</span>}
                    </div>
                  </td>
                  <td style={{ color: '#6b7280' }}>{(item as any).user?.name}</td>
                  <td className="text-right" style={{ color: '#6b7280' }}>{item.quantity.toLocaleString('en-IN')}</td>
                  <td className="text-right" style={{ color: '#6b7280' }}>₹{item.avgBuyPrice.toLocaleString('en-IN')}</td>
                  <td className="text-right font-semibold text-white">₹{(item.currentPrice || 0).toLocaleString('en-IN')}</td>
                  <td className="text-right">
                    <div className="font-bold" style={{ color: gain ? '#10b981' : '#ef4444' }}>
                      {gain ? '+' : '-'}₹{Math.abs(pnl).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: gain ? '#059669' : '#dc2626' }}>
                      {gain ? '+' : ''}{pnlPct.toFixed(2)}%
                    </div>
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
