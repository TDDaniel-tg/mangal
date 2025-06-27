import React, { useState, useEffect } from 'react'
import { QuizResult as QuizResultType } from '../../types/configurator'
import { Button } from '../../components/ui/Button'
import { motion } from 'framer-motion'
import { Download, RefreshCw, MessageCircle, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'

interface QuizResultProps {
  result: QuizResultType
  onActionClick: (action: string) => void
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onActionClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [validImages, setValidImages] = useState<string[]>(result.gallery.images)

  // Принудительно устанавливаем темную тему
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'
    document.body.style.backgroundColor = '#0f172a'
    document.body.style.color = 'white'
    
    return () => {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = ''
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === validImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? validImages.length - 1 : prev - 1
    )
  }

  const handleImageError = (failedImageIndex: number) => {
    setValidImages(prev => prev.filter((_, index) => index !== failedImageIndex))
    if (currentImageIndex >= validImages.length - 1) {
      setCurrentImageIndex(0)
    }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  return (
    <>
      {/* iOS Dark Theme Styles */}
      <style jsx global>{`
        html, body {
          background-color: #0f172a !important;
          color: white !important;
          color-scheme: dark !important;
          overflow-x: hidden !important;
        }
        @supports (-webkit-appearance: none) {
          html, body {
            background-color: #0f172a !important;
            color: white !important;
          }
        }
      `}</style>
      
      <div className="min-h-screen pt-24 py-8 relative z-20" 
           style={{ backgroundColor: '#0f172a', overflowX: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ overflowX: 'hidden' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-oswald font-semibold uppercase tracking-wider text-white mb-4">
              {result.title}
            </h1>
            <div className="w-20 h-1 mx-auto rounded-full mb-6 shadow-lg"
                 style={{ backgroundColor: '#f97316', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.5)' }} />
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto px-4">
              Мы подобрали для вас идеальное решение на основе ваших предпочтений
            </p>
          </motion.div>

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8" style={{ maxWidth: '100%' }}>
            {/* Main Content */}
            <div className="lg:col-span-8 w-full" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mb-6 md:mb-8 w-full"
                style={{ maxWidth: '100%' }}
              >
                <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden bg-gray-200 w-full">
                  {validImages.length > 0 && (
                    <ImageWithFallback
                      src={validImages[currentImageIndex]}
                      alt={result.solution.name}
                      fallbackText={result.solution.name}
                      className="object-cover transition-opacity duration-300"
                    />
                  )}
                  
                  {/* Navigation arrows */}
                  {validImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {validImages.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {currentImageIndex + 1} / {validImages.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail navigation - только на desktop */}
                {validImages.length > 1 && (
                  <div className="hidden md:flex gap-2 mt-4 overflow-x-auto pb-2 w-full" style={{ maxWidth: '100%' }}>
                    <div className="flex gap-2 w-full" style={{ minWidth: 'max-content' }}>
                      {validImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-16 sm:w-20 h-12 sm:h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                            index === currentImageIndex 
                              ? 'shadow-lg' 
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          style={{ 
                            borderColor: index === currentImageIndex ? '#f97316' : '#475569',
                            boxShadow: index === currentImageIndex ? '0 4px 20px rgba(249, 115, 22, 0.3)' : undefined
                          }}
                        >
                          <ImageWithFallback
                            src={image}
                            alt={`Вариант ${index + 1}`}
                            fallbackText={`Вариант ${index + 1}`}
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Solution Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-lg shadow-xl border border-white/10 p-4 sm:p-6 lg:p-8 mb-6 md:mb-8 w-full"
                style={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                  backdropFilter: 'blur(8px)',
                  maxWidth: '100%',
                  overflowX: 'hidden'
                }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-oswald font-semibold uppercase tracking-wide text-white mb-4">
                  {result.solution.name}
                </h2>
                
                <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                  {result.solution.description}
                </p>

                <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-oswald font-medium uppercase tracking-wide text-white mb-3">
                      Размеры
                    </h3>
                    <p className="text-slate-300 text-base sm:text-lg font-medium">
                      {result.solution.dimensions}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-oswald font-medium uppercase tracking-wide text-white mb-3">
                      Стоимость
                    </h3>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold" style={{ color: '#f97316' }}>
                        {formatPrice(result.solution.estimatedPrice.min)}
                      </span>
                      <span className="text-slate-400">—</span>
                      <span className="text-xl sm:text-2xl font-bold" style={{ color: '#f97316' }}>
                        {formatPrice(result.solution.estimatedPrice.max)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      {result.solution.estimatedPrice.note}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-base sm:text-lg font-oswald font-medium uppercase tracking-wide text-white mb-4">
                    Что входит в решение
                  </h3>
                  <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-2">
                    {result.solution.features.map((feature, index) => (
                      <div key={index} className="flex items-center w-full" style={{ maxWidth: '100%' }}>
                        <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 shadow-lg" 
                             style={{ backgroundColor: '#f97316', boxShadow: '0 2px 10px rgba(249, 115, 22, 0.5)' }} />
                        <span className="text-slate-300 text-sm sm:text-base break-words">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Actions Sidebar */}
            <div className="lg:col-span-4 w-full">
              <div className="lg:sticky lg:top-8 w-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="rounded-lg shadow-xl border border-white/10 p-4 sm:p-6 w-full"
                  style={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                    backdropFilter: 'blur(8px)',
                    maxWidth: '100%'
                  }}
                >
                  <h3 className="text-lg sm:text-xl font-oswald font-semibold uppercase tracking-wide text-white mb-4 sm:mb-6">
                    Что дальше?
                  </h3>

                  <div className="space-y-3 sm:space-y-4 w-full">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => onActionClick(result.actions.primary.action)}
                      className="flex items-center justify-center w-full"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {result.actions.primary.text}
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      fullWidth
                      onClick={() => onActionClick(result.actions.secondary.action)}
                      className="flex items-center justify-center text-white hover:bg-white/10 w-full"
                    >
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {result.actions.secondary.text}
                    </Button>
                  </div>

                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg border w-full"
                       style={{ 
                         backgroundColor: 'rgba(249, 115, 22, 0.2)', 
                         backdropFilter: 'blur(4px)',
                         borderColor: 'rgba(249, 115, 22, 0.3)'
                       }}>
                    <h4 className="font-oswald font-medium uppercase tracking-wide text-white mb-2 text-sm sm:text-base">
                      🔥 Что входит в консультацию
                    </h4>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-1">
                      <li>• Выезд замерщика бесплатно</li>
                      <li>• 3D-визуализация проекта</li>
                      <li>• Точный расчет стоимости</li>
                      <li>• Консультация по размещению</li>
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-xs text-slate-400">
                      Результат сохранен и отправлен вам на почту
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 