# 🧾 Auditor App

> AI-powered Chartered Accountant (CA) assistant for managing tax filing, financial accounts, and investment portfolios for multiple taxpayers.

---

## 🚀 Features

### 👥 Multi-User Management
- CA can manage multiple taxpayers / clients
- Role-based access: Admin (CA), Client (Taxpayer)
- Client onboarding with KYC document upload
- Dashboard per client with full financial overview

### 📄 Document Intelligence (AI-Powered)
- Upload and parse **PDF**, **Excel (.xlsx/.xls)**, **Word Docs (.docx)**, **Images (JPG/PNG/WEBP)**
- AI reads Form 16, bank statements, salary slips, ITR documents
- Extracts income, deductions, investments automatically
- Summarizes documents in plain language

### 🏦 Account Management
- Add and manage multiple accounts:
  - Savings Accounts
  - Current / Debt Accounts
  - Credit Cards
  - Demat Accounts
  - Trading Accounts
- Auto-fetch/manual entry of transactions

### 📈 Investment Portfolio Tracking
- **Stocks** – NSE/BSE holdings, P&L, unrealized gains
- **Mutual Funds (MF)** – NAV tracking, XIRR calculation
- **Fixed Deposits (FD)** – Maturity tracking, interest income
- **Recurring Deposits (RD)** – Monthly tracking
- **Bonds** – Coupon tracking, maturity alerts
- **Commodities** – Gold, Silver, etc.
- **Crypto** – BTC, ETH, and altcoin portfolios
- **NFTs** – NFT holdings and valuation

### 🧮 Tax Engine
- Auto-compute income tax (Old & New Regime)
- Capital gains: STCG / LTCG per asset class
- Deductions: 80C, 80D, 80G, HRA, LTA, etc.
- Advance tax reminders and installment calculator
- GST filing support (GSTR-1, GSTR-3B)

### 📊 Reports & Analytics
- CA-generated tax summary reports (PDF export)
- Year-over-year comparison charts
- Net worth tracker
- Cash flow analysis

### 🔔 Smart Notifications
- Tax deadline reminders (ITR, advance tax, GST)
- FD/RD maturity alerts
- Capital loss harvesting suggestions
- AI-driven tax-saving tips

### 🔐 Security
- End-to-end encrypted document storage
- OTP-based authentication
- Role-based permissions
- Audit trail for all CA actions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express / Next.js API Routes |
| Database | PostgreSQL (Supabase) |
| File Storage | Supabase Storage / Firebase Storage |
| AI/LLM | Claude API (Anthropic) / Ollama |
| PDF Parsing | pdf-parse, pdf2json |
| Excel Parsing | xlsx (SheetJS) |
| Doc Parsing | mammoth.js |
| Image OCR | Tesseract.js / Google Vision API |
| Auth | Supabase Auth / NextAuth.js |
| Deployment | Vercel (Frontend), Render (Backend) |
| Charts | Recharts / Chart.js |

---

## 📁 Project Structure

```
auditor-app/
├── apps/
│   ├── web/              # Next.js Frontend
│   └── api/              # Express Backend (optional)
├── packages/
│   ├── ai-engine/        # Document parsing + LLM integration
│   ├── tax-engine/       # Tax computation logic
│   └── shared/           # Shared types, utils
├── prisma/               # DB schema
├── docs/                 # Documentation
└── docker-compose.yml
```

---

## 🏁 Getting Started

```bash
# Clone the repo
git clone https://github.com/gokulsenthilkumar3/auditor-app.git
cd auditor-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

---

## 📋 Roadmap

- [ ] CA Dashboard with client management
- [ ] Document upload & AI parsing
- [ ] Account & portfolio management
- [ ] Tax computation engine
- [ ] Report generation (PDF)
- [ ] Mobile app (React Native)
- [ ] CA-to-client chat/messaging
- [ ] Integration with DigiLocker
- [ ] Zerodha / Groww / Angel One API integration
- [ ] WhatsApp bot for reminders

---

## 📄 License

MIT License © 2026 [Gokul S](https://github.com/gokulsenthilkumar3)
