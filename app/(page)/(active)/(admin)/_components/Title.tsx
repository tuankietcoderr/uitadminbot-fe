import { cn } from "@nextui-org/react"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  className?: string
}>

const Title = ({ children, className }: Props) => {
  return <h2 className={cn("text-4xl font-extrabold text-primary", className)}>{children}</h2>
}

export default Title
