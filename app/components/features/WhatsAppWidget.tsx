'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/app/lib/utils'

interface WhatsAppWidgetProps {
  phoneNumber?: string
  message?: string
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '79991234567',
  message = 'Здравствуйте! Интересует мангал для дачи.'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Показываем виджет через 2 секунды после загрузки страницы
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Показываем подсказку через 5 секунд
      setTimeout(() => setShowTooltip(true), 5000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowTooltip(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute bottom-0 right-full mr-4 mb-2 whitespace-nowrap"
              >
                <div className="bg-white rounded-lg shadow-lg px-4 py-3 relative">
                  <button
                    onClick={handleCloseTooltip}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-700" />
                  </button>
                  <p className="text-sm font-medium text-graphite-800">
                    Напишите нам в WhatsApp! 👋
                  </p>
                  <p className="text-xs text-graphite-600">
                    Ответим в течение 5 минут
                  </p>
                  {/* Arrow */}
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <button
            onClick={handleClick}
            className={cn(
              "relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            )}
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle className="w-8 h-8 text-white fill-white" />
            
            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
            
            {/* Hover effect */}
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>

          {/* Fire particles around button */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-fire-primary rounded-full"
                animate={{
                  x: [0, Math.random() * 40 - 20],
                  y: [0, -Math.random() * 40 - 20],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut"
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  filter: 'blur(1px)',
                  boxShadow: '0 0 4px rgba(255, 107, 53, 0.8)'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 