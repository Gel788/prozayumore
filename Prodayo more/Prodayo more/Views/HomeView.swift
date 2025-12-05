//
//  HomeView.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import SwiftUI

struct HomeView: View {
    @StateObject private var viewModel = TourViewModel()
    @State private var showFilters = false
    
    var body: some View {
        NavigationView {
            ZStack {
                // Премиальный темный фон
                DesignSystem.Colors.background
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 0) {
                        // Премиальный хедер
                        premiumHeaderView
                        
                        // Поисковая строка
                        VStack(spacing: 0) {
                            TourSearchBar(searchParams: $viewModel.searchParams) {
                                performSearch()
                            }
                            .padding(.vertical, 24)
                            .background(
                                RoundedRectangle(cornerRadius: DesignSystem.Radius.large)
                                    .fill(DesignSystem.Colors.card)
                                    .premiumShadow(DesignSystem.Shadows.medium)
                            )
                            .padding(.horizontal, DesignSystem.Spacing.md)
                        }
                        .padding(.top, -60)
                        .zIndex(1)
                        
                        // Премиальные категории
                        premiumCategoriesView
                            .padding(.top, DesignSystem.Spacing.lg)
                        
                        // Сетка туров
                        toursGridView
                    }
                }
            }
            .navigationBarHidden(true)
            .sheet(isPresented: $showFilters) {
                TourFiltersView(viewModel: viewModel)
            }
        }
    }
    
    private var premiumHeaderView: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 20) {
                    // Бренд компании
                    HStack(spacing: 14) {
                        ZStack {
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [
                                            Color.white.opacity(0.35),
                                            Color.white.opacity(0.15)
                                        ],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 52, height: 52)
                            
                            Image(systemName: "water.waves")
                                .font(.system(size: 26, weight: .bold))
                                .foregroundColor(.white)
                        }
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text("Продаю Море")
                                .font(DesignSystem.Typography.title2)
                                .foregroundColor(.white)
                            Text("Туристическое агентство")
                                .font(DesignSystem.Typography.caption)
                                .foregroundColor(.white.opacity(0.85))
                        }
                    }
                    
                    Text("Откройте мир\nнезабываемых путешествий")
                        .font(DesignSystem.Typography.largeTitle)
                        .foregroundColor(.white)
                        .lineSpacing(10)
                        .fixedSize(horizontal: false, vertical: true)
                }
                
                Spacer()
            }
            .padding(.horizontal, DesignSystem.Spacing.md)
            .padding(.top, 70)
            .padding(.bottom, 40)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            ZStack {
                DesignSystem.Colors.premiumGradient
                
                // Декоративные элементы
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [
                                Color.white.opacity(0.25),
                                Color.white.opacity(0.08),
                                Color.clear
                            ],
                            center: .center,
                            startRadius: 0,
                            endRadius: 220
                        )
                    )
                    .frame(width: 450, height: 450)
                    .offset(x: -180, y: -180)
                    .blur(radius: 25)
                
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [
                                Color.white.opacity(0.2),
                                Color.white.opacity(0.05),
                                Color.clear
                            ],
                            center: .center,
                            startRadius: 0,
                            endRadius: 180
                        )
                    )
                    .frame(width: 360, height: 360)
                    .offset(x: 280, y: 120)
                    .blur(radius: 20)
            }
        )
    }
    
    private var premiumCategoriesView: some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack {
                    Text("Категории")
                    .font(DesignSystem.Typography.title2)
                    .foregroundColor(DesignSystem.Colors.textPrimary)
                
                Spacer()
            }
            .padding(.horizontal, DesignSystem.Spacing.md)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: DesignSystem.Spacing.sm) {
                    categoryChip(category: nil, title: "Все", emoji: "🌊")
                    
                    ForEach(TourCategory.allCases, id: \.self) { category in
                        categoryChip(category: category, title: category.rawValue, emoji: category.emoji)
                    }
                }
                .padding(.horizontal, DesignSystem.Spacing.md)
            }
        }
        .padding(.vertical, DesignSystem.Spacing.md)
    }
    
    private func categoryChip(category: TourCategory?, title: String, emoji: String) -> some View {
        Button(action: {
            withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                viewModel.selectedCategory = category
                viewModel.filters.category = category
            }
        }) {
            HStack(spacing: 12) {
                Text(emoji)
                    .font(.system(size: 24))
                Text(title)
                    .font(DesignSystem.Typography.subheadline)
                    .fontWeight(.bold)
            }
            .foregroundColor(
                (viewModel.selectedCategory == category) ? DesignSystem.Colors.textPrimary : DesignSystem.Colors.textPrimary
            )
            .padding(.horizontal, 28)
            .padding(.vertical, 16)
            .background(
                Group {
                    if viewModel.selectedCategory == category {
                        DesignSystem.Colors.premiumGradient
                    } else {
                        LinearGradient(
                            colors: [DesignSystem.Colors.card, DesignSystem.Colors.card],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    }
                }
            )
            .cornerRadius(DesignSystem.Radius.medium)
            .premiumShadow(
                (viewModel.selectedCategory == category) ?
                DesignSystem.Shadows.medium :
                DesignSystem.Shadows.small
            )
            .scaleEffect((viewModel.selectedCategory == category) ? 1.03 : 1.0)
        }
    }
    
    private var toursGridView: some View {
        VStack(spacing: DesignSystem.Spacing.lg) {
            // Заголовок результатов
            if !viewModel.filteredTours.isEmpty {
                resultsHeaderView
            }
            
            // Список туров
            LazyVStack(spacing: DesignSystem.Spacing.lg) {
                ForEach(viewModel.filteredTours) { tour in
                    NavigationLink(destination: TourDetailView(tour: tour)) {
                        TourCard(tour: tour, viewModel: viewModel)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .padding(.horizontal, DesignSystem.Spacing.md)
            .padding(.bottom, 120)
            
            if viewModel.filteredTours.isEmpty {
                emptyStateView
                    .padding(.vertical, 100)
            }
        }
        .padding(.top, DesignSystem.Spacing.sm)
    }
    
    private var resultsHeaderView: some View {
        HStack {
            VStack(alignment: .leading, spacing: 8) {
                Text("Найдено туров")
                    .font(DesignSystem.Typography.footnote)
                    .foregroundColor(DesignSystem.Colors.textSecondary)
                Text("\(viewModel.filteredTours.count)")
                    .font(DesignSystem.Typography.title2)
                    .foregroundColor(DesignSystem.Colors.textPrimary)
            }
            
            Spacer()
            
            Menu {
                ForEach(TourViewModel.SortOption.allCases, id: \.self) { option in
                    Button(action: {
                        withAnimation {
                            viewModel.sortOption = option
                        }
                    }) {
                        HStack {
                            Text(option.rawValue)
                            if viewModel.sortOption == option {
                                Spacer()
                                Image(systemName: "checkmark")
                                    .foregroundColor(DesignSystem.Colors.oceanBlue)
                            }
                        }
                    }
                }
            } label: {
                HStack(spacing: 10) {
                    Image(systemName: "arrow.up.arrow.down")
                        .font(.system(size: 15, weight: .semibold))
                    Text("Сортировка")
                        .font(DesignSystem.Typography.subheadline)
                        .fontWeight(.semibold)
                }
                .foregroundColor(DesignSystem.Colors.oceanBlue)
                .padding(.horizontal, 20)
                .padding(.vertical, 14)
                .background(
                    Capsule()
                        .fill(DesignSystem.Colors.oceanBlue.opacity(0.15))
                )
            }
        }
        .padding(.horizontal, DesignSystem.Spacing.md)
    }
    
    private var emptyStateView: some View {
        VStack(spacing: 32) {
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [
                                DesignSystem.Colors.turquoise.opacity(0.25),
                                DesignSystem.Colors.oceanBlue.opacity(0.15)
                            ],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 160, height: 160)
                
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 70, weight: .ultraLight))
                    .foregroundColor(DesignSystem.Colors.oceanBlue.opacity(0.7))
            }
            
            VStack(spacing: 16) {
                Text("Туры не найдены")
                    .font(DesignSystem.Typography.title2)
                    .foregroundColor(DesignSystem.Colors.textPrimary)
                
                Text("Попробуйте изменить параметры\nпоиска или фильтры")
                    .font(DesignSystem.Typography.body)
                    .foregroundColor(DesignSystem.Colors.textSecondary)
                    .multilineTextAlignment(.center)
                    .lineSpacing(8)
            }
            
            if viewModel.filters.hasActiveFilters {
                Button(action: {
                    withAnimation {
                        viewModel.resetFilters()
                    }
                }) {
                    Text("Сбросить фильтры")
                        .font(DesignSystem.Typography.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal, 40)
                        .padding(.vertical, 18)
                        .background(
                            Capsule()
                                .fill(DesignSystem.Colors.premiumGradient)
                        )
                        .premiumShadow(DesignSystem.Shadows.medium)
                }
            }
        }
        .frame(maxWidth: .infinity)
    }
    
    private func performSearch() {
        withAnimation {
            if let country = viewModel.searchParams.country {
                viewModel.filters.country = country
            }
            if let minNights = viewModel.searchParams.nightsMin {
                viewModel.filters.minDuration = minNights
            }
            if let maxNights = viewModel.searchParams.nightsMax {
                viewModel.filters.maxDuration = maxNights
            }
        }
    }
}

#Preview {
    HomeView()
}
