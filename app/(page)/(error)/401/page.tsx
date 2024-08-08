"use client"
import { useTheme } from "next-themes"
import Image from "next/image"

const Page = () => {
  const { theme } = useTheme()
  const isLight = theme === "light"
  return (
    <>
      <h1 className='text-center text-2xl font-semibold'>Trang mà bạn đang truy cập không được phép truy cập</h1>
      <Image src={isLight ? `/401_light.svg` : "/401_dark.svg"} alt='401' width={400} height={400} priority />
    </>
  )
}

export default Page
