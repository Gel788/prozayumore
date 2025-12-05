'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, User } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', icon: Home, label: 'Главная' },
  { href: '/search', icon: Search, label: 'Поиск' },
  { href: '/favorites', icon: Heart, label: 'Избранное' },
  { href: '/profile', icon: User, label: 'Профиль' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-cardElevated safe-area-inset-bottom">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around h-14 sm:h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-2 relative group flex-1"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-oceanBlue/20 rounded-large"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
                      isActive ? 'text-oceanBlue' : 'text-textTertiary group-hover:text-oceanBlue/70'
                    }`}
                    fill={isActive ? 'currentColor' : 'none'}
                  />
                </motion.div>
                <span
                  className={`text-[10px] sm:text-xs font-medium transition-colors ${
                    isActive ? 'text-oceanBlue' : 'text-textTertiary group-hover:text-oceanBlue/70'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

