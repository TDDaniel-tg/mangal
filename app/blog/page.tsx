'use client'

import React, { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  category: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  readTime: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Как выбрать идеальный мангал для дачи',
    category: 'Советы',
    excerpt: 'Подробное руководство по выбору мангала: материалы, размеры, дополнительные опции и критерии качества.',
    content: 'Выбор мангала - это серьезное решение, которое повлияет на ваши кулинарные приключения на долгие годы. В этой статье мы разберем все ключевые аспекты выбора идеального мангала для вашей дачи...',
    image: '/main.jpg',
    author: 'Игорь Мангальщиков',
    date: '15 января 2024',
    readTime: '8 мин',
    tags: ['мангал', 'выбор', 'дача']
  },
  {
    id: '2',
    title: 'Секреты идеального шашлыка: от маринада до подачи',
    category: 'Рецепты',
    excerpt: 'Профессиональные секреты приготовления сочного и ароматного шашлыка. Лучшие маринады и техники жарки.',
    content: 'Приготовление идеального шашлыка - это искусство, которому можно научиться. Мы поделимся с вами проверенными рецептами маринадов и техниками приготовления...',
    image: '/main.jpg',
    author: 'Владимир Грильмастер',
    date: '10 января 2024',
    readTime: '12 мин',
    tags: ['шашлык', 'рецепт', 'маринад']
  },
  {
    id: '3',
    title: 'Уход за мангалом: продлеваем жизнь железного друга',
    category: 'Советы',
    excerpt: 'Как правильно ухаживать за мангалом, чтобы он служил долгие годы. Чистка, хранение и защита от коррозии.',
    content: 'Правильный уход за мангалом - залог его долговечности. В этой статье мы расскажем о всех нюансах обслуживания и хранения вашего мангала...',
    image: '/main.jpg',
    author: 'Сергей Мастеров',
    date: '5 января 2024',
    readTime: '6 мин',
    tags: ['уход', 'обслуживание', 'советы']
  },
  {
    id: '4',
    title: 'Альтернативы шашлыку: что еще приготовить на мангале',
    category: 'Рецепты',
    excerpt: 'Разнообразим меню: овощи, рыба, птица и даже десерты на мангале. Креативные рецепты для настоящих гурманов.',
    content: 'Мангал - универсальный инструмент для приготовления различных блюд. Давайте рассмотрим альтернативные варианты использования мангала...',
    image: '/main.jpg',
    author: 'Анна Кулинарова',
    date: '28 декабря 2023',
    readTime: '10 мин',
    tags: ['рецепты', 'овощи', 'рыба', 'креатив']
  },
  {
    id: '5',
    title: 'История мангала: от древности до наших дней',
    category: 'История',
    excerpt: 'Увлекательный рассказ о том, как развивалось искусство приготовления пищи на открытом огне через века.',
    content: 'История мангала уходит корнями в глубокую древность. Давайте проследим эволюцию этого удивительного устройства...',
    image: '/main.jpg',
    author: 'Дмитрий Историк',
    date: '20 декабря 2023',
    readTime: '15 мин',
    tags: ['история', 'культура', 'традиции']
  },
  {
    id: '6',
    title: 'Безопасность на мангале: правила, которые спасают жизни',
    category: 'Советы',
    excerpt: 'Важные правила безопасности при работе с мангалом. Как избежать ожогов, пожаров и других неприятностей.',
    content: 'Безопасность должна быть приоритетом при использовании мангала. Рассмотрим основные правила и меры предосторожности...',
    image: '/main.jpg',
    author: 'Алексей Безопасников',
    date: '15 декабря 2023',
    readTime: '7 мин',
    tags: ['безопасность', 'правила', 'советы']
  }
]

const categories = [
  { id: 'all', name: 'Все статьи' },
  { id: 'Советы', name: 'Советы' },
  { id: 'Рецепты', name: 'Рецепты' },
  { id: 'История', name: 'История' }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  )

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="mb-8 flex items-center text-fire-500 hover:text-fire-400 transition-colors"
            >
              ← Назад к блогу
            </button>
            
            <article>
              <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-fire-500 text-white px-3 py-1 rounded-full text-sm font-oswald inline-block mb-4">
                    {selectedPost.category}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center text-gray-200 text-sm">
                    <span>{selectedPost.author}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedPost.readTime} чтения</span>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="text-xl text-gray-300 mb-8 font-medium leading-relaxed">
                  {selectedPost.excerpt}
                </div>
                
                <div className="text-gray-200 text-lg leading-relaxed space-y-6">
                  {selectedPost.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  
                  {/* Заглушка для полного контента */}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-700">
                  <span className="text-gray-400 mr-2">Теги:</span>
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-dark-800 text-fire-400 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-6">
              БЛОГ МАНГАЛ СИЛЫ
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
              Советы, рецепты и секреты мастерства от профессионалов мангального дела.
            </p>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-oswald transition-all ${
                  selectedCategory === category.id
                    ? 'bg-fire-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Статьи */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-dark-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-fire-500 text-white px-3 py-1 rounded-full text-sm font-oswald">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-oswald font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {post.date}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-dark-700 text-fire-400 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA секция */}
          <div className="bg-dark-800 rounded-lg p-8 mt-16 text-center">
            <h2 className="text-3xl font-oswald font-bold text-white mb-4">
              ХОТИТЕ СВОЙ МАНГАЛ?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              После прочтения наших статей вы точно захотите попробовать все рецепты! 
              Закажите свой мангал мечты прямо сейчас.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="/catalog">
                Смотреть каталог
              </Button>
              <Button variant="secondary" size="lg" href="/configurator">
                Конфигуратор
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 