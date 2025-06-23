'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Flame, Shield, Users, Hammer, Trophy, Clock } from 'lucide-react'

const advantages = [
  {
    icon: <Flame className="w-12 h-12" />,
    title: 'Огонь идей',
    description: 'Воплощаем самые смелые идеи в металле. Каждый проект уникален и создается с душой.',
    color: 'text-fire-primary'
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: 'Пожизненная гарантия',
    description: 'Пока я жив - помогу с любым вопросом. Это не просто слова, а философия бизнеса.',
    color: 'text-ember'
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: 'Для своих',
    description: 'Работаем как братья, по-человечески. Каждый клиент становится частью нашей семьи.',
    color: 'text-graphite-800'
  },
  {
    icon: <Hammer className="w-12 h-12" />,
    title: 'Ручная работа',
    description: 'Каждое изделие создается вручную мастерами с 15-летним опытом.',
    color: 'text-steel'
  },
  {
    icon: <Trophy className="w-12 h-12" />,
    title: 'Лидеры рынка',
    description: 'Более 1000 довольных клиентов по всей России за 10 лет работы.',
    color: 'text-fire-secondary'
  },
  {
    icon: <Clock className="w-12 h-12" />,
    title: 'Точно в срок',
    description: 'Соблюдаем сроки и договоренности. Ваш заказ будет готов вовремя.',
    color: 'text-success'
  }
]

interface AdvantagesSectionProps {
  showAll?: boolean
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ showAll = false }) => {
  const displayAdvantages = showAll ? advantages : advantages.slice(0, 3)

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="h2 mb-4">Почему выбирают нас</h2>
          <div className="fire-divider" />
          <p className="text-lg text-graphite-600 max-w-2xl mx-auto">
            Мы не просто производим мангалы — мы создаем места, где рождаются теплые воспоминания
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${showAll ? 'lg:gap-y-12' : ''}`}>
          {displayAdvantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow ${item.color}`}
              >
                {item.icon}
              </motion.div>
              <h3 className="h4 mb-3">{item.title}</h3>
              <p className="text-graphite-600">{item.description}</p>
              
              {/* Декоративный элемент */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="h-0.5 bg-fire-gradient mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>

        {/* Дополнительный текст для главной страницы */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-graphite-700 font-medium">
              Это только часть наших преимуществ.{' '}
              <a href="/about" className="text-fire-primary hover:text-ember transition-colors">
                Узнайте больше о нашей философии →
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
} 