import { useState, useCallback } from 'react'
import { ConfiguratorQuizState, QuizStep, QuizResult } from '../../types/configurator'
import { quizSteps } from '../data/quizSteps'
import { calculateResult } from '../utils/resultCalculator'

export const useConfigurator = () => {
  const [state, setState] = useState<ConfiguratorQuizState>({
    currentStep: 0,
    totalSteps: 7,
    answers: {
      spaceType: null,
      spaceSize: null,
      guestsCount: null,
      features: [],
      canopyType: null,
      style: null,
      budget: null,
    }
  })

  const currentStepData = quizSteps[state.currentStep]

  const nextStep = useCallback(() => {
    if (state.currentStep < state.totalSteps - 1) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }))
    }
  }, [state.currentStep, state.totalSteps])

  const prevStep = useCallback(() => {
    if (state.currentStep > 0) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }))
    }
  }, [state.currentStep])

  const updateAnswer = useCallback((field: keyof ConfiguratorQuizState['answers'], value: any) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [field]: value
      }
    }))
  }, [])

  const toggleFeature = useCallback((feature: string) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        features: prev.answers.features.includes(feature)
          ? prev.answers.features.filter(f => f !== feature)
          : [...prev.answers.features, feature]
      }
    }))
  }, [])

  const canGoNext = useCallback(() => {
    const { answers, currentStep } = state
    
    switch (currentStep) {
      case 0: return answers.spaceType !== null
      case 1: return answers.spaceSize !== null
      case 2: return answers.guestsCount !== null
      case 3: return true // features are optional
      case 4: return answers.canopyType !== null
      case 5: return answers.style !== null
      case 6: return answers.budget !== null
      default: return false
    }
  }, [state])

  const canGoBack = useCallback(() => {
    return state.currentStep > 0
  }, [state.currentStep])

  const isCompleted = useCallback(() => {
    return state.currentStep === state.totalSteps
  }, [state.currentStep, state.totalSteps])

  const generateResult = useCallback(() => {
    const result = calculateResult(state.answers)
    setState(prev => ({
      ...prev,
      result,
      currentStep: prev.totalSteps // Move to result page
    }))
    return result
  }, [state.answers])

  const restart = useCallback(() => {
    setState({
      currentStep: 0,
      totalSteps: 7,
      answers: {
        spaceType: null,
        spaceSize: null,
        guestsCount: null,
        features: [],
        canopyType: null,
        style: null,
        budget: null,
      }
    })
  }, [])

  const getProgress = useCallback(() => {
    return Math.round((state.currentStep / state.totalSteps) * 100)
  }, [state.currentStep, state.totalSteps])

  return {
    state,
    currentStepData,
    nextStep,
    prevStep,
    updateAnswer,
    toggleFeature,
    canGoNext: canGoNext(),
    canGoBack: canGoBack(),
    isCompleted: isCompleted(),
    generateResult,
    restart,
    progress: getProgress()
  }
} 