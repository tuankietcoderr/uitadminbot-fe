import { ERole } from "../enums"

export function parseJwt(token: string): JwtPayload {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace("-", "+").replace("_", "/")
  return JSON.parse(atob(base64))
}

type JwtPayload = {
  iat: number
  exp: number
  userId: string
  role: ERole
}
