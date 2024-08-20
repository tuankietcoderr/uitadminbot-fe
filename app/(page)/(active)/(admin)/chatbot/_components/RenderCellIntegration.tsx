"use client"

import { Integration } from "@/_lib/types/schema"
import { formatDate } from "@/_lib/utils"
import { useBanIntegrationMutation, useDeleteIntegrationMutation } from "@/_services/integration"
import { Button, cn, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react"
import { Key, useState } from "react"
import { toast } from "sonner"
import { IntegrationColumnKey } from "../_mock/integrationColumn.mock"

type Props = {
  integration: Integration
  columnKey: Key
  onDeleteCell: (id: string) => void
  onBanCell: (id: string) => void
}

const RenderCellIntegration = ({ integration, columnKey, onDeleteCell, onBanCell }: Props) => {
  const cellValue = integration[columnKey as keyof Integration]
  const [showPopover, setShowPopover] = useState(false)
  const banIntegrationMutation = useBanIntegrationMutation()
  const deleteIntegrationMutation = useDeleteIntegrationMutation()
  const isLoading = deleteIntegrationMutation.isPending
  const isBanLoading = banIntegrationMutation.isPending

  const handleBan = () => {
    banIntegrationMutation.mutate(integration._id!, {
      onSuccess: () => {
        toast.success(`Tích hợp ${integration.name} đã được ${integration.isBanned ? "mở khóa" : "khóa"}`)
        onBanCell(integration._id!)
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  const handleDelete = () => {
    deleteIntegrationMutation.mutate(integration._id!, {
      onSuccess: () => {
        toast.success(`Tích hợp ${integration.name} đã được xoá`)
        onDeleteCell(integration._id!)
        setShowPopover(false)
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  switch (columnKey as IntegrationColumnKey) {
    case "url":
      return (
        <Link href={integration.url} target='_blank' showAnchorIcon>
          {integration.url}
        </Link>
      )
    case "status":
      return (
        <p className={cn(integration.isBanned ? "text-danger" : "text-success")}>
          {integration.isBanned ? "Đã khóa" : "Đang hoạt động"}
        </p>
      )
    case "createdAt":
      return <dd>{formatDate(integration.createdAt!, "LLLL")}</dd>
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            color='warning'
            title={integration.isBanned ? "Mở khóa" : "Khóa"}
            onClick={handleBan}
            size='sm'
            isLoading={isBanLoading}
            isDisabled={isBanLoading}
          >
            {integration.isBanned ? <LockKeyholeOpen size={20} /> : <LockKeyhole size={20} />}
          </Button>
          <Popover
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
                  Bạn có chắc muốn xoá tích hợp <b>{integration.name}</b> không?
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
          </Popover>
        </div>
      )
    default:
      return <>{cellValue}</>
  }
}
export default RenderCellIntegration
