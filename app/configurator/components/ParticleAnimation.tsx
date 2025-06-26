'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  opacity: number
  type: 'leaf' | 'spark'
  color: string
}

interface ParticleAnimationProps {
  type: 'leaves' | 'sparks'
  intensity?: number
  className?: string
}

export const ParticleAnimation: React.FC<ParticleAnimationProps> = ({ 
  type, 
  intensity = 50,
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Инициализация частиц
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < intensity; i++) {
        createParticle()
      }
    }

    const createParticle = () => {
      const particle: Particle = {
        x: Math.random() * canvas.width,
        y: -20,
        vx: type === 'sparks' ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 1,
        vy: type === 'sparks' ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        size: type === 'sparks' ? Math.random() * 3 + 1 : Math.random() * 8 + 4,
        opacity: Math.random() * 0.7 + 0.3,
        type: type === 'sparks' ? 'spark' : 'leaf',
        color: type === 'sparks' 
          ? ['#FF6B35', '#D2001C', '#FFB347', '#FFA500'][Math.floor(Math.random() * 4)]
          : ['#8B4513', '#228B22', '#32CD32', '#DAA520', '#CD853F'][Math.floor(Math.random() * 5)]
      }
      particlesRef.current.push(particle)
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        // Обновление позиции
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        // Гравитация для листьев
        if (particle.type === 'leaf') {
          particle.vy += 0.02
          particle.vx += (Math.random() - 0.5) * 0.1 // Легкое покачивание
        }

        // Эффект мерцания для искр
        if (particle.type === 'spark') {
          particle.opacity -= 0.005
          particle.size *= 0.998
        }

        // Удаление частиц за пределами экрана
        if (particle.y > canvas.height + 20 || 
            particle.x < -20 || 
            particle.x > canvas.width + 20 ||
            particle.opacity <= 0 ||
            particle.size <= 0.1) {
          particlesRef.current.splice(index, 1)
          createParticle() // Создание новой частицы
        }
      })
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)

      if (particle.type === 'spark') {
        // Рисование искры
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Добавление "хвоста" искры
        ctx.beginPath()
        ctx.strokeStyle = particle.color
        ctx.lineWidth = particle.size * 0.5
        ctx.moveTo(-particle.size * 2, 0)
        ctx.lineTo(particle.size * 2, 0)
        ctx.stroke()
      } else {
        // Рисование листика
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.ellipse(0, 0, particle.size, particle.size * 1.5, 0, 0, Math.PI * 2)
        ctx.fill()

        // Прожилка листа
        ctx.strokeStyle = particle.color
        ctx.globalAlpha = particle.opacity * 0.7
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(0, -particle.size * 1.5)
        ctx.lineTo(0, particle.size * 1.5)
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      updateParticles()
      particlesRef.current.forEach(drawParticle)
      
      animationRef.current = requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [type, intensity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={{ mixBlendMode: type === 'sparks' ? 'screen' : 'normal' }}
    />
  )
} 