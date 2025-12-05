export enum TourCategory {
  BEACH = 'Пляжи',
  MOUNTAIN = 'Горы',
  CITY = 'Города',
  ADVENTURE = 'Приключения',
  RELAX = 'Релакс',
}

export const TourCategoryEmoji: Record<TourCategory, string> = {
  [TourCategory.BEACH]: '🏖️',
  [TourCategory.MOUNTAIN]: '⛰️',
  [TourCategory.CITY]: '🏙️',
  [TourCategory.ADVENTURE]: '🎒',
  [TourCategory.RELAX]: '🧘',
}

export enum MealType {
  ALL = 'Любое',
  BREAKFAST = 'Завтрак',
  HALF_BOARD = 'Полупансион',
  FULL_BOARD = 'Полный пансион',
  ALL_INCLUSIVE = 'Все включено',
  NO_MEALS = 'Без питания',
}

export enum HotelRating {
  ANY = 0,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export interface Tour {
  id: string
  title: string
  destination: string
  country: string
  imageName: string
  imageUrl?: string
  price: number
  originalPrice?: number
  duration: number
  rating: number
  reviewsCount: number
  description: string
  highlights: string[]
  included: string[]
  dates: string[]
  category: TourCategory
  mealType: MealType
  hotelRating?: number
  hotelName?: string
  isFavorite?: boolean
}

export interface SearchParams {
  departureCity: string
  country?: string
  departureDateStart?: Date
  departureDateEnd?: Date
  nightsMin?: number
  nightsMax?: number
  adults: number
  children: number
}

export interface TourFilters {
  minPrice?: number
  maxPrice?: number
  minRating?: number
  mealType?: MealType
  hotelRating?: HotelRating
  minDuration?: number
  maxDuration?: number
  category?: TourCategory
  country?: string
}

export enum SortOption {
  PRICE_ASC = 'priceAscending',
  PRICE_DESC = 'priceDescending',
  RATING_DESC = 'ratingDescending',
  DURATION_ASC = 'durationAscending',
  DURATION_DESC = 'durationDescending',
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  bookings: string[]
  favoriteTourIds: string[]
}

