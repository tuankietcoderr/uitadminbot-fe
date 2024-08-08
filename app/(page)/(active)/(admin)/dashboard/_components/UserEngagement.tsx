"use client"

import SingleStatisticsItem from "./SingleStatisticsItem"
import UserActivityChart from "./UserActivityChart"

const UserEngagement = () => {
  return (
    <div className='flex flex-col rounded border border-foreground-200 p-4'>
      <h3 className='text-2xl font-semibold text-secondary'>Mức độ tương tác</h3>
      <p>Đây là những chỉ số chính đo lường mức độ tích cực của người dùng tương tác với chatbot</p>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <SingleStatisticsItem
          title='Thời lượng phiên'
          description={`Thời gian trung bình mà người dùng tương tác với chatbot trong mỗi phiên`}
          value='3'
          unit='giây'
        />
        <SingleStatisticsItem
          title='Số tin nhắn mỗi phiên'
          description='Số lượng tin nhắn trung bình mà người dùng gửi trong mỗi phiên'
          value='6'
          unit='tin nhắn'
        />
      </div>
      <div className='flex-1 pb-12'>
        <UserActivityChart />
      </div>
    </div>
  )
}

export default UserEngagement
