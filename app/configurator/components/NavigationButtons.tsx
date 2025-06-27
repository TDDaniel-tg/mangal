import React from 'react'
import { Button } from '../../components/ui/Button'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

interface NavigationButtonsProps {
  canGoBack: boolean
  canGoNext: boolean
  isLastStep: boolean
  onBack: () => void
  onNext: () => void
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  canGoBack,
  canGoNext,
  isLastStep,
  onBack,
  onNext
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 w-full" 
         style={{ maxWidth: '100%' }}>
      <div className="w-full sm:w-auto order-2 sm:order-1">
        {canGoBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10 w-full sm:w-auto justify-center sm:justify-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        )}
      </div>
      
      <div className="w-full sm:w-auto order-1 sm:order-2">
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center px-6 sm:px-8 w-full sm:w-auto justify-center"
        >
          {isLastStep ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">Показать результат</span>
            </>
          ) : (
            <>
              <span className="text-sm sm:text-base">Далее</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 