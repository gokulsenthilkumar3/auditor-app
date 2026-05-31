export type UserRole = 'CA' | 'TAXPAYER'

export type AccountType =
  | 'SAVINGS'
  | 'CURRENT'
  | 'DEBT'
  | 'CREDIT_CARD'
  | 'DEMAT'
  | 'TRADING'

export type AssetType =
  | 'STOCK'
  | 'MUTUAL_FUND'
  | 'FD'
  | 'RD'
  | 'BOND'
  | 'COMMODITY'
  | 'CRYPTO'
  | 'NFT'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  pan?: string
  role: UserRole
  caId?: string
}

export interface BankAccount {
  id: string
  userId: string
  accountType: AccountType
  bankName: string
  accountNumber: string
  ifsc?: string
  balance: number
  currency: string
}

export interface Portfolio {
  id: string
  userId: string
  assetType: AssetType
  name: string
  symbol?: string
  quantity: number
  avgBuyPrice: number
  currentPrice?: number
  platform?: string
  purchaseDate?: Date
  maturityDate?: Date
  interestRate?: number
}

export interface TaxReturn {
  id: string
  userId: string
  taxYear: string
  regime: 'OLD' | 'NEW'
  grossIncome: number
  totalDeductions: number
  taxableIncome: number
  taxPayable: number
  tdsDeducted: number
  refundDue: number
  status: 'DRAFT' | 'FILED' | 'REVISED'
}

export interface DocumentParsed {
  id: string
  userId: string
  fileName: string
  fileType: string
  fileUrl: string
  extractedData?: Record<string, unknown>
  summary?: string
  taxYear?: string
}

export interface TaxComputationResult {
  taxableIncome: number
  incomeTax: number
  stcgTax: number
  ltcgTax: number
  cess: number
  totalTax: number
  taxAlreadyPaid: number
  balanceTaxDue: number
  refundDue: number
  regime: 'OLD' | 'NEW'
}
