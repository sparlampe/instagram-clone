//
//  User.swift
//  InstagramSwiftUITutorial
//
//  Created by Stephen Dowless on 12/29/20.
//

import FirebaseFirestoreSwift

struct User: Identifiable, Decodable {
    @DocumentID var id: String?
    let username: String
    let email: String
    let profileImageUrl: String
    let fullname: String
    var bio: String?
    var stats: UserStats?
    var isFollowed: Bool? = false
    
    var isCurrentUser: Bool { return AuthViewModel.shared.userSession?.uid == id }
    
    // this custom init allows us to create a user from message data
    init(message: Message) {
        self.username = message.username
        self.id = message.chatPartnerId
        self.fullname = message.fullname
        self.email = ""
        self.profileImageUrl = message.profileImageUrl
    }
}

struct UserStats: Decodable {
    var following: Int
    var posts: Int
    var followers: Int
}
