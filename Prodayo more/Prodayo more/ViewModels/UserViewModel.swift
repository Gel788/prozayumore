//
//  UserViewModel.swift
//  Prodayo more
//
//  Created by Альберт Гилоян on 04.12.2025.
//

import Foundation
import SwiftUI
import Combine

class UserViewModel: ObservableObject {
    @Published var user: User
    
    init() {
        if let data = UserDefaults.standard.data(forKey: "currentUser"),
           let savedUser = try? JSONDecoder().decode(User.self, from: data) {
            self.user = savedUser
        } else {
            self.user = MockData.defaultUser
            saveUser()
        }
    }
    
    func updateUser(_ updatedUser: User) {
        user = updatedUser
        saveUser()
    }
    
    private func saveUser() {
        if let data = try? JSONEncoder().encode(user) {
            UserDefaults.standard.set(data, forKey: "currentUser")
        }
    }
}

