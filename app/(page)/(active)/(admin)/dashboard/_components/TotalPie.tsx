"use client"
import SingleStatisticsItem from "./SingleStatisticsItem"

const TotalPie = () => {
  return (
    <div className='mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'>
      <SingleStatisticsItem
        title='Tổng số người dùng'
        description='Tổng số người dùng của hệ thống'
        value='1000'
        unit='người'
      />
      <SingleStatisticsItem title='Người dùng mới' description='Số lượng người dùng mới' value='200' unit='người' />
      <SingleStatisticsItem
        title='Tổng số phiên được tạo ra'
        description='Tổng số phiên tương tác của người dùng'
        value='5000'
        unit='phiên'
      />
      <SingleStatisticsItem
        title='Tổng số tin nhắn'
        description='Tổng số tin nhắn được gửi trong hệ thống'
        value='5000'
        unit='tin nhắn'
      />
      <SingleStatisticsItem
        title='Tổng số câu hỏi có chứa file'
        description='Tổng số câu hỏi mà người dùng gửi chứa file'
        value='500'
        unit='câu hỏi'
      />
      <SingleStatisticsItem
        title='Tổng thời gian phản hồi của chatbot'
        description='Tổng thời gian mà chatbot phản hồi lại người dùng'
        value='1000'
        unit='giây'
      />
      <SingleStatisticsItem
        title='Tổng số lượt thích câu trả lời của chatbot'
        description='Tổng số lượt thích mà người dùng đánh giá cho câu trả lời của chatbot'
        value='1000'
        unit='lượt'
      />
      <SingleStatisticsItem
        title='Tổng số lượt không thích câu trả lời của chatbot'
        description='Tổng số lượt không thích mà người dùng đánh giá cho câu trả lời của chatbot'
        value='1000'
        unit='lượt'
      />
    </div>
  )
}

export default TotalPie
