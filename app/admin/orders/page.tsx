'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Eye, Trash2, Package, Phone, Mail } from 'lucide-react'
import { Button } from '../../components/ui/Button'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    title: string
    images: string
  }
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  customerAddress?: string
  items: OrderItem[]
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'IN_PRODUCTION' | 'READY' | 'DELIVERED' | 'CANCELLED'
  notes?: string
  createdAt: string
  updatedAt: string
}

const statusLabels = {
  PENDING: 'Ожидает',
  CONFIRMED: 'Подтвержден',
  IN_PRODUCTION: 'В производстве',
  READY: 'Готов',
  DELIVERED: 'Доставлен',
  CANCELLED: 'Отменен'
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  IN_PRODUCTION: 'bg-purple-100 text-purple-800',
  READY: 'bg-green-100 text-green-800',
  DELIVERED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800'
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      // Убеждаемся что data является массивом
      setOrders(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([]) // Устанавливаем пустой массив в случае ошибки
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === id ? { ...order, status } : order
        ))
        if (selectedOrder?.id === id) {
          setSelectedOrder({ ...selectedOrder, status })
        }
      } else {
        alert('Ошибка при обновлении статуса заказа')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Ошибка при обновлении статуса заказа')
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот заказ?')) return
    
    try {
      const response = await fetch(`/api/orders/${id}`, { 
        method: 'DELETE' 
      })
      
      if (response.ok) {
        setOrders(orders.filter(o => o.id !== id))
        if (selectedOrder?.id === id) {
          setSelectedOrder(null)
        }
      } else {
        alert('Ошибка при удалении заказа')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Ошибка при удалении заказа')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price / 100)
  }

  const filteredOrders = Array.isArray(orders) 
    ? (statusFilter === 'all' 
        ? orders 
        : orders.filter(order => order.status === statusFilter))
    : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Загрузка заказов...</p>
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
                Управление заказами
              </h1>
              <p className="text-gray-700 font-medium">
                Всего заказов: {orders.length} | Отфильтровано: {filteredOrders.length}
              </p>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Все статусы</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Заказ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Клиент
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedOrder?.id === order.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            №{order.orderNumber}
                          </div>
                          <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {order.items.length} товаров
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </div>
                          <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {order.customerPhone}
                          </div>
                          {order.customerEmail && (
                            <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {order.customerEmail}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(order.totalAmount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            e.stopPropagation()
                            updateOrderStatus(order.id, e.target.value as Order['status'])
                          }}
                          className={`px-2 py-1 text-xs font-semibold rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusColors[order.status]}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedOrder(order)
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteOrder(order.id)
                            }}
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
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    {statusFilter === 'all' ? 'Заказы не найдены' : 'Нет заказов с выбранным статусом'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Детали заказа №{selectedOrder.orderNumber}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Клиент
                    </label>
                    <p className="text-sm text-gray-900 font-medium">{selectedOrder.customerName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <p className="text-sm text-gray-900 font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a 
                        href={`tel:${selectedOrder.customerPhone}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {selectedOrder.customerPhone}
                      </a>
                    </p>
                  </div>
                  
                  {selectedOrder.customerEmail && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-sm text-gray-900 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a 
                          href={`mailto:${selectedOrder.customerEmail}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {selectedOrder.customerEmail}
                        </a>
                      </p>
                    </div>
                  )}
                  
                  {selectedOrder.customerAddress && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Адрес доставки
                      </label>
                      <p className="text-sm text-gray-900 font-medium">{selectedOrder.customerAddress}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Статус заказа
                    </label>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedOrder.status]}`}>
                      {statusLabels[selectedOrder.status]}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Товары в заказе
                    </label>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => {
                        const images = JSON.parse(item.product.images)
                        return (
                          <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                            <img 
                              src={images[0] || '/placeholder.jpg'} 
                              alt={item.product.title}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-900">{item.product.title}</p>
                              <p className="text-xs text-gray-700 font-medium">
                                {item.quantity} шт. × {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Общая сумма
                    </label>
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(selectedOrder.totalAmount)}
                    </p>
                  </div>
                  
                  {selectedOrder.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Примечания
                      </label>
                      <div className="bg-gray-50 rounded-md p-3">
                        <p className="text-sm text-gray-900 font-medium whitespace-pre-wrap">
                          {selectedOrder.notes}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дата создания
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                  
                  {selectedOrder.updatedAt !== selectedOrder.createdAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Последнее обновление
                      </label>
                      <p className="text-sm text-gray-900 font-medium">
                        {new Date(selectedOrder.updatedAt).toLocaleString('ru-RU')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="primary"
                    onClick={() => window.open(`tel:${selectedOrder.customerPhone}`)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Позвонить клиенту
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium">Выберите заказ для просмотра деталей</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 