import { useCreateSuggestionMutation } from "@/_services/suggestion"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react"
import { WholeWord } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ModalContentProps = {
  visible: boolean
  onClose: () => void
  onCreated: () => void
}

const formSchema = z.object({
  question: z.string().min(1, "Vui lòng gợi ý")
})

type FormSchema = z.infer<typeof formSchema>

const CreateSuggestionModal = ({ onClose: _onClose, visible, onCreated }: ModalContentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })
  const createSuggestionMutation = useCreateSuggestionMutation()
  const isUploading = createSuggestionMutation.isPending

  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: visible,
    onClose: _onClose
  })

  const onSubmit = (data: FormSchema) => {
    createSuggestionMutation.mutate(data.question, {
      onSuccess: () => {
        _onClose()
        onCreated()
        toast.success("Thêm gợi ý thành công")
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' isDismissable={!isUploading} closeButton={<></>}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2>Thêm gợi ý mới</h2>
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  {...register("question")}
                  isInvalid={!!errors.question}
                  errorMessage={errors.question?.message}
                  placeholder='Nhập gợi ý'
                  startContent={<WholeWord size={20} />}
                  isDisabled={isUploading}
                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose} type='button' isDisabled={isUploading}>
                  Hủy bỏ
                </Button>
                <Button color='primary' type='submit' isLoading={isUploading} isDisabled={isUploading}>
                  {isUploading ? "Đang tạo..." : "Tạo"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateSuggestionModal
