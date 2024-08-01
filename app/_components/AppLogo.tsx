import { APP_ROUTES } from "@/_lib/constants"
import Link from "next/link"

type Props = {}

const AppLogo = ({}: Props) => {
  return (
    <Link href={APP_ROUTES.ROOT}>
      <h1 className='text-xl font-extrabold text-primary transition-all dark:invert md:text-3xl'>UITAdminBot</h1>
    </Link>
  )
}

export default AppLogo
