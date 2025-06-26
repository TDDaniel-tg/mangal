'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Image as ImageIcon } from 'lucide-react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackText?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  fill = true,
  width,
  height,
  priority = false,
  sizes
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  if (imageError) {
    return null // Не показываем заглушку, просто пропускаем изображение
  }

  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="animate-pulse">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
      />
    </>
  )
} 