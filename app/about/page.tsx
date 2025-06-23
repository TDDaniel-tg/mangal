'use client'

import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-6">
              О КОМПАНИИ
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
              Мы создаем мангалы для настоящих мужчин, которые знают толк в качестве и стиле.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-oswald font-bold text-white mb-6">
                НАША МИССИЯ
              </h2>
              <p className="text-gray-200 text-lg mb-6 font-medium">
                Мангал Силы - это не просто производитель мангалов. Мы создаем инструменты 
                для настоящих побед на кулинарном поле боя. Каждое наше изделие воплощает 
                силу, мужественность и безупречное качество.
              </p>
              <p className="text-gray-200 text-lg font-medium">
                Наши мангалы выковываются из лучших материалов и проходят строгий контроль 
                качества. Мы гарантируем, что ваш мангал прослужит десятилетия.
              </p>
            </div>
            <div className="bg-dark-800 rounded-lg p-8">
              <h3 className="text-2xl font-oswald text-white mb-4">НАШИ ПРИНЦИПЫ</h3>
              <ul className="space-y-3 text-gray-200 font-medium">
                <li className="flex items-center">
                  <span className="text-fire-500 mr-3">🔥</span>
                  Безупречное качество материалов
                </li>
                <li className="flex items-center">
                  <span className="text-fire-500 mr-3">⚡</span>
                  Брутальный мужской дизайн
                </li>
                <li className="flex items-center">
                  <span className="text-fire-500 mr-3">🛡️</span>
                  Долговечность на десятилетия
                </li>
                <li className="flex items-center">
                  <span className="text-fire-500 mr-3">🏆</span>
                  Индивидуальный подход
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-oswald font-bold text-white mb-6">
              ДОВЕРЬТЕ НАМ СОЗДАНИЕ ВАШЕГО МАНГАЛА
            </h2>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto font-medium">
              Более 1000 довольных клиентов уже выбрали нас. Присоединяйтесь к армии 
              настоящих ценителей качества!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 