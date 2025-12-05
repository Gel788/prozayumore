'use client'

import { useState } from 'react'
import TourCard from '@/components/TourCard'
import { mockTours } from '@/data/mockData'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'

export default function FavoritesPage() {
  const router = useRouter()
  const [favoriteTourIds] = useState<string[]>([]) // TODO: Load from localStorage or state

  const favoriteTours = mockTours.filter((tour) => favoriteTourIds.includes(tour.id))

  const handleTourClick = (tourId: string) => {
    router.push(`/tours/${tourId}`)
  }

  return (
    <div className="min-h-screen pt-8">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Избранное</h1>

        {favoriteTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onClick={() => handleTourClick(tour.id)}
                onFavoriteToggle={(tourId) => {
                  console.log('Remove from favorites:', tourId)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-textTertiary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Нет избранных туров</h2>
            <p className="text-textSecondary text-center max-w-md">
              Добавьте туры в избранное, чтобы не потерять их и вернуться к ним позже
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-3 premium-gradient-ocean text-white rounded-large font-semibold hover:shadow-glow transition-all"
            >
              Найти туры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

