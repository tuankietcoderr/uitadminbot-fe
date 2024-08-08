import { Button } from "@nextui-org/react"
import { Download } from "lucide-react"

const DataSettings = () => {
  return (
    <div>
      <div className='flex items-center py-4'>
        <p className='flex-1'>Tải xuống dữ liệu</p>
        <Button startContent={<Download size={20} />} variant='bordered'>
          Tải xuống
        </Button>
      </div>
    </div>
  )
}

export default DataSettings
