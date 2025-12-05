'use client'

import { Tour, TourCategoryEmoji } from '@/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Heart, Star, MapPin, Clock, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface TourCardProps {
  tour: Tour
  onFavoriteToggle?: (tourId: string) => void
  onClick?: () => void
}

export default function TourCard({ tour, onFavoriteToggle, onClick }: TourCardProps) {
  const [isFavorite, setIsFavorite] = useState(tour.isFavorite || false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    onFavoriteToggle?.(tour.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="premium-card cursor-pointer overflow-hidden group relative"
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-oceanBlue to-turquoise group/image">
        {tour.imageUrl && (
          <>
            <img
              src={tour.imageUrl}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={(e) => {
                // Скрываем изображение при ошибке, показывается градиент фон
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
        
        {/* Скидка */}
        {tour.originalPrice && (
          <div className="absolute top-4 left-4 bg-coral text-white px-3 py-1 rounded-medium font-semibold text-sm shadow-premium-md">
            -{calculateDiscount(tour.originalPrice, tour.price)}%
          </div>
        )}

        {/* Избранное */}
        <motion.button
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2.5 rounded-full glass-effect hover:bg-coral/20 transition-all z-10"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-coral text-coral' : 'text-white'
            } transition-all duration-300`}
          />
        </motion.button>

        {/* Рейтинг */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-medium">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm font-semibold">{tour.rating}</span>
          <span className="text-textTertiary text-xs">({tour.reviewsCount})</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {/* Категория и страна */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{TourCategoryEmoji[tour.category]}</span>
          <div className="flex items-center gap-1 text-textSecondary text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{tour.country}</span>
          </div>
        </div>

        {/* Название */}
        <h3 className="text-base sm:text-lg font-bold text-textPrimary mb-2 line-clamp-2 group-hover:text-gradient-ocean transition-all duration-300">
          {tour.title}
        </h3>

        {/* Отель и питание */}
        <div className="flex flex-col gap-1.5 mb-3 text-sm text-textSecondary">
          {tour.hotelName && (
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400">
                {'⭐'.repeat(tour.hotelRating || 0)}
              </span>
              <span className="line-clamp-1">{tour.hotelName}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>{tour.mealType}</span>
          </div>
        </div>

        {/* Длительность */}
        <div className="flex items-center gap-1.5 text-textSecondary text-sm mb-4">
          <Clock className="w-4 h-4" />
          <span>{tour.duration} ночей</span>
        </div>

        {/* Цена */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 sm:gap-0">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-textPrimary">
              {formatPrice(tour.price)}
            </div>
            {tour.originalPrice && (
              <div className="text-xs sm:text-sm text-textTertiary line-through">
                {formatPrice(tour.originalPrice)}
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 premium-gradient-ocean text-white rounded-medium text-sm sm:text-base font-semibold shadow-premium-md hover:shadow-glow transition-all"
          >
            Подробнее
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

