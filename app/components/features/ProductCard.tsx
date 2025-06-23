'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/app/types'
import { Button } from '../ui/Button'
import { Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, formatPrice } from '@/app/lib/utils'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  onRequestPrice?: (product: Product) => void
  onAddToFavorites?: (productId: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onRequestPrice,
  onAddToFavorites
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    onAddToFavorites?.(product.id)
  }

  const badges = {
    new: { text: 'Новинка', className: 'bg-fire-primary' },
    hit: { text: 'Хит продаж', className: 'bg-ember' },
    sale: { text: 'Акция', className: 'bg-success' }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.images[currentImageIndex]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className={cn(
            "absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded",
            badges[product.badge].className
          )}>
            {badges[product.badge].text}
          </div>
        )}

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleFavoriteClick}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <Heart className={cn(
              "w-5 h-5 transition-colors",
              isFavorite ? "fill-ember text-ember" : "text-graphite-600"
            )} />
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onQuickView(product)
              }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <Eye className="w-5 h-5 text-graphite-600" />
            </button>
          )}
        </div>

        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex
                    ? "bg-white w-6"
                    : "bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-oswald font-medium text-xl text-graphite-800 mb-2">
          {product.title}
        </h3>

        {/* Specifications */}
        <div className="space-y-1 mb-4">
          <p className="text-sm text-graphite-600">
            <span className="font-medium">Размеры:</span> {product.specifications.dimensions}
          </p>
          <p className="text-sm text-graphite-600">
            <span className="font-medium">Материал:</span> {product.specifications.material}
          </p>
          <p className="text-sm text-graphite-600">
            <span className="font-medium">Гарантия:</span> {product.specifications.warranty}
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          {product.oldPrice && (
            <p className="text-sm text-graphite-500 line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
          <p className="font-bebas text-2xl text-fire-primary">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={() => onRequestPrice?.(product)}
        >
          Заказать
        </Button>

        {/* Stock Status */}
        <p className={cn(
          "text-xs mt-3 text-center",
          product.inStock ? "text-success" : "text-graphite-500"
        )}>
          {product.inStock ? "✓ В наличии" : "Под заказ"}
        </p>
      </div>
    </motion.div>
  )
} 