//
//  TourCard.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import SwiftUI

struct TourCard: View {
    let tour: Tour
    let viewModel: TourViewModel
    @State private var isPressed = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Премиальная секция изображения
            ZStack(alignment: .topTrailing) {
                AsyncImage(url: URL(string: tour.imageUrl ?? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800")) { phase in
                    switch phase {
                    case .empty:
                        Rectangle()
                            .fill(DesignSystem.Colors.premiumGradient)
                            .overlay(
                                ProgressView()
                                    .tint(.white)
                            )
                    case .success(let image):
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    case .failure:
                        Rectangle()
                            .fill(DesignSystem.Colors.premiumGradient)
                            .overlay(
                                Image(systemName: "photo")
                                    .foregroundColor(.white.opacity(0.7))
                                    .font(.system(size: 40))
                            )
                    @unknown default:
                        EmptyView()
                    }
                }
                .frame(height: 300)
                .clipped()
                
                // Премиальный градиентный оверлей
                LinearGradient(
                    colors: [
                        .clear,
                        .black.opacity(0.3),
                        .black.opacity(0.8)
                    ],
                    startPoint: .top,
                    endPoint: .bottom
                )
                .frame(height: 300)
                
                // Верхние бейджи
                HStack {
                    // Бейдж скидки
                    if let discount = tour.discount {
                        Text("-\(discount)%")
                            .font(DesignSystem.Typography.caption)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 10)
                            .background(
                                Capsule()
                                    .fill(DesignSystem.Colors.coral)
                            )
                            .premiumShadow(DesignSystem.Shadows.small)
                    }
                    
                    Spacer()
                    
                    // Кнопка избранного
                    Button(action: {
                        withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                            viewModel.toggleFavorite(tourId: tour.id)
                        }
                    }) {
                        Image(systemName: tour.isFavorite ? "heart.fill" : "heart")
                            .font(.system(size: 22, weight: .semibold))
                            .foregroundColor(tour.isFavorite ? DesignSystem.Colors.coral : .white)
                            .padding(14)
                            .background(
                                Circle()
                                    .fill(.ultraThinMaterial)
                            )
                            .premiumShadow(DesignSystem.Shadows.small)
                    }
                }
                .padding(22)
                
                // Нижний оверлей с информацией
                VStack(alignment: .leading, spacing: 14) {
                    HStack(spacing: 8) {
                        Image(systemName: "star.fill")
                            .font(.system(size: 18))
                            .foregroundColor(.yellow)
                        Text(String(format: "%.1f", tour.rating))
                            .font(DesignSystem.Typography.headline)
                            .foregroundColor(.white)
                        Text("(\(tour.reviewsCount))")
                            .font(DesignSystem.Typography.subheadline)
                            .foregroundColor(.white.opacity(0.9))
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .background(
                        Capsule()
                            .fill(.ultraThinMaterial)
                    )
                    
                    if let hotelName = tour.hotelName {
                        Text(hotelName)
                            .font(DesignSystem.Typography.subheadline)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .lineLimit(1)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(22)
                .offset(y: 170)
            }
            
            // Премиальная секция контента
            VStack(alignment: .leading, spacing: 20) {
                // Бейдж категории
                HStack(spacing: 8) {
                    Text(tour.category.emoji)
                        .font(.system(size: 18))
                    Text(tour.category.rawValue.uppercased())
                        .font(DesignSystem.Typography.caption)
                        .fontWeight(.bold)
                        .tracking(2)
                        .foregroundColor(DesignSystem.Colors.oceanBlue)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(
                    Capsule()
                        .fill(DesignSystem.Colors.oceanBlue.opacity(0.15))
                )
                
                // Заголовок
                Text(tour.title)
                    .font(DesignSystem.Typography.title2)
                    .foregroundColor(DesignSystem.Colors.textPrimary)
                    .lineLimit(2)
                    .fixedSize(horizontal: false, vertical: true)
                    .lineSpacing(5)
                
                // Локация
                HStack(spacing: 10) {
                    Image(systemName: "mappin.circle.fill")
                        .font(.system(size: 18))
                        .foregroundColor(DesignSystem.Colors.turquoise)
                    Text("\(tour.destination), \(tour.country)")
                        .font(DesignSystem.Typography.subheadline)
                        .fontWeight(.semibold)
                        .foregroundColor(DesignSystem.Colors.textSecondary)
                }
                
                // Информационная строка
                HStack(spacing: 20) {
                    infoItem(icon: "calendar", text: "\(tour.duration) дн.")
                    infoItem(icon: "fork.knife", text: tour.mealType.rawValue)
                    if let rating = tour.hotelRating {
                        HStack(spacing: 4) {
                            ForEach(0..<rating, id: \.self) { _ in
                                Image(systemName: "star.fill")
                                    .font(.system(size: 13))
                                    .foregroundColor(.orange)
                            }
                        }
                    }
                    Spacer()
                }
                
                Divider()
                    .padding(.vertical, 10)
                
                // Премиальная секция цены
                HStack(alignment: .lastTextBaseline) {
                    VStack(alignment: .leading, spacing: 6) {
                        if let originalPrice = tour.formattedOriginalPrice {
                            Text(originalPrice)
                                .font(DesignSystem.Typography.subheadline)
                                .fontWeight(.medium)
                                .foregroundColor(DesignSystem.Colors.textSecondary)
                                .strikethrough()
                        }
                        Text(tour.formattedPrice)
                            .font(DesignSystem.Typography.title1)
                            .foregroundColor(DesignSystem.Colors.oceanBlue)
                        Text("за человека")
                            .font(DesignSystem.Typography.footnote)
                            .foregroundColor(DesignSystem.Colors.textSecondary)
                    }
                    
                    Spacer()
                    
                    Button(action: {}) {
                        Text("Подробнее")
                            .font(DesignSystem.Typography.subheadline)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.horizontal, 32)
                            .padding(.vertical, 16)
                            .background(
                                Capsule()
                                    .fill(DesignSystem.Colors.premiumGradient)
                            )
                            .premiumShadow(DesignSystem.Shadows.medium)
                    }
                }
            }
            .padding(24)
        }
        .background(DesignSystem.Colors.card)
        .cornerRadius(DesignSystem.Radius.xlarge)
        .premiumShadow(DesignSystem.Shadows.large)
        .overlay(
            RoundedRectangle(cornerRadius: DesignSystem.Radius.xlarge)
                .stroke(
                    LinearGradient(
                        colors: [
                            DesignSystem.Colors.oceanBlue.opacity(0.12),
                            DesignSystem.Colors.turquoise.opacity(0.06)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1.5
                )
        )
        .scaleEffect(isPressed ? 0.97 : 1.0)
        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: isPressed)
    }
    
    private func infoItem(icon: String, text: String) -> some View {
        HStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 15))
                .foregroundColor(DesignSystem.Colors.oceanBlue.opacity(0.7))
            Text(text)
                .font(DesignSystem.Typography.footnote)
                .foregroundColor(DesignSystem.Colors.textSecondary)
        }
    }
}

#Preview {
    TourCard(
        tour: MockData.tours[0],
        viewModel: TourViewModel()
    )
    .padding()
    .background(DesignSystem.Colors.background)
}
