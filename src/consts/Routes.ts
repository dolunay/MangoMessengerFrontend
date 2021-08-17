export class Domain {
  static route = 'https://mango-messenger-app.herokuapp.com/';
}

export class AuthRoutes {
  static postRegister = 'api/auth/register';
  static postLogin = 'api/auth/login';
  static postRefreshToken = 'api/auth/refresh-token';
  static getVerifyPhone = 'api/auth/verify-phone';
  static postLogout = 'api/auth/logout'
  static postLogoutAll = 'api/auth/logout-all'
  static postVerifyEmail = 'api/auth/verify-email'
}

export class ChatsRoutes {
  static getChats = 'api/chats';
  static postGroup = 'api/chats';
  static postDirectChat = 'api/chats';
}

export class MessagesRoutes {
  static getChatMessages = 'api/messages/';
  static postMessage = 'api/messages';
  static putMessage = 'api/messages';
  static deleteMessage: 'api/messages/';
}

export class UserRoutes {
  static getUserById = 'api/users/';
  static getCurrentUser = 'api/users/';
  static putEmailConfirmation = 'api/users/email-confirmation';
  static putPhoneConfirmation = 'api/users/phone-confirmation';
  static putUserInformation = '/api/users/information'
}

export class ContactsRoutes {
  static getContacts = 'api/contacts';
  static postContacts = 'api/contacts';
}

export class SessionRoutes {
  static route = 'api/sessions'
}

export class UserChats {
  static route = 'api/user-chats'
}
