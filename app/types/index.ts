// Типы для продуктов
export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  oldPrice?: number;
  badge?: 'new' | 'hit' | 'sale';
  specifications: {
    dimensions: string;
    weight: string;
    material: string;
    warranty: string;
  };
  inStock: boolean;
  category: 'mangaly' | 'mangalnye-kuhni' | 'besedki' | 'kompleksnye-resheniya';
  description?: string;
}

// Типы для конфигуратора
export interface ConfiguratorState {
  layout: 'linear' | 'l-shaped' | 'u-shaped';
  width: number; // в метрах
  modules: Array<{
    id: string;
    type: 'grill' | 'sink' | 'storage' | 'fridge';
    position: { x: number; y: number; z: number };
    material: 'steel' | 'wood' | 'stone';
  }>;
  canopy: {
    enabled: boolean;
    type: 'metal' | 'wood' | 'polycarbonate';
  };
  totalPrice: number;
}

// Типы для фильтров каталога
export interface CatalogFilters {
  category: string[];
  priceRange: { min: number; max: number };
  material: string[];
  size: string[];
  features: string[];
  sortBy: 'price' | 'popularity' | 'date';
}

// Типы для форм
export interface ContactForm {
  name: string;
  phone: string;
  message?: string;
  source: 'quiz' | 'calculator' | 'product' | 'contact' | 'header';
  productId?: string;
  productName?: string;
}

// Типы для калькулятора проекта
export interface ProjectCalculator {
  area: number; // площадь участка
  budget: { min: number; max: number };
  needs: {
    mangalZone: boolean;
    gazebo: boolean;
    furniture: boolean;
    lighting: boolean;
    waterSupply: boolean;
  };
  style: 'modern' | 'classic' | 'rustic';
  // Результат:
  recommendations: Product[];
  totalCost: number;
  installationCost: number;
  timeline: string;
}

// Типы для квиза
export interface QuizState {
  currentStep: number;
  answers: Record<string, unknown>;
  progress: number;
  result: {
    products: Product[];
    personalMessage: string;
    discount?: number;
  };
}

// Типы для модального окна
export interface LeadModal {
  isOpen: boolean;
  source: string;
  product?: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  configuration?: ConfiguratorState;
}

// Типы для аналитики
export interface AnalyticsEvent {
  category: 'engagement' | 'lead' | 'navigation';
  action: string;
  label?: string;
  value?: number;
} 