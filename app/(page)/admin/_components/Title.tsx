import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{}>

const Title = ({ children }: Props) => {
  return <h2 className='text-4xl font-extrabold text-primary'>{children}</h2>
}

export default Title
