"use client"

import { useDeleteSuggestionMutation } from "@/_services/suggestion"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { Trash2 } from "lucide-react"
import { Key, useState } from "react"
import { toast } from "sonner"
import { SuggestionColumnKey } from "../_mock/suggestionColumn.mock"

type Props = {
  suggestion: {
    question: string
  }
  columnKey: Key
  onDeleteCell: (id: string) => void
}

const RenderCellSuggestion = ({ suggestion, columnKey, onDeleteCell }: Props) => {
  //@ts-ignore
  const cellValue = suggestion[columnKey as SuggestionColumnKey]
  const [showPopover, setShowPopover] = useState(false)
  const deleteSuggestionMutation = useDeleteSuggestionMutation()
  const isLoading = deleteSuggestionMutation.isPending

  const handleDelete = () => {
    deleteSuggestionMutation.mutate(suggestion.question, {
      onSuccess: () => {
        setShowPopover(false)
        onDeleteCell(suggestion.question)
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  switch (columnKey as SuggestionColumnKey) {
    case "actions":
      return (
        <div className='flex items-center gap-1'>
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
                  Bạn có chắc muốn xoá gợi ý<b>{suggestion.question}</b> không?
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
export default RenderCellSuggestion
