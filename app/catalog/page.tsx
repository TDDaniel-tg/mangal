'use client'

import { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { ProductCard } from '../components/features/ProductCard'
import { LeadForm } from '../components/ui/LeadForm'
import { useLeadForm } from '../hooks/useLeadForm'
import { Product } from '../types'
import { Loader2 } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
}

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
  createdAt: Date
  updatedAt: Date
}

export default function CatalogPage() {
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const leadForm = useLeadForm({ defaultSource: 'catalog' })
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()

  // Принудительно устанавливаем темную тему для iOS
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'
    document.body.style.backgroundColor = '#111827'
    document.body.style.color = 'white'
    
    return () => {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = ''
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setError(null)
      setLoading(true)
      
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        fetch('/api/categories', {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ])
      
      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()
      
      // Ensure data is arrays
      const safeProductsData = Array.isArray(productsData) ? productsData : []
      const safeCategoriesData = Array.isArray(categoriesData) ? categoriesData : []
      
      setDbProducts(safeProductsData)
      setCategories(safeCategoriesData)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Ошибка загрузки данных. Попробуйте перезагрузить страницу.')
      // Set fallback data
      setDbProducts([])
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = selectedCategory === 'all' 
    ? dbProducts 
    : dbProducts.filter(product => product?.categoryId === selectedCategory)

  const parseJsonSafely = (jsonString: string, fallback: any = {}) => {
    try {
      return JSON.parse(jsonString || '{}')
    } catch {
      return fallback
    }
  }

  const handleRequestPrice = (product: Product) => {
    setSelectedProduct(product)
    leadForm.openForm('catalog-product', product.id)
  }

  if (loading) {
    return (
      <>
        {/* iOS Dark Theme Styles */}
        <style jsx global>{`
          html, body {
            background-color: #111827 !important;
            color: white !important;
            color-scheme: dark !important;
          }
          @supports (-webkit-appearance: none) {
            html, body {
              background-color: #111827 !important;
              color: white !important;
            }
          }
        `}</style>
        
        <div className="min-h-screen flex items-center justify-center" 
             style={{ backgroundColor: '#111827' }}>
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: '#f97316' }} />
            <p className="text-gray-300">Загрузка каталога...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        {/* iOS Dark Theme Styles */}
        <style jsx global>{`
          html, body {
            background-color: #111827 !important;
            color: white !important;
            color-scheme: dark !important;
          }
          @supports (-webkit-appearance: none) {
            html, body {
              background-color: #111827 !important;
              color: white !important;
            }
          }
        `}</style>
        
        <div className="min-h-screen" style={{ backgroundColor: '#111827' }}>
          <Header />
          <main className="pt-24 pb-16">
            <div className="container mx-auto px-4">
              <div className="text-center py-16">
                <h2 className="text-3xl font-oswald text-white mb-4">Ошибка загрузки</h2>
                <p className="text-gray-300 mb-6">{error}</p>
                <button
                  onClick={() => fetchData()}
                  className="px-6 py-3 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: '#f97316' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
                >
                  Попробовать снова
                </button>
              </div>
            </div>
          </main>
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
        </div>
      </>
    )
  }

  return (
    <>
      {/* iOS Dark Theme Styles */}
      <style jsx global>{`
        html, body {
          background-color: #111827 !important;
          color: white !important;
          color-scheme: dark !important;
        }
        @supports (-webkit-appearance: none) {
          html, body {
            background-color: #111827 !important;
            color: white !important;
          }
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: '#111827' }}>
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-6">
                КАТАЛОГ МАНГАЛОВ
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
                Профессиональные мангалы и печи для настоящих мужчин. 
                Каждое изделие создано для побед на кулинарном поле боя.
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-3 rounded-lg font-oswald transition-all text-white"
                  style={{ 
                    backgroundColor: selectedCategory === 'all' ? '#f97316' : '#1f2937',
                    color: 'white'
                  }}
                  onMouseOver={(e) => {
                    if (selectedCategory !== 'all') {
                      e.currentTarget.style.backgroundColor = '#374151'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedCategory !== 'all') {
                      e.currentTarget.style.backgroundColor = '#1f2937'
                    }
                  }}
                >
                  ВСЕ ТОВАРЫ
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="px-6 py-3 rounded-lg font-oswald transition-all text-white"
                    style={{ 
                      backgroundColor: selectedCategory === category.id ? '#f97316' : '#1f2937',
                      color: 'white'
                    }}
                    onMouseOver={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = '#374151'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = '#1f2937'
                      }
                    }}
                  >
                    {category.name?.toUpperCase() || 'КАТЕГОРИЯ'}
                  </button>
                ))}
              </div>
            </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                if (!product?.id) return null
                
                return (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      id: product.id,
                      title: product.title || 'Мангал',
                      price: Math.round((product.price || 0) / 100), // Convert from kopecks safely
                      oldPrice: product.oldPrice ? Math.round(product.oldPrice / 100) : undefined,
                      images: parseJsonSafely(product.images, ['/main.jpg']),
                      badge: product.badge as 'new' | 'hit' | 'sale' | undefined,
                      specifications: parseJsonSafely(product.specifications, {}),
                      inStock: product.inStock ?? true,
                      category: 'mangaly' as const
                    }}
                    onRequestPrice={handleRequestPrice}
                  />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-oswald text-gray-200 mb-4 font-medium">
                В этой категории пока нет товаров
              </h3>
              <p className="text-gray-400 font-medium">
                Скоро здесь появятся новые мангалы
              </p>
            </div>
          )}
        </div>
      </main>

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
      </div>
    </>
  )
} 