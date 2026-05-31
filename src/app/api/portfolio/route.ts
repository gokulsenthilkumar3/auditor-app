import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const assetType = searchParams.get('assetType')

  // TODO: Fetch from DB using Prisma
  // const portfolios = await prisma.portfolio.findMany({
  //   where: { userId, ...(assetType ? { assetType } : {}) }
  // })

  return NextResponse.json({
    success: true,
    portfolios: [],
    message: 'Connect Prisma and Supabase to fetch real data'
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, assetType, name, symbol, quantity, avgBuyPrice, platform, metadata } = body

    // Validate required fields
    if (!userId || !assetType || !name || !quantity || !avgBuyPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: Save to DB
    // const portfolio = await prisma.portfolio.create({ data: body })

    return NextResponse.json({
      success: true,
      message: 'Portfolio entry created (connect DB to persist)',
      data: body
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create portfolio entry' }, { status: 500 })
  }
}
