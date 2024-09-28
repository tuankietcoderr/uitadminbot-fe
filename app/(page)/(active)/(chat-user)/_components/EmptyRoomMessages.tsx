import { useChatContext } from "@/_context"
import { useGetAllSuggestionsQuery } from "@/_services/suggestion"
import { Chip } from "@nextui-org/react"

const _questions = [
  "Cách lấy thẻ sinh viên",
  "Thủ tục nhập học",
  "Học phí",
  "Học bổng",
  "Chương trình học",
  "Học phần",
  "Điểm thi",
  "Các khoa đào tạo",
  "Các môn học",
  "Chương trình tiên tiến",
  "Phương thức xét tuyển",
  "Tuyển thẳng",
  "Hệ đào tạo",
  "Thông tin liên hệ"
]

const EmptyRoomMessages = ({ hasError = false }: { hasError?: boolean }) => {
  const { content, setContent, inputRef } = useChatContext()
  const getAllSuggestionQuery = useGetAllSuggestionsQuery(!hasError)

  const questions = hasError ? _questions : getAllSuggestionQuery.data?.data || []
  const isLoading = getAllSuggestionQuery.isLoading
  const isError = !getAllSuggestionQuery.data?.success

  const onChooseContent = (content: string) => {
    setContent(content)
    inputRef?.current?.focus()
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Các câu hỏi gợi ý</h1>
      {/* {isLoading ? (
        <Spinner size='lg' />
      ) : isError ? (
        <EmptyRoomMessages hasError />
      ) : ( */}
      <div className='flex flex-wrap gap-2'>
        {_questions.map((question, index) => (
          <Chip
            size='lg'
            key={index}
            color={content === question ? "primary" : "default"}
            variant={"bordered"}
            className='transition-colors sm:hover:cursor-pointer sm:hover:border-primary sm:hover:bg-primary sm:hover:text-white'
            onClick={() => onChooseContent(question)}
          >
            {question}
          </Chip>
        ))}
      </div>
      {/* )} */}
    </div>
  )
}

export default EmptyRoomMessages
