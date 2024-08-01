type Props = {
  title: string
  description?: string
  value: string
  unit?: string
}

const SingleStatisticsItem = ({ description, title, unit = "", value }: Props) => {
  return (
    <div className='flex flex-col rounded border border-foreground-200 p-4'>
      <div className='flex-1 self-center'>
        <h3 className='line-clamp-1 text-center text-lg font-bold' title={title}>
          {title}
        </h3>
        {description && <p className='max-w-sm text-center text-sm'>{description}</p>}
      </div>
      <h3 className='mt-4 text-center text-2xl font-semibold text-success'>
        <span className='text-4xl'>{value}</span> {unit}
      </h3>
    </div>
  )
}

export default SingleStatisticsItem
