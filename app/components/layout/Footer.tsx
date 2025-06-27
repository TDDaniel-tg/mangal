import React from 'react'
import Link from 'next/link'
import { Phone, MapPin, Clock, Flame } from 'lucide-react'

// Кастомная иконка WhatsApp
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.542"/>
  </svg>
)

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
                <WhatsAppIcon className="w-5 h-5" />
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