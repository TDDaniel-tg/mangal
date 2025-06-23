'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-oswald text-white mb-4">
              Произошла ошибка
            </h1>
            <p className="text-gray-300 mb-8 max-w-md">
              Что-то пошло не так. Мы уже работаем над устранением проблемы.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => reset()}
                className="bg-fire-500 text-white px-6 py-3 rounded-lg hover:bg-fire-600 transition-colors mr-4"
              >
                Попробовать снова
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                На главную
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 