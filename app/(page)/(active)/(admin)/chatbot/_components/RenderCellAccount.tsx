"use client"

import { Admin } from "@/_lib/types/schema"
import { formatDate } from "@/_lib/utils"
import { useBanAdminMutation } from "@/_services/auth"
import { Button, cn } from "@nextui-org/react"
import { LockKeyhole, LockKeyholeOpen } from "lucide-react"
import { Key, useState } from "react"
import { toast } from "sonner"
import { AccountColumnKey } from "../_mock/accountColumn.mock"

type Props = {
  account: Admin
  columnKey: Key
  onDeleteCell: (id: string) => void
  onBanCell: (id: string) => void
}

const RenderCellAccount = ({ account, columnKey, onDeleteCell, onBanCell }: Props) => {
  const cellValue = account[columnKey as keyof Admin]
  const [showPopover, setShowPopover] = useState(false)
  const banAdminMutation = useBanAdminMutation()
  const isLoading = false
  const isBanLoading = banAdminMutation.isPending

  const handleBan = () => {
    banAdminMutation.mutate(account._id!, {
      onSuccess: () => {
        toast.success(`Tài khoản ${account.email} đã được ${account.isBanned ? "mở khóa" : "khóa"}`)
        onBanCell(account._id!)
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  const handleDelete = () => {
    onDeleteCell(account._id!)
    setShowPopover(false)
  }

  switch (columnKey as AccountColumnKey) {
    case "status":
      return (
        <p className={cn(account.isBanned ? "text-danger" : "text-success")}>
          {account.isBanned ? "Đã khóa" : "Đang hoạt động"}
        </p>
      )
    case "createdAt":
      return <dd>{formatDate(account.createdAt!, "LLLL")}</dd>
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            color='warning'
            title={account.isBanned ? "Mở khóa" : "Khóa"}
            onClick={handleBan}
            size='sm'
            isLoading={isBanLoading}
            isDisabled={isBanLoading}
          >
            {account.isBanned ? <LockKeyholeOpen size={20} /> : <LockKeyhole size={20} />}
          </Button>
          {/* <Popover
            placement='right'
            isOpen={showPopover}
            onOpenChange={setShowPopover}
            showArrow
            isDismissable={!isLoading}
          >
            <PopoverTrigger>
              <Button isIconOnly variant='light' color='danger' size='sm'>
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2 self-end px-1 py-2'>
                <p className='font-bold'>Xác nhận xoá</p>
                <p>
                  Bạn có chắc muốn xoá tài khoản <b>{account.email}</b> không?
                </p>
                <div className='flex justify-end space-x-2'>
                  <Button color='danger' onClick={handleDelete} size='sm' isLoading={isLoading} isDisabled={isLoading}>
                    {isLoading ? "Đang xoá..." : "Xoá"}
                  </Button>
                  <Button color='default' onClick={() => setShowPopover(false)} size='sm'>
                    Không
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover> */}
        </div>
      )
    default:
      return <>{cellValue}</>
  }
}
export default RenderCellAccount
