export const APP_ROUTES = {
  ROOT: "/",
  ADMIN: {
    ROOT: "/dashboard",
    DATA: "/data?selected_tab=pdf",
    CHATBOT: "/chatbot",
    USERS: "/users",
    SETTINGS: "/settings"
  },
  AUTH: {
    LOGIN: "/login"
  },
  SHARE: {
    ROOT: "/shares",
    ID: (id: string) => `/share/${id}`
  }
}
