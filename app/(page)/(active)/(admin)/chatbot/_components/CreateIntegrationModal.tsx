import { useCreateIntegrationMutation } from "@/_services/integration"
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
import { Link, WholeWord } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ModalContentProps = {
  visible: boolean
  onClose: () => void
  onCreated: () => void
}

const formSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  url: z.string().url("URL không hợp lệ")
})

type FormSchema = z.infer<typeof formSchema>

const CreateIntegrationModal = ({ onClose: _onClose, visible, onCreated }: ModalContentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })
  const createIntegrationMutation = useCreateIntegrationMutation()
  const isUploading = createIntegrationMutation.isPending

  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: visible,
    onClose: _onClose
  })

  const onSubmit = (data: FormSchema) => {
    createIntegrationMutation.mutate(data, {
      onSuccess: () => {
        _onClose()
        onCreated()
        toast.success("Thêm liên kết thành công")
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
              <h2>Thêm tích hợp mới</h2>
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  {...register("name")}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                  placeholder='Nhập tên tích hợp'
                  startContent={<WholeWord size={20} />}
                  isDisabled={isUploading}
                  autoFocus
                />
                <Input
                  {...register("url")}
                  isInvalid={!!errors.url}
                  errorMessage={errors.url?.message}
                  placeholder='Nhập URL tích hợp'
                  startContent={<Link size={20} />}
                  isDisabled={isUploading}
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

export default CreateIntegrationModal
