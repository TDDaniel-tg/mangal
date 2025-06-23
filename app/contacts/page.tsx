'use client'

import React, { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { LeadModal } from '../components/features/LeadModal'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    // Здесь будет логика отправки формы
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleQuickOrder = async (data: any) => {
    console.log('Quick order from contacts:', data)
  }

  const contacts = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Телефон',
      info: '+7 (495) 123-45-67',
      description: 'Ежедневно с 9:00 до 21:00'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      info: 'info@mangal-sily.ru',
      description: 'Ответим в течение часа'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Адрес',
      info: 'Москва, ул. Мангальная, 15',
      description: 'Производственная база'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Режим работы',
      info: 'Пн-Пт: 9:00-21:00',
      description: 'Сб-Вс: 10:00-18:00'
    }
  ]

  const offices = [
    {
      city: 'Москва',
      address: 'ул. Мангальная, 15',
      phone: '+7 (495) 123-45-67',
      hours: 'Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-18:00',
      description: 'Главный офис и производственная база'
    },
    {
      city: 'Санкт-Петербург',
      address: 'пр. Огненный, 8',
      phone: '+7 (812) 987-65-43',
      hours: 'Пн-Пт: 10:00-20:00, Сб-Вс: 11:00-17:00',
      description: 'Региональный офис и шоурум'
    },
    {
      city: 'Екатеринбург',
      address: 'ул. Гриль-Зона, 22',
      phone: '+7 (343) 555-77-99',
      hours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-16:00',
      description: 'Представительство в УФО'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-6">
              КОНТАКТЫ
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
              Мы всегда готовы помочь вам выбрать идеальный мангал и ответить на любые вопросы.
            </p>
          </div>

          {/* Основные контакты */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-dark-800 rounded-lg p-6 text-center">
                <div className="text-fire-500 mb-4 flex justify-center">
                  {contact.icon}
                </div>
                <h3 className="text-lg font-oswald font-bold text-white mb-2">
                  {contact.title}
                </h3>
                <p className="text-white font-medium mb-2">
                  {contact.info}
                </p>
                <p className="text-gray-400 text-sm">
                  {contact.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Форма обратной связи */}
            <div className="bg-dark-800 rounded-lg p-8">
              <h2 className="text-3xl font-oswald font-bold text-white mb-6">
                НАПИСАТЬ НАМ
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-fire-500 focus:outline-none transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-fire-500 focus:outline-none transition-colors"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-fire-500 focus:outline-none transition-colors"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Тема обращения
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-fire-500 focus:outline-none transition-colors"
                    >
                      <option value="">Выберите тему</option>
                      <option value="order">Заказ мангала</option>
                      <option value="consultation">Консультация</option>
                      <option value="warranty">Гарантия и сервис</option>
                      <option value="cooperation">Сотрудничество</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white focus:border-fire-500 focus:outline-none transition-colors resize-none"
                    placeholder="Расскажите подробнее о вашем запросе..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<Send className="w-4 h-4" />}
                >
                  ОТПРАВИТЬ СООБЩЕНИЕ
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  * Обязательные поля для заполнения
                </p>
              </form>
            </div>

            {/* Быстрый заказ и карта */}
            <div className="space-y-8">
              {/* Быстрый заказ */}
              <div className="bg-fire-500 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-oswald font-bold text-white mb-4">
                  СРОЧНЫЙ ЗАКАЗ?
                </h3>
                <p className="text-white/90 mb-6">
                  Нужен мангал быстро? Оставьте заявку и мы перезвоним в течение 15 минут!
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  БЫСТРЫЙ ЗАКАЗ
                </Button>
              </div>

              {/* Карта (заглушка) */}
              <div className="bg-dark-800 rounded-lg p-8">
                <h3 className="text-2xl font-oswald font-bold text-white mb-4">
                  КАК НАС НАЙТИ
                </h3>
                <div className="h-64 bg-dark-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-fire-500 mx-auto mb-2" />
                    <p className="text-gray-300">Интерактивная карта</p>
                    <p className="text-gray-400 text-sm">будет добавлена позже</p>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  <p className="mb-2"><strong>Адрес:</strong> Москва, ул. Мангальная, 15</p>
                  <p><strong>Ближайшее метро:</strong> Огненная (5 мин пешком)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Офисы в других городах */}
          <div className="mb-16">
            <h2 className="text-3xl font-oswald font-bold text-white text-center mb-8">
              НАШИ ОФИСЫ В ДРУГИХ ГОРОДАХ
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <div key={index} className="bg-dark-800 rounded-lg p-6">
                  <h3 className="text-xl font-oswald font-bold text-fire-500 mb-4">
                    {office.city}
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-fire-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-fire-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{office.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-4 h-4 text-fire-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{office.hours}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">{office.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-dark-800 rounded-lg p-8">
            <h2 className="text-3xl font-oswald font-bold text-white text-center mb-8">
              ЧАСТЫЕ ВОПРОСЫ
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-oswald text-white mb-2">
                    Сколько времени занимает изготовление?
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Стандартный мангал изготавливается за 3-5 рабочих дней. 
                    Сложные конфигурации могут занять до 2 недель.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-oswald text-white mb-2">
                    Есть ли доставка в регионы?
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Да, мы доставляем по всей России. Стоимость зависит от региона и веса мангала.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-oswald text-white mb-2">
                    Какая гарантия на мангалы?
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Мы даем гарантию 2 года на все сварные швы и конструкцию мангала.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-oswald text-white mb-2">
                    Можно ли заказать по своим размерам?
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Конечно! Мы изготавливаем мангалы по индивидуальным чертежам и размерам.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-oswald text-white mb-2">
                    Какие способы оплаты вы принимаете?
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Наличные, банковские карты, безналичный расчет для юридических лиц.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-oswald text-white mb-2">
                    Делаете ли вы ремонт мангалов?
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Да, мы ремонтируем мангалы любых производителей. Звоните для консультации.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="contacts"
        onSubmit={handleQuickOrder}
      />
    </div>
  )
} 