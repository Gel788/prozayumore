'use client'

import { defaultUser } from '@/data/mockData'
import { User, Settings, CreditCard, BookOpen, LogOut, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

export default function ProfilePage() {
  const user = defaultUser

  const menuItems = [
    { icon: BookOpen, label: 'Мои бронирования', href: '/bookings' },
    { icon: CreditCard, label: 'Способы оплаты', href: '/payment' },
    { icon: Settings, label: 'Настройки', href: '/settings' },
  ]

  return (
    <div className="min-h-screen pt-8">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Профиль</h1>

        {/* User info card */}
        <div className="premium-card p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full premium-gradient-ocean flex items-center justify-center text-3xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-textSecondary">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-textSecondary">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="premium-card p-6">
            <div className="text-3xl font-bold text-oceanBlue mb-1">{user.bookings.length}</div>
            <div className="text-textSecondary">Бронирований</div>
          </div>
          <div className="premium-card p-6">
            <div className="text-3xl font-bold text-turquoise mb-1">{user.favoriteTourIds.length}</div>
            <div className="text-textSecondary">Избранных</div>
          </div>
          <div className="premium-card p-6">
            <div className="text-3xl font-bold text-coral mb-1">0</div>
            <div className="text-textSecondary">Отзывов</div>
          </div>
        </div>

        {/* Menu */}
        <div className="premium-card p-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 p-4 hover:bg-cardElevated rounded-large transition-colors"
              >
                <div className="w-10 h-10 rounded-large bg-oceanBlue/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-oceanBlue" />
                </div>
                <span className="font-semibold">{item.label}</span>
              </a>
            )
          })}
          <button className="w-full flex items-center gap-4 p-4 hover:bg-cardElevated rounded-large transition-colors text-left text-coral">
            <div className="w-10 h-10 rounded-large bg-coral/20 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-coral" />
            </div>
            <span className="font-semibold">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  )
}

