import { QuizStep } from '../../types/configurator'

export const quizSteps: QuizStep[] = [
  // Шаг 1: Выбор типа решения
  {
    id: 1,
    question: "Что вы хотите создать на своем участке?",
    type: 'single-select',
    visual: 'icons',
    options: [
      {
        id: 'mangal',
        title: 'Зону с мангалом',
        description: 'Классический мангал с рабочей зоной',
        icon: '🔥',
        priceRange: '25 000 - 150 000 ₽'
      },
      {
        id: 'kitchen',
        title: 'Мангальную кухню',
        description: 'Полноценная кухня под открытым небом',
        icon: '🏠',
        priceRange: '150 000 - 500 000 ₽',
        recommended: true
      },
      {
        id: 'complex',
        title: 'Комплексное решение',
        description: 'Беседка + мангальная зона + мебель',
        icon: '🏡',
        priceRange: '300 000 - 1 500 000 ₽'
      }
    ]
  },
  
  // Шаг 2: Размер пространства
  {
    id: 2,
    question: "Какая площадь под мангальную зону?",
    type: 'single-select',
    visual: 'images',
    options: [
      {
        id: 'compact',
        title: 'Компактная',
        description: 'До 6 м²',
        visual: '/configurator/size-2x3.jpg'
      },
      {
        id: 'standard',
        title: 'Стандартная',
        description: '6-12 м²',
        visual: '/configurator/size-3x4.jpg',
        recommended: true
      },
      {
        id: 'premium',
        title: 'Просторная',
        description: 'Более 12 м²',
        visual: '/configurator/size-4x5.jpg'
      }
    ]
  },
  
  // Шаг 3: Количество гостей
  {
    id: 3,
    question: "На сколько человек рассчитываете?",
    type: 'single-select',
    visual: 'people-icons',
    options: [
      {
        id: '4-6',
        title: 'Семейный формат',
        description: '4-6 человек',
        mangalLength: '80 см'
      },
      {
        id: '8-10',
        title: 'Дружеские встречи',
        description: '8-10 человек',
        mangalLength: '120 см',
        recommended: true
      },
      {
        id: '12+',
        title: 'Большие компании',
        description: '12+ человек',
        mangalLength: '150+ см'
      }
    ]
  },
  
  // Шаг 4: Дополнительные модули
  {
    id: 4,
    question: "Какие удобства нужны в мангальной кухне?",
    type: 'multi-select',
    visual: 'module-preview',
    options: [
      {
        id: 'sink',
        title: 'Мойка',
        description: 'С подводом воды',
        price: '+ 25 000 ₽',
        icon: '💧'
      },
      {
        id: 'worktop',
        title: 'Рабочая поверхность',
        description: 'Из нержавейки',
        price: '+ 15 000 ₽',
        icon: '🔪',
        selected: true
      },
      {
        id: 'storage',
        title: 'Места хранения',
        description: 'Шкафы и полки',
        price: '+ 20 000 ₽',
        icon: '📦'
      },
      {
        id: 'fridge',
        title: 'Холодильник',
        description: 'Встроенный',
        price: '+ 35 000 ₽',
        icon: '❄️'
      }
    ]
  },
  
  // Шаг 5: Навес/беседка
  {
    id: 5,
    question: "Нужна ли защита от погоды?",
    type: 'single-select',
    visual: 'canopy-types',
    options: [
      {
        id: 'none',
        title: 'Без навеса',
        description: 'Открытая зона',
        visual: '/configurator/no-canopy.jpg'
      },
      {
        id: 'light',
        title: 'Легкий навес',
        description: 'Защита от солнца и дождя',
        price: '+ 80 000 ₽',
        visual: '/configurator/light-canopy.jpg',
        recommended: true
      },
      {
        id: 'capital',
        title: 'Капитальная беседка',
        description: 'Всесезонная конструкция',
        price: '+ 250 000 ₽',
        visual: '/configurator/capital-canopy.jpg'
      }
    ]
  },
  
  // Шаг 6: Стиль исполнения
  {
    id: 6,
    question: "В каком стиле выполнить?",
    type: 'single-select',
    visual: 'style-gallery',
    options: [
      {
        id: 'minimalist',
        title: 'Минимализм',
        description: 'Простые формы, функциональность',
        materials: ['Металл', 'Бетон'],
        visual: '/configurator/style-minimal.jpg'
      },
      {
        id: 'classic',
        title: 'Классический',
        description: 'Традиционный дизайн',
        materials: ['Металл', 'Дерево'],
        visual: '/configurator/style-classic.jpg',
        recommended: true
      },
      {
        id: 'premium',
        title: 'Премиум',
        description: 'Эксклюзивные материалы',
        materials: ['Нержавейка', 'Натуральный камень'],
        visual: '/configurator/style-premium.jpg'
      }
    ]
  },
  
  // Шаг 7: Бюджет
  {
    id: 7,
    question: "Какой бюджет рассматриваете?",
    type: 'single-select',
    visual: 'budget-ranges',
    note: "Это примерная стоимость. Точный расчет после консультации.",
    options: [
      {
        id: 'economy',
        title: 'Эконом',
        priceRange: 'до 150 000 ₽',
        description: 'Базовая функциональность'
      },
      {
        id: 'standard',
        title: 'Стандарт',
        priceRange: '150 000 - 350 000 ₽',
        description: 'Оптимальное решение',
        recommended: true
      },
      {
        id: 'premium',
        title: 'Премиум',
        priceRange: '350 000 - 700 000 ₽',
        description: 'Расширенные возможности'
      },
      {
        id: 'custom',
        title: 'Индивидуально',
        priceRange: 'от 700 000 ₽',
        description: 'Проект под ваши задачи'
      }
    ]
  }
] 