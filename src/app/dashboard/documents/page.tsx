import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { UploadCloud, FileText, Search, MoreVertical, CheckCircle2, Clock, AlertCircle, File } from 'lucide-react'

const statusConfig: Record<string, { dotClass: string; label: string; badgeClass: string }> = {
  DONE:       { dotClass: 'dot-green', badgeClass: 'badge-green', label: 'Parsed' },
  PENDING:    { dotClass: 'dot-amber', badgeClass: 'badge-amber', label: 'Pending' },
  PROCESSING: { dotClass: 'dot-amber', badgeClass: 'badge-blue',  label: 'Processing' },
  FAILED:     { dotClass: 'dot-red',   badgeClass: 'badge-red',   label: 'Failed' },
}

const fileTypeConfig: Record<string, { bg: string; color: string; label: string }> = {
  pdf:  { bg: 'rgba(239,68,68,0.15)',    color: '#f87171', label: 'PDF' },
  xlsx: { bg: 'rgba(16,185,129,0.15)',   color: '#34d399', label: 'XLSX' },
  xls:  { bg: 'rgba(16,185,129,0.15)',   color: '#34d399', label: 'XLS' },
  docx: { bg: 'rgba(59,130,246,0.15)',   color: '#60a5fa', label: 'DOCX' },
  png:  { bg: 'rgba(245,158,11,0.15)',   color: '#fbbf24', label: 'PNG' },
  jpg:  { bg: 'rgba(245,158,11,0.15)',   color: '#fbbf24', label: 'JPG' },
}

async function getDocuments() {
  try {
    return await prisma.document.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function DocumentsPage() {
  const documents = await getDocuments()

  const displayDocs = documents.length > 0 ? documents : [
    { id: '1', fileName: 'Form16_FY2025.pdf',         fileType: 'pdf',  status: 'DONE',       taxYear: '2025-26', createdAt: new Date(), user: { name: 'Ravi Shankar' } },
    { id: '2', fileName: 'HDFC_Bank_Stmt_Q4.xlsx',    fileType: 'xlsx', status: 'PROCESSING', taxYear: '2025-26', createdAt: new Date(), user: { name: 'Priya Nair' } },
    { id: '3', fileName: 'Capital_Gains_Zerodha.pdf', fileType: 'pdf',  status: 'PENDING',    taxYear: '2025-26', createdAt: new Date(), user: { name: 'Arjun Mehta' } },
    { id: '4', fileName: 'Salary_Slip_May2025.docx',  fileType: 'docx', status: 'DONE',       taxYear: '2025-26', createdAt: new Date(), user: { name: 'Sunita Rao' } },
  ]

  const doneCount = displayDocs.filter(d => d.status === 'DONE').length
  const pendingCount = displayDocs.filter(d => d.status === 'PENDING' || d.status === 'PROCESSING').length

  return (
    <div className="p-7 fade-in" style={{ minHeight: '100vh', background: '#07091a' }}>
      
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Documents</h1>
          <p className="text-sm mt-1" style={{ color: '#4b5563' }}>Manage and AI-parse client financial documents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={14} style={{ color: '#4b5563' }} />
            <input
              type="text"
              placeholder="Search documents..."
              className="input pl-9 w-56 py-2.5 text-sm"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          </div>
          <button className="btn-primary text-sm">
            <UploadCloud size={15} /> Upload
          </button>
        </div>
      </div>

      {/* ── Stat Pills ──────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Total Documents', val: displayDocs.length, accent: '#6366f1', accentBg: 'rgba(99,102,241,0.12)' },
          { label: 'Parsed',          val: doneCount,          accent: '#10b981', accentBg: 'rgba(16,185,129,0.12)' },
          { label: 'In Progress',     val: pendingCount,       accent: '#f59e0b', accentBg: 'rgba(245,158,11,0.12)' },
          { label: 'Failed',          val: displayDocs.filter(d => d.status === 'FAILED').length, accent: '#ef4444', accentBg: 'rgba(239,68,68,0.12)' },
        ].map(s => (
          <div key={s.label} className="card rounded-xl p-4" style={{ borderTop: `2px solid ${s.accent}` }}>
            <div className="text-xl font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>{s.val}</div>
            <div className="text-xs mt-1" style={{ color: '#4b5563' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Documents Table ─────────────────────────────── */}
      <div className="card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <File size={16} style={{ color: '#6366f1' }} />
            <span className="text-sm font-semibold text-white">All Documents</span>
          </div>
          <div className="flex gap-2">
            {['All', 'PDF', 'Excel', 'Images'].map(f => (
              <button key={f} className="text-xs px-3 py-1.5 rounded-lg transition-all"
                style={f === 'All'
                  ? { background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }
                  : { background: 'rgba(255,255,255,0.04)', color: '#4b5563', border: '1px solid rgba(255,255,255,0.07)' }
                }>
                {f}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>File Details</th>
              <th>Client</th>
              <th>Tax Year</th>
              <th>Status</th>
              <th>Uploaded</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {displayDocs.map((doc) => {
              const s = statusConfig[doc.status] || statusConfig.PENDING
              const ft = fileTypeConfig[doc.fileType?.toLowerCase()] || { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', label: doc.fileType?.toUpperCase() || 'FILE' }
              return (
                <tr key={doc.id} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: ft.bg }}>
                        <FileText size={18} style={{ color: ft.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-white text-sm truncate max-w-[200px]">{doc.fileName}</div>
                        <div className="text-[10px] mt-0.5 font-bold uppercase" style={{ color: ft.color }}>{ft.label}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-medium" style={{ color: '#94a3b8' }}>{(doc as any).user?.name || 'Unknown'}</span>
                  </td>
                  <td>
                    {doc.taxYear
                      ? <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.07)' }}>{doc.taxYear}</span>
                      : <span style={{ color: '#374151' }}>—</span>
                    }
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className={s.dotClass} />
                      <span className={`inline-flex ${s.badgeClass}`}>{s.label}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '11px', color: '#4b5563' }}>
                    {format(new Date(doc.createdAt), 'dd MMM yyyy, HH:mm')}
                  </td>
                  <td>
                    <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#6b7280' }}>
                      <MoreVertical size={14} />
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
