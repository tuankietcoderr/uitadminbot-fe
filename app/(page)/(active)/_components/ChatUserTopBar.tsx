import { AppLogo, ThemeSwitcher } from "@/_components"
import { APP_ROUTES } from "@/_lib/constants"
import { Button } from "@nextui-org/react"
import Link from "next/link"

type Props = {}

const ChatUserTopBar = ({}: Props) => {
  return (
    <header className='flex items-center justify-between gap-8 border-b-1 border-gray-100 bg-white/50 bg-clip-padding p-4 backdrop-blur-lg dark:border-gray-700 dark:bg-slate-700/50'>
      <AppLogo />
      <div className='flex items-center gap-4'>
        <Button radius='full' as={Link} href={APP_ROUTES.ADMIN.ROOT} color='primary'>
          Dành cho quản trị viên
        </Button>
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default ChatUserTopBar
