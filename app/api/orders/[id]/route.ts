import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
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

    if (!order) {
      return NextResponse.json(
        { error: 'Заказ не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { 
      status, 
      customerName, 
      customerPhone, 
      customerEmail, 
      customerAddress, 
      notes 
    } = body

    const updateData: any = {}
    
    if (status) updateData.status = status
    if (customerName) updateData.customerName = customerName.trim()
    if (customerPhone) updateData.customerPhone = customerPhone.trim()
    if (customerEmail !== undefined) updateData.customerEmail = customerEmail ? customerEmail.trim() : null
    if (customerAddress !== undefined) updateData.customerAddress = customerAddress ? customerAddress.trim() : null
    if (notes !== undefined) updateData.notes = notes ? notes.trim() : null

    const order = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Delete order items first (cascade should handle this, but let's be explicit)
    await prisma.orderItem.deleteMany({
      where: { orderId: params.id }
    })

    // Delete the order
    await prisma.order.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 