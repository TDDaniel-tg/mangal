import { ConfiguratorQuizState, QuizResult, Configuration, Project } from '../../types/configurator'

export const calculateResult = (answers: ConfiguratorQuizState['answers']): QuizResult => {
  // Базовые параметры
  const baseConfig = generateConfiguration(answers)
  const priceRange = calculatePriceRange(answers)
  const images = getResultImages(answers)
  const features = generateFeatures(answers)
  const projects = getSimilarProjects(answers)

  return {
    title: "Ваше идеальное место силы готово!",
    gallery: {
      images: images,
      mainImage: images[0],
      thumbnails: images
    },
    solution: {
      name: baseConfig.name,
      description: baseConfig.description,
      features: features,
      dimensions: baseConfig.dimensions,
      estimatedPrice: {
        min: priceRange.min,
        max: priceRange.max,
        note: "Точная стоимость после замеров и консультации"
      }
    },
    similarProjects: projects,
    actions: {
      primary: {
        text: "Получить точный расчет",
        action: 'open-lead-form'
      },
      secondary: {
        text: "Изменить параметры",
        action: 'restart-quiz'
      },
      tertiary: {
        text: "Сохранить конфигурацию",
        action: 'save-pdf'
      }
    }
  }
}

const generateConfiguration = (answers: ConfiguratorQuizState['answers']): Configuration => {
  const spaceTypeNames = {
    mangal: 'Зона с мангалом',
    kitchen: 'Мангальная кухня',
    complex: 'Комплексное решение'
  }

  const sizeTypeNames = {
    compact: 'компактная',
    standard: 'стандартная',
    premium: 'просторная'
  }

  const styleNames = {
    minimalist: 'в стиле минимализм',
    classic: 'в классическом стиле',
    premium: 'в премиум исполнении'
  }

  const name = `${spaceTypeNames[answers.spaceType || 'mangal']} "${sizeTypeNames[answers.spaceSize || 'standard']}" ${styleNames[answers.style || 'classic']}`

  const dimensions = getDimensions(answers.spaceSize, answers.guestsCount)
  
  return {
    id: 'custom-config-' + Date.now(),
    name: name,
    description: generateDescription(answers),
    dimensions: dimensions,
    materials: getMaterials(answers.style),
    features: answers.features
  }
}

const generateDescription = (answers: ConfiguratorQuizState['answers']): string => {
  const descriptions = []
  
  if (answers.spaceType === 'mangal') {
    descriptions.push('Классическая зона для приготовления на огне с продуманной эргономикой.')
  } else if (answers.spaceType === 'kitchen') {
    descriptions.push('Полноценная уличная кухня с зоной готовки и всеми необходимыми удобствами.')
  } else if (answers.spaceType === 'complex') {
    descriptions.push('Комплексное решение с беседкой, мангальной зоной и мебелью для полноценного отдыха.')
  }

  if (answers.guestsCount) {
    descriptions.push(`Рассчитана на ${answers.guestsCount === '4-6' ? 'семейные встречи' : answers.guestsCount === '8-10' ? 'дружеские посиделки' : 'большие компании'}.`)
  }

  if (answers.canopyType === 'light') {
    descriptions.push('С легким навесом для защиты от непогоды.')
  } else if (answers.canopyType === 'capital') {
    descriptions.push('С капитальной беседкой для круглогодичного использования.')
  }

  return descriptions.join(' ')
}

const calculatePriceRange = (answers: ConfiguratorQuizState['answers']): { min: number; max: number } => {
  let baseMin = 50000
  let baseMax = 150000

  // Базовая цена по типу
  if (answers.spaceType === 'mangal') {
    baseMin = 25000
    baseMax = 150000
  } else if (answers.spaceType === 'kitchen') {
    baseMin = 150000
    baseMax = 500000
  } else if (answers.spaceType === 'complex') {
    baseMin = 300000
    baseMax = 1500000
  }

  // Корректировка по размеру
  if (answers.spaceSize === 'compact') {
    baseMax *= 0.7
  } else if (answers.spaceSize === 'premium') {
    baseMin *= 1.5
    baseMax *= 2
  }

  // Добавляем стоимость модулей
  const featurePrices: Record<string, number> = {
    sink: 25000,
    worktop: 15000,
    storage: 20000,
    fridge: 35000
  }

  const featuresTotal = answers.features.reduce((sum, feature) => {
    return sum + (featurePrices[feature] || 0)
  }, 0)

  // Добавляем стоимость навеса
  if (answers.canopyType === 'light') {
    baseMin += 80000
    baseMax += 120000
  } else if (answers.canopyType === 'capital') {
    baseMin += 250000
    baseMax += 400000
  }

  // Корректировка по стилю
  if (answers.style === 'premium') {
    baseMin *= 1.5
    baseMax *= 2
  } else if (answers.style === 'minimalist') {
    baseMax *= 0.8
  }

  return {
    min: Math.round(baseMin + featuresTotal),
    max: Math.round(baseMax + featuresTotal)
  }
}

const getDimensions = (size?: string | null, guests?: string | null): string => {
  if (size === 'compact') return '2.5 x 1.5 м'
  if (size === 'standard') return '3.5 x 2.5 м'
  if (size === 'premium') return '5 x 3.5 м'
  
  if (guests === '4-6') return '3 x 2 м'
  if (guests === '8-10') return '4 x 2.5 м'
  if (guests === '12+') return '5 x 3 м'
  
  return '3.5 x 2.5 м'
}

const getMaterials = (style?: string | null): string[] => {
  if (style === 'minimalist') return ['Сталь', 'Бетон', 'Стекло']
  if (style === 'premium') return ['Нержавеющая сталь', 'Натуральный камень', 'Закаленное стекло']
  return ['Сталь', 'Дерево', 'Кирпич'] // classic
}

const generateFeatures = (answers: ConfiguratorQuizState['answers']): string[] => {
  const allFeatures = []
  
  // Базовые возможности
  allFeatures.push('Зона для приготовления на углях')
  allFeatures.push('Рабочие поверхности из нержавейки')
  
  // Дополнительные модули
  const featureNames: Record<string, string> = {
    sink: 'Мойка с подводом воды',
    worktop: 'Расширенная рабочая поверхность',
    storage: 'Встроенные места хранения',
    fridge: 'Встроенный холодильник'
  }
  
  answers.features.forEach(feature => {
    if (featureNames[feature]) {
      allFeatures.push(featureNames[feature])
    }
  })
  
  // Навес
  if (answers.canopyType === 'light') {
    allFeatures.push('Легкий навес от дождя и солнца')
  } else if (answers.canopyType === 'capital') {
    allFeatures.push('Капитальная беседка с освещением')
  }
  
  // Размер мангала
  if (answers.guestsCount === '4-6') {
    allFeatures.push('Мангал 80 см для семьи')
  } else if (answers.guestsCount === '8-10') {
    allFeatures.push('Мангал 120 см для дружеских встреч')
  } else if (answers.guestsCount === '12+') {
    allFeatures.push('Мангал 150+ см для больших компаний')
  }
  
  return allFeatures
}

const getResultImages = (answers: ConfiguratorQuizState['answers']): string[] => {
  // В реальном проекте здесь была бы логика подбора изображений на основе ответов
  const images = ['/configurator/result-main.jpg']
  
  if (answers.spaceType === 'kitchen') {
    images.push('/configurator/kitchen-1.jpg', '/configurator/kitchen-2.jpg')
  } else if (answers.spaceType === 'complex') {
    images.push('/configurator/complex-1.jpg', '/configurator/complex-2.jpg')
  } else {
    images.push('/configurator/mangal-1.jpg', '/configurator/mangal-2.jpg')
  }
  
  if (answers.canopyType === 'light') {
    images.push('/configurator/with-canopy.jpg')
  } else if (answers.canopyType === 'capital') {
    images.push('/configurator/with-gazebo.jpg')
  }
  
  return images
}

const getSimilarProjects = (answers: ConfiguratorQuizState['answers']): Project[] => {
  // В реальном проекте здесь был бы запрос к API для получения похожих проектов
  const projects: Project[] = [
    {
      id: '1',
      title: 'Семейная мангальная кухня',
      image: '/portfolio/project-1.jpg',
      price: '275 000 ₽',
      link: '/portfolio/project-1'
    },
    {
      id: '2',
      title: 'Беседка с мангальной зоной',
      image: '/portfolio/project-2.jpg',
      price: '450 000 ₽',
      link: '/portfolio/project-2'
    },
    {
      id: '3',
      title: 'Премиум комплекс для дачи',
      image: '/portfolio/project-3.jpg',
      price: '680 000 ₽',
      link: '/portfolio/project-3'
    }
  ]
  
  return projects.slice(0, 3) // Возвращаем 3 проекта
} 