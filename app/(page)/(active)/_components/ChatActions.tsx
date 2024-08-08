import { APP_ROUTES } from "@/_lib/constants"
import { useCreateShareLinkMutation } from "@/_services/share"
import { Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react"
import { Ellipsis, List, Share2, Trash2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { toast } from "sonner"

const ChatActions = () => {
  const createShareLinkMutation = useCreateShareLinkMutation()
  const isLoading = createShareLinkMutation.isPending
  const pathname = usePathname()

  const handleCreateShareLink = () => {
    toast.loading("Đang tạo liên kết chia sẻ", {
      duration: Infinity,
      description: "Vui lòng chờ trong giây lát..."
    })
    createShareLinkMutation.mutate(undefined, {
      onSuccess: ({ data }) => {
        toast.dismiss()
        toast.success("Liên kết chia sẻ đã được tạo")
        const a = document.createElement("a")
        a.href = APP_ROUTES.SHARE.ID(data)
        a.target = "_blank"
        a.click()
        a.remove()
      },
      onError: (err: any) => {
        toast.dismiss()
        toast.error("Có lỗi xảy ra khi tạo liên kết chia sẻ", {
          description: err.response?.data?.message ?? err.message
        })
      }
    })
  }

  const isNavActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    const hrefWithoutQuery = href.split("?")[0]
    return href !== "/" && pathname.includes(hrefWithoutQuery)
  }

  return (
    <div className='absolute inset-y-0 right-2 self-center'>
      <Dropdown showArrow>
        <DropdownTrigger className='z-10 flex items-center justify-center'>
          <Button isIconOnly size='sm' variant='light'>
            <Ellipsis size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection title='Hành động' showDivider>
            <DropdownItem
              key={APP_ROUTES.SHARE.ROOT}
              startContent={<List size={16} />}
              as={Link}
              href={APP_ROUTES.SHARE.ROOT}
              className={cn(isNavActive(APP_ROUTES.SHARE.ROOT) && "text-primary")}
            >
              <p>Các cuộc trò chuyện đã chia sẻ</p>
            </DropdownItem>
            <DropdownItem startContent={<Share2 size={16} />} onPress={handleCreateShareLink}>
              <p>Chia sẻ cuộc trò chuyện</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title='Nâng cao'>
            <DropdownItem startContent={<Trash2 size={16} className='text-danger' />}>
              <p className='text-danger'>Xoá cuộc trò chuyện</p>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default ChatActions
