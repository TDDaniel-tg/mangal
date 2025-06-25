'use client'

import React, { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { useConfigurator } from './hooks/useConfigurator'
import { ProgressBar } from './components/ProgressBar'
import { QuizStep } from './components/QuizStep'
import { QuizResult } from './components/QuizResult'
import { NavigationButtons } from './components/NavigationButtons'
import { LeadModal } from '../components/features/LeadModal'
import { WhatsAppWidget } from '../components/features/WhatsAppWidget'
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

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const handleNext = () => {
    if (state.currentStep === state.totalSteps - 1) {
      // Последний шаг - генерируем результат
      generateResult()
    } else {
      nextStep()
    }
  }

  const handleLeadSubmit = async (data: { name: string; phone: string; message?: string }) => {
    // Здесь будет отправка заявки с конфигурацией
    console.log('Lead with configuration:', {
      ...data,
      configuration: state.answers,
      estimatedPrice: state.result?.estimatedPrice
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'open-lead-form':
        setIsLeadModalOpen(true)
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
        <LeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          source="configurator"
          configuration={state.answers}
          onSubmit={handleLeadSubmit}
        />
        <WhatsAppWidget />
      </>
    )
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-oswald font-semibold uppercase tracking-wide">
                Создайте свое место силы
              </h1>
              <div className="w-9" /> {/* Spacer */}
            </div>
            <ProgressBar progress={progress} currentStep={state.currentStep + 1} totalSteps={state.totalSteps} />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="mr-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-oswald font-semibold uppercase tracking-wider text-graphite-900">
                    Создайте свое место силы
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Ответьте на несколько вопросов и получите персональное решение
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-2">
                  Шаг {state.currentStep + 1} из {state.totalSteps}
                </div>
                <ProgressBar progress={progress} currentStep={state.currentStep + 1} totalSteps={state.totalSteps} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                                 <div className="bg-white rounded-lg shadow-sm border p-6">
                   <h3 className="text-lg font-oswald font-medium uppercase tracking-wide text-graphite-900 mb-4">
                     Ваша конфигурация
                   </h3>
                   
                   <div className="space-y-4">
                     {state.answers.spaceType && (
                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                         <span className="text-sm text-gray-600">Тип:</span>
                         <span className="text-sm font-medium text-graphite-900">
                           {state.answers.spaceType === 'mangal' && 'Зона с мангалом'}
                           {state.answers.spaceType === 'kitchen' && 'Мангальная кухня'}
                           {state.answers.spaceType === 'complex' && 'Комплексное решение'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.spaceSize && (
                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                         <span className="text-sm text-gray-600">Размер:</span>
                         <span className="text-sm font-medium text-graphite-900">
                           {state.answers.spaceSize === 'compact' && 'Компактная'}
                           {state.answers.spaceSize === 'standard' && 'Стандартная'}
                           {state.answers.spaceSize === 'premium' && 'Просторная'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.guestsCount && (
                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                         <span className="text-sm text-gray-600">Гости:</span>
                         <span className="text-sm font-medium text-graphite-900">{state.answers.guestsCount} человек</span>
                       </div>
                     )}
                     
                     {state.answers.features.length > 0 && (
                       <div className="py-2 border-b border-gray-100">
                         <span className="text-sm text-gray-600 block mb-2">Модули:</span>
                         <div className="space-y-1">
                           {state.answers.features.map(feature => (
                             <span key={feature} className="inline-block bg-fire-primary/10 text-fire-primary text-xs px-2 py-1 rounded mr-1 mb-1">
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
                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                         <span className="text-sm text-gray-600">Навес:</span>
                         <span className="text-sm font-medium text-graphite-900">
                           {state.answers.canopyType === 'none' && 'Без навеса'}
                           {state.answers.canopyType === 'light' && 'Легкий навес'}
                           {state.answers.canopyType === 'capital' && 'Капитальная беседка'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.style && (
                       <div className="flex justify-between items-center py-2 border-b border-gray-100">
                         <span className="text-sm text-gray-600">Стиль:</span>
                         <span className="text-sm font-medium text-graphite-900">
                           {state.answers.style === 'minimalist' && 'Минимализм'}
                           {state.answers.style === 'classic' && 'Классический'}
                           {state.answers.style === 'premium' && 'Премиум'}
                         </span>
                       </div>
                     )}
                     
                     {state.answers.budget && (
                       <div className="flex justify-between items-center py-2">
                         <span className="text-sm text-gray-600">Бюджет:</span>
                         <span className="text-sm font-medium text-graphite-900">
                           {state.answers.budget === 'economy' && 'До 150 000 ₽'}
                           {state.answers.budget === 'standard' && '150 000 - 350 000 ₽'}
                           {state.answers.budget === 'premium' && '350 000 - 700 000 ₽'}
                           {state.answers.budget === 'custom' && 'От 700 000 ₽'}
                         </span>
                       </div>
                     )}
                   </div>

                  {state.currentStep > 0 && (
                    <div className="mt-6 p-4 bg-fire-primary/5 rounded-lg">
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

      {/* Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        source="configurator"
        configuration={state.answers}
        onSubmit={handleLeadSubmit}
      />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </>
  )
} 