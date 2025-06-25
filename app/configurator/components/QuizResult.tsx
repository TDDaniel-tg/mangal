import React, { useState } from 'react'
import { QuizResult as QuizResultType } from '../../types/configurator'
import { Button } from '../../components/ui/Button'
import { motion } from 'framer-motion'
import { Download, RefreshCw, MessageCircle, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface QuizResultProps {
  result: QuizResultType
  onActionClick: (action: string) => void
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onActionClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === result.gallery.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? result.gallery.images.length - 1 : prev - 1
    )
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-5xl font-oswald font-semibold uppercase tracking-wider text-graphite-900 mb-4">
            {result.title}
          </h1>
          <div className="w-20 h-1 bg-fire-primary mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
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
                <Image
                  src={result.gallery.images[currentImageIndex]}
                  alt={result.solution.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  onError={(e) => {
                    // Fallback image
                    e.currentTarget.src = '/configurator/result-fallback.jpg'
                  }}
                />
                
                {/* Navigation arrows */}
                {result.gallery.images.length > 1 && (
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
                {result.gallery.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {result.gallery.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail navigation */}
              {result.gallery.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {result.gallery.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-fire-primary' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Вариант ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/configurator/result-fallback.jpg'
                        }}
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
              className="bg-white rounded-lg shadow-sm border p-6 lg:p-8 mb-8"
            >
              <h2 className="text-2xl lg:text-3xl font-oswald font-semibold uppercase tracking-wide text-graphite-900 mb-4">
                {result.solution.name}
              </h2>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {result.solution.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-3">
                    Размеры
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    {result.solution.dimensions}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-3">
                    Стоимость
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-fire-primary">
                      {formatPrice(result.solution.estimatedPrice.min)}
                    </span>
                    <span className="text-gray-500">—</span>
                    <span className="text-2xl font-bold text-fire-primary">
                      {formatPrice(result.solution.estimatedPrice.max)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {result.solution.estimatedPrice.note}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-4">
                  Что входит в решение
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {result.solution.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-fire-primary rounded-full mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Similar Projects */}
            {result.similarProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm border p-6 lg:p-8"
              >
                <h3 className="text-xl lg:text-2xl font-oswald font-semibold uppercase tracking-wide text-graphite-900 mb-6">
                  Похожие реализованные проекты
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {result.similarProjects.map((project) => (
                    <div key={project.id} className="group">
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/portfolio/project-fallback.jpg'
                          }}
                        />
                      </div>
                      <h4 className="font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-2">
                        {project.title}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-fire-primary font-semibold">{project.price}</span>
                        <a
                          href={project.link}
                          className="text-gray-500 hover:text-fire-primary transition-colors flex items-center text-sm"
                        >
                          Подробнее
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Actions Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h3 className="text-xl font-oswald font-semibold uppercase tracking-wide text-graphite-900 mb-6">
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
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={() => onActionClick(result.actions.tertiary.action)}
                    className="flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {result.actions.tertiary.text}
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    fullWidth
                    onClick={() => onActionClick(result.actions.secondary.action)}
                    className="flex items-center justify-center"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    {result.actions.secondary.text}
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-fire-primary/5 rounded-lg">
                  <h4 className="font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-2">
                    🔥 Что входит в консультацию
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Выезд замерщика бесплатно</li>
                    <li>• 3D-визуализация проекта</li>
                    <li>• Точный расчет стоимости</li>
                    <li>• Консультация по размещению</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
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