'use client'

import { useState, useMemo } from 'react'
import TourSearchBar from '@/components/TourSearchBar'
import TourCard from '@/components/TourCard'
import { mockTours } from '@/data/mockData'
import { SearchParams, TourFilters, SortOption, Tour } from '@/types'
import { filterTours, sortTours } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react'

export default function SearchPage() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureCity: 'Москва',
    adults: 2,
    children: 0,
  })
  const [filters, setFilters] = useState<TourFilters>({})
  const [searchText, setSearchText] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.PRICE_ASC)
  const [showFilters, setShowFilters] = useState(false)

  const filteredTours = useMemo(() => {
    let filtered = filterTours(mockTours, filters, searchText)
    return sortTours(filtered, sortOption)
  }, [filters, searchText, sortOption])

  const handleSearch = () => {
    // Perform search
  }

  const handleTourClick = (tour: Tour) => {
    router.push(`/tours/${tour.id}`)
  }

  return (
    <div className="min-h-screen pt-6 sm:pt-8">
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Поиск туров</h1>
        
        <TourSearchBar
          searchParams={searchParams}
          onSearchParamsChange={setSearchParams}
          onSearch={handleSearch}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Поиск и фильтры */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Поиск туров..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-card border-2 border-cardElevated rounded-large text-sm sm:text-base text-textPrimary placeholder-textTertiary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="flex-1 sm:flex-none px-4 py-3 bg-card border-2 border-cardElevated rounded-large text-sm sm:text-base text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
            >
              <option value={SortOption.PRICE_ASC}>Цена: по возрастанию</option>
              <option value={SortOption.PRICE_DESC}>Цена: по убыванию</option>
              <option value={SortOption.RATING_DESC}>Рейтинг: сначала высокий</option>
              <option value={SortOption.DURATION_ASC}>Длительность: короткие</option>
              <option value={SortOption.DURATION_DESC}>Длительность: длинные</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-card hover:bg-cardElevated rounded-large border-2 border-cardElevated transition-colors flex-shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-textSecondary" />
            </button>
          </div>
        </div>

        {/* Результаты */}
        <div className="mb-4 text-textSecondary">
          Найдено туров: <span className="text-textPrimary font-semibold">{filteredTours.length}</span>
        </div>

        {/* Сетка туров */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onClick={() => handleTourClick(tour)}
                onFavoriteToggle={(tourId) => {
                  console.log('Toggle favorite:', tourId)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-textSecondary text-lg mb-2">Туры не найдены</p>
            <p className="text-textTertiary text-sm">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  )
}

