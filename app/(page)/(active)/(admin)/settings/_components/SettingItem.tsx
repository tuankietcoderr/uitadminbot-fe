import { LucideIcon } from "lucide-react"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  title: string
  description: string
  icon: LucideIcon
}>

const SettingItem = ({ description, icon: Icon, title, children }: Props) => {
  return (
    <div>
      <div className='flex items-center gap-2'>
        <div className='flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-500'>
          {<Icon size={20} />}
        </div>
        <div>
          <h3 className='font-semibold'>{title}</h3>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default SettingItem
