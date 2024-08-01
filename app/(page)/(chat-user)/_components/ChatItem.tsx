import { EContentType } from "@/_lib/enums"
import { Message, MessageContent } from "@/_lib/types/schema"
import { formatDate } from "@/_lib/utils"
import { useDislikeMessageMutation, useLikeMessageMutation } from "@/_services/message"
import { useMessageStore } from "@/_store"
import { Avatar, Button, Divider, Link, Spinner } from "@nextui-org/react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useCallback } from "react"
import Markdown from "react-markdown"
import { toast } from "sonner"

type Props = {
  message: Message
}

const ChatItem = ({ message }: Props) => {
  const { answer, question, _id, createdAt, isDisliked, isLiked, room } = message

  const hasAnswer = !!answer

  const AnsweringLoader = useCallback(() => {
    return (
      <div className='flex items-center gap-2'>
        <Spinner size='sm' color='default' />
        <p className='pointer-events-none select-none text-foreground-400'>
          Chatbot đang tìm kiếm câu trả lời cho bạn...
        </p>
      </div>
    )
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <Question {...question} sentAt={formatDate(message.createdAt!, "LLLL")} />
      {hasAnswer ? (
        <Answer {...answer} _id={_id!} isLiked={!!isLiked} isDisliked={!!isDisliked} />
      ) : (
        <AnsweringLoader />
      )}
    </div>
  )
}

const Question = ({
  content,
  contentType,
  extra,
  sentAt
}: MessageContent & {
  sentAt?: string
}) => {
  const hasExtra = !!extra

  return (
    <div className='flex gap-2'>
      <Avatar size='sm' />
      <div className='flex w-fit flex-col gap-2 rounded-lg bg-gray-100 p-4 dark:bg-slate-700/50'>
        <p>{content}</p>
        {hasExtra &&
          (contentType === EContentType.IMAGE ? (
            <Image
              src={extra?.file!}
              alt=''
              width={200}
              height={200}
              className='size-full max-w-2xl rounded border border-foreground-200 object-cover'
            />
          ) : contentType === EContentType.DOCUMENT ? (
            <Link showAnchorIcon href={extra?.file} target='_blank'>
              {extra?.file?.split("/").pop()}
            </Link>
          ) : null)}
        <dd className='text-xs text-gray-500 dark:text-gray-400'>{sentAt}</dd>
      </div>
    </div>
  )
}

const Answer = ({
  content,
  contentType,
  extra,
  isDisliked,
  isLiked,
  _id
}: MessageContent & {
  isLiked: boolean
  isDisliked: boolean
  _id: string
}) => {
  const { likeMessage, dislikeMessage } = useMessageStore()
  const likeMessageMutation = useLikeMessageMutation()
  const dislikeMessageMutation = useDislikeMessageMutation()

  const handleLikeMessage = () => {
    likeMessage(_id, !isLiked)
    likeMessageMutation.mutate(_id, {
      onSuccess: ({ data }) => {
        console.log("liked")
      },
      onError: (err: any) => {
        toast.error("Có lỗi xảy ra", {
          description: err.response?.data?.message ?? err.message
        })
      }
    })
  }
  const handleDislikeMessage = () => {
    dislikeMessage(_id, !isDisliked)
    dislikeMessageMutation.mutate(_id, {
      onSuccess: ({ data }) => {
        console.log("disliked")
      },
      onError: (err: any) => {
        toast.error("Có lỗi xảy ra", {
          description: err.response?.data?.message ?? err.message
        })
      }
    })
  }

  return (
    <div className='flex gap-2'>
      <Avatar
        size='sm'
        src='/logo.png'
        classNames={{
          base: "bg-white border-1 border-foreground-200 p-1"
        }}
      />
      <div className='flex w-fit flex-col gap-4 rounded-lg bg-gray-100 p-4 dark:bg-slate-700/50'>
        <div className='prose dark:prose-invert'>
          <Markdown>{content}</Markdown>
        </div>
        <Divider />
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <p className='flex-1'>Bạn có hài lòng với câu trả lời này không?</p>
            <div className='space-x-2'>
              <Button
                size='sm'
                variant='light'
                color={isLiked ? "success" : "default"}
                isIconOnly
                onPress={handleLikeMessage}
              >
                <ThumbsUp size={16} />
              </Button>
              <Button
                size='sm'
                variant='light'
                color={isDisliked ? "danger" : "default"}
                isIconOnly
                onPress={handleDislikeMessage}
              >
                <ThumbsDown size={16} />
              </Button>
            </div>
          </div>
          <Button variant='bordered'>Phản hồi</Button>
        </div>
      </div>
    </div>
  )
}

export default ChatItem
