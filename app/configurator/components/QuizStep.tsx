import React from 'react'
import { QuizStep as QuizStepType, QuizOption, ConfiguratorQuizState } from '../../types/configurator'
import { Check, Star } from 'lucide-react'
import { ImageWithFallback } from '../../components/ui/ImageWithFallback'

interface QuizStepProps {
  step: QuizStepType
  answers: ConfiguratorQuizState['answers']
  onAnswer: (field: keyof ConfiguratorQuizState['answers'], value: any) => void
  onToggleFeature: (feature: string) => void
}

export const QuizStep: React.FC<QuizStepProps> = ({ step, answers, onAnswer, onToggleFeature }) => {
  const getFieldName = (stepId: number): keyof ConfiguratorQuizState['answers'] => {
    switch (stepId) {
      case 1: return 'spaceType'
      case 2: return 'spaceSize'
      case 3: return 'guestsCount'
      case 4: return 'features'
      case 5: return 'canopyType'
      case 6: return 'style'
      case 7: return 'budget'
      default: return 'spaceType'
    }
  }

  const getCurrentValue = () => {
    const fieldName = getFieldName(step.id)
    return answers[fieldName]
  }

  const handleOptionClick = (option: QuizOption) => {
    const fieldName = getFieldName(step.id)
    
    if (step.type === 'multi-select') {
      onToggleFeature(option.id)
    } else {
      onAnswer(fieldName, option.id)
    }
  }

  const isSelected = (option: QuizOption) => {
    if (step.type === 'multi-select') {
      return answers.features.includes(option.id)
    } else {
      return getCurrentValue() === option.id
    }
  }

  const renderOption = (option: QuizOption) => {
    const selected = isSelected(option)
    
    return (
      <div
        key={option.id}
        onClick={() => handleOptionClick(option)}
        className={`relative p-4 sm:p-5 lg:p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg w-full ${
          selected
            ? 'shadow-lg backdrop-blur-sm'
            : 'border-slate-600 hover:border-slate-500 backdrop-blur-sm hover:bg-slate-700/90'
        }`}
        style={{
          borderColor: selected ? '#f97316' : '#475569',
          backgroundColor: selected ? 'rgba(249, 115, 22, 0.2)' : 'rgba(51, 65, 85, 0.8)',
          boxShadow: selected ? '0 8px 32px rgba(249, 115, 22, 0.2)' : undefined,
          maxWidth: '100%'
        }}
      >
        {/* Recommended Badge */}
        {option.recommended && (
          <div className="absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full flex items-center"
               style={{ backgroundColor: '#f97316' }}>
            <Star className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Лучший выбор</span>
            <span className="sm:hidden">Топ</span>
          </div>
        )}

        {/* Selection Indicator */}
        {selected && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
               style={{ backgroundColor: '#f97316' }}>
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        )}

        <div className="flex flex-col h-full w-full" style={{ maxWidth: '100%' }}>
          {/* Icon or Image */}
          {option.icon && (
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-3">{option.icon}</div>
          )}
          
          {option.visual && option.visual.startsWith('/') && (
            <div className="relative h-28 sm:h-32 lg:h-40 mb-4 rounded-lg overflow-hidden w-full">
              <ImageWithFallback
                src={option.visual}
                alt={option.title}
                fallbackText={option.title}
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-1 w-full" style={{ maxWidth: '100%' }}>
            {/* Title */}
            <h3 className="text-base sm:text-lg lg:text-xl font-oswald font-medium uppercase tracking-wide text-white mb-2 break-words">
              {option.title}
            </h3>

            {/* Price */}
            {(option.priceRange || option.price) && (
              <div className={`text-sm sm:text-base lg:text-base font-semibold mb-3 break-words ${
                selected ? '' : 'text-slate-300'
              }`}
              style={{ color: selected ? '#f97316' : '#cbd5e1' }}>
                {option.priceRange || option.price}
              </div>
            )}

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base mb-3 break-words leading-relaxed">
              {option.description}
            </p>

            {/* Additional Info */}
            {option.mangalLength && (
              <div className="text-xs sm:text-sm text-slate-400 break-words">
                Длина мангала: {option.mangalLength}
              </div>
            )}

            {option.materials && (
              <div className="flex flex-wrap gap-1 mt-2 w-full">
                {option.materials.map((material, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-600/80 text-slate-200 text-xs px-2 py-1 rounded break-words"
                    style={{ wordBreak: 'break-word' }}
                  >
                    {material}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg shadow-xl border border-white/10 p-4 sm:p-6 lg:p-8 w-full"
         style={{ 
           backgroundColor: 'rgba(30, 41, 59, 0.9)', 
           backdropFilter: 'blur(8px)',
           maxWidth: '100%',
           overflowX: 'hidden'
         }}>
      {/* Question */}
      <div className="text-center mb-6 sm:mb-8 w-full">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-oswald font-semibold uppercase tracking-wider text-white mb-4 break-words px-2">
          {step.question}
        </h2>
        <div className="w-16 h-1 mx-auto rounded-full shadow-lg"
             style={{ backgroundColor: '#f97316', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.5)' }} />
        
        {step.note && (
          <p className="text-slate-300 text-xs sm:text-sm mt-4 max-w-2xl mx-auto px-4 break-words leading-relaxed">
            {step.note}
          </p>
        )}
      </div>

      {/* Options */}
      <div className={`grid gap-3 sm:gap-4 w-full ${
        step.visual === 'icons' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : step.type === 'multi-select'
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}
      style={{ maxWidth: '100%' }}>
        {step.options.map(renderOption)}
      </div>

      {/* Multi-select hint */}
      {step.type === 'multi-select' && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 border rounded-lg backdrop-blur-sm w-full"
             style={{ 
               backgroundColor: 'rgba(29, 78, 216, 0.3)', 
               borderColor: 'rgba(59, 130, 246, 0.5)' 
             }}>
          <p className="text-blue-300 text-xs sm:text-sm text-center break-words">
            💡 Можно выбрать несколько вариантов или пропустить этот шаг
          </p>
        </div>
      )}
    </div>
  )
} 