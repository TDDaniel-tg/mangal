import React, { useState } from 'react'
import { Button } from './Button'
import { Phone, Mail, MessageSquare, X } from 'lucide-react'

interface LeadFormProps {
  source: string
  productId?: string
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export const LeadForm: React.FC<LeadFormProps> = ({
  source,
  productId,
  isOpen,
  onClose,
  title = "Оставить заявку",
  description = "Заполните форму и мы свяжемся с вами в течение 15 минут"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          productId
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        })
        // Автоматически закрываем форму через 3 секунды
        setTimeout(() => {
          setIsSubmitted(false)
          onClose()
        }, 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Произошла ошибка при отправке заявки')
      }
    } catch (error) {
      setError('Произошла ошибка при отправке заявки. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Заявка отправлена!
              </h4>
              <p className="text-gray-600">
                Спасибо за вашу заявку. Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">{description}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary focus:border-transparent"
                    placeholder="Ваше имя"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary focus:border-transparent"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary focus:border-transparent resize-none"
                      placeholder="Расскажите о ваших пожеланиях..."
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="mt-6"
                >
                  {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Нажимая кнопку "Отправить заявку", вы соглашаетесь с{' '}
                <a href="/privacy" className="text-fire-primary hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 