import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AuditPro — AI-Powered CA Portal for Indian Chartered Accountants',
  description: 'Drop a Form 16 PDF — AI auto-fills ITR fields in under 3 minutes. Manage taxes, portfolios, and client filings with India\'s most intelligent CA platform.',
  keywords: 'CA portal, ITR filing, tax computation, Form 16, portfolio management, AI auditor, chartered accountant software, India tax',
  openGraph: {
    title: 'AuditPro — AI-Powered CA Portal',
    description: 'Drop a Form 16 PDF — AI auto-fills ITR fields in under 3 minutes.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuditPro — AI-Powered CA Portal',
    description: 'Drop a Form 16 PDF — AI auto-fills ITR fields in under 3 minutes.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#07091a" />
      </head>
      <body>{children}</body>
    </html>
  )
}
