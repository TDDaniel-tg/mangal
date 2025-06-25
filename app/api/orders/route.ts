import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: {
              select: {
                title: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerName, 
      customerPhone, 
      customerEmail, 
      customerAddress, 
      items, 
      notes 
    } = body

    // Validation
    if (!customerName || typeof customerName !== 'string' || customerName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Имя клиента обязательно' },
        { status: 400 }
      )
    }

    if (!customerPhone || typeof customerPhone !== 'string' || customerPhone.trim().length === 0) {
      return NextResponse.json(
        { error: 'Телефон клиента обязателен' },
        { status: 400 }
      )
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Товары в заказе обязательны' },
        { status: 400 }
      )
    }

    // Calculate total amount
    let totalAmount = 0
    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        return NextResponse.json(
          { error: 'Неверный формат товара в заказе' },
          { status: 400 }
        )
      }
      totalAmount += item.quantity * item.price
    }

    // Generate order number
    const orderCount = await prisma.order.count()
    const orderNumber = `ORD-${String(orderCount + 1).padStart(5, '0')}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail ? customerEmail.trim() : null,
        customerAddress: customerAddress ? customerAddress.trim() : null,
        totalAmount,
        notes: notes ? notes.trim() : null,
        status: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                title: true,
                images: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 