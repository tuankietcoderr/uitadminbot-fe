import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  title: string
  description: string
}>

const MultipleStatisticsItem = ({ title, description, children }: Props) => {
  return (
    <div className='flex flex-col rounded border border-foreground-200 p-4'>
      <div className='flex-1 self-center'>
        <h3 className='text-center text-lg font-bold'>{title}</h3>
        <p className='max-w-sm text-center text-sm'>{description}</p>
      </div>
      <div className='mt-4 grid grid-cols-3 gap-4'>{children}</div>
    </div>
  )
}

export default MultipleStatisticsItem
