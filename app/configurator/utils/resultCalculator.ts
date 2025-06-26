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
  const images: string[] = []
  
  // Определяем основное изображение на основе типа
  const spaceType = answers.spaceType || 'mangal'
  
  // Добавляем только ваши изображения для каждого типа
  if (spaceType === 'mangal') {
    images.push(
      'https://landscape3d.ru/img/article/mangalnaya-zona-svoimi-rukami-26.webp',
      'https://design.pibig.info/uploads/posts/2023-01/1674863816_design-pibig-info-p-kukhnya-ulichnaya-loft-instagram-1.jpg', 
      'https://i.pinimg.com/736x/38/44/67/384467a687f91da769a52229e471b584.jpg', 
      'https://design-homes.ru/images/galery/2372/mangalnaya-zona-na-dache_5f3f7157ac92d.jpg',
      'https://happyhouse.guru/uploads/posts/2023-01/1673421598_happyhouse-guru-p-barbekyu-na-terrase-2.jpg'
    )
  } else if (spaceType === 'kitchen') {
    images.push('https://images.stroistyle.com/posts/84100015-letniaia-kukhnia-s-mangalom-i-kazanom-2.jpg',
      'https://lh3.googleusercontent.com/proxy/B8mdaM07VfR5SjYIHiQSX1L2t3BIoWgp1p-K2upX3crM6RG1d6l0rUyzTSCEVSXSl8Z27QXen9g88yWKJFRd-0nS6Kd7k2MPc0nE',
      'https://s3.stroi-news.ru/img/letnyaya-kukhnya-s-barbekyu-vkontakte-3.jpg',
      'https://i.pinimg.com/736x/b9/73/d1/b973d1be67ab4099c87bbd6363e45f31.jpg',
      'https://design.pibig.info/uploads/posts/2023-01/1674827738_design-pibig-info-p-mangal-na-kukhne-v-kvartire-vkontakte-3.jpg'
    ) // Современная уличная кухня
  } else if (spaceType === 'complex') {
    images.push('https://metallo-obrabotka24.ru/wp-content/uploads/2020/04/besedka-s-barbekyu2.jpg',
      'https://st.hzcdn.com/simgs/pictures/terrasy/arbor-bbq-with-a-glass-roof-besedka-so-steklyannoy-kryshey-evamix-img~b621d9ab0e946dfe_14-9808-1-76f2a77.jpg',
      'https://okna911.ru/sites/default/files/styles/node_1/public/field/image/article-2505-4.jpg?itok=jyNNMlr0',
      'https://fire-house.ru/wp-content/uploads/2022/08/besedka-dlya-mangala-4.jpg',
      'https://altanka.com.ua/wp-content/uploads/2018/02/%D0%91%D0%B5%D1%81%D0%B5%D0%B4%D0%BA%D0%B0-%D1%81-%D0%B1%D0%B0%D1%80%D0%B1%D0%B5%D0%BA%D1%8E-%D0%B8%D0%B7-%D0%BA%D0%BE%D0%BC%D0%B1%D0%B8%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D0%BE%D0%B2.jpg'
    ) // Беседка с кухней
  }
  
  // Возвращаем только реальные изображения без заглушек
  return images.filter(img => img && img.trim() !== '')
}

// Функция для получения URL изображений для всех комбинаций
const getImageUrls = (): Record<string, string> => {
  return {
    // ЗОНА С МАНГАЛОМ
    'mangal-compact-minimalist': 'https://images.unsplash.com/photo-1568563992542-bec6b0b52f4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Маленький современный гриль
    'mangal-compact-classic': 'https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Классический гриль
    'mangal-compact-premium': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Премиум гриль на террасе
    'mangal-standard-minimalist': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Стандартный современный гриль
    'mangal-standard-classic': 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Классический гриль с мясом
    'mangal-standard-premium': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Гриль у бассейна
    'mangal-premium-minimalist': 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Просторная кухня с грилем
    'mangal-premium-classic': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Классическая зона с мангалом
    'mangal-premium-premium': 'https://images.unsplash.com/photo-1621976498727-9e5d6b16a5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Роскошная зона с навесом
    
    // МАНГАЛЬНАЯ КУХНЯ
    'kitchen-compact-minimalist': 'https://images.unsplash.com/photo-1554998171-89445e31d4e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Компактная современная кухня
    'kitchen-compact-classic': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Классическая компактная кухня
    'kitchen-compact-premium': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Премиум компактная кухня
    'kitchen-standard-minimalist': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Стандартная современная кухня
    'kitchen-standard-classic': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Классическая стандартная кухня
    'kitchen-standard-premium': 'https://images.unsplash.com/photo-1606107557084-9ba7e2c4c8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Премиум стандартная кухня
    'kitchen-premium-minimalist': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Большая минималистичная кухня
    'kitchen-premium-classic': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Большая классическая кухня
    'kitchen-premium-premium': 'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Роскошная большая кухня
    
    // КОМПЛЕКСНОЕ РЕШЕНИЕ
    'complex-compact-minimalist': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Компактное комплексное решение
    'complex-compact-classic': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Классическое комплексное решение
    'complex-compact-premium': 'https://images.unsplash.com/photo-1621976498727-9e5d6b16a5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Премиум комплексное решение
    'complex-standard-minimalist': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Стандартное современное решение
    'complex-standard-classic': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Классическое стандартное решение
    'complex-standard-premium': 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Премиум стандартное решение
    'complex-premium-minimalist': 'https://images.unsplash.com/photo-1556742400-b5c4e93c3095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Большое современное решение
    'complex-premium-classic': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Большое классическое решение
    'complex-premium-premium': 'https://images.unsplash.com/photo-1621976498727-9e5d6b16a5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Роскошное большое решение
  }
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