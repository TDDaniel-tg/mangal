import Link from 'next/link'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-8xl font-oswald font-bold text-fire-500 mb-4">
              404
            </h1>
            <h2 className="text-4xl font-oswald text-white mb-6">
              СТРАНИЦА НЕ НАЙДЕНА
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              К сожалению, запрашиваемая страница не существует. 
              Возможно, она была перемещена или удалена.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-fire-500 text-white px-8 py-4 rounded-lg hover:bg-fire-600 transition-colors font-oswald uppercase"
              >
                На главную
              </Link>
              <Link
                href="/catalog"
                className="bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-oswald uppercase"
              >
                Каталог
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 