import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        category: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Convert BigInt to numbers for JSON serialization
    const serializedProduct = {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null
    }

    return NextResponse.json(serializedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
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
    const { id } = await params
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

    const product = await prisma.product.update({
      where: {
        id: id
      },
      data: {
        title,
        slug,
        description,
        images: JSON.stringify(images),
        price: Math.round(price * 100), // Convert to kopecks
        oldPrice: oldPrice ? Math.round(oldPrice * 100) : null,
        badge,
        specifications: JSON.stringify(specifications),
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

    return NextResponse.json(serializedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
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
    const { id } = await params
    
    // Проверяем существование продукта
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: id
      }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      )
    }

    // Сначала удаляем все связанные записи в заказах
    await prisma.orderItem.deleteMany({
      where: {
        productId: id
      }
    })

    // Теперь удаляем продукт
    await prisma.product.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Товар и связанные записи успешно удалены'
    })
  } catch (error: any) {
    console.error('Error deleting product:', error)
    
    // Проверяем конкретные ошибки Prisma
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      )
    }
    
    if (error?.code === 'P2014') {
      return NextResponse.json(
        { error: 'Невозможно удалить товар, так как он связан с заказами' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Ошибка при удалении товара' },
      { status: 500 }
    )
  }
} 