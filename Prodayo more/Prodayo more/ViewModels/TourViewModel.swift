//
//  TourViewModel.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import Foundation
import SwiftUI
import Combine

class TourViewModel: ObservableObject {
    @Published var tours: [Tour] = []
    @Published var selectedCategory: TourCategory? = nil
    @Published var searchText: String = ""
    @Published var favoriteTourIds: Set<String> = []
    @Published var filters: TourFilters = TourFilters()
    @Published var sortOption: SortOption = .priceAscending
    @Published var searchParams: SearchParams = SearchParams()
    
    enum SortOption: String, CaseIterable {
        case priceAscending = "Цена: по возрастанию"
        case priceDescending = "Цена: по убыванию"
        case ratingDescending = "Рейтинг: сначала высокий"
        case durationAscending = "Длительность: короткие"
        case durationDescending = "Длительность: длинные"
    }
    
    init() {
        loadTours()
        loadFavorites()
    }
    
    var filteredTours: [Tour] {
        var filtered = tours
        
        // Поиск
        if !searchText.isEmpty {
            filtered = filtered.filter {
                $0.title.localizedCaseInsensitiveContains(searchText) ||
                $0.destination.localizedCaseInsensitiveContains(searchText) ||
                $0.country.localizedCaseInsensitiveContains(searchText) ||
                ($0.hotelName?.localizedCaseInsensitiveContains(searchText) ?? false)
            }
        }
        
        // Категория
        if let category = filters.category ?? selectedCategory {
            filtered = filtered.filter { $0.category == category }
        }
        
        // Цена
        if let minPrice = filters.minPrice {
            filtered = filtered.filter { $0.price >= minPrice }
        }
        if let maxPrice = filters.maxPrice {
            filtered = filtered.filter { $0.price <= maxPrice }
        }
        
        // Рейтинг
        if let minRating = filters.minRating {
            filtered = filtered.filter { $0.rating >= minRating }
        }
        
        // Питание
        if let mealType = filters.mealType, mealType != .all {
            filtered = filtered.filter { $0.mealType == mealType }
        }
        
        // Звездность отеля
        if let hotelRating = filters.hotelRating, hotelRating != .any {
            filtered = filtered.filter { 
                ($0.hotelRating ?? 0) >= hotelRating.rawValue 
            }
        }
        
        // Длительность
        if let minDuration = filters.minDuration {
            filtered = filtered.filter { $0.duration >= minDuration }
        }
        if let maxDuration = filters.maxDuration {
            filtered = filtered.filter { $0.duration <= maxDuration }
        }
        
        // Страна
        if let country = filters.country, !country.isEmpty {
            filtered = filtered.filter { $0.country.localizedCaseInsensitiveContains(country) }
        }
        
        // Сортировка
        filtered = applySort(to: filtered)
        
        // Обновляем isFavorite
        return filtered.map { tour in
            var updatedTour = tour
            updatedTour.isFavorite = favoriteTourIds.contains(tour.id)
            return updatedTour
        }
    }
    
    private func applySort(to tours: [Tour]) -> [Tour] {
        switch sortOption {
        case .priceAscending:
            return tours.sorted { $0.price < $1.price }
        case .priceDescending:
            return tours.sorted { $0.price > $1.price }
        case .ratingDescending:
            return tours.sorted { $0.rating > $1.rating }
        case .durationAscending:
            return tours.sorted { $0.duration < $1.duration }
        case .durationDescending:
            return tours.sorted { $0.duration > $1.duration }
        }
    }
    
    var favoriteTours: [Tour] {
        tours.filter { favoriteTourIds.contains($0.id) }
            .map { tour in
                var updatedTour = tour
                updatedTour.isFavorite = true
                return updatedTour
            }
    }
    
    var availableCountries: [String] {
        Array(Set(tours.map { $0.country })).sorted()
    }
    
    var priceRange: (min: Int, max: Int) {
        let prices = tours.map { $0.price }
        return (prices.min() ?? 0, prices.max() ?? 0)
    }
    
    var durationRange: (min: Int, max: Int) {
        let durations = tours.map { $0.duration }
        return (durations.min() ?? 0, durations.max() ?? 0)
    }
    
    func toggleFavorite(tourId: String) {
        if favoriteTourIds.contains(tourId) {
            favoriteTourIds.remove(tourId)
        } else {
            favoriteTourIds.insert(tourId)
        }
        saveFavorites()
    }
    
    func isFavorite(tourId: String) -> Bool {
        favoriteTourIds.contains(tourId)
    }
    
    func resetFilters() {
        filters.reset()
        selectedCategory = nil
        searchText = ""
    }
    
    private func loadTours() {
        tours = MockData.tours
    }
    
    private func loadFavorites() {
        if let data = UserDefaults.standard.data(forKey: "favoriteTours"),
           let favorites = try? JSONDecoder().decode([String].self, from: data) {
            favoriteTourIds = Set(favorites)
        }
    }
    
    private func saveFavorites() {
        if let data = try? JSONEncoder().encode(Array(favoriteTourIds)) {
            UserDefaults.standard.set(data, forKey: "favoriteTours")
        }
    }
}

