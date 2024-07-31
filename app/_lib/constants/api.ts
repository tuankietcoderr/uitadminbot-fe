export const API = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: {
      ADMIN: "/auth/register/admin",
      CHAT_USER: "/auth/register/chat-user"
    },
    ME: "/auth/me",
    VALIDATE: "/auth/validate",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token"
  },
  ROOM: {
    CHAT_USER: {
      GET: "/chat-room/chat-user"
    },
    GET_MESSAGES: (roomId: string) => `/chat-room/${roomId}`
  },
  MESSAGE: {
    SEND: "/message",
    LIKE: (messageId: string) => `/message/${messageId}/like`,
    DISLIKE: (messageId: string) => `/message/${messageId}/dislike`
  },
  UPLOADER: {
    UPLOAD: "/upload",
    DELETE: (fileId: string) => `/upload?public_id=${fileId}`
  }
}
