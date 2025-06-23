'use client'

import React, { useEffect } from 'react'
import { X, Phone, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '../ui/Button'
import { cn, phoneMask } from '@/app/lib/utils'
import Image from 'next/image'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  source: string
  product?: {
    id: string
    name: string
    image: string
    price: number
  }
  onSubmit?: (data: LeadFormData) => Promise<void>
}

interface LeadFormData {
  name: string
  phone: string
  message?: string
}

const schema = yup.object().shape({
  name: yup.string().required('Введите ваше имя').min(2, 'Имя слишком короткое'),
  phone: yup.string()
    .required('Введите номер телефона')
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  message: yup.string().optional()
})

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmit
}) => {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<LeadFormData>({
    resolver: yupResolver(schema)
  })

  const phoneValue = watch('phone')

  // Обработка маски телефона
  React.useEffect(() => {
    if (phoneValue) {
      const masked = phoneMask(phoneValue)
      if (masked !== phoneValue) {
        setValue('phone', masked)
      }
    }
  }, [phoneValue, setValue])

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleFormSubmit: SubmitHandler<LeadFormData> = async (data) => {
    setIsLoading(true)
    try {
      await onSubmit?.(data)
      setIsSuccess(true)
      reset()
      // Автозакрытие через 5 секунд
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container - центрируем по экрану */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-graphite-600" />
              </button>

              {/* Content */}
              <div className="p-8">
                {!isSuccess ? (
                  <>
                    <h2 className="text-2xl md:text-3xl font-oswald font-semibold uppercase tracking-wide text-graphite-900 mb-2 text-center">
                      Оставить заявку
                    </h2>
                    <p className="text-graphite-600 text-center mb-6">
                      Мы свяжемся с вами в течение 15 минут
                    </p>

                    {/* Product preview if exists */}
                    {product && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center space-x-4">
                        <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-graphite-800">{product.name}</h4>
                          <p className="text-fire-primary font-bebas text-lg">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-graphite-700 mb-1">
                          Ваше имя
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-md transition-colors text-graphite-800",
                            errors.name 
                              ? "border-ember focus:border-ember" 
                              : "border-gray-200 focus:border-fire-primary"
                          )}
                          placeholder="Иван"
                        />
                        {errors.name && (
                          <p className="text-ember text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-graphite-700 mb-1">
                          Телефон
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className={cn(
                            "w-full px-4 py-3 border-2 rounded-md transition-colors text-graphite-800",
                            errors.phone 
                              ? "border-ember focus:border-ember" 
                              : "border-gray-200 focus:border-fire-primary"
                          )}
                          placeholder="+7 (999) 123-45-67"
                        />
                        {errors.phone && (
                          <p className="text-ember text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-graphite-700 mb-1">
                          Сообщение (необязательно)
                        </label>
                        <textarea
                          {...register('message')}
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-fire-primary transition-colors resize-none text-graphite-800"
                          placeholder="Интересует мангал для дачи..."
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        size="lg"
                        loading={isLoading}
                        icon={<Phone className="w-4 h-4" />}
                      >
                        Отправить заявку
                      </Button>

                      <p className="text-xs text-center text-graphite-700 mt-4">
                        Нажимая кнопку, вы соглашаетесь с{' '}
                        <a href="/privacy" className="text-fire-primary hover:underline">
                          политикой конфиденциальности
                        </a>
                      </p>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-oswald font-semibold uppercase tracking-wide text-graphite-900 mb-2">
                      Спасибо за заявку!
                    </h3>
                    <p className="text-graphite-600">
                      Наш менеджер свяжется с вами в течение 15 минут
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 