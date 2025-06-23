'use client'

import React, { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { LeadModal } from '../components/features/LeadModal'

interface ConfigOption {
  id: string
  name: string
  price: number
  description?: string
}

const sizes: ConfigOption[] = [
  { id: 'small', name: 'Компактный', price: 25000, description: '60x40 см - для семьи до 4 человек' },
  { id: 'medium', name: 'Стандартный', price: 35000, description: '80x50 см - для компании до 8 человек' },
  { id: 'large', name: 'Большой', price: 50000, description: '100x60 см - для больших компаний' },
  { id: 'xl', name: 'Премиум XL', price: 75000, description: '120x80 см - для профессионального использования' }
]

const materials: ConfigOption[] = [
  { id: 'steel', name: 'Сталь 3мм', price: 0, description: 'Надежная конструкция' },
  { id: 'thick_steel', name: 'Сталь 5мм', price: 15000, description: 'Повышенная прочность' },
  { id: 'stainless', name: 'Нержавеющая сталь', price: 25000, description: 'Премиум материал' }
]

const additions: ConfigOption[] = [
  { id: 'roof', name: 'Крыша', price: 12000, description: 'Защита от дождя' },
  { id: 'chimney', name: 'Дымоход', price: 8000, description: 'Отвод дыма' },
  { id: 'table', name: 'Рабочий стол', price: 15000, description: 'Дополнительная поверхность' },
  { id: 'storage', name: 'Ящик для угля', price: 5000, description: 'Место для хранения' },
  { id: 'wheels', name: 'Колеса', price: 3000, description: 'Мобильность мангала' },
  { id: 'grill', name: 'Решетка-гриль', price: 4000, description: 'Для жарки стейков' }
]

export default function ConfiguratorPage() {
  const [selectedSize, setSelectedSize] = useState<string>('medium')
  const [selectedMaterial, setSelectedMaterial] = useState<string>('steel')
  const [selectedAdditions, setSelectedAdditions] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const calculateTotalPrice = () => {
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0
    const materialPrice = materials.find(m => m.id === selectedMaterial)?.price || 0
    const additionsPrice = selectedAdditions.reduce((sum, addId) => {
      const addition = additions.find(a => a.id === addId)
      return sum + (addition?.price || 0)
    }, 0)
    
    return sizePrice + materialPrice + additionsPrice
  }

  const toggleAddition = (additionId: string) => {
    setSelectedAdditions(prev => 
      prev.includes(additionId) 
        ? prev.filter(id => id !== additionId)
        : [...prev, additionId]
    )
  }

  const handleOrderRequest = async (data: any) => {
    // Здесь будет логика отправки заявки с конфигурацией
    console.log('Order request:', { ...data, configuration: {
      size: selectedSize,
      material: selectedMaterial,
      additions: selectedAdditions,
      totalPrice: calculateTotalPrice()
    }})
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-6">
              КОНФИГУРАТОР МАНГАЛА
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
              Создайте мангал своей мечты. Выберите размеры, материалы и дополнительные опции.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Конфигурация */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Размер */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h2 className="text-2xl font-oswald font-bold text-white mb-6">1. ВЫБЕРИТЕ РАЗМЕР</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {sizes.map((size) => (
                    <div
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSize === size.id
                          ? 'border-fire-500 bg-fire-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-oswald text-white">{size.name}</h3>
                        <span className="text-fire-500 font-bebas text-lg">
                          {size.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{size.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Материал */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h2 className="text-2xl font-oswald font-bold text-white mb-6">2. ВЫБЕРИТЕ МАТЕРИАЛ</h2>
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => setSelectedMaterial(material.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedMaterial === material.id
                          ? 'border-fire-500 bg-fire-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-oswald text-white">{material.name}</h3>
                          <p className="text-gray-300 text-sm">{material.description}</p>
                        </div>
                        <span className="text-fire-500 font-bebas text-lg">
                          {material.price > 0 ? `+${material.price.toLocaleString('ru-RU')} ₽` : 'Базовая'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Дополнительные опции */}
              <div className="bg-dark-800 rounded-lg p-6">
                <h2 className="text-2xl font-oswald font-bold text-white mb-6">3. ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {additions.map((addition) => (
                    <div
                      key={addition.id}
                      onClick={() => toggleAddition(addition.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAdditions.includes(addition.id)
                          ? 'border-fire-500 bg-fire-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-oswald text-white">{addition.name}</h3>
                        <span className="text-fire-500 font-bebas text-lg">
                          +{addition.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{addition.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Сводка заказа */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-oswald font-bold text-white mb-6">ВАША КОНФИГУРАЦИЯ</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Размер:</span>
                    <span className="text-white font-medium">
                      {sizes.find(s => s.id === selectedSize)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Материал:</span>
                    <span className="text-white font-medium">
                      {materials.find(m => m.id === selectedMaterial)?.name}
                    </span>
                  </div>
                  {selectedAdditions.length > 0 && (
                    <div>
                      <span className="text-gray-300 block mb-2">Опции:</span>
                      {selectedAdditions.map(addId => {
                        const addition = additions.find(a => a.id === addId)
                        return (
                          <div key={addId} className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">• {addition?.name}</span>
                            <span className="text-fire-400">+{addition?.price.toLocaleString('ru-RU')} ₽</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-600 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-oswald text-white">ИТОГО:</span>
                    <span className="text-2xl font-bebas text-fire-500">
                      {calculateTotalPrice().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setIsModalOpen(true)}
                >
                  ЗАКАЗАТЬ МАНГАЛ
                </Button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  * Цена может изменяться в зависимости от сложности изготовления
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="configurator"
        onSubmit={handleOrderRequest}
      />
    </div>
  )
} 