import { NextRequest, NextResponse } from 'next/server'

interface TaxInput {
  grossSalary: number
  otherIncome: number
  hraReceived: number
  hraExemption: number
  ltaExemption: number
  // Deductions
  section80C: number   // max 1.5L
  section80D: number   // health insurance
  section80G: number   // donations
  section80CCD: number // NPS additional
  homeLoanInterest: number
  educationLoanInterest: number
  // Capital Gains
  stcg: number  // Short Term Capital Gains (15%)
  ltcg: number  // Long Term Capital Gains above 1L (10%)
  // TDS / Advance Tax
  tdsDeducted: number
  advanceTaxPaid: number
  // Regime
  regime: 'OLD' | 'NEW'
}

function computeTax(input: TaxInput) {
  const {
    grossSalary, otherIncome, hraExemption, ltaExemption,
    section80C, section80D, section80G, section80CCD,
    homeLoanInterest, educationLoanInterest,
    stcg, ltcg, tdsDeducted, advanceTaxPaid, regime
  } = input

  let taxableIncome = grossSalary + otherIncome

  if (regime === 'OLD') {
    const standardDeduction = 50000
    const totalDeductions = Math.min(section80C, 150000)
      + Math.min(section80D, 25000)
      + section80G
      + Math.min(section80CCD, 50000)
      + Math.min(homeLoanInterest, 200000)
      + educationLoanInterest
      + hraExemption
      + ltaExemption
      + standardDeduction

    taxableIncome = Math.max(0, taxableIncome - totalDeductions)
  } else {
    // New regime: only standard deduction of 75,000 from FY2024-25
    taxableIncome = Math.max(0, taxableIncome - 75000)
  }

  let incomeTax = 0

  if (regime === 'OLD') {
    if (taxableIncome <= 250000) incomeTax = 0
    else if (taxableIncome <= 500000) incomeTax = (taxableIncome - 250000) * 0.05
    else if (taxableIncome <= 1000000) incomeTax = 12500 + (taxableIncome - 500000) * 0.20
    else incomeTax = 112500 + (taxableIncome - 1000000) * 0.30
  } else {
    // New Regime FY2024-25
    if (taxableIncome <= 300000) incomeTax = 0
    else if (taxableIncome <= 700000) incomeTax = (taxableIncome - 300000) * 0.05
    else if (taxableIncome <= 1000000) incomeTax = 20000 + (taxableIncome - 700000) * 0.10
    else if (taxableIncome <= 1200000) incomeTax = 50000 + (taxableIncome - 1000000) * 0.15
    else if (taxableIncome <= 1500000) incomeTax = 80000 + (taxableIncome - 1200000) * 0.20
    else incomeTax = 140000 + (taxableIncome - 1500000) * 0.30
  }

  // Capital Gains Tax
  const stcgTax = stcg * 0.15
  const ltcgTaxable = Math.max(0, ltcg - 100000)
  const ltcgTax = ltcgTaxable * 0.10

  // Surcharge & Cess
  const totalTaxBeforeCess = incomeTax + stcgTax + ltcgTax
  const cess = totalTaxBeforeCess * 0.04
  const totalTax = totalTaxBeforeCess + cess

  const taxAlreadyPaid = tdsDeducted + advanceTaxPaid
  const balanceTaxDue = Math.max(0, totalTax - taxAlreadyPaid)
  const refundDue = Math.max(0, taxAlreadyPaid - totalTax)

  return {
    taxableIncome: Math.round(taxableIncome),
    incomeTax: Math.round(incomeTax),
    stcgTax: Math.round(stcgTax),
    ltcgTax: Math.round(ltcgTax),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    taxAlreadyPaid: Math.round(taxAlreadyPaid),
    balanceTaxDue: Math.round(balanceTaxDue),
    refundDue: Math.round(refundDue),
    regime,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: TaxInput = await req.json()
    const result = computeTax(body)
    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json({ error: 'Tax computation failed' }, { status: 500 })
  }
}
