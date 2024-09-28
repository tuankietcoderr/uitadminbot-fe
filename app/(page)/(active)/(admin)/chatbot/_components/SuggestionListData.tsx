"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { useGetAllSuggestionsQuery } from "@/_services/suggestion"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useState } from "react"
import { SuggestionColumnKey, suggestionColumns } from "../_mock/suggestionColumn.mock"
import RenderCellSuggestion from "./RenderCellSuggestion"

const CreateSuggestionModal = dynamic(() => import("./CreateSuggestionModal"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

const SuggestionListData = () => {
  const [page, setPage] = useState(1)

  const [keyword, setKeyword] = useState("")
  const [showModal, setShowModal] = useState(false)

  const getAllSuggestionQuery = useGetAllSuggestionsQuery()
  const isFetching = getAllSuggestionQuery.isRefetching
  const suggestions = getAllSuggestionQuery.data?.data || []
  const dataLength = suggestions.length
  const total = dataLength > 0 ? Math.ceil(dataLength / 10) : 1

  const fetchNext = () => {
    if (page < total) {
      setPage((prev) => prev + 1)
    }
  }

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const onDeleteCell = (id: string) => {
    getAllSuggestionQuery.refetch()
  }

  const onClickCreate = () => {
    setShowModal(true)
  }

  return (
    <div className='mt-4'>
      <CustomTable
        showCheckbox={false}
        dataSource={suggestions || []}
        columns={suggestionColumns}
        onClickCreate={onClickCreate}
        RenderCell={(suggestion, columnKey) => (
          <RenderCellSuggestion suggestion={suggestion} columnKey={columnKey} onDeleteCell={onDeleteCell} />
        )}
        rowKeyPattern='question'
        searchKeys={["question"] as SuggestionColumnKey[]}
        searchPlaceholder='Tìm kiếm gợi ý'
        showExport={false}
        createText='Tạo gợi ý'
        bodyProps={{
          emptyContent: `Không tìm thấy gợi nào`,
          isLoading: isFetching,
          loadingContent: <Spinner />
        }}
        pagination={{
          page,
          totalPages: total,
          onChangePage: fetchNext
        }}
      />
      {showModal && (
        <CreateSuggestionModal
          visible={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          onCreated={() => setPage(1)}
        />
      )}
    </div>
  )
}
export default SuggestionListData
