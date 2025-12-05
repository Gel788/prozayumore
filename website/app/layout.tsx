import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Продаю Море - Премиальные туры по всему миру',
  description: 'Туристическое агентство Продаю Море. Лучшие туры по всему миру с премиальным сервисом.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-background text-textPrimary min-h-screen pb-14 sm:pb-16 md:pb-20">
        {children}
        <Navigation />
      </body>
    </html>
  )
}

