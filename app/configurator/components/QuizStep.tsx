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
        className={`relative p-4 lg:p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
          selected
            ? 'border-fire-primary bg-fire-primary/20 shadow-lg shadow-fire-primary/20 backdrop-blur-sm'
            : 'border-slate-600 hover:border-slate-500 bg-slate-700/80 backdrop-blur-sm hover:bg-slate-700/90'
        }`}
      >
        {/* Recommended Badge */}
        {option.recommended && (
          <div className="absolute -top-2 -right-2 bg-fire-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Лучший выбор
          </div>
        )}

        {/* Selection Indicator */}
        {selected && (
          <div className="absolute top-4 right-4 w-6 h-6 bg-fire-primary rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="flex flex-col h-full">
          {/* Icon or Image */}
          {option.icon && (
            <div className="text-3xl lg:text-4xl mb-3">{option.icon}</div>
          )}
          
          {option.visual && option.visual.startsWith('/') && (
            <div className="relative h-32 lg:h-40 mb-4 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={option.visual}
                alt={option.title}
                fallbackText={option.title}
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-1">
            {/* Title */}
            <h3 className="text-lg lg:text-xl font-oswald font-medium uppercase tracking-wide text-white mb-2">
              {option.title}
            </h3>

            {/* Price */}
            {(option.priceRange || option.price) && (
              <div className={`text-sm lg:text-base font-semibold mb-3 ${
                selected ? 'text-fire-primary' : 'text-slate-300'
              }`}>
                {option.priceRange || option.price}
              </div>
            )}

            {/* Description */}
            <p className="text-slate-300 text-sm lg:text-base mb-3">{option.description}</p>

            {/* Additional Info */}
            {option.mangalLength && (
              <div className="text-xs lg:text-sm text-slate-400">
                Длина мангала: {option.mangalLength}
              </div>
            )}

            {option.materials && (
              <div className="flex flex-wrap gap-1 mt-2">
                {option.materials.map((material, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-600/80 text-slate-200 text-xs px-2 py-1 rounded"
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
    <div className="bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-6 lg:p-8">
      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-oswald font-semibold uppercase tracking-wider text-white mb-4">
          {step.question}
        </h2>
        <div className="w-16 h-1 bg-fire-primary mx-auto rounded-full shadow-lg shadow-fire-primary/50" />
        
        {step.note && (
          <p className="text-slate-300 text-sm mt-4 max-w-2xl mx-auto">
            {step.note}
          </p>
        )}
      </div>

      {/* Options */}
      <div className={`grid gap-4 ${
        step.visual === 'icons' 
          ? 'grid-cols-1 md:grid-cols-3' 
          : step.type === 'multi-select'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {step.options.map(renderOption)}
      </div>

      {/* Multi-select hint */}
      {step.type === 'multi-select' && (
        <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg backdrop-blur-sm">
          <p className="text-blue-300 text-sm text-center">
            💡 Можно выбрать несколько вариантов или пропустить этот шаг
          </p>
        </div>
      )}
    </div>
  )
} 