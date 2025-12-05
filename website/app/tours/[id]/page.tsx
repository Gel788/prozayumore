'use client'

import { useParams, useRouter } from 'next/navigation'
import { mockTours } from '@/data/mockData'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { TourCategoryEmoji } from '@/types'
import { ArrowLeft, Heart, Star, MapPin, Clock, UtensilsCrossed, Check, Calendar } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import BookingModal from '@/components/BookingModal'

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const tour = mockTours.find((t) => t.id === params.id)
  const [isFavorite, setIsFavorite] = useState(tour?.isFavorite || false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-textSecondary">Тур не найден</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden premium-gradient-ocean">
        {tour.imageUrl && (
          <img
            src={tour.imageUrl}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 p-3 bg-black/40 backdrop-blur-sm rounded-large hover:bg-black/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-sm rounded-large hover:bg-black/60 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-coral text-coral' : 'text-white'
            } transition-colors`}
          />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{TourCategoryEmoji[tour.category]}</span>
            <span className="text-textSecondary">{tour.country}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tour.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold">{tour.rating}</span>
              <span className="text-textSecondary">({tour.reviewsCount} отзывов)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price and booking */}
            <div className="premium-card p-6">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <div className="text-4xl font-bold text-textPrimary mb-1">
                    {formatPrice(tour.price)}
                  </div>
                  {tour.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-textTertiary line-through">
                        {formatPrice(tour.originalPrice)}
                      </span>
                      <span className="px-2 py-1 bg-coral/20 text-coral rounded-medium text-sm font-semibold">
                        -{calculateDiscount(tour.originalPrice, tour.price)}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-textSecondary text-sm mb-1">за человека</div>
                  <div className="text-textTertiary text-sm">{tour.duration} ночей</div>
                </div>
              </div>
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full py-4 premium-gradient-ocean text-white rounded-large font-bold hover:shadow-glow transition-all"
              >
                Забронировать
              </button>
            </div>

            {/* Description */}
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold mb-4">Описание</h2>
              <p className="text-textSecondary leading-relaxed">{tour.description}</p>
            </div>

            {/* Highlights */}
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold mb-4">Особенности</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-oceanBlue mt-0.5 flex-shrink-0" />
                    <span className="text-textSecondary">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold mb-4">Что включено</h2>
              <div className="space-y-2">
                {tour.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-oceanBlue flex-shrink-0" />
                    <span className="text-textSecondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold mb-4">Доступные даты</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tour.dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-large border-2 transition-all ${
                      selectedDate === date
                        ? 'border-oceanBlue bg-oceanBlue/10'
                        : 'border-cardElevated hover:border-oceanBlue/50'
                    }`}
                  >
                    <div className="text-sm text-textSecondary mb-1">Дата вылета</div>
                    <div className="text-textPrimary font-semibold">{date}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hotel info */}
            {tour.hotelName && (
              <div className="premium-card p-6">
                <h3 className="text-lg font-bold mb-4">Отель</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-yellow-400 mb-2">
                      {'⭐'.repeat(tour.hotelRating || 0)}
                    </div>
                    <div className="text-textPrimary font-semibold">{tour.hotelName}</div>
                  </div>
                  <div className="flex items-center gap-2 text-textSecondary text-sm">
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>{tour.mealType}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tour info */}
            <div className="premium-card p-6">
              <h3 className="text-lg font-bold mb-4">Информация</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-textSecondary">
                  <MapPin className="w-5 h-5 text-oceanBlue" />
                  <span>{tour.destination}, {tour.country}</span>
                </div>
                <div className="flex items-center gap-3 text-textSecondary">
                  <Clock className="w-5 h-5 text-oceanBlue" />
                  <span>{tour.duration} ночей</span>
                </div>
                <div className="flex items-center gap-3 text-textSecondary">
                  <Calendar className="w-5 h-5 text-oceanBlue" />
                  <span>{tour.dates.length} доступных дат</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {tour && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          tour={tour}
          selectedDate={selectedDate}
        />
      )}
    </div>
  )
}

