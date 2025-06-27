import React from 'react'

interface ProgressBarProps {
  progress: number
  currentStep: number
  totalSteps: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, currentStep, totalSteps }) => {
  return (
    <div className="w-full" style={{ maxWidth: '100%' }}>
      <div className="flex justify-between text-xs sm:text-sm text-slate-400 mb-2 px-1">
        <span className="break-words">Шаг {currentStep} из {totalSteps}</span>
        <span className="flex-shrink-0">{progress}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div 
          className="h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{ 
            width: `${progress}%`,
            backgroundColor: '#f97316',
            boxShadow: '0 4px 20px rgba(249, 115, 22, 0.5)'
          }}
        />
      </div>
    </div>
  )
} 