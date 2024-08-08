import { APP_ROUTES } from "@/_lib/constants"
import { cn } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"

type Props = {
  size?: "sm" | "md" | "lg"
}

const AppLogo = ({ size = "lg" }: Props) => {
  const sizeMap = {
    sm: 8,
    md: 14,
    lg: 20
  }

  return (
    <Link href={APP_ROUTES.ROOT}>
      <Image
        src={"/logo_text.svg"}
        alt='UITAdminBot'
        width={200}
        height={50}
        title='UITAdminBot'
        aria-label='UITAdminBot'
        className={cn("h-auto")}
        style={{ width: `${sizeMap[size]}rem` }}
      />
    </Link>
  )
}

export default AppLogo
