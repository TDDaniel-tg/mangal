'use client'

import React, { useState } from 'react'
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
      </>
    )
  }

  return (
    <>
      <Header />
      
      {/* Background with campfire and mountains */}
      <div className="min-h-screen relative overflow-hidden">
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
        <div className="lg:hidden bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-white/10 sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-oswald font-semibold uppercase tracking-wide text-white">
                Создайте свое место силы
              </h1>
              <div className="w-9" /> {/* Spacer */}
            </div>
            <ProgressBar progress={progress} currentStep={state.currentStep + 1} totalSteps={state.totalSteps} />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-white/10 relative z-30">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Quiz Steps - Mobile: Full width, Desktop: 8 columns */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
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
              <div className="mt-8">
                <NavigationButtons
                  canGoBack={canGoBack}
                  canGoNext={canGoNext}
                  isLastStep={state.currentStep === state.totalSteps - 1}
                  onBack={prevStep}
                  onNext={handleNext}
                />
              </div>
            </div>

            {/* Preview - Desktop only: 4 columns */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-6">
                   <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-white mb-4">
                     Ваша конфигурация
                   </h3>
                   
                   <div className="space-y-4">
                     {state.answers.spaceType && (
                       <div className="flex justify-between items-center py-2 border-b border-white/10">
                         <span className="text-sm text-slate-400">Тип:</span>
                         <span className="text-sm font-medium text-white">
                           {state.answers.spaceType === 'mangal' && 'Зона с мангалом'}
                           {state.answers.spaceType === 'kitchen' && 'Мангальная кухня'}
                           {state.answers.spaceType === 'complex' && 'Комплексное решение'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.spaceSize && (
                       <div className="flex justify-between items-center py-2 border-b border-white/10">
                         <span className="text-sm text-slate-400">Размер:</span>
                         <span className="text-sm font-medium text-white">
                           {state.answers.spaceSize === 'compact' && 'Компактная'}
                           {state.answers.spaceSize === 'standard' && 'Стандартная'}
                           {state.answers.spaceSize === 'premium' && 'Просторная'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.guestsCount && (
                       <div className="flex justify-between items-center py-2 border-b border-white/10">
                         <span className="text-sm text-slate-400">Гости:</span>
                         <span className="text-sm font-medium text-white">{state.answers.guestsCount} человек</span>
                       </div>
                     )}
                     
                     {state.answers.features.length > 0 && (
                       <div className="py-2 border-b border-white/10">
                         <span className="text-sm text-slate-400 block mb-2">Модули:</span>
                         <div className="space-y-1">
                           {state.answers.features.map(feature => (
                             <span key={feature} className="inline-block bg-fire-primary/20 text-fire-primary text-xs px-2 py-1 rounded mr-1 mb-1">
                               {feature === 'sink' && 'Мойка'}
                               {feature === 'worktop' && 'Рабочая поверхность'}
                               {feature === 'storage' && 'Места хранения'}
                               {feature === 'fridge' && 'Холодильник'}
                             </span>
                           ))}
                         </div>
                       </div>
                     )}
                     
                     {state.answers.canopyType && (
                       <div className="flex justify-between items-center py-2 border-b border-white/10">
                         <span className="text-sm text-slate-400">Навес:</span>
                         <span className="text-sm font-medium text-white">
                           {state.answers.canopyType === 'none' && 'Без навеса'}
                           {state.answers.canopyType === 'light' && 'Легкий навес'}
                           {state.answers.canopyType === 'capital' && 'Капитальная беседка'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.style && (
                       <div className="flex justify-between items-center py-2 border-b border-white/10">
                         <span className="text-sm text-slate-400">Стиль:</span>
                         <span className="text-sm font-medium text-white">
                           {state.answers.style === 'minimalist' && 'Минимализм'}
                           {state.answers.style === 'classic' && 'Классический'}
                           {state.answers.style === 'premium' && 'Премиум'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.budget && (
                       <div className="flex justify-between items-center py-2">
                         <span className="text-sm text-slate-400">Бюджет:</span>
                         <span className="text-sm font-medium text-white">
                           {state.answers.budget === 'economy' && 'До 150 000 ₽'}
                           {state.answers.budget === 'standard' && '150 000 - 350 000 ₽'}
                           {state.answers.budget === 'premium' && '350 000 - 700 000 ₽'}
                           {state.answers.budget === 'custom' && 'От 700 000 ₽'}
                         </span>
                       </div>
                     )}
                   </div>

                  {state.currentStep > 0 && (
                    <div className="mt-6 p-4 bg-fire-primary/20 backdrop-blur-sm rounded-lg border border-fire-primary/30">
                      <p className="text-sm text-fire-primary font-medium text-center">
                        🔥 Отличный выбор! Продолжайте, чтобы увидеть полный результат
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm
        isOpen={leadForm.isOpen}
        onClose={() => leadForm.closeForm()}
        source={leadForm.source}
        title="Получить консультацию"
        description="Заполните форму и мы подготовим персональное предложение на основе ваших предпочтений"
      />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </>
  )
} 