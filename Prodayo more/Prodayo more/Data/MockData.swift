//
//  MockData.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import Foundation

struct MockData {
    static let tours: [Tour] = [
        Tour(
            id: "1",
            title: "Райский отдых на Мальдивах",
            destination: "Мальдивы",
            country: "Мальдивы",
            imageName: "maldives",
            imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
            price: 125000,
            originalPrice: 150000,
            duration: 7,
            rating: 4.9,
            reviewsCount: 234,
            description: "Незабываемый отдых на белоснежных пляжах с кристально чистой водой. Включено проживание в вилле на воде, все питание и трансферы.",
            highlights: [
                "Вилла на воде с видом на океан",
                "Всё включено (All Inclusive)",
                "Снорклинг и дайвинг",
                "SPA процедуры"
            ],
            included: [
                "Перелет туда-обратно",
                "Проживание 7 ночей",
                "Питание All Inclusive",
                "Трансферы",
                "Медицинская страховка"
            ],
            dates: ["2024-06-15", "2024-07-01", "2024-08-10"],
            category: .beach,
            mealType: .allInclusive,
            hotelRating: 5,
            hotelName: "Conrad Maldives Rangali Island"
        ),
        Tour(
            id: "2",
            title: "Альпийские вершины Швейцарии",
            destination: "Церматт",
            country: "Швейцария",
            imageName: "switzerland",
            imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            price: 89000,
            originalPrice: nil,
            duration: 5,
            rating: 4.8,
            reviewsCount: 189,
            description: "Восхождение на легендарный Маттерхорн и незабываемые виды альпийских лугов. Проживание в горном отеле с панорамными видами.",
            highlights: [
                "Восхождение на Маттерхорн",
                "Горнолыжные трассы",
                "Альпийские луга",
                "Швейцарская кухня"
            ],
            included: [
                "Перелет",
                "Проживание 5 ночей",
                "Завтраки",
                "Горнолыжный ски-пасс",
                "Экскурсии"
            ],
            dates: ["2024-06-20", "2024-07-15", "2024-08-05"],
            category: .mountain,
            mealType: .breakfast,
            hotelRating: 4,
            hotelName: "Hotel Zermatterhof"
        ),
        Tour(
            id: "3",
            title: "Романтический Париж",
            destination: "Париж",
            country: "Франция",
            imageName: "paris",
            imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
            price: 65000,
            originalPrice: 75000,
            duration: 4,
            rating: 4.7,
            reviewsCount: 312,
            description: "Классический тур по столице Франции. Эйфелева башня, Лувр, Сена и уютные кафе на Монмартре.",
            highlights: [
                "Экскурсия по Лувру",
                "Подъем на Эйфелеву башню",
                "Круиз по Сене",
                "Монмартр и Сакре-Кёр"
            ],
            included: [
                "Перелет",
                "Проживание 4 ночи",
                "Завтраки",
                "Музейные билеты",
                "Экскурсии с гидом"
            ],
            dates: ["2024-06-10", "2024-07-05", "2024-08-20"],
            category: .city,
            mealType: .breakfast,
            hotelRating: 4,
            hotelName: "Hotel Plaza Athénée"
        ),
        Tour(
            id: "4",
            title: "Сафари в Кении",
            destination: "Найроби",
            country: "Кения",
            imageName: "kenya",
            imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
            price: 145000,
            originalPrice: nil,
            duration: 8,
            rating: 4.9,
            reviewsCount: 156,
            description: "Уникальное приключение в дикой природе Африки. Наблюдение за Большой пятеркой в их естественной среде обитания.",
            highlights: [
                "Сафари в национальных парках",
                "Большая пятерка",
                "Проживание в лодже",
                "Фото-сафари"
            ],
            included: [
                "Перелет",
                "Проживание 8 ночей",
                "Питание",
                "Сафари туры",
                "Трансферы"
            ],
            dates: ["2024-07-01", "2024-08-15", "2024-09-10"],
            category: .adventure,
            mealType: .fullBoard,
            hotelRating: 4,
            hotelName: "Giraffe Manor"
        ),
        Tour(
            id: "5",
            title: "Релакс на Бали",
            destination: "Убуд",
            country: "Индонезия",
            imageName: "bali",
            imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
            price: 78000,
            originalPrice: nil,
            duration: 10,
            rating: 4.8,
            reviewsCount: 278,
            description: "Йога, медитация и спа-процедуры в тропическом раю. Идеально для восстановления сил и энергии.",
            highlights: [
                "Йога и медитация",
                "SPA и массажи",
                "Тропические джунгли",
                "Органическая еда"
            ],
            included: [
                "Перелет",
                "Проживание 10 ночей",
                "Завтраки",
                "Йога классы",
                "SPA процедуры"
            ],
            dates: ["2024-06-25", "2024-07-20", "2024-08-25"],
            category: .relax,
            mealType: .breakfast,
            hotelRating: 5,
            hotelName: "Four Seasons Resort Bali"
        ),
        Tour(
            id: "6",
            title: "Японские традиции",
            destination: "Киото",
            country: "Япония",
            imageName: "japan",
            imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
            price: 135000,
            originalPrice: nil,
            duration: 9,
            rating: 4.9,
            reviewsCount: 201,
            description: "Погружение в культуру и традиции Японии. Храмы, сады, чайные церемонии и современный Токио.",
            highlights: [
                "Храмы Киото",
                "Чайная церемония",
                "Сакура (сезон)",
                "Традиционная кухня"
            ],
            included: [
                "Перелет",
                "Проживание 9 ночей",
                "Завтраки",
                "Экскурсии",
                "JR Pass"
            ],
            dates: ["2024-06-15", "2024-07-10", "2024-09-01"],
            category: .city,
            mealType: .breakfast,
            hotelRating: 4,
            hotelName: "The Ritz-Carlton Kyoto"
        )
    ]
    
    static let defaultUser = User(
        id: "1",
        name: "Александр",
        email: "alexander@example.com",
        phone: "+7 (999) 123-45-67",
        avatar: nil,
        bookings: [],
        favoriteTourIds: []
    )
}
