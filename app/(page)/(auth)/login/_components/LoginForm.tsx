"use client"
import { APP_ROUTES, COOKIES_KEY } from "@/_lib/constants"
import { timezoneDate } from "@/_lib/utils"
import { authService } from "@/_services/auth"
import { Button, Input } from "@nextui-org/react"
import Cookies from "js-cookie"
import { useState } from "react"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async () => {
    const res = await authService.login({ email, password })
    const data = res.data.data
    Cookies.set(COOKIES_KEY.ACCESS_TOKEN, data.accessToken, {
      expires: timezoneDate(data.accessTokenExpiration),
      secure: process.env.NODE_ENV === "production"
    })
    Cookies.set(COOKIES_KEY.REFRESH_TOKEN, data.refreshToken, {
      expires: timezoneDate(data.refreshTokenExpiration),
      secure: process.env.NODE_ENV === "production"
    })

    window.location.href = APP_ROUTES.ADMIN.ROOT
  }

  return (
    <div>
      <Input placeholder='Email' onValueChange={setEmail} value={email} />
      <Input placeholder='Password' type='password' onValueChange={setPassword} value={password} />
      <Button onPress={handleLogin}>Đăng nhập</Button>
    </div>
  )
}

export default LoginForm
