"use client"
import { AppLogo } from "@/_components"
import { APP_ROUTES, COOKIES_KEY } from "@/_lib/constants"
import { Admin } from "@/_lib/types/schema"
import { Button, cn, Divider } from "@nextui-org/react"
import { motion } from "framer-motion"
import Cookies from "js-cookie"
import {
  AlignJustify,
  BotMessageSquare,
  ChartColumnIncreasing,
  Database,
  LogOut,
  LucideIcon,
  Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import titleize from "titleize"

const mocks = [
  {
    title: "Bảng điều khiển",
    href: APP_ROUTES.ADMIN.ROOT,
    icon: ChartColumnIncreasing
  },
  {
    title: "Quản lý dữ liệu",
    href: APP_ROUTES.ADMIN.DATA,
    icon: Database
  },
  {
    title: "Quản lý chatbot",
    href: APP_ROUTES.ADMIN.CHATBOT,
    icon: BotMessageSquare
  },
  //   {
  //     title: "Quản lý người dùng",
  //     href: APP_ROUTES.ADMIN.USERS,
  //     icon: UserCog2
  //   },
  {
    title: "Cài đặt hệ thống",
    href: "/admin/settings",
    icon: Settings
  }
] as {
  title: string
  href: string
  icon: LucideIcon
}[]

type Props = {
  user: Admin
}

const AdminSidebar = ({ user }: Props) => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev)
  }

  const logout = () => {
    Cookies.remove(COOKIES_KEY.ACCESS_TOKEN)
    Cookies.remove(COOKIES_KEY.REFRESH_TOKEN)
    window.location.href = APP_ROUTES.AUTH.LOGIN
  }

  return (
    <motion.div
      className={cn("flex flex-col bg-gray-100 p-4 dark:bg-slate-700/50")}
      initial={{ width: "20rem" }}
      animate={{ width: isExpanded ? "20rem" : "auto" }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex items-center gap-2'>
        {isExpanded && <div className='flex-1 text-lg font-bold'>Xin chào, {user.name}</div>}
        <Button isIconOnly onPress={toggleSidebar}>
          <AlignJustify />
        </Button>
      </div>
      <Divider className='my-4' />
      {isExpanded && (
        <div className='mt-4 flex justify-center'>
          <AppLogo />
        </div>
      )}

      <div className={cn("h-full flex-1 space-y-1", isExpanded && "mt-12")}>
        {mocks.map((mock) => {
          const active = pathname === mock.href
          return (
            <Link
              key={mock.href}
              href={mock.href}
              className={cn(
                "flex gap-2 rounded-lg p-3 font-semibold transition-colors hover:bg-background",
                active && "bg-background text-primary"
              )}
            >
              {<mock.icon size={20} />}
              {isExpanded && mock.title}
            </Link>
          )
        })}
      </div>
      <Divider className='my-4' />
      <div className='flex items-center gap-2'>
        {isExpanded && (
          <div className='flex-1'>
            <p className='font-bold'>
              {titleize(user.name)} | {titleize(user.role)}
            </p>
            <p className='text-xs text-foreground-400'>{user.email}</p>
          </div>
        )}
        <Button onPress={logout} isIconOnly={!isExpanded}>
          {isExpanded ? "Đăng xuất" : <LogOut size={20} />}
        </Button>
      </div>
    </motion.div>
  )
}

export default AdminSidebar
