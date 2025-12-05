import { Tour, TourFilters, SortOption, MealType, HotelRating, TourCategory } from '@/types'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function calculateDiscount(originalPrice: number, price: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function filterTours(
  tours: Tour[],
  filters: TourFilters,
  searchText: string = '',
  category?: TourCategory
): Tour[] {
  let filtered = [...tours]

  // Поиск
  if (searchText.trim()) {
    const searchLower = searchText.toLowerCase()
    filtered = filtered.filter(
      (tour) =>
        tour.title.toLowerCase().includes(searchLower) ||
        tour.destination.toLowerCase().includes(searchLower) ||
        tour.country.toLowerCase().includes(searchLower) ||
        tour.hotelName?.toLowerCase().includes(searchLower)
    )
  }

  // Категория
  const selectedCategory = filters.category || category
  if (selectedCategory) {
    filtered = filtered.filter((tour) => tour.category === selectedCategory)
  }

  // Цена
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((tour) => tour.price >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((tour) => tour.price <= filters.maxPrice!)
  }

  // Рейтинг
  if (filters.minRating !== undefined) {
    filtered = filtered.filter((tour) => tour.rating >= filters.minRating!)
  }

  // Питание
  if (filters.mealType && filters.mealType !== MealType.ALL) {
    filtered = filtered.filter((tour) => tour.mealType === filters.mealType)
  }

  // Звездность отеля
  if (filters.hotelRating !== undefined && filters.hotelRating !== HotelRating.ANY) {
    filtered = filtered.filter(
      (tour) => (tour.hotelRating || 0) >= filters.hotelRating!
    )
  }

  // Длительность
  if (filters.minDuration !== undefined) {
    filtered = filtered.filter((tour) => tour.duration >= filters.minDuration!)
  }
  if (filters.maxDuration !== undefined) {
    filtered = filtered.filter((tour) => tour.duration <= filters.maxDuration!)
  }

  // Страна
  if (filters.country) {
    filtered = filtered.filter((tour) => tour.country === filters.country)
  }

  return filtered
}

export function sortTours(tours: Tour[], sortOption: SortOption): Tour[] {
  const sorted = [...tours]

  switch (sortOption) {
    case SortOption.PRICE_ASC:
      return sorted.sort((a, b) => a.price - b.price)
    case SortOption.PRICE_DESC:
      return sorted.sort((a, b) => b.price - a.price)
    case SortOption.RATING_DESC:
      return sorted.sort((a, b) => b.rating - a.rating)
    case SortOption.DURATION_ASC:
      return sorted.sort((a, b) => a.duration - b.duration)
    case SortOption.DURATION_DESC:
      return sorted.sort((a, b) => b.duration - a.duration)
    default:
      return sorted
  }
}

