/* eslint-disable tailwindcss/no-custom-classname */
import { EContentType } from "@/_lib/enums"
import { Message, MessageContent } from "@/_lib/types/schema"
import { formatDate } from "@/_lib/utils"
import { useDislikeMessageMutation, useLikeMessageMutation } from "@/_services/message"
import { useMessageStore } from "@/_store"
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google"
import { Avatar, Button, Divider, Link } from "@nextui-org/react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Markdown from "react-markdown"
import { toast } from "sonner"
import Generating from "./Generating"

type Props = {
  message: Message
  canShowActions?: boolean
}

const ChatItem = ({ message, canShowActions = true }: Props) => {
  const { answer, question, _id, createdAt, isDisliked, isLiked, room } = message

  const hasAnswer = !!answer

  return (
    <div className='flex flex-col gap-4' id={message._id}>
      <Question {...question} sentAt={formatDate(message.createdAt!, "LLLL")} />
      {hasAnswer ? (
        <Answer
          {...answer}
          canShowActions={canShowActions}
          _id={_id!}
          isLiked={!!isLiked}
          isDisliked={!!isDisliked}
          responseTime={message.responseTime!}
        />
      ) : (
        <Generating />
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
    <div className='flex w-full max-w-[60rem] flex-row-reverse gap-4 self-end'>
      <Avatar size='sm' />
      <div className='flex flex-1 flex-col items-end gap-2'>
        {hasExtra &&
          (contentType === EContentType.IMAGE ? (
            <Image
              src={extra?.file!}
              alt=''
              width={200}
              height={200}
              className='size-40 max-w-2xl rounded border border-foreground-200 object-cover'
            />
          ) : contentType === EContentType.DOCUMENT ? (
            <Link showAnchorIcon href={extra?.file} target='_blank'>
              {extra?.file?.split("/").pop()}
            </Link>
          ) : null)}
        <div className='chat-item-question flex w-fit flex-col gap-2 rounded-lg bg-primary-600 p-4 dark:bg-primary-100'>
          <p className='leading-relaxed text-white'>{content}</p>

          <dd className='text-xs text-gray-300 dark:text-gray-400'>vào {sentAt}</dd>
        </div>
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
  _id,
  canShowActions,
  responseTime
}: MessageContent & {
  isLiked: boolean
  isDisliked: boolean
  _id: string
  canShowActions: boolean
  responseTime: number
}) => {
  const { likeMessage, dislikeMessage } = useMessageStore()
  const likeMessageMutation = useLikeMessageMutation()
  const dislikeMessageMutation = useDislikeMessageMutation()

  const handleLikeMessage = () => {
    likeMessage(_id, !isLiked)
    sendGTMEvent({
      event: "message_like",
      value: isLiked ? "unlike" : "like"
    })
    sendGAEvent("event", "message_like", {
      value: isLiked ? "unlike" : "like"
    })
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
    sendGTMEvent({
      event: "message_dislike",
      value: isLiked ? "undislike" : "dislike"
    })
    sendGAEvent("event", "message_dislike", {
      value: isLiked ? "undislike" : "dislike"
    })
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
    <div className='flex w-fit min-w-20 max-w-[60rem] gap-4'>
      <div className='size-10 rounded-full border bg-white p-1 dark:border-gray-700'>
        <Image src={"/logo.png"} width={40} height={40} alt='' className='object-contain' />
      </div>
      <div className='mr-12 flex flex-1 flex-col gap-4 rounded-lg bg-gray-100 p-4 dark:bg-slate-700/50'>
        {responseTime > 0 && (
          <p className='text-xs text-slate-500'>
            Đã trả lời trong <b>{responseTime / 1000}</b> giây
          </p>
        )}
        <div className='prose max-w-none dark:prose-invert prose-a:font-bold prose-a:text-primary'>
          <Markdown
            components={{
              //@ts-ignore
              a: ({ node, ...props }) => <Link {...props} showAnchorIcon isExternal underline='always' />
            }}
          >
            {content}
          </Markdown>
        </div>
        {canShowActions && <Divider />}
        {canShowActions && (
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
            <Button variant='bordered' size='sm'>
              Phản hồi
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatItem
