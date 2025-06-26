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
    <div className="flex justify-between items-center">
      <div>
        {canGoBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        )}
      </div>
      
      <div>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center px-8"
        >
          {isLastStep ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Показать результат
            </>
          ) : (
            <>
              Далее
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 