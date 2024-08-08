"use client"
import { Share } from "@/_lib/types/schema"
import { formatDate } from "@/_lib/utils"
import { useCancelShareMutation } from "@/_services/share"
import { Button } from "@nextui-org/react"
import { Check, Copy, Flag, Share2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  share: Share
  isOwner: boolean
}

const TopInfo = ({ share, isOwner }: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  const cancelShareMutation = useCancelShareMutation()
  const isCancelling = cancelShareMutation.isPending
  const { isShared, isExpired } = share
  const router = useRouter()

  const onPressCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(window.location.href)
    let timeout = setTimeout(() => {
      setIsCopied(false)
      clearTimeout(timeout)
    }, 3000)
  }

  const onCancelShare = () => {
    cancelShareMutation.mutate(share._id!, {
      onSuccess: () => {
        toast.success(`${!isShared ? "Đăng" : "Huỷ"} chia sẻ thành công`, {
          position: "bottom-right"
        })
        router.refresh()
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message,
          position: "bottom-right"
        })
      }
    })
  }

  return (
    <header className='sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4 shadow-sm'>
      <div className='space-y-2'>
        <h1 className='text-xl font-bold'>Cuộc trò chuyện được chia sẻ với ID: {share._id}</h1>
        <dd className='text-sm'>
          <span className='font-semibold'>Ngày tạo:</span> {formatDate(share.createdAt!, "LLLL")}
        </dd>
        <dd className='text-sm'>
          <span className='font-semibold'>Ngày hết hạn:</span> {formatDate(share.expiredAt!, "LLLL")}
        </dd>
        {!isOwner && !isShared && <p className='text-sm text-danger'>Cuộc trò chuyện đã bị chủ sở hữu huỷ</p>}
        {isExpired && <p className='text-sm text-danger'>Cuộc trò chuyện đã hết hạn</p>}
      </div>
      {!isExpired && (
        <div className='flex items-center gap-2'>
          <Button
            startContent={<Copy size={20} />}
            variant='shadow'
            color={isCopied ? "success" : "primary"}
            onPress={onPressCopy}
            endContent={isCopied ? <Check size={20} /> : null}
          >
            {isCopied ? "Đã sao chép" : "Sao chép link"}
          </Button>
          {!isOwner ? (
            isShared && (
              <Button startContent={<Flag size={20} />} variant='light' color='danger'>
                Báo cáo
              </Button>
            )
          ) : (
            <Button
              startContent={isShared ? <Trash2 size={20} /> : <Share2 size={20} />}
              variant='light'
              color={isShared ? "danger" : "success"}
              onPress={onCancelShare}
              isLoading={isCancelling}
              isDisabled={isCancelling}
            >
              {share.isShared ? "Huỷ" : "Đăng"} chia sẻ
            </Button>
          )}
        </div>
      )}
    </header>
  )
}

export default TopInfo
