import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    console.log('Attempting to fetch orders...')
    
    // Временно возвращаем пустой массив для тестирования
    console.log('Returning empty orders array for testing')
    return NextResponse.json([])
    
    /* Закомментированный код с базой данных:
    // Сначала проверим подключение к базе
    await prisma.$connect()
    console.log('Database connected successfully')
    
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

    console.log(`Found ${orders.length} orders`)
    return NextResponse.json(orders)
    */
  } catch (error) {
    console.error('Detailed error fetching orders:', error)
    
    // Более детальная обработка ошибок
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
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