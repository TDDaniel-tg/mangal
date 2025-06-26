'use client'

import React, { useState, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/features/HeroSection'
import { ProductCard } from './components/features/ProductCard'
import { LeadForm } from './components/ui/LeadForm'
import { useLeadForm } from './hooks/useLeadForm'
import { WhatsAppWidget } from './components/features/WhatsAppWidget'
import { Button } from './components/ui/Button'
import { Product } from './types'
import { Flame, Shield, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface DbProduct {
  id: string
  title: string
  slug: string
  description?: string
  images: string
  price: number
  oldPrice?: number
  badge?: string
  specifications: string
  inStock: boolean
  featured: boolean
  categoryId: string
  category: {
    name: string
    slug: string
  }
}

export default function Home() {
  const leadForm = useLeadForm({ defaultSource: 'homepage' })
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      const safeData = Array.isArray(data) ? data : []
      setDbProducts(safeData)
    } catch (error) {
      console.error('Error fetching products:', error)
      setDbProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleRequestPrice = (product: Product) => {
    setSelectedProduct(product)
    leadForm.openForm('product', product.id)
  }

  // Convert DbProduct to Product for component compatibility
  const convertDbProductToProduct = (dbProduct: DbProduct): Product => {
    const parseJsonSafely = (jsonString: string, fallback: any = {}) => {
      try {
        return JSON.parse(jsonString || '{}')
      } catch {
        return fallback
      }
    }

    return {
      id: dbProduct.id,
      title: dbProduct.title || 'Мангал',
      images: parseJsonSafely(dbProduct.images, ['/main.jpg']),
      price: Math.round((dbProduct.price || 0) / 100), // Convert from kopecks safely
      oldPrice: dbProduct.oldPrice ? Math.round(dbProduct.oldPrice / 100) : undefined,
      badge: dbProduct.badge as 'new' | 'hit' | 'sale' | undefined,
      specifications: parseJsonSafely(dbProduct.specifications, {}),
      inStock: dbProduct.inStock ?? true,
      category: (dbProduct.category?.slug || 'mangaly') as 'mangaly' | 'mangalnye-kuhni' | 'besedki',
      description: dbProduct.description
    }
  }

  return (
    <>
      <Header transparent sticky />
      
      {/* Hero Section */}
      <HeroSection
        imageFallback="/main.jpg"
        title="СОЗДАЕМ МЕСТА СИЛЫ ДЛЯ ВАШЕЙ ДАЧИ"
        subtitle="Премиальные мангалы и комплексные решения для загородного отдыха"
        ctaButtons={[
          {
            text: 'Смотреть каталог',
            variant: 'primary',
            href: '/catalog'
          },
          {
            text: 'Получить консультацию',
            variant: 'ghost',
            onClick: () => leadForm.openForm('hero')
          }
        ]}
      />

      {/* Преимущества */}
      <section className="section bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald font-semibold uppercase tracking-wider text-graphite-900 mb-4">
                Почему выбирают нас
              </h2>
            <div className="fire-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Flame className="w-12 h-12" />,
                title: 'Огонь идей',
                description: 'Воплощаем самые смелые идеи в металле. Каждый проект уникален и создается с душой.'
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'Пожизненная гарантия',
                description: 'Пока я жив - помогу с любым вопросом. Это не просто слова, а философия бизнеса.'
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: 'Для своих',
                description: 'Работаем как братья, по-человечески. Каждый клиент становится частью нашей семьи.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-fire-primary/10 text-fire-primary">
                  {item.icon}
                </div>
                                  <h3 className="text-xl md:text-2xl font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-3">
                    {item.title}
                  </h3>
                <p className="text-graphite-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="section bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald font-semibold uppercase tracking-wider text-white mb-4">
                Популярные решения
              </h2>
            <div className="fire-divider" />
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Каждое изделие создается вручную с учетом ваших пожеланий и особенностей участка
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbProducts.map((dbProduct, index) => {
              if (!dbProduct?.id) return null
              
              const product = convertDbProductToProduct(dbProduct)
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard
                    product={product}
                    onRequestPrice={handleRequestPrice}
                  />
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <a href="/catalog">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Смотреть весь каталог
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Конфигуратор секция */}
      <section className="section bg-gradient-to-br from-fire-primary/10 via-white to-fire-primary/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald font-semibold uppercase tracking-wider text-graphite-900 mb-6">
              Подберём варианты мангальной зоны по параметрам
            </h2>
            <div className="fire-divider mb-8" />
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-graphite-600 leading-relaxed">
                Расскажите про ваше место и получите персональные рекомендации с расчетом стоимости. 
                Наш конфигуратор поможет создать идеальную мангальную зону именно для вашего участка.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  number: '01',
                  title: 'Расскажите о месте',
                  description: 'Размеры участка, пожелания к функционалу и стилю'
                },
                {
                  number: '02',
                  title: 'Получите варианты',
                  description: 'Персональные решения с 3D-визуализацией'
                },
                {
                  number: '03',
                  title: 'Выберите лучшее',
                  description: 'Сравните варианты и получите точный расчет'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-fire-primary text-white text-xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-graphite-600">{step.description}</p>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-fire-primary to-transparent -translate-x-8" />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <a href="/configurator">
                <Button variant="primary" size="lg" className="px-12 py-4 text-lg">
                  Начать
                </Button>
              </a>
              <p className="text-sm text-graphite-500 mt-4">
                Это бесплатно и займет всего 3 минуты
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/grill-background.jpeg"
            alt="Мангал в действии"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative container text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald font-semibold uppercase tracking-wider text-white mb-6">
                Готовы создать место силы на вашей даче?
              </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Получите бесплатную консультацию и индивидуальный расчет вашего проекта
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => leadForm.openForm('cta')}
            >
              Получить консультацию
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Форма заявки */}
      <LeadForm
        isOpen={leadForm.isOpen}
        onClose={() => {
          leadForm.closeForm()
          setSelectedProduct(undefined)
        }}
        source={leadForm.source}
        productId={selectedProduct?.id}
        title={selectedProduct ? `Узнать цену: ${selectedProduct.title}` : "Получить консультацию"}
        description={selectedProduct ? 
          "Оставьте заявку и мы рассчитаем точную стоимость с учетом ваших пожеланий" :
          "Заполните форму и мы свяжемся с вами в течение 15 минут"
        }
      />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </>
  )
}
