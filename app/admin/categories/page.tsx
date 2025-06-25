'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react'
import { Button } from '../../components/ui/Button'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  _count: {
    products: number
  }
  createdAt: string
  updatedAt: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9а-я]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const slug = generateSlug(formData.name)
      const method = editingCategory ? 'PUT' : 'POST'
      const url = editingCategory 
        ? `/api/categories/${editingCategory.id}` 
        : '/api/categories'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug
        }),
      })

      if (response.ok) {
        await fetchCategories()
        setShowForm(false)
        setEditingCategory(null)
        setFormData({ name: '', description: '', image: '' })
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при сохранении категории')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Ошибка при сохранении категории')
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return
    
    try {
      const response = await fetch(`/api/categories/${id}`, { 
        method: 'DELETE' 
      })
      
      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id))
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении категории')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Ошибка при удалении категории')
    }
  }

  const startEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || ''
    })
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Загрузка категорий...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Управление категориями
              </h1>
              <p className="text-gray-700 font-medium">
                Всего категорий: {categories.length}
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="primary"
                onClick={() => {
                  setEditingCategory(null)
                  setFormData({ name: '', description: '', image: '' })
                  setShowForm(true)
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Добавить категорию
              </Button>
              <Button 
                variant="secondary"
                onClick={() => window.location.href = '/admin'}
              >
                Назад в админку
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название категории
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Например: Мангалы"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Описание категории..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Изображение (URL)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                  {editingCategory ? 'Сохранить' : 'Добавить'}
                </Button>
                <Button 
                  type="button"
                  variant="secondary" 
                  onClick={() => {
                    setShowForm(false)
                    setEditingCategory(null)
                  }}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Товаров
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Создана
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {category.image && (
                        <img 
                          className="h-10 w-10 rounded object-cover mr-4"
                          src={category.image}
                          alt={category.name}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-700 font-medium">
                          {category.slug}
                        </div>
                        {category.description && (
                          <div className="text-xs text-gray-600 font-medium">
                            {category.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {category._count.products} товаров
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {new Date(category.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(category)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {categories.length === 0 && (
            <div className="text-center py-12">
              <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Категории не найдены</p>
              <p className="text-gray-500 text-sm font-medium">
                Добавьте первую категорию для организации товаров
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 