export const SITE_CONFIG = {
  name: 'Мангал Силы',
  slogan: 'Создаем места силы',
  description: 'Производство премиальных мангальных кухонь, мангалов и комплексных решений для дачи',
  url: 'https://mangal-sily.ru',
  phone: '+7 (999) 123-45-67',
  phoneRaw: '79991234567',
  email: 'info@mangal-sily.ru',
  address: 'г. Волгоград',
  workHours: {
    weekdays: '9:00 - 20:00',
    weekends: '9:00 - 20:00',
    text: 'Ежедневно с 9:00 до 20:00'
  },
  social: {
    whatsapp: 'https://wa.me/79991234567',
    telegram: 'https://t.me/mangalsily',
    vk: 'https://vk.com/mangalsily'
  }
}

export const PRODUCT_CATEGORIES = [
  {
    id: 'mangaly',
    name: 'Мангалы',
    slug: 'mangaly',
    description: 'Классические и премиальные мангалы'
  },
  {
    id: 'mangalnye-kuhni',
    name: 'Мангальные кухни',
    slug: 'mangalnye-kuhni',
    description: 'Комплексные решения для готовки на природе'
  },
  {
    id: 'besedki',
    name: 'Беседки',
    slug: 'besedki',
    description: 'Уютные беседки с мангальной зоной'
  },
  {
    id: 'kompleksnye-resheniya',
    name: 'Комплексные решения',
    slug: 'kompleksnye-resheniya',
    description: 'Полное обустройство зоны отдыха'
  }
]

export const ANALYTICS = {
  gtag: 'G-XXXXXXXXXX',
  yandexMetrika: '12345678'
}

export const SEO_DEFAULTS = {
  titleTemplate: '%s | Мангал Силы',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
} 