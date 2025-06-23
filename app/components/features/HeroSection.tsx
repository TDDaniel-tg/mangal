'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/app/lib/utils'

interface HeroSectionProps {
  videoUrl?: string
  imageFallback: string
  title: string
  subtitle: string
  ctaButtons?: Array<{
    text: string
    href?: string
    onClick?: () => void
    variant: 'primary' | 'secondary' | 'ghost'
  }>
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  videoUrl,
  imageFallback,
  title,
  subtitle,
  ctaButtons = []
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Устанавливаем, что мы на клиенте
    setIsClient(true)
    
    // Проверяем, мобильное ли устройство и получаем размеры окна
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-0">
        {videoUrl && !isMobile ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                videoLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Fallback image пока видео грузится */}
            <Image
              src={imageFallback}
              alt="Мангал Силы"
              fill
              className={cn(
                "object-cover transition-opacity duration-1000",
                videoLoaded ? "opacity-0" : "opacity-100"
              )}
              priority
            />
          </>
        ) : (
          <Image
            src={imageFallback}
            alt="Мангал Силы"
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-oswald font-bold uppercase tracking-wider text-white mb-6 drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'}}>
            {title.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-xl lg:text-2xl font-light mb-10 max-w-2xl mx-auto text-white drop-shadow-lg" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {ctaButtons.map((button, index) => (
            button.href ? (
              <a key={index} href={button.href}>
                <Button
                  variant={button.variant}
                  size="lg"
                >
                  {button.text}
                </Button>
              </a>
            ) : (
              <Button
                key={index}
                variant={button.variant}
                size="lg"
                onClick={button.onClick}
              >
                {button.text}
              </Button>
            )
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            if (isClient) {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }
          }}
        >
          <span className="text-sm mb-2">Прокрутите вниз</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Fire Effect Particles - только на клиенте */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-fire-primary rounded-full"
              initial={{
                x: Math.random() * windowSize.width,
                y: windowSize.height + 20,
                opacity: 0
              }}
              animate={{
                x: Math.random() * windowSize.width,
                y: -20,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              style={{
                filter: 'blur(1px)',
                boxShadow: '0 0 6px rgba(255, 107, 53, 0.8)'
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
} 