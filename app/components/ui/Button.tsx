'use client'

import React from 'react'
import { cn } from '@/app/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-fire-primary text-white hover:bg-ember hover:-translate-y-0.5 shadow-md hover:shadow-lg',
      secondary: 'bg-transparent text-graphite-800 border-2 border-graphite-600 hover:bg-graphite-800 hover:text-white hover:border-graphite-800',
      ghost: 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-8 py-4 text-sm',
      lg: 'px-10 py-5 text-base'
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Загрузка...
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button' 