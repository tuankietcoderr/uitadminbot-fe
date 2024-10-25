"use client"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Tháng 1",
    NoAU: 2400
  },
  {
    name: "Tháng 2",
    NoAU: 1398
  },
  {
    name: "Tháng 3",
    NoAU: 9800
  },
  {
    name: "Tháng 4",
    NoAU: 3908
  },
  {
    name: "Tháng 5",
    NoAU: 4800
  },
  {
    name: "Tháng 6",
    NoAU: 3800
  },
  {
    name: "Tháng 7",
    NoAU: 4100
  },
  {
    name: "Tháng 8",
    NoAU: 6123
  },
  {
    name: "Tháng 9",
    NoAU: 4200
  },
  {
    name: "Tháng 10",
    NoAU: 500
  },
  {
    name: "Tháng 11",
    NoAU: 240
  },
  {
    name: "Tháng 12",
    NoAU: 300
  }
]

const UserActivityChart = () => {
  return (
    <div className='mt-4 h-80'>
      <h3 className='text-center font-bold'>Biểu đồ hoạt động người dùng</h3>
      <ResponsiveContainer width='100%' height='100%' className='mt-4'>
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          {/* <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' /> */}
          <Line type='monotone' dataKey='NoAU' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default UserActivityChart
