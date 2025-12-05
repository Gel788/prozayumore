'use client'

import { Waves, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)
    // Генерируем позиции частиц только на клиенте
    setParticles(
      Array.from({ length: 6 }, () => ({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  return (
    <header className="relative overflow-hidden premium-gradient-dark">
      {/* Анимированные волны */}
      <div className="absolute inset-0 opacity-30">
        <WaveAnimation />
      </div>
      
      {/* Плавающие частицы */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-oceanBlue/30 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                y: [particle.y, particle.y - 100, particle.y],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
        <div className="flex items-start justify-between mb-6 sm:mb-8 md:mb-12">
          {/* Логотип и название */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 sm:gap-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full premium-gradient-ocean flex items-center justify-center shadow-glow"
            >
              <Waves className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-turquoise/30 border-t-transparent"
              />
            </motion.div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 flex items-center gap-1 sm:gap-2">
                Продаю Море
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden sm:inline-block"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-turquoise" />
                </motion.span>
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary font-medium">Туристическое агентство</p>
            </div>
          </motion.div>
        </div>

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="block">Откройте мир</span>
            <span className="block text-gradient-ocean">незабываемых</span>
            <span className="block">путешествий</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-textSecondary max-w-2xl leading-relaxed mb-6 sm:mb-8 md:mb-0">
            Премиальные туры по всему миру с лучшими ценами и сервисом
          </p>
          
          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10"
          >
            {[
              { value: '500+', label: 'Туров' },
              { value: '50+', label: 'Стран' },
              { value: '10k+', label: 'Довольных клиентов' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="glass-effect px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 rounded-large flex-1 min-w-[100px] sm:min-w-[120px]"
              >
                <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-oceanBlue mb-0.5 sm:mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-textSecondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

function WaveAnimation() {
  return (
    <svg
      className="absolute bottom-0 w-full h-32"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        className="animate-wave"
      />
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(51, 128, 217)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="rgb(77, 179, 217)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(51, 128, 217)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  )
}

