//
//  Message.swift
//  InstagramSwiftUITutorial
//
//  Created by Stephen Dowless on 1/9/21.
//

import FirebaseFirestoreSwift
import Firebase

struct Message: Identifiable, Decodable {
    @DocumentID var id: String?
    let fromId: String
    let toId: String
    let uid: String
    let timestamp: Timestamp
    let username: String
    let profileImageUrl: String
    let text: String
    let fullname: String
}
