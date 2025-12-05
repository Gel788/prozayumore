'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import TourSearchBar from '@/components/TourSearchBar'
import TourCard from '@/components/TourCard'
import { mockTours } from '@/data/mockData'
import { Tour, SearchParams, TourCategory, SortOption } from '@/types'
import { filterTours, sortTours } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { TourCategoryEmoji } from '@/types'
import { SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureCity: 'Москва',
    adults: 2,
    children: 0,
  })
  const [selectedCategory, setSelectedCategory] = useState<TourCategory | undefined>()
  const [searchText, setSearchText] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredTours = useMemo(() => {
    let filtered = filterTours(mockTours, {}, searchText, selectedCategory)
    return sortTours(filtered, SortOption.PRICE_ASC)
  }, [searchText, selectedCategory])

  const handleSearch = () => {
    router.push('/search')
  }

  const handleTourClick = (tour: Tour) => {
    router.push(`/tours/${tour.id}`)
  }

  const categories = Object.values(TourCategory)

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 md:-mt-16 relative z-20 mb-6 sm:mb-8">
        <TourSearchBar
          searchParams={searchParams}
          onSearchParamsChange={setSearchParams}
          onSearch={handleSearch}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        {/* Категории */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-3 sm:pb-4 mb-6 sm:mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-large text-sm sm:text-base font-semibold whitespace-nowrap transition-all relative ${
              !selectedCategory
                ? 'premium-gradient-ocean text-white shadow-premium-md glow-effect'
                : 'bg-card text-textSecondary hover:bg-cardElevated border border-cardElevated'
            }`}
          >
            Все туры
            {!selectedCategory && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-large bg-oceanBlue/20"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-large text-sm sm:text-base font-semibold whitespace-nowrap transition-all flex items-center gap-2 sm:gap-2.5 relative ${
                selectedCategory === category
                  ? 'premium-gradient-ocean text-white shadow-premium-md glow-effect'
                  : 'bg-card text-textSecondary hover:bg-cardElevated border border-cardElevated'
              }`}
            >
              <span className="text-lg sm:text-xl">{TourCategoryEmoji[category]}</span>
              <span>{category}</span>
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-large bg-oceanBlue/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 sm:mb-8">
          <div className="flex-1 relative group">
            <input
              type="text"
              placeholder="Поиск туров, стран, отелей..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-card border-2 border-cardElevated rounded-large text-sm sm:text-base text-textPrimary placeholder-textTertiary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
            />
            {searchText && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchText('')}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 hover:bg-cardElevated rounded-medium transition-colors"
              >
                ✕
              </motion.button>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 sm:px-5 py-3 sm:py-4 rounded-large border-2 transition-all flex-shrink-0 ${
              showFilters
                ? 'bg-oceanBlue border-oceanBlue text-white shadow-premium-md'
                : 'bg-card border-cardElevated hover:bg-cardElevated text-textSecondary'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Сетка туров */}
        {filteredTours.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <TourCard
                  tour={tour}
                  onClick={() => handleTourClick(tour)}
                  onFavoriteToggle={(tourId) => {
                    // TODO: Implement favorite toggle
                    console.log('Toggle favorite:', tourId)
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🌊</div>
            <p className="text-textSecondary text-xl mb-2 font-semibold">Туры не найдены</p>
            <p className="text-textTertiary">Попробуйте изменить параметры поиска</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

