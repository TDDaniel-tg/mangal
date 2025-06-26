import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Проверяем подключение
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // Пробуем простой запрос
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Query result:', result)
    
    // Проверяем таблицы
    const orders = await prisma.order.count()
    const products = await prisma.product.count()
    const categories = await prisma.category.count()
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection works',
      counts: {
        orders,
        products, 
        categories
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    
    return NextResponse.json(
      { 
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error
      },
      { status: 500 }
    )
  }
} 