import { APP_ROUTES } from "@/_lib/constants"
import { Link as UILink } from "@nextui-org/react"
import Link from "next/link"

const layout = ({ children }: any) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      {children}
      <UILink as={Link} href={APP_ROUTES.ROOT} underline='always' className='p-8'>
        Trở về trang chủ
      </UILink>
    </div>
  )
}

export default layout
