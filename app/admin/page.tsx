'use client'

import { useState, useEffect } from 'react'
import { Plus, Package, FolderTree, Users, BarChart3 } from 'lucide-react'
import { Button } from '../components/ui/Button'

interface Stats {
  products: number
  categories: number
  leads: number
  orders: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    categories: 0,
    leads: 0,
    orders: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statsCards = [
    {
      title: 'Товары',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500',
      href: '/admin/products'
    },
    {
      title: 'Категории',
      value: stats.categories,
      icon: FolderTree,
      color: 'bg-green-500',
      href: '/admin/categories'
    },
    {
      title: 'Заявки',
      value: stats.leads,
      icon: Users,
      color: 'bg-orange-500',
      href: '/admin/leads'
    },
    {
      title: 'Заказы',
      value: stats.orders,
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/admin/orders'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Админ-панель
              </h1>
              <p className="text-gray-700 font-medium">
                Управление сайтом Мангал Силы
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="primary"
                onClick={() => window.location.href = '/admin/products/new'}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Добавить товар
              </Button>
              <Button 
                variant="secondary"
                onClick={() => window.location.href = '/'}
              >
                Вернуться на сайт
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => window.location.href = card.href}
              >
                <div className="flex items-center">
                  <div className={`${card.color} rounded-lg p-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Быстрые действия
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="ghost"
              className="p-6 h-auto flex-col items-start text-left"
              onClick={() => window.location.href = '/admin/products'}
            >
              <Package className="w-8 h-8 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Управление товарами</h3>
              <p className="text-sm text-gray-700 font-medium mt-1">
                Добавляйте, редактируйте и удаляйте товары
              </p>
            </Button>

            <Button
              variant="ghost"
              className="p-6 h-auto flex-col items-start text-left"
              onClick={() => window.location.href = '/admin/categories'}
            >
              <FolderTree className="w-8 h-8 text-green-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Категории</h3>
              <p className="text-sm text-gray-700 font-medium mt-1">
                Организуйте товары по категориям
              </p>
            </Button>

            <Button
              variant="ghost"
              className="p-6 h-auto flex-col items-start text-left"
              onClick={() => window.location.href = '/admin/leads'}
            >
              <Users className="w-8 h-8 text-orange-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Заявки клиентов</h3>
              <p className="text-sm text-gray-700 font-medium mt-1">
                Просматривайте и обрабатывайте заявки
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 