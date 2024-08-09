"use client"
import { AppLogo } from "@/_components"
import { APP_ROUTES, COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { Admin } from "@/_lib/types/schema"
import { useMessageStore } from "@/_store"
import { Button, cn } from "@nextui-org/react"
import { motion } from "framer-motion"
import Cookies from "js-cookie"
import {
  AlignJustify,
  BotMessageSquare,
  BrainCog,
  ChartColumnIncreasing,
  Database,
  LogOut,
  LucideIcon,
  Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import titleize from "titleize"
import ChatActions from "./ChatActions"

const mocks = [
  {
    title: "Bảng điều khiển",
    href: APP_ROUTES.ADMIN.ROOT,
    icon: ChartColumnIncreasing,
    visibility: [ERole.ADMIN, ERole.SUPER_ADMIN]
  },
  {
    title: "Quản lý dữ liệu",
    href: APP_ROUTES.ADMIN.DATA,
    icon: Database,
    visibility: [ERole.ADMIN, ERole.SUPER_ADMIN]
  },
  {
    title: "Quản lý chatbot",
    href: APP_ROUTES.ADMIN.CHATBOT,
    icon: BrainCog,
    visibility: [ERole.SUPER_ADMIN]
  },
  //   {
  //     title: "Quản lý người dùng",
  //     href: APP_ROUTES.ADMIN.USERS,
  //     icon: UserCog2
  //   },
  {
    title: "Cài đặt hệ thống",
    href: APP_ROUTES.ADMIN.SETTINGS,
    icon: Settings,
    visibility: [ERole.ADMIN, ERole.SUPER_ADMIN]
  }
] as {
  title: string
  href: string
  icon: LucideIcon
  visibility?: ERole[]
}[]

type Props = {
  user: Admin | null
}

const AdminSidebar = ({ user }: Props) => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)
  const isAdmin = user && user.role !== ERole.CHAT_USER
  const { messages } = useMessageStore()

  const reverseMessages = useMemo(() => [...messages].reverse(), [messages])

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev)
  }

  const scrollToMessage = (messageId: string) => {
    const message = document.getElementById(messageId)
    if (message) {
      message.scrollIntoView({ behavior: "smooth", block: "center" })
      const question = message.querySelector(".chat-item-question")
      if (question) {
        question.classList.add("relative")
        const elem = document.createElement("div")
        elem.classList.add("animate-pulse", "absolute", "-inset-1", "border-2", "border-primary", "rounded-lg")

        question.appendChild(elem)
        setTimeout(() => {
          elem.remove()
        }, 5000)
      }
    }
  }

  const isNavActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    const hrefWithoutQuery = href.split("?")[0]
    return href !== "/" && pathname.includes(hrefWithoutQuery)
  }

  const logout = () => {
    Cookies.remove(COOKIES_KEY.ACCESS_TOKEN)
    Cookies.remove(COOKIES_KEY.REFRESH_TOKEN)
    window.location.href = APP_ROUTES.AUTH.LOGIN
  }

  return (
    <motion.div
      className={cn("flex flex-col border-r bg-gray-100 dark:border-gray-700 dark:bg-slate-700/50")}
      initial={{ width: "20rem" }}
      animate={{ width: isExpanded ? "20rem" : "auto" }}
      transition={{ duration: 0.3 }}
    >
      <div className='sticky top-0 flex items-center gap-2 border-b bg-gray-100 p-4 dark:border-gray-700 dark:bg-slate-700/50'>
        {isExpanded && <div className='flex-1 text-lg font-bold'>Xin chào, {isAdmin ? user.name : "Khách"}</div>}
        <Button isIconOnly onPress={toggleSidebar} variant='light'>
          <AlignJustify />
        </Button>
      </div>

      <div className={cn("h-full flex-1 space-y-1 overflow-y-auto p-4", isExpanded && "pt-12")}>
        <div>
          <div className='relative'>
            <Link
              href={APP_ROUTES.ROOT}
              className={cn(
                "flex items-center gap-2 rounded-lg p-3 font-semibold transition-colors hover:bg-background",
                isNavActive(APP_ROUTES.ROOT) && "bg-background text-primary"
              )}
            >
              {<BotMessageSquare size={20} />}
              {isExpanded && <p className='flex-1'>Chatbot</p>}
            </Link>
            {isExpanded && <ChatActions />}
          </div>

          {!isAdmin && isExpanded && messages.length > 0 && (
            <>
              <p className='mb-2 mt-4 px-3 font-semibold text-foreground-500'>Các câu hỏi đã hỏi ({messages.length})</p>
              {reverseMessages.map((message) => {
                return (
                  <button
                    key={message._id}
                    className={
                      "flex w-full gap-2 rounded-lg p-3 font-semibold transition-colors hover:bg-gray-200 dark:hover:bg-slate-900"
                    }
                    onClick={() => scrollToMessage(message._id!)}
                  >
                    <p key={message._id} className='line-clamp-2 text-left'>
                      {message.question.content}
                    </p>
                  </button>
                )
              })}
            </>
          )}
        </div>
        {mocks.map((mock) => {
          const active = isNavActive(mock.href)
          return (
            mock.visibility?.includes(user?.role!) && (
              <div key={mock.href}>
                <Link
                  key={mock.href}
                  href={mock.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg p-3 font-semibold transition-colors hover:bg-background",
                    active && "bg-background text-primary"
                  )}
                >
                  {<mock.icon size={20} />}
                  {isExpanded && <p className='flex-1'>{mock.title}</p>}
                </Link>
              </div>
            )
          )
        })}
      </div>
      {isAdmin && (
        <div className='flex items-center gap-2 border-t bg-gray-100 p-4 dark:border-gray-700 dark:bg-slate-700/50'>
          {isExpanded && (
            <div className='flex-1'>
              <p
                className='line-clamp-1 font-bold'
                title={`${titleize(user.name)} | ${titleize(user.role.replace(/_/g, " "))}`}
              >
                {titleize(user.name)} | {titleize(user.role.replace(/_/g, " "))}
              </p>
              <p className='text-xs text-foreground-400'>{user.email}</p>
            </div>
          )}
          <Button onPress={logout} isIconOnly={!isExpanded}>
            {isExpanded ? "Đăng xuất" : <LogOut size={20} />}
          </Button>
        </div>
      )}
      {isAdmin && isExpanded && (
        <div className='flex justify-center border-t py-4 dark:border-gray-700'>
          <AppLogo size='md' />
        </div>
      )}
      {isExpanded && <p className='py-2 text-center text-xs text-foreground-400'>© 2024 bởi DPS2K</p>}
    </motion.div>
  )
}

export default AdminSidebar
