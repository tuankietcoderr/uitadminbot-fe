"use client"

import { Asset } from "@/_lib/types/schema"
import { formatDate } from "@/_lib/utils"
import { useDeleteLinkMutation, useDeleteUploadMutation } from "@/_services/upload"
import { Button, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { ArrowDownToLine, ExternalLink, Trash2 } from "lucide-react"
import { Key, useState } from "react"
import { toast } from "sonner"
import { AssetColumnKey } from "../_mock/assetColumn.mock"

type Props = {
  asset: Asset
  columnKey: Key
  onDeleteCell: (id: string) => void
}

const RenderCellAsset = ({ asset, columnKey, onDeleteCell }: Props) => {
  const cellValue = asset[columnKey as keyof Asset]
  const [showPopover, setShowPopover] = useState(false)

  const isLink = asset.assetType === "link"

  const deleteAssetMutation = isLink ? useDeleteUploadMutation(true) : useDeleteLinkMutation()
  const isLoading = deleteAssetMutation.isPending

  const handleDelete = () => {
    deleteAssetMutation.mutate(asset.publicId, {
      onSuccess: () => {
        toast.success("Xoá tệp tin thành công")
        onDeleteCell(asset._id!)
        setShowPopover(false)
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  switch (columnKey as AssetColumnKey) {
    case "name":
      return <p>{asset.originalFilename}</p>
    case "uploader":
      return <p>{asset.uploader.name}</p>
    case "createdAt":
      return <dd>{formatDate(asset.createdAt!, "LLLL")}</dd>
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={Link}
            download
            rel='noopener noreferrer'
            target='_blank'
            href={asset.url}
          >
            {isLink ? <ExternalLink size={20} /> : <ArrowDownToLine size={20} />}
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
                  Bạn có chắc chắn muốn xoá tệp tin <b>{asset.originalFilename}</b> không?
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
export default RenderCellAsset
