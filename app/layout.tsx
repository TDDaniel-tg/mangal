import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Мангал Силы - Создаем места силы для вашей дачи",
  description: "Производство премиальных мангальных кухонь, мангалов и комплексных решений для дачи. Пожизненная гарантия на всю продукцию.",
  keywords: "мангал, мангальная кухня, гриль, барбекю, беседка, дача, волгоград",
  openGraph: {
    title: "Мангал Силы - Создаем места силы для вашей дачи",
    description: "Производство премиальных мангальных кухонь и комплексных решений для дачи",
    type: "website",
    locale: "ru_RU",
    url: "https://mangal-sily.ru",
    siteName: "Мангал Силы",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Мангал Силы"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Мангал Силы - Создаем места силы для вашей дачи",
    description: "Производство премиальных мангальных кухонь и комплексных решений для дачи",
    images: ["/og-image.jpg"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'theme-color': '#111827',
    'msapplication-TileColor': '#111827',
    'apple-mobile-web-app-title': 'Мангал Силы'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#111827" />
        <meta name="msapplication-navbutton-color" content="#111827" />
        <meta name="apple-mobile-web-app-title" content="Мангал Силы" />
        <meta name="format-detection" content="telephone=no" />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (prefers-color-scheme: light) {
              :root {
                color-scheme: dark;
              }
            }
            
            @supports (-webkit-touch-callout: none) {
              body {
                -webkit-text-size-adjust: 100%;
                -webkit-tap-highlight-color: transparent;
              }
            }
          `
        }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
