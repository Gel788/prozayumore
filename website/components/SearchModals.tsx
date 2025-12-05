'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchParams } from '@/types'

interface CityPickerProps {
  isOpen: boolean
  onClose: () => void
  selectedCity: string
  onSelect: (city: string) => void
}

export function CityPicker({ isOpen, onClose, selectedCity, onSelect }: CityPickerProps) {
  const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Казань', 'Краснодар', 'Сочи', 'Владивосток']

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] max-w-md mx-auto premium-card p-4 sm:p-6 z-[101] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            style={{ 
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Выберите город вылета</h3>
              <button onClick={onClose} className="p-2 hover:bg-cardElevated rounded-large transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onSelect(city)
                    onClose()
                  }}
                  className={`w-full text-left px-4 py-3 rounded-large transition-all ${
                    selectedCity === city
                      ? 'bg-oceanBlue text-white'
                      : 'bg-card hover:bg-cardElevated text-textPrimary'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface CountryPickerProps {
  isOpen: boolean
  onClose: () => void
  selectedCountry: string | undefined
  onSelect: (country: string | undefined) => void
}

export function CountryPicker({ isOpen, onClose, selectedCountry, onSelect }: CountryPickerProps) {
  const countries = [
    'Любая',
    'Турция',
    'Египет',
    'ОАЭ',
    'Таиланд',
    'Мальдивы',
    'Греция',
    'Испания',
    'Италия',
    'Франция',
    'Швейцария',
    'Япония',
    'Кения',
    'Индонезия',
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] max-w-md mx-auto premium-card p-4 sm:p-6 z-[101] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            style={{ 
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Выберите страну</h3>
              <button onClick={onClose} className="p-2 hover:bg-cardElevated rounded-large transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {countries.map((country) => {
                const isSelected = (country === 'Любая' && !selectedCountry) || selectedCountry === country
                return (
                  <button
                    key={country}
                    onClick={() => {
                      onSelect(country === 'Любая' ? undefined : country)
                      onClose()
                    }}
                    className={`w-full text-left px-4 py-3 rounded-large transition-all ${
                      isSelected
                        ? 'bg-oceanBlue text-white'
                        : 'bg-card hover:bg-cardElevated text-textPrimary'
                    }`}
                  >
                    {country}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface DatePickerProps {
  isOpen: boolean
  onClose: () => void
  dateStart: Date | undefined
  dateEnd: Date | undefined
  onSelect: (start: Date | undefined, end: Date | undefined) => void
}

export function DatePicker({ isOpen, onClose, dateStart, dateEnd, onSelect }: DatePickerProps) {
  const [start, setStart] = useState<Date | undefined>(dateStart)
  const [end, setEnd] = useState<Date | undefined>(dateEnd)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleApply = () => {
    onSelect(start, end)
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md premium-card p-6 z-[101]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Выберите даты</h3>
              <button onClick={onClose} className="p-2 hover:bg-cardElevated rounded-large transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-textSecondary mb-2">Дата вылета</label>
                <input
                  type="date"
                  value={start ? start.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStart(e.target.value ? new Date(e.target.value) : undefined)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-card border border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-textSecondary mb-2">Дата возвращения</label>
                <input
                  type="date"
                  value={end ? end.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEnd(e.target.value ? new Date(e.target.value) : undefined)}
                  min={start ? start.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-card border border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStart(undefined)
                    setEnd(undefined)
                  }}
                  className="flex-1 px-4 py-3 bg-card hover:bg-cardElevated rounded-large text-textPrimary transition-colors"
                >
                  Очистить
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-3 premium-gradient-ocean text-white rounded-large font-semibold hover:shadow-glow transition-all"
                >
                  Применить
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface NightsPickerProps {
  isOpen: boolean
  onClose: () => void
  nightsMin: number | undefined
  nightsMax: number | undefined
  onSelect: (min: number | undefined, max: number | undefined) => void
}

export function NightsPicker({ isOpen, onClose, nightsMin, nightsMax, onSelect }: NightsPickerProps) {
  const [min, setMin] = useState<string>(nightsMin?.toString() || '')
  const [max, setMax] = useState<string>(nightsMax?.toString() || '')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleApply = () => {
    onSelect(min ? parseInt(min) : undefined, max ? parseInt(max) : undefined)
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md premium-card p-6 z-[101]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Количество ночей</h3>
              <button onClick={onClose} className="p-2 hover:bg-cardElevated rounded-large transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-textSecondary mb-2">От</label>
                  <input
                    type="number"
                    min="1"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    placeholder="Мин"
                    className="w-full px-4 py-3 bg-card border border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-textSecondary mb-2">До</label>
                  <input
                    type="number"
                    min="1"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    placeholder="Макс"
                    className="w-full px-4 py-3 bg-card border border-cardElevated rounded-large text-textPrimary focus:outline-none focus:ring-2 focus:ring-oceanBlue"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMin('')
                    setMax('')
                  }}
                  className="flex-1 px-4 py-3 bg-card hover:bg-cardElevated rounded-large text-textPrimary transition-colors"
                >
                  Очистить
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-3 premium-gradient-ocean text-white rounded-large font-semibold hover:shadow-glow transition-all"
                >
                  Применить
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface TouristsPickerProps {
  isOpen: boolean
  onClose: () => void
  adults: number
  children: number
  onSelect: (adults: number, children: number) => void
}

export function TouristsPicker({ isOpen, onClose, adults, children, onSelect }: TouristsPickerProps) {
  const [adultsCount, setAdultsCount] = useState(adults)
  const [childrenCount, setChildrenCount] = useState(children)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleApply = () => {
    onSelect(adultsCount, childrenCount)
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] max-w-md mx-auto premium-card p-4 sm:p-6 z-[101] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              margin: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Количество туристов</h3>
              <button onClick={onClose} className="p-2 hover:bg-cardElevated rounded-large transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Взрослые</span>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                      className="w-10 h-10 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      −
                    </motion.button>
                    <span className="w-12 text-center font-bold text-xl">{adultsCount}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setAdultsCount(adultsCount + 1)}
                      className="w-10 h-10 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Дети</span>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      className="w-10 h-10 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      −
                    </motion.button>
                    <span className="w-12 text-center font-bold text-xl">{childrenCount}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      className="w-10 h-10 rounded-large bg-card hover:bg-cardElevated flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
                className="w-full px-4 py-3 premium-gradient-ocean text-white rounded-large font-semibold hover:shadow-glow transition-all"
              >
                Применить
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

