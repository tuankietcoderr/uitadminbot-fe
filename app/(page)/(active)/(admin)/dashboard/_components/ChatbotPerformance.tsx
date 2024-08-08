import { cn } from "@nextui-org/react"
import MultipleStatisticsItem from "./MultipleStatisticsItem"

const ChatbotPerformance = () => {
  return (
    <div className='rounded border border-foreground-200 p-4'>
      <h3 className='text-2xl font-semibold text-secondary'>Hiệu suất chatbot</h3>
      <p>Đây là những chỉ số chính đo lường hiệu suất của chatbot trong quá trình tương tác với người dùng</p>
      <div className='mt-4 space-y-4'>
        <MultipleStatisticsItem
          title='Thời gian phản hồi'
          description='Thời gian trung bình mà chatbot phản hồi lại người dùng sau mỗi tin nhắn'
        >
          <StatisticItem label='Thời gian phản hồi nhanh nhất' value={1} unit='giây' className='text-success' />
          <StatisticItem label='Thời gian phản hồi trung bình' value={2} unit='giây' className='text-warning' />
          <StatisticItem label='Thời gian phản hồi chậm nhất' value={3} unit='giây' className='text-danger' />
        </MultipleStatisticsItem>
        <MultipleStatisticsItem
          title='Tỉ lệ hài lòng'
          description='Tỉ lệ người dùng hài lòng sau khi tương tác với chatbot'
        >
          <StatisticItem label='Thích' value={70} unit='%' className='text-success' />
          <StatisticItem label='Bình thường' value={10} unit='%' className='text-warning' />
          <StatisticItem label='Không thích' value={20} unit='%' className='text-danger' />
        </MultipleStatisticsItem>
        <MultipleStatisticsItem
          title='Tỉ lệ thành công'
          description='Tỉ lệ chatbot hoàn thành trả lời mà không gặp lỗi'
        >
          <StatisticItem label='Thành công' value={80} unit='%' className='text-success' />
          <StatisticItem label='Người dùng huỷ' value={10} unit='%' className='text-warning' />
          <StatisticItem label='Gặp sự cố' value={10} unit='%' className='text-danger' />
        </MultipleStatisticsItem>
      </div>
    </div>
  )
}

type ItemProps = {
  label: string
  value: number
  unit: string
  className?: string
}

const StatisticItem = ({ label, unit, value, className }: ItemProps) => {
  return (
    <div className={cn(className)}>
      <h3 className='text-center text-2xl font-semibold'>
        <span className='text-4xl'>{value}</span> {unit}
      </h3>
      <p className='text-center font-bold'>{label}</p>
    </div>
  )
}

export default ChatbotPerformance
