'use client'

import { SearchParams } from '@/types'
import { Plane, MapPin, Calendar, Moon, Users, Search } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
  CityPicker,
  CountryPicker,
  DatePicker,
  NightsPicker,
  TouristsPicker,
} from './SearchModals'

interface TourSearchBarProps {
  searchParams: SearchParams
  onSearchParamsChange: (params: SearchParams) => void
  onSearch: () => void
}

export default function TourSearchBar({
  searchParams,
  onSearchParamsChange,
  onSearch,
}: TourSearchBarProps) {
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showNightsPicker, setShowNightsPicker] = useState(false)
  const [showTouristsPicker, setShowTouristsPicker] = useState(false)

  const formattedDateRange = searchParams.departureDateStart && searchParams.departureDateEnd
    ? `${format(searchParams.departureDateStart, 'd MMM', { locale: ru })} - ${format(searchParams.departureDateEnd, 'd MMM', { locale: ru })}`
    : 'Выберите даты'

  const formattedNights = searchParams.nightsMin && searchParams.nightsMax
    ? `${searchParams.nightsMin} - ${searchParams.nightsMax}`
    : searchParams.nightsMin
    ? `от ${searchParams.nightsMin}`
    : searchParams.nightsMax
    ? `до ${searchParams.nightsMax}`
    : 'Любое'

  const formattedTourists = `${searchParams.adults} ${searchParams.adults === 1 ? 'взрослый' : searchParams.adults < 5 ? 'взрослых' : 'взрослых'}${
    searchParams.children > 0
      ? `, ${searchParams.children} ${searchParams.children === 1 ? 'ребенок' : searchParams.children < 5 ? 'ребенка' : 'детей'}`
      : ''
  }`

  const SearchField = ({
    icon: Icon,
    label,
    value,
    onClick,
  }: {
    icon: any
    label: string
    value: string
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-start justify-center min-w-[110px] sm:min-w-[130px] md:min-w-[140px] h-[60px] sm:h-[65px] md:h-[70px] px-3 sm:px-4 bg-surfaceElevated hover:bg-cardElevated border-r border-card transition-colors group"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-oceanBlue group-hover:text-turquoise transition-colors" />
        <span className="text-[9px] sm:text-[10px] font-semibold text-textTertiary uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-semibold text-textPrimary line-clamp-1">{value}</span>
    </button>
  )

  return (
    <div className="premium-card p-0.5 sm:p-1">
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        <SearchField
          icon={Plane}
          label="ГОРОД ВЫЛЕТА"
          value={searchParams.departureCity}
          onClick={() => setShowCityPicker(true)}
        />
        <SearchField
          icon={MapPin}
          label="СТРАНА"
          value={searchParams.country || 'Любая'}
          onClick={() => setShowCountryPicker(true)}
        />
        <SearchField
          icon={Calendar}
          label="ДАТЫ ВЫЛЕТА"
          value={formattedDateRange}
          onClick={() => setShowDatePicker(true)}
        />
        <SearchField
          icon={Moon}
          label="НОЧЕЙ"
          value={formattedNights}
          onClick={() => setShowNightsPicker(true)}
        />
        <SearchField
          icon={Users}
          label="ТУРИСТЫ"
          value={formattedTourists}
          onClick={() => setShowTouristsPicker(true)}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearch}
          className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 md:px-8 h-[60px] sm:h-[65px] md:h-[70px] ml-1 sm:ml-2 premium-gradient-ocean text-white rounded-large font-bold shadow-premium-md hover:shadow-glow transition-all whitespace-nowrap text-sm sm:text-base"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Найти туры</span>
          <span className="sm:hidden">Найти</span>
        </motion.button>
      </div>

      {/* Модальные окна */}
      <CityPicker
        isOpen={showCityPicker}
        onClose={() => setShowCityPicker(false)}
        selectedCity={searchParams.departureCity}
        onSelect={(city) => {
          onSearchParamsChange({ ...searchParams, departureCity: city })
        }}
      />
      <CountryPicker
        isOpen={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        selectedCountry={searchParams.country}
        onSelect={(country) => {
          onSearchParamsChange({ ...searchParams, country })
        }}
      />
      <DatePicker
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        dateStart={searchParams.departureDateStart}
        dateEnd={searchParams.departureDateEnd}
        onSelect={(start, end) => {
          onSearchParamsChange({ ...searchParams, departureDateStart: start, departureDateEnd: end })
        }}
      />
      <NightsPicker
        isOpen={showNightsPicker}
        onClose={() => setShowNightsPicker(false)}
        nightsMin={searchParams.nightsMin}
        nightsMax={searchParams.nightsMax}
        onSelect={(min, max) => {
          onSearchParamsChange({ ...searchParams, nightsMin: min, nightsMax: max })
        }}
      />
      <TouristsPicker
        isOpen={showTouristsPicker}
        onClose={() => setShowTouristsPicker(false)}
        adults={searchParams.adults}
        children={searchParams.children}
        onSelect={(adults, children) => {
          onSearchParamsChange({ ...searchParams, adults, children })
        }}
      />
    </div>
  )
}

