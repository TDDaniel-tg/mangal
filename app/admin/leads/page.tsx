'use client'

import { useState, useEffect } from 'react'
import { Users, Eye, Trash2, Phone, Mail, MessageSquare } from 'lucide-react'
import { Button } from '../../components/ui/Button'

interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  message?: string
  source: string
  productId?: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED'
  createdAt: string
  updatedAt: string
}

const statusLabels = {
  NEW: 'Новая',
  CONTACTED: 'Связались',
  QUALIFIED: 'Квалифицирована',
  CONVERTED: 'Конвертирована',
  CLOSED: 'Закрыта'
}

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  QUALIFIED: 'bg-purple-100 text-purple-800',
  CONVERTED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800'
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setLeads(leads.map(lead => 
          lead.id === id ? { ...lead, status } : lead
        ))
      } else {
        alert('Ошибка при обновлении статуса заявки')
      }
    } catch (error) {
      console.error('Error updating lead status:', error)
      alert('Ошибка при обновлении статуса заявки')
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return
    
    try {
      const response = await fetch(`/api/leads/${id}`, { 
        method: 'DELETE' 
      })
      
      if (response.ok) {
        setLeads(leads.filter(l => l.id !== id))
        if (selectedLead?.id === id) {
          setSelectedLead(null)
        }
      } else {
        alert('Ошибка при удалении заявки')
      }
    } catch (error) {
      console.error('Error deleting lead:', error)
      alert('Ошибка при удалении заявки')
    }
  }

  const filteredLeads = statusFilter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === statusFilter)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Загрузка заявок...</p>
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
                Управление заявками
              </h1>
              <p className="text-gray-700 font-medium">
                Всего заявок: {leads.length} | Отфильтровано: {filteredLeads.length}
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
          {/* Leads Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Клиент
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Источник
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
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedLead?.id === lead.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.name}
                          </div>
                          <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                          {lead.email && (
                            <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => {
                            e.stopPropagation()
                            updateLeadStatus(lead.id, e.target.value as Lead['status'])
                          }}
                          className={`px-2 py-1 text-xs font-semibold rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusColors[lead.status]}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {lead.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {new Date(lead.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedLead(lead)
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
                              deleteLead(lead.id)
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
              
              {filteredLeads.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    {statusFilter === 'all' ? 'Заявки не найдены' : 'Нет заявок с выбранным статусом'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Lead Details */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Детали заявки
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя клиента
                    </label>
                    <p className="text-sm text-gray-900 font-medium">{selectedLead.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <p className="text-sm text-gray-900 font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a 
                        href={`tel:${selectedLead.phone}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {selectedLead.phone}
                      </a>
                    </p>
                  </div>
                  
                  {selectedLead.email && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-sm text-gray-900 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a 
                          href={`mailto:${selectedLead.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {selectedLead.email}
                        </a>
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Источник
                    </label>
                    <p className="text-sm text-gray-900 font-medium">{selectedLead.source}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Статус
                    </label>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedLead.status]}`}>
                      {statusLabels[selectedLead.status]}
                    </span>
                  </div>
                  
                  {selectedLead.message && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Сообщение
                      </label>
                      <div className="bg-gray-50 rounded-md p-3">
                        <p className="text-sm text-gray-900 font-medium whitespace-pre-wrap">
                          {selectedLead.message}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дата создания
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {new Date(selectedLead.createdAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                  
                  {selectedLead.updatedAt !== selectedLead.createdAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Последнее обновление
                      </label>
                      <p className="text-sm text-gray-900 font-medium">
                        {new Date(selectedLead.updatedAt).toLocaleString('ru-RU')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="primary"
                    onClick={() => window.open(`tel:${selectedLead.phone}`)}
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
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium">Выберите заявку для просмотра деталей</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 