'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { useConfigurator } from './hooks/useConfigurator'
import { ProgressBar } from './components/ProgressBar'
import { QuizStep } from './components/QuizStep'
import { QuizResult } from './components/QuizResult'
import { NavigationButtons } from './components/NavigationButtons'
import { LeadForm } from '../components/ui/LeadForm'
import { useLeadForm } from '../hooks/useLeadForm'
import { WhatsAppWidget } from '../components/features/WhatsAppWidget'
import { ParticleAnimation } from './components/ParticleAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useRouter } from 'next/navigation'

export default function ConfiguratorPage() {
  const router = useRouter()
  const {
    state,
    currentStepData,
    nextStep,
    prevStep,
    updateAnswer,
    toggleFeature,
    canGoNext,
    canGoBack,
    isCompleted,
    generateResult,
    restart,
    progress
  } = useConfigurator()

  const leadForm = useLeadForm({ defaultSource: 'configurator' })

  // Принудительно устанавливаем темную тему для этой страницы
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.style.colorScheme = 'dark'
    document.body.style.backgroundColor = '#0f172a'
    document.body.style.color = 'white'
    
    return () => {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = ''
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
  }, [])

  const handleNext = () => {
    if (state.currentStep === state.totalSteps - 1) {
      // Последний шаг - генерируем результат
      generateResult()
    } else {
      nextStep()
    }
  }

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'open-lead-form':
        leadForm.openForm('configurator-result')
        break
      case 'restart-quiz':
        restart()
        break
      case 'save-pdf':
        // TODO: Реализовать сохранение в PDF
        console.log('Save configuration as PDF')
        break
    }
  }

  if (isCompleted && state.result) {
    return (
      <>
        {/* iOS Dark Theme Styles */}
        <style jsx global>{`
          html, body {
            background-color: #0f172a !important;
            color: white !important;
            color-scheme: dark !important;
          }
          @supports (-webkit-appearance: none) {
            html, body {
              background-color: #0f172a !important;
              color: white !important;
            }
          }
        `}</style>
        
        <div className="min-h-screen" style={{ backgroundColor: '#0f172a', color: 'white' }}>
          <Header />
          <QuizResult
            result={state.result}
            onActionClick={handleActionClick}
          />
          <Footer />
          <LeadForm
            isOpen={leadForm.isOpen}
            onClose={() => leadForm.closeForm()}
            source={leadForm.source}
            title="Получить точный расчет"
            description="Заполните форму и мы подготовим персональное предложение на основе вашей конфигурации"
          />
          <WhatsAppWidget />
        </div>
      </>
    )
  }

  return (
    <>
      {/* iOS Dark Theme Styles */}
      <style jsx global>{`
        html, body {
          background-color: #0f172a !important;
          color: white !important;
          color-scheme: dark !important;
          overflow-x: hidden !important;
        }
        @supports (-webkit-appearance: none) {
          html, body {
            background-color: #0f172a !important;
            color: white !important;
          }
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: '#0f172a', overflowX: 'hidden' }}>
        <Header />
        
        {/* Background with campfire and mountains */}
        <div className="min-h-screen relative" style={{ overflowX: 'hidden' }}>
          {/* Campfire & Mountain Nature Background */}
          <div className="absolute inset-0 z-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50" />
            
            {/* Main campfire with nature background */}
            <div 
              className="absolute inset-0 opacity-50 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
              }}
            />
            
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30" />
            
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
          </div>

          {/* Particle Animations */}
          <ParticleAnimation type="leaves" intensity={30} />
          <ParticleAnimation type="sparks" intensity={20} />

          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-40" 
               style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)' }}>
            <div className="px-4 py-4 max-w-full" style={{ overflowX: 'hidden' }}>
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="p-2 text-white hover:bg-white/10 flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-base sm:text-lg font-oswald font-semibold uppercase tracking-wide text-white text-center flex-1 px-2">
                  Создайте свое место силы
                </h1>
                <div className="w-9 flex-shrink-0" /> {/* Spacer */}
              </div>
              <div className="w-full">
                <ProgressBar progress={progress} currentStep={state.currentStep + 1} totalSteps={state.totalSteps} />
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block relative z-30" 
               style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mr-4 text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-oswald font-semibold uppercase tracking-wider text-white">
                      Создайте свое место силы
                    </h1>
                    <p className="text-slate-300 mt-1">
                      Ответьте на несколько вопросов и получите персональное решение
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400 mb-2">
                    Шаг {state.currentStep + 1} из {state.totalSteps}
                  </div>
                  <ProgressBar progress={progress} currentStep={state.currentStep + 1} totalSteps={state.totalSteps} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20" style={{ overflowX: 'hidden' }}>
            <div className="lg:grid lg:grid-cols-12 lg:gap-8" style={{ maxWidth: '100%' }}>
              {/* Quiz Steps - Mobile: Full width, Desktop: 8 columns */}
              <div className="lg:col-span-8 w-full" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={state.currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ maxWidth: '100%' }}
                  >
                    <QuizStep
                      step={currentStepData}
                      answers={state.answers}
                      onAnswer={updateAnswer}
                      onToggleFeature={toggleFeature}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 w-full">
                  <NavigationButtons
                    canGoBack={canGoBack}
                    canGoNext={canGoNext}
                    isLastStep={state.currentStep === state.totalSteps - 1}
                    onBack={prevStep}
                    onNext={handleNext}
                  />
                </div>
              </div>

              {/* Progress sidebar - только для desktop */}
              <div className="hidden lg:block lg:col-span-4">
                <div className="sticky top-8">
                  <div className="p-6 rounded-lg border border-white/10" 
                       style={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', backdropFilter: 'blur(8px)' }}>
                    <h3 className="text-lg font-oswald font-semibold uppercase tracking-wide text-white mb-4">
                      Прогресс конфигурации
                    </h3>
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300">
                        Шаг {state.currentStep + 1} из {state.totalSteps}
                      </div>
                      <div className="text-xs text-slate-400">
                        Осталось еще {state.totalSteps - state.currentStep - 1} шагов до результата
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <LeadForm
          isOpen={leadForm.isOpen}
          onClose={() => leadForm.closeForm()}
          source={leadForm.source}
          title="Получить консультацию"
          description="Оставьте заявку и мы поможем подобрать идеальное решение для вашего участка"
        />
        <WhatsAppWidget />
      </div>
    </>
  )
} 