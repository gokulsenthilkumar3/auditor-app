export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CA Dashboard</h1>
        <p className="text-gray-500 mb-8">Manage your clients, documents, and tax filings</p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Clients', value: '0', icon: '👥' },
            { label: 'Pending Returns', value: '0', icon: '📋' },
            { label: 'Documents Parsed', value: '0', icon: '📄' },
            { label: 'Total Assets Tracked', value: '₹0', icon: '💰' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Add New Client', desc: 'Onboard a new taxpayer', icon: '➕', href: '/clients/new' },
            { title: 'Upload Document', desc: 'PDF, Excel, Image, Docs', icon: '📤', href: '/documents/upload' },
            { title: 'Compute Tax', desc: 'Run tax engine for client', icon: '🧮', href: '/tax/compute' },
            { title: 'View Portfolios', desc: 'Stocks, MF, Crypto & more', icon: '📈', href: '/portfolio' },
            { title: 'Manage Accounts', desc: 'Bank, Demat, Trading', icon: '🏦', href: '/accounts' },
            { title: 'Generate Report', desc: 'Export CA summary as PDF', icon: '📊', href: '/reports' },
          ].map((action) => (
            <a
              key={action.title}
              href={action.href}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-start gap-4"
            >
              <span className="text-3xl">{action.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-500">{action.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
