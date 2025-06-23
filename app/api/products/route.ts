import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check if database is connected
    if (!prisma) {
      console.error('Database connection not available')
      return NextResponse.json([], {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const featured = searchParams.get('featured')

    const products = await prisma.product.findMany({
      where: {
        ...(categoryId && { categoryId }),
        ...(featured === 'true' && { featured: true }),
        inStock: true
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Convert BigInt to numbers for JSON serialization and ensure safe data
    const serializedProducts = (Array.isArray(products) ? products : []).map(product => ({
      ...product,
      price: Number(product.price || 0),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      title: product.title || 'Мангал',
      images: product.images || '[]',
      specifications: product.specifications || '{}',
      inStock: product.inStock ?? true
    }))

    return NextResponse.json(serializedProducts, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    
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
    const {
      title,
      slug,
      description,
      images,
      price,
      oldPrice,
      badge,
      specifications,
      categoryId,
      inStock = true,
      featured = false
    } = body

    // Validation
    const errors: string[] = []

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Название товара обязательно')
    }

    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      errors.push('URL (slug) обязателен')
    }

    if (!categoryId || typeof categoryId !== 'string') {
      errors.push('Категория обязательна')
    }

    if (!price || typeof price !== 'number' || price <= 0) {
      errors.push('Цена должна быть положительным числом')
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      errors.push('Добавьте хотя бы одно изображение')
    }

    if (oldPrice && (typeof oldPrice !== 'number' || oldPrice <= price)) {
      errors.push('Старая цена должна быть больше текущей цены')
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      )
    }

    // Check if category exists
    try {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      })
      
      if (!category) {
        return NextResponse.json(
          { error: 'Выбранная категория не существует' },
          { status: 400 }
        )
      }
    } catch (categoryError) {
      console.error('Error checking category:', categoryError)
      return NextResponse.json(
        { error: 'Ошибка при проверке категории' },
        { status: 500 }
      )
    }

    // Check if slug is unique
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { slug: slug.trim() }
      })
      
      if (existingProduct) {
        return NextResponse.json(
          { error: 'Товар с таким URL уже существует' },
          { status: 400 }
        )
      }
    } catch (slugError) {
      console.error('Error checking slug:', slugError)
      return NextResponse.json(
        { error: 'Ошибка при проверке URL' },
        { status: 500 }
      )
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        description: description ? description.trim() : null,
        images: JSON.stringify(images),
        price: BigInt(Math.round(price * 100)), // Convert to kopecks
        oldPrice: oldPrice ? BigInt(Math.round(oldPrice * 100)) : null,
        badge: badge || null,
        specifications: JSON.stringify(specifications || {}),
        categoryId,
        inStock,
        featured
      },
      include: {
        category: true
      }
    })

    // Convert BigInt to numbers for JSON serialization
    const serializedProduct = {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null
    }

    return NextResponse.json(serializedProduct, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error creating product:', error)
    
    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Товар с таким URL уже существует' },
          { status: 400 }
        )
      }
      
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Выбранная категория не существует' },
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