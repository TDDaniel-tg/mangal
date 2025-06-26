'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '../../../../components/ui/Button'
import { ImageUpload } from '../../../../components/ui/ImageUpload'
import { ImageWithFallback } from '../../../../components/ui/ImageWithFallback'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  title: string
  slug: string
  description?: string
  images: string
  price: number
  oldPrice?: number
  badge?: string
  specifications: string
  categoryId: string
  inStock: boolean
  featured: boolean
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    images: [] as string[],
    price: '',
    oldPrice: '',
    badge: '',
    specifications: {
      dimensions: '',
      weight: '',
      material: '',
      warranty: ''
    },
    categoryId: '',
    inStock: true,
    featured: false
  })

  useEffect(() => {
    if (productId) {
      fetchProduct()
      fetchCategories()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`)
      if (response.ok) {
        const product: Product = await response.json()
        
        // Parse images and specifications
        const images = JSON.parse(product.images)
        const specifications = JSON.parse(product.specifications)
        
        setFormData({
          title: product.title,
          slug: product.slug,
          description: product.description || '',
          images: images,
          price: (product.price / 100).toString(), // Convert from kopecks
          oldPrice: product.oldPrice ? (product.oldPrice / 100).toString() : '',
          badge: product.badge || '',
          specifications: {
            dimensions: specifications.dimensions || '',
            weight: specifications.weight || '',
            material: specifications.material || '',
            warranty: specifications.warranty || ''
          },
          categoryId: product.categoryId,
          inStock: product.inStock,
          featured: product.featured
        })
      } else {
        setErrors({ submit: 'Товар не найден' })
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setErrors({ submit: 'Ошибка загрузки товара' })
    } finally {
      setFetchLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      
      if (response.ok && Array.isArray(data)) {
        setCategories(data)
      } else {
        setErrors(prev => ({ ...prev, submit: 'Ошибка загрузки категорий' }))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setErrors(prev => ({ ...prev, submit: 'Ошибка соединения при загрузке категорий' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Название товара обязательно'
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'URL (slug) обязателен'
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Выберите категорию'
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Укажите корректную цену'
    }

    if (formData.images.length === 0) {
      newErrors.images = 'Загрузите хотя бы одно изображение'
    }

    if (formData.oldPrice && parseFloat(formData.oldPrice) <= parseFloat(formData.price)) {
      newErrors.oldPrice = 'Старая цена должна быть больше текущей цены'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const productData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim() || '',
        images: formData.images,
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
        badge: formData.badge || '',
        specifications: formData.specifications,
        categoryId: formData.categoryId,
        inStock: formData.inStock,
        featured: formData.featured
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      const responseData = await response.json()

      if (response.ok) {
        router.push('/admin/products')
      } else {
        setErrors({ submit: responseData.error || 'Произошла ошибка при обновлении товара' })
      }
    } catch (error) {
      console.error('Error updating product:', error)
      setErrors({ submit: 'Ошибка соединения с сервером' })
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const updateSpecification = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      }
    }))
  }

  const addImage = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url]
    }))
    
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleTitleChange = (value: string) => {
    updateFormData('title', value)
    
    // Auto-generate slug only if it's empty or matches the previous title
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      updateFormData('slug', generateSlug(value))
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9а-я]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="text-red-600 text-sm mt-1 font-medium">{message}</div>
  )

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fire-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка товара...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Редактировать товар
                </h1>
                <p className="text-gray-700 font-medium">
                  Обновите информацию о товаре
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Основная информация
            </h2>
            
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <ErrorMessage message={errors.submit} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название товара *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="Например: Мангал Премиум"
                />
                {errors.title && <ErrorMessage message={errors.title} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL (slug) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateFormData('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="mangal-premium"
                />
                {errors.slug && <ErrorMessage message={errors.slug} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => updateFormData('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <ErrorMessage message={errors.categoryId} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Бейдж
                </label>
                <select
                  value={formData.badge}
                  onChange={(e) => updateFormData('badge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                >
                  <option value="">Без бейджа</option>
                  <option value="new">Новинка</option>
                  <option value="hit">Хит продаж</option>
                  <option value="sale">Скидка</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                placeholder="Описание товара..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Изображения товара
            </h2>
            
            <ImageUpload onImageAdd={addImage} />
            {errors.images && <ErrorMessage message={errors.images} />}
            
            {formData.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Загруженные изображения ({formData.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative w-full h-32 rounded-md border overflow-hidden">
                        <ImageWithFallback
                          src={image}
                          alt={`Изображение ${index + 1}`}
                          fallbackText={`Фото ${index + 1}`}
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Цены и наличие
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текущая цена (руб.) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => updateFormData('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="0"
                />
                {errors.price && <ErrorMessage message={errors.price} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Старая цена (руб.)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.oldPrice}
                  onChange={(e) => updateFormData('oldPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="0"
                />
                {errors.oldPrice && <ErrorMessage message={errors.oldPrice} />}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => updateFormData('inStock', e.target.checked)}
                  className="rounded border-gray-300 text-fire-primary focus:ring-fire-primary"
                />
                <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                  В наличии
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => updateFormData('featured', e.target.checked)}
                  className="rounded border-gray-300 text-fire-primary focus:ring-fire-primary"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Рекомендуемый товар
                </label>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Характеристики
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Размеры
                </label>
                <input
                  type="text"
                  value={formData.specifications.dimensions}
                  onChange={(e) => updateSpecification('dimensions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="60x40x15 см"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Вес
                </label>
                <input
                  type="text"
                  value={formData.specifications.weight}
                  onChange={(e) => updateSpecification('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="15 кг"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Материал
                </label>
                <input
                  type="text"
                  value={formData.specifications.material}
                  onChange={(e) => updateSpecification('material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="Сталь 3мм"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Гарантия
                </label>
                <input
                  type="text"
                  value={formData.specifications.warranty}
                  onChange={(e) => updateSpecification('warranty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fire-primary"
                  placeholder="1 год"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 