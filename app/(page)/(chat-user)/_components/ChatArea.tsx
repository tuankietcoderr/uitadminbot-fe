import { useChatContext } from "@/_context"
import { EContentType } from "@/_lib/enums"
import { useDeleteUploadMutation, useUploadMutation } from "@/_services/upload"
import { UploadResponseDto } from "@/_services/upload/upload.dto"
import { Button, CircularProgress, Input } from "@nextui-org/react"
import { Paperclip, Pause, SendHorizonal, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon"
import { toast } from "sonner"

type Props = {
  roomId: string
}

const ChatArea = ({ roomId }: Props) => {
  const { content, setContent, sendMessage, hasContent, inputRef, isSending, abortResponse, nativeScrollToBottom } =
    useChatContext()

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
    <div className='fixed inset-x-0 bottom-0 flex flex-col gap-4 border-t-1 border-gray-100 bg-white/50 bg-clip-padding p-4 leading-6 backdrop-blur-lg dark:border-gray-600 dark:bg-slate-700/50 md:px-[5%]'>
      {selectedFile && (
        <div className='relative w-full max-w-3xl self-center'>
          <div className='relative size-fit'>
            {contentType === EContentType.IMAGE ? (
              <Image
                src={selectedFile instanceof File ? URL.createObjectURL(selectedFile) : selectedFile.url}
                alt=''
                width={200}
                height={200}
                className='size-20 rounded border object-cover'
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
          accept='.jpg,.jpeg,.png,.gif,.bmp,.tiff,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.odt,.rtf'
          ref={pickImageRef}
          onChange={onPickImage}
          className='hidden'
          onClick={(e: any) => (e.target.value = "")}
        />
        <div className='relative w-full max-w-3xl'>
          <Input
            ref={inputRef}
            autoFocus
            placeholder='Thủ tục nhập học, cách lấy thẻ sinh viên,...'
            radius='full'
            size='lg'
            value={content}
            onValueChange={setContent}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            startContent={
              <Button size='md' radius='full' isIconOnly variant='light' onPress={() => pickImageRef.current?.click()}>
                <Paperclip size={24} />
              </Button>
            }
            endContent={
              <Button
                size='md'
                radius='full'
                isIconOnly
                variant='light'
                color={hasContent ? "primary" : "default"}
                onPress={isSending ? abortResponse : handleSendMessage}
              >
                {isSending ? <Pause size={24} /> : <SendHorizonal size={24} />}
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ChatArea
