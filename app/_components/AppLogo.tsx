"use client"
import { APP_ROUTES } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { useGetMeQuery } from "@/_services/auth"
import Link from "next/link"

type Props = {}

const AppLogo = ({}: Props) => {
  const { data } = useGetMeQuery()
  const user = data?.data
  const isAdmin = user?.role === ERole.ADMIN
  return (
    <Link href={isAdmin ? APP_ROUTES.ADMIN.ROOT : APP_ROUTES.ROOT}>
      <h1 className='text-xl font-extrabold text-primary transition-all dark:invert md:text-3xl'>UITAdminBot</h1>
    </Link>
  )
}

export default AppLogo
