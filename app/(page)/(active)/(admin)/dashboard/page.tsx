import { DatePicker } from "@nextui-org/react"
import Title from "../_components/Title"
import ChatbotPerformance from "./_components/ChatbotPerformance"
import TotalPie from "./_components/TotalPie"
import UserEngagement from "./_components/UserEngagement"

const page = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <Title>Bảng điều khiển</Title>
        <div className='flex w-full max-w-md gap-2'>
          <DatePicker label='Từ ngày' labelPlacement='outside' />
          <DatePicker label='Đến ngày' labelPlacement='outside' />
        </div>
      </div>
      <div className='mt-4 grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] items-stretch gap-4'>
        <UserEngagement />
        <ChatbotPerformance />
      </div>
      <TotalPie />
      {/* <LatestMessages />
      <ErrorCauses /> */}
    </div>
  )
}

export default page
