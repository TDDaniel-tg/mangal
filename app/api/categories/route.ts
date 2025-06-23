import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    // Check if database is connected
    if (!prisma) {
      console.error('Database connection not available')
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 503 }
      )
    }

    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    // Ensure we return an array
    const safeCategories = Array.isArray(categories) ? categories : []
    
    return NextResponse.json(safeCategories, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    
    // Return empty array as fallback instead of error
    return NextResponse.json([], {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if database is connected
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, slug, description, image } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Название категории обязательно' },
        { status: 400 }
      )
    }

    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json(
        { error: 'URL (slug) обязателен' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: slug.trim(),
        description: description ? description.trim() : null,
        image: image || null
      }
    })

    return NextResponse.json(category, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error creating category:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Категория с таким URL уже существует' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 