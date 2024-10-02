import { useChatContext } from "@/_context"
import { EContentType } from "@/_lib/enums"
import { useDeleteUploadMutation, useUploadMutation } from "@/_services/upload"
import { UploadResponseDto } from "@/_services/upload/upload.dto"
import data from "@emoji-mart/data"
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google"
import { Button, CircularProgress, Popover, PopoverContent, PopoverTrigger, Spinner, Textarea } from "@nextui-org/react"
import { Paperclip, SendHorizonal, Smile, X } from "lucide-react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRef, useState } from "react"
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon"
import { toast } from "sonner"

const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => <Spinner size='sm' color='primary' />
})

type Props = {
  roomId: string
}

const ChatArea = ({ roomId }: Props) => {
  const { content, setContent, sendMessage, hasContent, inputRef, isSending, abortResponse, nativeScrollToBottom } =
    useChatContext()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { theme } = useTheme()

  const pickImageRef = useRef<HTMLInputElement | null>(null)

  const [selectedFile, setSelectedFile] = useState<File | UploadResponseDto | null>(null)
  const [contentType, setContentType] = useState<EContentType>(EContentType.TEXT)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const uploadMutation = useUploadMutation(setUploadProgress)
  const deleteUploadMutation = useDeleteUploadMutation()

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      const fileExt = file.name.split(".").pop() || ""
      setSelectedFile(file)
      handleUploadImage(file)
      const matchImageExt = /(jpe?g|png|gif|bmp|webp|svg)$/i
      setContentType(matchImageExt.test(fileExt) ? EContentType.IMAGE : EContentType.DOCUMENT)
      inputRef?.current?.focus()
    }
  }

  const handleUploadImage = async (file: File) => {
    if (!file) return

    uploadMutation.mutate(file, {
      onSuccess: ({ data }) => {
        setSelectedFile(data)
      },
      onError: (err: any) => {
        toast.error("Có lỗi xảy ra khi tải tệp tin lên", {
          description: err.response?.data?.message ?? err.message
        })
      }
    })
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setContentType(EContentType.TEXT)
    const file = selectedFile as UploadResponseDto
    deleteUploadMutation.mutate(file.publicId, {})
  }

  const handleSendMessage = () => {
    setShowEmojiPicker(false)
    sendGTMEvent({
      event: "send_message",
      value: content
    })
    sendGAEvent("event", "send_message", {
      value: content
    })
    if (!hasContent) return
    if (selectedFile instanceof File) return
    sendMessage({
      room: roomId,
      question: {
        content,
        contentType,
        extra: selectedFile ? { file: selectedFile.url } : undefined
      }
    })
    setSelectedFile(null)
  }

  return (
    <div className='flex flex-col gap-4 border-t-1 border-gray-100 bg-white/50 bg-clip-padding p-4 leading-6 backdrop-blur-lg dark:border-gray-600 dark:bg-slate-700/50'>
      {selectedFile && (
        <div className='relative ml-14 w-full'>
          <div className='relative size-fit'>
            {contentType === EContentType.IMAGE ? (
              <Image
                src={selectedFile instanceof File ? URL.createObjectURL(selectedFile) : selectedFile.url}
                alt=''
                width={200}
                height={200}
                className='size-20 rounded border border-foreground-200 object-cover'
              />
            ) : (
              <div className='flex items-center justify-center gap-4 rounded border border-foreground-200 bg-gray-100 p-4 dark:bg-slate-700/50'>
                {!(selectedFile instanceof File) && (
                  <div className='size-6'>
                    <FileIcon
                      extension={selectedFile.format}
                      {...defaultStyles[selectedFile.format as DefaultExtensionType]}
                    />
                  </div>
                )}
                <div>
                  <p>{selectedFile instanceof File ? selectedFile.name : selectedFile.originalFilename}</p>
                </div>
              </div>
            )}
            {selectedFile instanceof File && (
              <div className='absolute inset-0 flex items-center justify-center rounded bg-white/40'>
                <div className='flex flex-col items-center gap-2'>
                  <CircularProgress value={uploadProgress} size='sm' color='primary' strokeWidth={3} />
                </div>
              </div>
            )}
            {!(selectedFile instanceof File) && (
              <button
                className='absolute right-1 top-1 rounded-full border bg-white p-1 shadow-sm hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-gray-800'
                onClick={handleClearFile}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}
      <div className='flex justify-center'>
        <input
          type='file'
          accept='.jpg,.jpeg,.png,.pdf,.xls,.xlsx'
          ref={pickImageRef}
          onChange={onPickImage}
          className='hidden'
          onClick={(e: any) => (e.target.value = "")}
        />
        <div className='relative flex w-full gap-4'>
          <Button radius='full' isIconOnly variant='light' onPress={() => pickImageRef.current?.click()}>
            <Paperclip size={24} />
          </Button>
          <div className='relative flex-1'>
            <Textarea
              ref={inputRef}
              autoFocus
              placeholder='Thủ tục nhập học, cách lấy thẻ sinh viên,...'
              radius='sm'
              size='lg'
              value={content}
              onValueChange={setContent}
              minRows={2}
              maxRows={6}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              endContent={
                <Popover showArrow placement='top-end'>
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      variant='light'
                      size='sm'
                      radius='full'
                      onPress={() => setShowEmojiPicker((prev) => !prev)}
                    >
                      <Smile size={20} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='p-0'>
                    <Picker
                      data={data}
                      locale='vi'
                      theme={theme}
                      onEmojiSelect={(e: any) => {
                        const icon = e.native as string
                        setContent(content + icon)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              }
            />
          </div>

          <Button
            size='md'
            radius='full'
            isIconOnly
            variant='light'
            color={hasContent ? "primary" : "default"}
            onPress={handleSendMessage}
            isDisabled={isSending || !hasContent}
          >
            <SendHorizonal size={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatArea
