//
//  TourDetailView.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import SwiftUI

struct TourDetailView: View {
    let tour: Tour
    @StateObject private var viewModel = TourViewModel()
    @State private var selectedDate: String = ""
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ZStack(alignment: .bottom) {
            ScrollView {
                VStack(spacing: 0) {
                    // Hero Image
                    heroImageView
                    
                    // Content
                    VStack(alignment: .leading, spacing: 28) {
                        // Header Info
                        headerInfoView
                        
                        // Quick Stats
                        quickStatsView
                        
                        // Description
                        descriptionSection
                        
                        // Included
                        includedSection
                        
                        // Highlights
                        highlightsSection
                        
                        // Dates
                        datesSection
                        
                        // Spacer for bottom button
                        Spacer()
                            .frame(height: 120)
                    }
                    .padding(DesignSystem.Spacing.md)
                }
            }
            .ignoresSafeArea(edges: .top)
            
            // Bottom Action Bar
            bottomActionBar
        }
        .navigationBarHidden(true)
        .onAppear {
            selectedDate = tour.dates.first ?? ""
        }
    }
    
    private var heroImageView: some View {
        ZStack(alignment: .top) {
            AsyncImage(url: URL(string: tour.imageUrl ?? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800")) { phase in
                switch phase {
                case .empty:
                    Rectangle()
                        .fill(DesignSystem.Colors.premiumGradient)
                        .overlay(ProgressView().tint(.white))
                case .success(let image):
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                case .failure:
                    Rectangle()
                        .fill(DesignSystem.Colors.premiumGradient)
                        .overlay(Image(systemName: "photo").foregroundColor(.white.opacity(0.7)).font(.system(size: 40)))
                @unknown default:
                    EmptyView()
                }
            }
            .frame(height: 400)
            .clipped()
            
            LinearGradient(
                colors: [
                    .clear,
                    .black.opacity(0.3),
                    .black.opacity(0.7)
                ],
                startPoint: .top,
                endPoint: .bottom
            )
            .frame(height: 400)
            
            // Top Controls
            HStack {
                Button(action: { dismiss() }) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(.white)
                        .padding(13)
                        .background(
                            Circle()
                                .fill(.ultraThinMaterial)
                        )
                        .premiumShadow(DesignSystem.Shadows.small)
                }
                
                Spacer()
                
                Button(action: {
                    withAnimation(.spring(response: 0.3)) {
                        viewModel.toggleFavorite(tourId: tour.id)
                    }
                }) {
                    Image(systemName: viewModel.isFavorite(tourId: tour.id) ? "heart.fill" : "heart")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(viewModel.isFavorite(tourId: tour.id) ? DesignSystem.Colors.coral : .white)
                        .padding(13)
                        .background(
                            Circle()
                                .fill(.ultraThinMaterial)
                        )
                        .premiumShadow(DesignSystem.Shadows.small)
                }
            }
            .padding(.horizontal, DesignSystem.Spacing.md)
            .padding(.top, 70)
            
            // Bottom Overlay Info
            VStack(alignment: .leading, spacing: 14) {
                HStack(spacing: 6) {
                    Image(systemName: "star.fill")
                        .font(.system(size: 18))
                        .foregroundColor(.yellow)
                    Text(String(format: "%.1f", tour.rating))
                        .font(DesignSystem.Typography.title3)
                        .foregroundColor(.white)
                    Text("(\(tour.reviewsCount) отзывов)")
                        .font(DesignSystem.Typography.subheadline)
                        .foregroundColor(.white.opacity(0.9))
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 9)
                .background(
                    Capsule()
                        .fill(.ultraThinMaterial)
                )
                
                if let hotelName = tour.hotelName {
                    Text(hotelName)
                        .font(DesignSystem.Typography.headline)
                        .foregroundColor(.white)
                        .lineLimit(2)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(DesignSystem.Spacing.md)
            .offset(y: 280)
        }
    }
    
    private var headerInfoView: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Category Badge
            HStack(spacing: 6) {
                Text(tour.category.emoji)
                Text(tour.category.rawValue.uppercased())
                    .font(DesignSystem.Typography.caption)
                    .fontWeight(.bold)
                    .tracking(1.5)
            }
            .foregroundColor(DesignSystem.Colors.oceanBlue)
            .padding(.horizontal, DesignSystem.Spacing.sm)
            .padding(.vertical, 8)
            .background(
                Capsule()
                    .fill(DesignSystem.Colors.oceanBlue.opacity(0.15))
            )
            
            Text(tour.title)
                .font(DesignSystem.Typography.largeTitle)
                .lineSpacing(6)
            
            HStack(spacing: 8) {
                Image(systemName: "mappin.circle.fill")
                    .foregroundColor(DesignSystem.Colors.turquoise)
                Text("\(tour.destination), \(tour.country)")
                    .font(DesignSystem.Typography.title3)
                    .foregroundColor(.secondary)
            }
            
            // Price
            VStack(alignment: .leading, spacing: 6) {
                if let originalPrice = tour.formattedOriginalPrice {
                    Text(originalPrice)
                        .font(DesignSystem.Typography.title3)
                        .fontWeight(.medium)
                        .foregroundColor(DesignSystem.Colors.textSecondary)
                        .strikethrough()
                }
                HStack(alignment: .lastTextBaseline, spacing: 10) {
                    Text(tour.formattedPrice)
                        .font(DesignSystem.Typography.largeTitle)
                        .foregroundColor(DesignSystem.Colors.oceanBlue)
                    Text("за человека")
                        .font(DesignSystem.Typography.body)
                        .foregroundColor(DesignSystem.Colors.textSecondary)
                }
            }
            .padding(.top, 4)
        }
    }
    
    private var quickStatsView: some View {
        HStack(spacing: 0) {
            statItem(icon: "calendar", label: "Длительность", value: "\(tour.duration) дн.")
            Divider()
            statItem(icon: "fork.knife", label: "Питание", value: tour.mealType.rawValue)
            Divider()
            if let rating = tour.hotelRating {
                statItem(icon: "star.fill", label: "Отель", value: "\(rating)★")
            }
        }
        .padding(.vertical, DesignSystem.Spacing.lg)
        .background(
            RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                .fill(DesignSystem.Colors.surface)
        )
        .premiumShadow(DesignSystem.Shadows.small)
    }
    
    private func statItem(icon: String, label: String, value: String) -> some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 28))
                .foregroundColor(DesignSystem.Colors.oceanBlue)
            Text(value)
                .font(DesignSystem.Typography.title3)
                .fontWeight(.bold)
            Text(label)
                .font(DesignSystem.Typography.footnote)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
    
    private var descriptionSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Описание")
                .font(DesignSystem.Typography.title2)
            Text(tour.description)
                .font(DesignSystem.Typography.body)
                .foregroundColor(.secondary)
                .lineSpacing(8)
        }
    }
    
    private var includedSection: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Что включено")
                .font(DesignSystem.Typography.title2)
            
            VStack(alignment: .leading, spacing: 16) {
                ForEach(tour.included, id: \.self) { item in
                    HStack(alignment: .top, spacing: 14) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 20))
                            .foregroundColor(.green)
                        Text(item)
                            .font(DesignSystem.Typography.body)
                            .foregroundColor(DesignSystem.Colors.textSecondary)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
            }
        }
    }
    
    private var highlightsSection: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Особенности")
                .font(DesignSystem.Typography.title2)
            
            VStack(alignment: .leading, spacing: 16) {
                ForEach(tour.highlights, id: \.self) { item in
                    HStack(alignment: .top, spacing: 14) {
                        Image(systemName: "sparkles")
                            .font(.system(size: 20))
                            .foregroundColor(DesignSystem.Colors.coral)
                        Text(item)
                            .font(DesignSystem.Typography.body)
                            .foregroundColor(DesignSystem.Colors.textSecondary)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
            }
        }
    }
    
    private var datesSection: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Доступные даты")
                .font(DesignSystem.Typography.title2)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(tour.dates, id: \.self) { date in
                        dateButton(date: date)
                    }
                }
            }
        }
    }
    
    private func dateButton(date: String) -> some View {
        Button(action: {
            withAnimation(.spring(response: 0.3)) {
                selectedDate = date
            }
        }) {
            VStack(spacing: 4) {
                Text(formatDate(date))
                    .font(DesignSystem.Typography.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(selectedDate == date ? DesignSystem.Colors.textPrimary : DesignSystem.Colors.textPrimary)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 16)
            .background(
                Group {
                    if selectedDate == date {
                        Capsule()
                            .fill(DesignSystem.Colors.premiumGradient)
                    } else {
                        Capsule()
                            .fill(DesignSystem.Colors.surface)
                    }
                }
            )
            .premiumShadow(selectedDate == date ? DesignSystem.Shadows.small : DesignSystem.Shadows.Shadow(color: .clear, radius: 0, x: 0, y: 0))
        }
    }
    
    private func formatDate(_ dateString: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        if let date = formatter.date(from: dateString) {
            formatter.dateFormat = "d MMM"
            formatter.locale = Locale(identifier: "ru_RU")
            return formatter.string(from: date)
        }
        return dateString
    }
    
    private var bottomActionBar: some View {
        VStack(spacing: 0) {
            Divider()
            
            HStack(spacing: 18) {
                VStack(alignment: .leading, spacing: 6) {
                    Text("Итого")
                        .font(DesignSystem.Typography.footnote)
                        .foregroundColor(DesignSystem.Colors.textSecondary)
                    Text(tour.formattedPrice)
                        .font(DesignSystem.Typography.title2)
                        .foregroundColor(DesignSystem.Colors.oceanBlue)
                }
                
                Button(action: {
                    // Booking action
                }) {
                    Text("Забронировать")
                        .font(DesignSystem.Typography.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 18)
                        .background(
                            Capsule()
                                .fill(DesignSystem.Colors.premiumGradient)
                        )
                        .premiumShadow(DesignSystem.Shadows.medium)
                }
            }
            .padding(.horizontal, DesignSystem.Spacing.md)
            .padding(.vertical, DesignSystem.Spacing.md)
            .background(
                DesignSystem.Colors.card
                    .shadow(color: .black.opacity(0.1), radius: 10, y: -4)
            )
        }
    }
}

#Preview {
    NavigationView {
        TourDetailView(tour: MockData.tours[0])
    }
}
