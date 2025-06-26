import React, { useState } from 'react'
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
    <div className="min-h-screen bg-transparent py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-5xl font-oswald font-semibold uppercase tracking-wider text-white mb-4">
            {result.title}
          </h1>
          <div className="w-20 h-1 bg-fire-primary mx-auto rounded-full mb-6 shadow-lg shadow-fire-primary/50" />
          <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto">
            Мы подобрали для вас идеальное решение на основе ваших предпочтений
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden bg-gray-200">
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {validImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {validImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnail navigation */}
              {validImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {validImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-fire-primary shadow-lg shadow-fire-primary/30' 
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
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
              )}
            </motion.div>

            {/* Solution Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-6 lg:p-8 mb-8"
            >
              <h2 className="text-2xl lg:text-3xl font-oswald font-semibold uppercase tracking-wide text-white mb-4">
                {result.solution.name}
              </h2>
              
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                {result.solution.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-white mb-3">
                    Размеры
                  </h3>
                  <p className="text-slate-300 text-lg font-medium">
                    {result.solution.dimensions}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-white mb-3">
                    Стоимость
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-fire-primary">
                      {formatPrice(result.solution.estimatedPrice.min)}
                    </span>
                    <span className="text-slate-400">—</span>
                    <span className="text-2xl font-bold text-fire-primary">
                      {formatPrice(result.solution.estimatedPrice.max)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {result.solution.estimatedPrice.note}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-white mb-4">
                  Что входит в решение
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {result.solution.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-fire-primary rounded-full mr-3 flex-shrink-0 shadow-lg shadow-fire-primary/50" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>


          </div>

          {/* Actions Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-6"
              >
                <h3 className="text-xl font-oswald font-semibold uppercase tracking-wide text-white mb-6">
                  Что дальше?
                </h3>

                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => onActionClick(result.actions.primary.action)}
                    className="flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {result.actions.primary.text}
                  </Button>



                  <Button
                    variant="ghost"
                    size="lg"
                    fullWidth
                    onClick={() => onActionClick(result.actions.secondary.action)}
                    className="flex items-center justify-center text-white hover:bg-white/10"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    {result.actions.secondary.text}
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-fire-primary/20 backdrop-blur-sm rounded-lg border border-fire-primary/30">
                  <h4 className="font-oswald font-medium uppercase tracking-wide text-white mb-2">
                    🔥 Что входит в консультацию
                  </h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Выезд замерщика бесплатно</li>
                    <li>• 3D-визуализация проекта</li>
                    <li>• Точный расчет стоимости</li>
                    <li>• Консультация по размещению</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
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
  )
} 