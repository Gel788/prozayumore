//
//  Tour.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import Foundation

enum TourCategory: String, CaseIterable, Codable {
    case beach = "Пляжи"
    case mountain = "Горы"
    case city = "Города"
    case adventure = "Приключения"
    case relax = "Релакс"
    
    var emoji: String {
        switch self {
        case .beach: return "🏖️"
        case .mountain: return "⛰️"
        case .city: return "🏙️"
        case .adventure: return "🎒"
        case .relax: return "🧘"
        }
    }
}

struct Tour: Identifiable, Codable {
    let id: String
    let title: String
    let destination: String
    let country: String
    let imageName: String
    let imageUrl: String?
    let price: Int
    let originalPrice: Int?
    let duration: Int
    let rating: Double
    let reviewsCount: Int
    let description: String
    let highlights: [String]
    let included: [String]
    let dates: [String]
    let category: TourCategory
    let mealType: MealType
    let hotelRating: Int?
    let hotelName: String?
    var isFavorite: Bool = false
    
    // Исключаем isFavorite из Codable, так как это временное состояние
    enum CodingKeys: String, CodingKey {
        case id, title, destination, country, imageName, imageUrl, price, originalPrice
        case duration, rating, reviewsCount, description, highlights, included, dates, category
        case mealType, hotelRating, hotelName
    }
    
    // Обычный инициализатор для создания туров в коде
    init(
        id: String,
        title: String,
        destination: String,
        country: String,
        imageName: String,
        imageUrl: String? = nil,
        price: Int,
        originalPrice: Int?,
        duration: Int,
        rating: Double,
        reviewsCount: Int,
        description: String,
        highlights: [String],
        included: [String],
        dates: [String],
        category: TourCategory,
        mealType: MealType = .allInclusive,
        hotelRating: Int? = nil,
        hotelName: String? = nil,
        isFavorite: Bool = false
    ) {
        self.id = id
        self.title = title
        self.destination = destination
        self.country = country
        self.imageName = imageName
        self.imageUrl = imageUrl
        self.price = price
        self.originalPrice = originalPrice
        self.duration = duration
        self.rating = rating
        self.reviewsCount = reviewsCount
        self.description = description
        self.highlights = highlights
        self.included = included
        self.dates = dates
        self.category = category
        self.mealType = mealType
        self.hotelRating = hotelRating
        self.hotelName = hotelName
        self.isFavorite = isFavorite
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        title = try container.decode(String.self, forKey: .title)
        destination = try container.decode(String.self, forKey: .destination)
        country = try container.decode(String.self, forKey: .country)
        imageName = try container.decode(String.self, forKey: .imageName)
        imageUrl = try container.decodeIfPresent(String.self, forKey: .imageUrl)
        price = try container.decode(Int.self, forKey: .price)
        originalPrice = try container.decodeIfPresent(Int.self, forKey: .originalPrice)
        duration = try container.decode(Int.self, forKey: .duration)
        rating = try container.decode(Double.self, forKey: .rating)
        reviewsCount = try container.decode(Int.self, forKey: .reviewsCount)
        description = try container.decode(String.self, forKey: .description)
        highlights = try container.decode([String].self, forKey: .highlights)
        included = try container.decode([String].self, forKey: .included)
        dates = try container.decode([String].self, forKey: .dates)
        category = try container.decode(TourCategory.self, forKey: .category)
        mealType = try container.decodeIfPresent(MealType.self, forKey: .mealType) ?? .allInclusive
        hotelRating = try container.decodeIfPresent(Int.self, forKey: .hotelRating)
        hotelName = try container.decodeIfPresent(String.self, forKey: .hotelName)
        isFavorite = false
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(title, forKey: .title)
        try container.encode(destination, forKey: .destination)
        try container.encode(country, forKey: .country)
        try container.encode(imageName, forKey: .imageName)
        try container.encodeIfPresent(imageUrl, forKey: .imageUrl)
        try container.encode(price, forKey: .price)
        try container.encodeIfPresent(originalPrice, forKey: .originalPrice)
        try container.encode(duration, forKey: .duration)
        try container.encode(rating, forKey: .rating)
        try container.encode(reviewsCount, forKey: .reviewsCount)
        try container.encode(description, forKey: .description)
        try container.encode(highlights, forKey: .highlights)
        try container.encode(included, forKey: .included)
        try container.encode(dates, forKey: .dates)
        try container.encode(category, forKey: .category)
        try container.encode(mealType, forKey: .mealType)
        try container.encodeIfPresent(hotelRating, forKey: .hotelRating)
        try container.encodeIfPresent(hotelName, forKey: .hotelName)
    }
    
    var discount: Int? {
        guard let original = originalPrice else { return nil }
        return Int(((Double(original - price) / Double(original)) * 100).rounded())
    }
    
    var formattedPrice: String {
        NumberFormatter.currency.string(from: NSNumber(value: price)) ?? "\(price) ₽"
    }
    
    var formattedOriginalPrice: String? {
        guard let original = originalPrice else { return nil }
        return NumberFormatter.currency.string(from: NSNumber(value: original)) ?? "\(original) ₽"
    }
}

extension NumberFormatter {
    static let currency: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = "RUB"
        formatter.currencySymbol = "₽"
        formatter.maximumFractionDigits = 0
        return formatter
    }()
}

