'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/ui/Button'
import { ImageUpload } from '../../../components/ui/ImageUpload'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
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
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      console.log('Categories response:', { status: response.status, data })
      
      if (response.ok && Array.isArray(data)) {
        setCategories(data)
      } else {
        console.error('Categories response error:', data)
        setErrors(prev => ({ ...prev, submit: 'Ошибка загрузки категорий: ' + (data.error || 'Неизвестная ошибка') }))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setErrors(prev => ({ ...prev, submit: 'Ошибка соединения при загрузке категорий' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
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

    // Images validation - только загруженные изображения
    if (formData.images.length === 0) {
      newErrors.images = 'Загрузите хотя бы одно изображение'
    }

    // Old price validation
    if (formData.oldPrice && parseFloat(formData.oldPrice) <= parseFloat(formData.price)) {
      newErrors.oldPrice = 'Старая цена должна быть больше текущей цены'
    }

    console.log('Validation errors:', newErrors)
    console.log('Form data:', formData)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Starting form submission...')
    console.log('Current form data:', formData)
    
    if (!validateForm()) {
      console.log('Validation failed')
      return
    }

    setLoading(true)
    setErrors({})

    try {
      const productData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim() || '',
        images: formData.images, // Только загруженные изображения
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
        badge: formData.badge || '',
        specifications: formData.specifications,
        categoryId: formData.categoryId,
        inStock: formData.inStock,
        featured: formData.featured
      }

      console.log('Sending product data:', productData)

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      console.log('Response status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (response.ok) {
        console.log('Product created successfully!')
        router.push('/admin/products')
      } else {
        console.error('Server error:', responseData)
        setErrors({ submit: responseData.error || 'Произошла ошибка при создании товара' })
      }
    } catch (error) {
      console.error('Error creating product:', error)
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
    
    // Clear field error when user starts typing
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
    console.log('Adding image:', url)
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url]
    }))
    
    // Clear images error when user adds an image
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }))
    }
  }

  const removeImage = (index: number) => {
    console.log('Removing image at index:', index)
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    updateFormData('title', value)
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      const slug = generateSlug(value)
      updateFormData('slug', slug)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^а-яё\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const ErrorMessage = ({ message }: { message: string }) => (
    <p className="text-red-600 text-sm mt-1">{message}</p>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/admin/products')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Добавить товар
                </h1>
                <p className="text-gray-700 font-medium">
                  Заполните информацию о новом товаре
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Global Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">Ошибка:</p>
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Основная информация</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Название товара *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Мангал 'Брутал'"
                />
                {errors.title && <ErrorMessage message={errors.title} />}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  URL (slug) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => updateFormData('slug', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900 ${
                    errors.slug ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="mangal-brutal"
                />
                {errors.slug && <ErrorMessage message={errors.slug} />}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900"
                  placeholder="Подробное описание товара..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Категория *
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => updateFormData('categoryId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900 ${
                    errors.categoryId ? 'border-red-300' : 'border-gray-300'
                  }`}
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
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Бейдж
                </label>
                <select
                  value={formData.badge}
                  onChange={(e) => updateFormData('badge', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900"
                >
                  <option value="">Без бейджа</option>
                  <option value="new">Новинка</option>
                  <option value="hit">Хит продаж</option>
                  <option value="sale">Акция</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Цены</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Цена (руб.) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => updateFormData('price', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900 ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="35000"
                />
                {errors.price && <ErrorMessage message={errors.price} />}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Старая цена (руб.)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.oldPrice}
                  onChange={(e) => updateFormData('oldPrice', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900 ${
                    errors.oldPrice ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="40000"
                />
                {errors.oldPrice && <ErrorMessage message={errors.oldPrice} />}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Изображения *</h2>
            
            {errors.images && (
              <div className="mb-4">
                <ErrorMessage message={errors.images} />
              </div>
            )}
            
            <div className="space-y-6">
              {/* Загруженные изображения */}
              {formData.images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800">Загруженные изображения:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Изображение ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="bg-red-500/20 backdrop-blur-sm text-white hover:bg-red-500/30"
                          >
                            <X className="w-4 h-4" />
                            Удалить
                          </Button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {index === 0 ? 'Главное' : `#${index + 1}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Компонент загрузки */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                  {formData.images.length === 0 ? 'Загрузите изображения:' : 'Добавить еще изображение:'}
                </h3>
                <ImageUpload
                  onImageUpload={addImage}
                  currentImage=""
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Характеристики</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Размеры
                </label>
                <input
                  type="text"
                  value={formData.specifications.dimensions}
                  onChange={(e) => updateSpecification('dimensions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900"
                  placeholder="60x40x80 см"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Вес
                </label>
                <input
                  type="text"
                  value={formData.specifications.weight}
                  onChange={(e) => updateSpecification('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900"
                  placeholder="25 кг"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Материал
                </label>
                <input
                  type="text"
                  value={formData.specifications.material}
                  onChange={(e) => updateSpecification('material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900"
                  placeholder="Сталь 4 мм"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Гарантия
                </label>
                <input
                  type="text"
                  value={formData.specifications.warranty}
                  onChange={(e) => updateSpecification('warranty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-primary focus:border-transparent text-gray-900"
                  placeholder="3 года"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Настройки</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => updateFormData('inStock', e.target.checked)}
                  className="h-4 w-4 text-fire-primary focus:ring-fire-primary border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 block text-sm font-medium text-gray-900">
                  В наличии
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => updateFormData('featured', e.target.checked)}
                  className="h-4 w-4 text-fire-primary focus:ring-fire-primary border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-900">
                  Рекомендуемый товар
                </label>
              </div>
            </div>
          </div>

          {/* Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Отладочная информация:</h3>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify({ 
                  images: formData.images, 
                  imagesCount: formData.images.length,
                  errors 
                }, null, 2)}
              </pre>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/products')}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || formData.images.length === 0}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Сохранение...' : 'Сохранить товар'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 