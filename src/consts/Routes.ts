export class ApiRoute {
  static apiDomain: 'https://mango-messenger-app.herokuapp.com';
}

export class AuthRoutes {
  static postRegister = 'api/auth/register';
  static postLogin = 'api/auth/login';
  static postRefreshToken = 'api/auth/refresh-token';
  static getVerifyPhone = 'api/auth/verify-phone';
}

export class ChatsRoutes {
  static getChats = '/api/chats';
  static postGroup = '/api/chats/group';
  static postDirectChat = '/api/chats/direct-chat';
  static postJoinGroup = '/api/chats/group/join/{chatId}';
}

export class MessagesRoutes {
  static getChatMessages: '/api/messages/{chatId}';
  static postMessage: '/api/messages';
  static putMessage: '/api/messages';
  static deleteMessage: '/api/messages/{messageId}';
}

export class UserRoutes {
  static getUserById: '/api/users/{userId}';
}
