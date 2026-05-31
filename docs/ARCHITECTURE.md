# Auditor App – Architecture

## Overview

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
│         Next.js 14 + TypeScript              │
│         Tailwind CSS + shadcn/ui             │
└───────────────────┬─────────────────────────┘
                    │ API Routes / REST
┌───────────────────▼─────────────────────────┐
│               Backend (API)                  │
│         Next.js API Routes / Express         │
│         Tax Engine | AI Engine               │
└────────┬──────────────────────┬─────────────┘
         │                      │
┌────────▼──────┐    ┌──────────▼──────────────┐
│  PostgreSQL    │    │   External APIs          │
│  (Supabase)    │    │  - Claude AI             │
│  Prisma ORM    │    │  - Google Vision OCR      │
└───────────────┘    │  - Zerodha Kite API       │
                      │  - CoinGecko (Crypto)     │
┌─────────────────┐   │  - Alpha Vantage (Stocks) │
│ Supabase Storage│   └──────────────────────────┘
│  (Documents)    │
└─────────────────┘
```

## Data Flow: Document Processing

1. User uploads file → Supabase Storage
2. API Route receives file
3. Parser selected by MIME type (pdf-parse / xlsx / mammoth / tesseract)
4. Raw text sent to Claude API with CA prompt
5. Structured JSON returned → saved to `Document` table
6. CA reviews AI extraction and confirms

## Tax Computation Flow

1. Client data aggregated (salary, investments, documents)
2. Tax engine runs Old & New regime comparison
3. Capital gains computed per asset class
4. Deductions validated against limits (80C ≤ 1.5L, etc.)
5. Final liability with TDS offset = balance payable / refund

## Security

- All documents stored with user-scoped paths in Supabase
- Row Level Security (RLS) enforced at DB level
- CA can only access their assigned clients
- Audit logs for all CA actions
