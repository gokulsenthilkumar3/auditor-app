import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-6">
          <span className="text-6xl">🧾</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Auditor App
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Your AI-powered Chartered Accountant
        </p>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          Manage taxes, investments, bank accounts, and portfolios — all in one place.
          Upload documents, get AI analysis, and file returns with confidence.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link
            href="/dashboard"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/auth/login"
            className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="font-bold text-lg mb-2">Smart Document Reading</h3>
            <p className="text-gray-500 text-sm">Upload PDF, Excel, Word, or images. AI extracts financial data instantly.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">🏦</div>
            <h3 className="font-bold text-lg mb-2">All Accounts in One Place</h3>
            <p className="text-gray-500 text-sm">Link savings, demat, credit, trading, and more. Full financial picture.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-lg mb-2">Tax Engine + Portfolios</h3>
            <p className="text-gray-500 text-sm">Stocks, MF, FD, Crypto, NFT — auto tax computation for every asset class.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
