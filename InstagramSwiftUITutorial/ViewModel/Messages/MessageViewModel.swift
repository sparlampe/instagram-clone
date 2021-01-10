//
//  MessageViewModel.swift
//  InstagramSwiftUITutorial
//
//  Created by Stephen Dowless on 1/9/21.
//

import Foundation

struct MessageViewModel {
    let message: Message
    
    var currentUid: String { return AuthViewModel.shared.userSession?.uid ?? "" }
    
    var chatPartnerId: String { return message.fromId == currentUid ? message.toId : message.fromId}
    
    var isFromCurrentUser: Bool { return message.fromId == currentUid }
}
