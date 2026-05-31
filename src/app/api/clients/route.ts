import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/clients - list all taxpayer clients
export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      where: { role: 'TAXPAYER' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        pan: true,
        createdAt: true,
        _count: {
          select: {
            documents: true,
            taxReturns: true,
            accounts: true,
          },
        },
      },
    })
    return NextResponse.json({ clients })
  } catch (error) {
    console.error('[GET /api/clients]', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

// POST /api/clients - create a new taxpayer client
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, pan, aadhaar } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'A client with this email already exists' }, { status: 409 })
    }

    const client = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        pan: pan || null,
        aadhaar: aadhaar || null,
        role: 'TAXPAYER',
      },
    })

    return NextResponse.json({ client }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/clients]', error)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
