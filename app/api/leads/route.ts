import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    // Временно возвращаем пустой массив для тестирования
    console.log('Returning empty leads array for testing')
    return NextResponse.json([])
    
    /* Закомментированный код с базой данных:
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(leads)
    */
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message, source, productId } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Имя обязательно' },
        { status: 400 }
      )
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json(
        { error: 'Телефон обязателен' },
        { status: 400 }
      )
    }

    if (!source || typeof source !== 'string' || source.trim().length === 0) {
      return NextResponse.json(
        { error: 'Источник заявки обязателен' },
        { status: 400 }
      )
    }

    // Временно возвращаем успешный ответ без сохранения в базу
    console.log('Lead received:', { name, phone, email, message, source, productId })
    
    const mockLead = {
      id: 'mock-' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      message: message ? message.trim() : null,
      source: source.trim(),
      productId: productId || null,
      status: 'NEW' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(mockLead, { status: 201 })

    /* Закомментированный код с базой данных:
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        message: message ? message.trim() : null,
        source: source.trim(),
        productId: productId || null,
        status: 'NEW'
      }
    })

    return NextResponse.json(lead, { status: 201 })
    */
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 