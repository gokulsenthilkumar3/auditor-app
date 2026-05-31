import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/clients/[id]
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        accounts: true,
        portfolios: {
          orderBy: { createdAt: 'desc' },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        taxReturns: {
          orderBy: { taxYear: 'desc' },
        },
      },
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({ client })
  } catch (error) {
    console.error('[GET /api/clients/[id]]', error)
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 })
  }
}

// PATCH /api/clients/[id] - update client details
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, phone, pan, aadhaar } = body

    const client = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(pan !== undefined && { pan }),
        ...(aadhaar !== undefined && { aadhaar }),
      },
    })

    return NextResponse.json({ client })
  } catch (error) {
    console.error('[PATCH /api/clients/[id]]', error)
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
  }
}
