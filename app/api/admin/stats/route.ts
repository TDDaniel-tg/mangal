import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    const [products, categories, leads, orders] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.lead.count(),
      prisma.order.count()
    ])

    return NextResponse.json({
      products,
      categories,
      leads,
      orders
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 