"use client"
import { AppLogo, PasswordInput } from "@/_components"
import { APP_ROUTES, COOKIES_KEY } from "@/_lib/constants"
import { timezoneDate } from "@/_lib/utils"
import { useLoginMutation } from "@/_services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import Cookies from "js-cookie"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().min(1, "Email không được để trống").email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống").min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
})

type FormSchema = z.infer<typeof formSchema>

const LoginForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })

  const [error, setError] = useState<string | null>(null)

  const loginMutation = useLoginMutation()
  const isLoading = loginMutation.isPending

  const handleLogin = async (formData: FormSchema) => {
    setError(null)
    loginMutation.mutate(formData, {
      onSuccess: ({ data }) => {
        Cookies.set(COOKIES_KEY.ACCESS_TOKEN, data.accessToken, {
          expires: timezoneDate(data.accessTokenExpiration),
          secure: process.env.NODE_ENV === "production"
        })
        Cookies.set(COOKIES_KEY.REFRESH_TOKEN, data.refreshToken, {
          expires: timezoneDate(data.refreshTokenExpiration),
          secure: process.env.NODE_ENV === "production"
        })

        toast.success("Đăng nhập thành công")

        window.location.href = APP_ROUTES.ADMIN.ROOT
      },
      onError: (err: any) => {
        const message = err.response?.data?.message ?? err.message
        setError(message)
      }
    })
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <form
        className='flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-lg border border-foreground-200 p-8 shadow'
        onSubmit={handleSubmit(handleLogin)}
      >
        <AppLogo />
        <p className='text-center'>
          Hệ thống dành riêng cho quản trị viên.
          <br /> Vui lòng đăng nhập để tiếp tục.
        </p>
        <Input
          {...register("email")}
          label='Email'
          labelPlacement='outside'
          placeholder='Vui lòng nhập email'
          isRequired
          autoFocus
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          isDisabled={isLoading}
        />
        <PasswordInput
          {...register("password")}
          label='Mật khẩu'
          labelPlacement='outside'
          placeholder='Vui lòng nhập mật khẩu'
          isRequired
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          isDisabled={isLoading}
        />
        {error && <p className='w-full text-left text-danger'>{error}</p>}
        <Button variant='solid' color='primary' fullWidth type='submit' isLoading={isLoading} isDisabled={isLoading}>
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
        <Link
          href={APP_ROUTES.ROOT}
          className='text-center text-sm text-foreground-400 transition-all hover:text-primary hover:underline'
        >
          Quay lại trang chủ
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
