import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    
    const image = await prisma.image.findUnique({
      where: { id }
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Изображение не найдено' },
        { status: 404 }
      )
    }

    // Извлекаем Base64 данные
    const base64Data = image.data.split(',')[1] // убираем "data:image/...;base64,"
    const buffer = Buffer.from(base64Data, 'base64')

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': image.mimeType,
        'Cache-Control': 'public, max-age=31536000', // кэшируем на год
        'Content-Length': buffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Error fetching image:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении изображения' },
      { status: 500 }
    )
  }
} 