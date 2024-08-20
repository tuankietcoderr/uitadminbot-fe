import { PasswordInput } from "@/_components"
import { useCreateAdminMutation } from "@/_services/auth"
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
import { Key, Mail, WholeWord } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ModalContentProps = {
  visible: boolean
  onClose: () => void
  onCreated: () => void
}

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  name: z.string().min(1, "Tên không được để trống")
})

type FormSchema = z.infer<typeof formSchema>

const CreateAccountModal = ({ onClose: _onClose, visible, onCreated }: ModalContentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })
  const createAdminMutation = useCreateAdminMutation()
  const isUploading = createAdminMutation.isPending

  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: visible,
    onClose: _onClose
  })

  const onSubmit = (data: FormSchema) => {
    createAdminMutation.mutate(data, {
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
              <h2>Thêm tài khoản mới</h2>
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  {...register("name")}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                  placeholder='Nhập tên admin'
                  startContent={<WholeWord size={20} />}
                  isDisabled={isUploading}
                  autoFocus
                />
                <Input
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  placeholder='Nhập email admin'
                  startContent={<Mail size={20} />}
                  isDisabled={isUploading}
                />
                <PasswordInput
                  {...register("password")}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  placeholder='Nhập mật khẩu'
                  startContent={<Key size={20} />}
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

export default CreateAccountModal
