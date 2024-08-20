import { Button, Checkbox, Input, Textarea } from "@nextui-org/react"
import { useState } from "react"

const MaintainSetting = () => {
  const [checked, setChecked] = useState(false)
  return (
    <div className='space-y-4'>
      <div className='flex items-center py-4'>
        <Checkbox isSelected={checked} onValueChange={setChecked}>
          Bật chế độ bảo trì
        </Checkbox>
      </div>
      <div>
        <Textarea
          isDisabled={!checked}
          disableAnimation
          disableAutosize
          classNames={{
            input: "resize-y min-h-40"
          }}
          placeholder='Nhập nội dung thông báo'
          label='Nội dung thông báo'
        />
      </div>
      <div className='flex gap-4'>
        <div className='flex flex-1 flex-col items-start justify-start gap-2'>
          <label htmlFor='start-time' className='font-semibold'>
            Thời gian bắt đầu
          </label>
          <Input id='start-time' type='datetime-local' isDisabled={!checked} />
        </div>
        <div className='flex flex-1 flex-col items-start justify-start gap-2'>
          <label htmlFor='end-time' className='font-semibold'>
            Thời gian kết thúc
          </label>
          <Input id='end-time' type='datetime-local' isDisabled={!checked} />
        </div>
      </div>
      <Button color='primary' variant='solid' disabled={!checked} className=''>
        Áp dụng
      </Button>
    </div>
  )
}

export default MaintainSetting
