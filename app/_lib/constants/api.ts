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
    REFRESH_TOKEN: "/auth/refresh-token",
    GET_ADMINS: "/auth/admin",
    BAN_ADMIN: (id: string) => `/auth/admin/${id}`
  },
  ROOM: {
    CHAT_USER: {
      GET: "/chat-room/chat-user"
    },
    GET_MESSAGES: (roomId: string) => `/chat-room/${roomId}`,
    DELETE: `/chat-room`
  },
  MESSAGE: {
    SEND: "/message",
    LIKE: (messageId: string) => `/message/${messageId}/like`,
    DISLIKE: (messageId: string) => `/message/${messageId}/dislike`
  },
  UPLOADER: {
    UPLOAD: "/upload",
    ADMIN_UPLOAD: "/upload/train",
    UPLOAD_LINK: "/upload/link",
    DELETE_LINK: (public_id: string) => `/upload/link?public_id=${public_id}`,
    ADMIN_DELETE: (fileId: string) => `/upload/train?public_id=${fileId}`,
    DELETE: (fileId: string) => `/upload?public_id=${fileId}`
  },
  ASSET: {
    GET_ALL: "/asset"
  },
  SHARE: {
    CREATE: "/share",
    GET_SHARED_ROOM: (link: string) => `/share/${link}`,
    CANCEL_SHARE: (link: string) => `/share/${link}`,
    GET_USER_SHARES: "/share"
  },
  INTEGRATION: {
    CREATE: "/integration",
    GET_ALL: "/integration",
    BAN: (id: string) => `/integration/${id}`,
    DELETE: (id: string) => `/integration/${id}`
  },
  SUGGESTION: {
    GET_ALL: "/suggestion",
    CREATE: "/suggestion",
    DELETE: (id: string) => `/suggestion/${id}`
  }
}
