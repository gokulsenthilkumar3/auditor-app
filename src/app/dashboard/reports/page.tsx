import { FileBarChart2, Download, Filter, Calendar, FileText, Table, FileCode } from 'lucide-react'

const reports = [
  { id: 1, title: 'Client Tax Summary FY 24-25',    type: 'PDF',   date: '2026-05-20', size: '1.2 MB',  status: 'Ready',      color: '#ef4444' },
  { id: 2, title: 'Portfolio Capital Gains Report', type: 'EXCEL', date: '2026-05-18', size: '450 KB',  status: 'Ready',      color: '#10b981' },
  { id: 3, title: 'Pending ITR Status Report',      type: 'CSV',   date: '2026-05-15', size: '12 KB',   status: 'Ready',      color: '#6366f1' },
  { id: 4, title: 'Advance Tax Defaulters',         type: 'PDF',   date: '2026-05-10', size: '800 KB',  status: 'Ready',      color: '#ef4444' },
  { id: 5, title: 'TDS Reconciliation Statement',   type: 'EXCEL', date: '2026-05-05', size: '220 KB',  status: 'Generating', color: '#10b981' },
]

const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  PDF:   { icon: FileText, color: '#f87171', bg: 'rgba(239,68,68,0.15)'  },
  EXCEL: { icon: Table,    color: '#34d399', bg: 'rgba(16,185,129,0.15)' },
  CSV:   { icon: FileCode, color: '#818cf8', bg: 'rgba(99,102,241,0.15)' },
}

const reportTemplates = [
  { label: 'ITR Summary',     icon: '📊', desc: 'Per-client ITR overview' },
  { label: 'Capital Gains',   icon: '📈', desc: 'STCG + LTCG breakdown' },
  { label: 'TDS Report',      icon: '🧾', desc: 'Deductions & certificates' },
  { label: 'Audit Trail',     icon: '🔍', desc: 'Action log export' },
]

export default function ReportsPage() {
  return (
    <div className="p-7 fade-in" style={{ minHeight: '100vh', background: '#07091a' }}>
      
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Reports</h1>
          <p className="text-sm mt-1" style={{ color: '#4b5563' }}>Generate and export practice-wide analytics</p>
        </div>
        <button className="btn-primary text-sm">
          <FileBarChart2 size={15} /> Generate Report
        </button>
      </div>

      {/* ── Report Templates ─────────────────────────────── */}
      <div className="mb-7">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#374151' }}>Report Templates</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {reportTemplates.map(t => (
            <button key={t.label}
              className="card card-hover rounded-xl p-4 text-left group transition-all">
              <div className="text-2xl mb-3 transition-transform duration-200 group-hover:scale-110">{t.icon}</div>
              <div className="text-sm font-bold text-white">{t.label}</div>
              <div className="text-xs mt-1" style={{ color: '#374151' }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Reports Table ───────────────────────────────── */}
      <div className="card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-sm font-bold text-white">Generated Reports</h2>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-xs py-1.5 px-3">
              <Filter size={12} /> Filter
            </button>
            <button className="btn-ghost text-xs py-1.5 px-3">
              <Calendar size={12} /> This Month
            </button>
          </div>
        </div>
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Format</th>
              <th>Date Generated</th>
              <th>Size</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const tc = typeConfig[report.type] || typeConfig.PDF
              const Icon = tc.icon
              const isReady = report.status === 'Ready'
              return (
                <tr key={report.id} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: tc.bg }}>
                        <Icon size={16} style={{ color: tc.color }} />
                      </div>
                      <span className="font-medium text-white text-sm">{report.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.color}30` }}>
                      {report.type}
                    </span>
                  </td>
                  <td style={{ color: '#4b5563', fontSize: '12px' }}>{report.date}</td>
                  <td style={{ color: '#4b5563', fontSize: '12px' }}>{report.size}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className={isReady ? 'dot-green' : 'dot-amber'} />
                      <span className={`inline-flex ${isReady ? 'badge-green' : 'badge-amber'}`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    {isReady && (
                      <button
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}
                      >
                        <Download size={12} /> Download
                      </button>
                    )}
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
