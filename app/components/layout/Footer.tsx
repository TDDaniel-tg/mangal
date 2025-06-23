import React from 'react'
import Link from 'next/link'
import { Phone, MapPin, Clock, MessageCircle, Flame } from 'lucide-react'

const navigation = {
  products: [
    { name: 'Мангалы', href: '/catalog/mangaly' },
    { name: 'Мангальные кухни', href: '/catalog/mangalnye-kuhni' },
    { name: 'Беседки', href: '/catalog/besedki' },
    { name: 'Комплексные решения', href: '/catalog/kompleksnye-resheniya' }
  ],
  company: [
    { name: 'О компании', href: '/about' },
    { name: 'Портфолио', href: '/portfolio' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contacts' }
  ],
  legal: [
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Публичная оферта', href: '/offer' },
    { name: 'Гарантия', href: '/warranty' }
  ]
}

export const Footer: React.FC = () => {
  return (
    <footer className="bg-graphite-900 text-white">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Логотип и описание */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="w-8 h-8 text-fire-primary" />
              <div>
                <h3 className="font-oswald font-bold text-lg uppercase tracking-wider">
                  Мангал Силы
                </h3>
                <p className="text-xs text-gray-400">Создаем места силы</p>
              </div>
            </div>
            <p className="text-sm text-gray-200 mb-6 font-medium">
              Производство премиальных мангалов и комплексных решений для загородного отдыха. 
              Пожизненная гарантия на всю продукцию.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/79991234567"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Продукция */}
          <div>
            <h4 className="font-oswald font-medium text-lg uppercase tracking-wide mb-4">
              Продукция
            </h4>
            <ul className="space-y-2">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-200 hover:text-fire-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h4 className="font-oswald font-medium text-lg uppercase tracking-wide mb-4">
              Компания
            </h4>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-200 hover:text-fire-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-oswald font-medium text-lg uppercase tracking-wide mb-4">
              Контакты
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+79991234567"
                className="flex items-start space-x-3 text-sm text-gray-200 hover:text-fire-primary transition-colors font-medium"
              >
                <Phone className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium">+7 (999) 123-45-67</p>
                  <p className="text-xs text-gray-400">Ежедневно с 9:00 до 20:00</p>
                </div>
              </a>
              <div className="flex items-start space-x-3 text-sm text-gray-200 font-medium">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p>г. Волгоград</p>
                  <p className="text-xs text-gray-400">Производство и шоурум</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-200 font-medium">
                <Clock className="w-4 h-4 mt-0.5" />
                <div>
                  <p>Работаем ежедневно</p>
                  <p className="text-xs text-gray-400">9:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 Мангал Силы. Все права защищены.
            </p>
            <ul className="flex space-x-6 text-sm">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 