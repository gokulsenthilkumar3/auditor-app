import { prisma } from '@/lib/prisma'
import { Calculator, Zap, FileCheck, AlertCircle, Users, IndianRupee } from 'lucide-react'

async function getTaxReturns() {
  try {
    return await prisma.taxReturn.findMany({
      include: { user: { select: { name: true, pan: true } } },
      orderBy: { taxYear: 'desc' },
    })
  } catch {
    return []
  }
}

const avatarColors = [
  { bg: 'rgba(99,102,241,0.2)',  color: '#818cf8' },
  { bg: 'rgba(16,185,129,0.2)', color: '#34d399' },
  { bg: 'rgba(245,158,11,0.2)', color: '#fbbf24' },
  { bg: 'rgba(14,165,233,0.2)', color: '#38bdf8' },
]

export default async function TaxEnginePage() {
  const taxReturns = await getTaxReturns()

  const displayReturns = taxReturns.length > 0 ? taxReturns : [
    { id: '1', taxYear: '2025-26', regime: 'NEW', grossIncome: 1550000, totalDeductions: 0,      taxableIncome: 1550000, taxPayable: 156000, status: 'DRAFT', itrType: 'ITR-1', user: { name: 'Ravi Shankar', pan: 'ABCDE1234F' } },
    { id: '2', taxYear: '2025-26', regime: 'OLD', grossIncome: 2450000, totalDeductions: 450000, taxableIncome: 2000000, taxPayable: 429000, status: 'FILED', itrType: 'ITR-2', user: { name: 'Priya Nair',   pan: 'PQRST9876Z' } },
    { id: '3', taxYear: '2024-25', regime: 'NEW', grossIncome: 980000,  totalDeductions: 0,      taxableIncome: 980000,  taxPayable: 62400,  status: 'DRAFT', itrType: 'ITR-1', user: { name: 'Arjun Mehta',  pan: 'ZZZZZ9999K' } },
  ]

  const totalTaxPayable = displayReturns.reduce((a, t) => a + t.taxPayable, 0)
  const draftCount = displayReturns.filter(t => t.status === 'DRAFT').length
  const filedCount = displayReturns.filter(t => t.status === 'FILED').length

  return (
    <div className="p-7 fade-in" style={{ minHeight: '100vh', background: '#07091a' }}>
      
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Tax Engine</h1>
          <p className="text-sm mt-1" style={{ color: '#4b5563' }}>Compute taxes and manage ITR filings</p>
        </div>
        <button className="btn-primary text-sm">
          <Zap size={15} style={{ color: '#c7d2fe' }} /> Auto-Compute All
        </button>
      </div>

      {/* ── Summary Stats ───────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: 'Total Tax Payable', val: `₹${totalTaxPayable.toLocaleString('en-IN')}`, accent: '#6366f1', icon: IndianRupee },
          { label: 'Pending Draft',     val: draftCount,  accent: '#f59e0b', icon: AlertCircle },
          { label: 'Filed Returns',     val: filedCount,  accent: '#10b981', icon: FileCheck },
        ].map(s => (
          <div key={s.label} className="card rounded-xl p-5" style={{ borderTop: `2px solid ${s.accent}` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: s.accent }}>
                {s.label}
              </span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.accent}18` }}>
                <s.icon size={15} style={{ color: s.accent }} />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────── */}
      <div className="flex items-center gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {['Current AY (2025-26)', 'Previous Years', 'Advance Tax'].map((tab, i) => (
          <button key={tab} className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={i === 0
              ? { background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }
              : { color: '#4b5563' }
            }>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Return Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {displayReturns.map((tr, i) => {
          const color = avatarColors[i % avatarColors.length]
          const isFiled = tr.status === 'FILED'
          return (
            <div key={tr.id} className="card card-hover rounded-2xl p-6 flex flex-col relative overflow-hidden">
              
              {/* Filed ribbon */}
              {isFiled && (
                <div className="absolute -right-8 top-5 px-10 py-0.5 text-[10px] font-bold rotate-45"
                  style={{ background: '#10b981', color: 'white' }}>
                  FILED
                </div>
              )}

              {/* Client row */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: color.bg, color: color.color }}>
                    {(tr as any).user?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{(tr as any).user?.name}</h3>
                    <p className="text-[10px] font-mono" style={{ color: '#4b5563' }}>PAN: {(tr as any).user?.pan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="badge-slate mb-1 inline-block">{tr.itrType}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#374151' }}>{tr.regime} Regime</div>
                </div>
              </div>

              {/* Tax breakdown */}
              <div className="rounded-xl p-4 mb-5 space-y-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {[
                  { label: 'Gross Income',    val: `₹${tr.grossIncome.toLocaleString('en-IN')}`,    color: '#94a3b8' },
                  { label: 'Deductions',      val: `- ₹${tr.totalDeductions.toLocaleString('en-IN')}`, color: '#f87171' },
                  { label: 'Taxable Income',  val: `₹${tr.taxableIncome.toLocaleString('en-IN')}`,  color: '#e2e8f0', bold: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span style={{ color: '#4b5563' }}>{row.label}</span>
                    <span style={{ color: row.color, fontWeight: row.bold ? 700 : 500 }}>{row.val}</span>
                  </div>
                ))}
                <div className="pt-3 mt-1" style={{ borderTop: '1px solid rgba(99,102,241,0.2)' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold" style={{ color: '#a5b4fc' }}>Net Tax Payable</span>
                    <span className="text-xl font-extrabold" style={{ color: '#6366f1', letterSpacing: '-0.02em' }}>
                      ₹{tr.taxPayable.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-2.5">
                {!isFiled ? (
                  <>
                    <button className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
                      Review
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                      <FileCheck size={14} /> Mark Filed
                    </button>
                  </>
                ) : (
                  <button className="w-full px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }}>
                    Download ITR-V
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
