import { Link as UILink } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { APP_ROUTES } from "./_lib/constants"
const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <h1 className='text-center text-2xl font-semibold'>Trang mà bạn đang truy cập không được tìm thấy</h1>
      <Image src={"/404.svg"} alt='404' width={400} height={400} priority />
      <UILink as={Link} href={APP_ROUTES.ROOT} underline='always' className='p-8'>
        Trở về trang chủ
      </UILink>
    </div>
  )
}

export default NotFound
