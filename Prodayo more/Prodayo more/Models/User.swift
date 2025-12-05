//
//  User.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import Foundation

struct User: Identifiable, Codable {
    let id: String
    var name: String
    var email: String
    var phone: String?
    var avatar: String?
    var bookings: [Booking] = []
    var favoriteTourIds: [String] = []
    
    var favoritesCount: Int {
        favoriteTourIds.count
    }
    
    var bookingsCount: Int {
        bookings.count
    }
}

struct Booking: Identifiable, Codable {
    let id: String
    let tourId: String
    let date: String
    let travelers: Int
    let totalPrice: Int
    let status: BookingStatus
}

enum BookingStatus: String, Codable {
    case pending = "Ожидает подтверждения"
    case confirmed = "Подтверждено"
    case cancelled = "Отменено"
}

