'use client'

import React, { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { LeadModal } from '../components/features/LeadModal'
import Image from 'next/image'

interface PortfolioItem {
  id: string
  title: string
  category: string
  price: string
  description: string
  image: string
  features: string[]
  location: string
  year: string
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'Мангал "Брутальный XL"',
    category: 'premium',
    price: 'от 75 000 ₽',
    description: 'Премиальный мангал из нержавеющей стали с дымоходом и рабочим столом',
    image: '/main.jpg',
    features: ['Нержавеющая сталь 5мм', 'Дымоход', 'Рабочий стол', 'Ящик для угля'],
    location: 'Московская область',
    year: '2024'
  },
  {
    id: '2',
    title: 'Мангал "Семейный"',
    category: 'standard',
    price: 'от 35 000 ₽',
    description: 'Классический мангал для семейных посиделок на даче',
    image: '/main.jpg',
    features: ['Сталь 3мм', 'Складные ножки', 'Регулируемая высота'],
    location: 'Подмосковье',
    year: '2024'
  },
  {
    id: '3',
    title: 'Мангал-комплекс "Барбекю Зона"',
    category: 'complex',
    price: 'от 120 000 ₽',
    description: 'Полноценная кулинарная зона с мангалом, грилем и рабочей поверхностью',
    image: '/main.jpg',
    features: ['Кирпичная кладка', 'Встроенный гриль', 'Мойка', 'Столешница из камня'],
    location: 'Рублево-Успенское',
    year: '2023'
  },
  {
    id: '4',
    title: 'Мангал "Походный"',
    category: 'portable',
    price: 'от 15 000 ₽',
    description: 'Компактный разборный мангал для выездов на природу',
    image: '/main.jpg',
    features: ['Разборная конструкция', 'Легкий алюминий', 'Кейс для переноски'],
    location: 'Москва',
    year: '2024'
  },
  {
    id: '5',
    title: 'Мангал "Ресторанный"',
    category: 'commercial',
    price: 'от 200 000 ₽',
    description: 'Профессиональный мангал для ресторанов и кафе',
    image: '/main.jpg',
    features: ['Нержавеющая сталь', 'Промышленная вытяжка', 'Система подачи газа'],
    location: 'Центр Москвы',
    year: '2023'
  },
  {
    id: '6',
    title: 'Мангал "Дачный Стандарт"',
    category: 'standard',
    price: 'от 25 000 ₽',
    description: 'Надежный мангал для постоянного использования на даче',
    image: '/main.jpg',
    features: ['Сталь 3мм', 'Антикоррозийное покрытие', 'Съемная решетка'],
    location: 'Калужская область',
    year: '2024'
  }
]

const categories = [
  { id: 'all', name: 'Все проекты' },
  { id: 'standard', name: 'Стандартные' },
  { id: 'premium', name: 'Премиум' },
  { id: 'complex', name: 'Комплексы' },
  { id: 'portable', name: 'Портативные' },
  { id: 'commercial', name: 'Коммерческие' }
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredPortfolio = portfolioData.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  )

  const handleOrderSimilar = async (data: any) => {
    console.log('Order similar request:', { ...data, referenceProject: selectedItem?.id })
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-6">
              ПОРТФОЛИО
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
              Наши лучшие проекты - от простых мангалов до комплексных кулинарных зон.
            </p>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-oswald transition-all ${
                  selectedCategory === category.id
                    ? 'bg-fire-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Галерея */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="bg-dark-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-fire-500 text-white px-3 py-1 rounded-full text-sm font-oswald">
                    {item.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-oswald font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{item.location}</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Статистика */}
          <div className="bg-dark-800 rounded-lg p-8 mt-16">
            <h2 className="text-3xl font-oswald font-bold text-white text-center mb-8">
              НАШИ ДОСТИЖЕНИЯ
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bebas text-fire-500 mb-2">500+</div>
                <div className="text-gray-300">Готовых мангалов</div>
              </div>
              <div>
                <div className="text-4xl font-bebas text-fire-500 mb-2">8</div>
                <div className="text-gray-300">Лет опыта</div>
              </div>
              <div>
                <div className="text-4xl font-bebas text-fire-500 mb-2">98%</div>
                <div className="text-gray-300">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-4xl font-bebas text-fire-500 mb-2">30</div>
                <div className="text-gray-300">Дней гарантии</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Модальное окно детального просмотра */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-dark-900/80 rounded-full text-white hover:bg-dark-900 transition-colors"
              >
                ✕
              </button>
              <div className="relative h-80">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-oswald font-bold text-white mb-4">
                {selectedItem.title}
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                {selectedItem.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-oswald text-white mb-4">ХАРАКТЕРИСТИКИ</h3>
                  <ul className="space-y-2">
                    {selectedItem.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-fire-500 mr-3">🔥</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-oswald text-white mb-4">ДЕТАЛИ ПРОЕКТА</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Локация:</span>
                      <span className="text-white">{selectedItem.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Год:</span>
                      <span className="text-white">{selectedItem.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Стоимость:</span>
                      <span className="text-fire-500 font-bebas text-lg">{selectedItem.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setSelectedItem(null)
                    setIsModalOpen(true)
                  }}
                >
                  ЗАКАЗАТЬ ПОХОЖИЙ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="portfolio"
        onSubmit={handleOrderSimilar}
      />
    </div>
  )
} 