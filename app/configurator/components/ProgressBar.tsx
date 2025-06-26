import React from 'react'

interface ProgressBarProps {
  progress: number
  currentStep: number
  totalSteps: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, currentStep, totalSteps }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-slate-400 mb-2">
        <span>Шаг {currentStep} из {totalSteps}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-fire-primary h-2 rounded-full transition-all duration-300 ease-out shadow-lg shadow-fire-primary/50"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 