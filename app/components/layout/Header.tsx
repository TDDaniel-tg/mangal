'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/app/lib/utils'
import { Button } from '../ui/Button'
import { Menu, X, Phone, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  transparent?: boolean
  sticky?: boolean
}

const navigation = [
  { name: 'Каталог', href: '/catalog' },
  { name: 'Конфигуратор', href: '/configurator' },
  { name: 'О компании', href: '/about' },
  { name: 'Портфолио', href: '/portfolio' },
  { name: 'Блог', href: '/blog' },
  { name: 'Контакты', href: '/contacts' }
]

export const Header: React.FC<HeaderProps> = ({ transparent = false, sticky = true }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  const isTransparent = transparent && !isScrolled && !isMobileMenuOpen

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isTransparent ? 'bg-transparent' : 'bg-white shadow-md',
        sticky && isScrolled && 'shadow-lg'
      )}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Flame className={cn(
                "w-full h-full transition-colors duration-300",
                isTransparent ? "text-white" : "text-fire-primary"
              )} />
            </div>
            <div>
              <h1 
                className={cn(
                  "font-oswald font-bold text-lg lg:text-xl uppercase tracking-wider transition-colors duration-300",
                  isTransparent ? "text-white" : "text-graphite-800"
                )}
              >
                Мангал Силы
              </h1>
              <p className={cn(
                "text-xs lg:text-sm transition-colors duration-300",
                isTransparent ? "text-white/80" : "text-graphite-600"
              )}>
                Создаем места силы
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "font-medium transition-colors duration-300 hover:text-fire-primary",
                  isTransparent ? "text-white hover:text-fire-secondary" : "text-graphite-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+79991234567"
              className={cn(
                "flex items-center space-x-2 transition-colors duration-300",
                isTransparent ? "text-white hover:text-fire-secondary" : "text-graphite-700 hover:text-fire-primary"
              )}
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">+7 (999) 123-45-67</span>
            </a>
            <Button variant={isTransparent ? "ghost" : "primary"} size="sm">
              Оставить заявку
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors duration-300",
              isTransparent ? "text-white" : "text-graphite-800"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-graphite-700 hover:text-fire-primary font-medium py-2 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="border-gray-200" />
                <a
                  href="tel:+79991234567"
                  className="flex items-center space-x-2 text-graphite-700 hover:text-fire-primary transition-colors py-2"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+7 (999) 123-45-67</span>
                </a>
                <Button variant="primary" fullWidth onClick={() => setIsMobileMenuOpen(false)}>
                  Оставить заявку
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 