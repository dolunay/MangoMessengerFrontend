export class ApiRoute {
  static apiDomain = 'https://mango-messenger-app.herokuapp.com/';
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
  static postGroup = 'api/chats/group';
  static postDirectChat = 'api/chats/direct-chat';
  static postJoinGroup = 'api/chats/join';
}

export class MessagesRoutes {
  static getChatMessages = 'api/messages/';
  static postMessage = 'api/messages';
  static putMessage = 'api/messages';
  static deleteMessage: 'api/messages/';
}

export class UserRoutes {
  static getUserById = 'api/users/';
}
