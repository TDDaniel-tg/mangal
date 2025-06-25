export interface ConfiguratorQuizState {
  currentStep: number;
  totalSteps: 7;
  answers: {
    spaceType: 'mangal' | 'kitchen' | 'complex' | null; // Шаг 1
    spaceSize: 'compact' | 'standard' | 'premium' | null; // Шаг 2
    guestsCount: '4-6' | '8-10' | '12+' | null; // Шаг 3
    features: string[]; // Шаг 4 (мойка, холодильник, места хранения)
    canopyType: 'none' | 'light' | 'capital' | null; // Шаг 5
    style: 'minimalist' | 'classic' | 'premium' | null; // Шаг 6
    budget: 'economy' | 'standard' | 'premium' | 'custom' | null; // Шаг 7
  };
  
  // Результат
  result?: {
    configuration: Configuration;
    images: string[]; // Фотографии готового решения
    estimatedPrice: { min: number; max: number };
    description: string;
    features: string[];
    similarProjects: Project[]; // Из портфолио
  };
}

export interface Configuration {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  materials: string[];
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  image: string;
  price: string;
  link: string;
}

export interface QuizOption {
  id: string;
  title: string;
  description: string;
  icon?: string;
  priceRange?: string;
  price?: string;
  visual?: string;
  recommended?: boolean;
  selected?: boolean;
  materials?: string[];
  mangalLength?: string;
}

export interface QuizStep {
  id: number;
  question: string;
  type?: 'single-select' | 'multi-select';
  options: QuizOption[];
  visual: string;
  note?: string;
}

export interface QuizResult {
  title: string;
  gallery: {
    images: string[];
    mainImage: string;
    thumbnails: string[];
  };
  solution: {
    name: string;
    description: string;
    features: string[];
    dimensions: string;
    estimatedPrice: {
      min: number;
      max: number;
      note: string;
    };
  };
  similarProjects: Project[];
  actions: {
    primary: {
      text: string;
      action: 'open-lead-form';
    };
    secondary: {
      text: string;
      action: 'restart-quiz';
    };
    tertiary: {
      text: string;
      action: 'save-pdf';
    };
  };
}

export interface ConfiguratorPageLayout {
  progressBar: boolean;
  currentQuestion: QuizStep;
  visualPreview: boolean;
  navigation: {
    back: boolean;
    next: boolean;
    skip?: boolean;
  };
} 