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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
