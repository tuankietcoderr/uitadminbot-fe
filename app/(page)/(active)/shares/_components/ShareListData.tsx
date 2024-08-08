"use client"
import { CustomTable } from "@/_components"
import { IPaginate } from "@/_lib/interfaces"
import { Share } from "@/_lib/types/schema"
import { shareService } from "@/_services/share"
import { Spinner } from "@nextui-org/react"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { ShareColumnKey, shareShareColumns } from "../_mock/shareColumn.mock"
import RenderCellShare from "./RenderCellShare"

const ShareListData = () => {
  const [shares, setShares] = useState<Share[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const fetchNext = useCallback(
    async (page: number) => {
      setIsFetching(true)
      const res = await shareService.getUserShares(debouncedKeyword, page)
      const resData = res.data
      if (resData.success) {
        setShares(resData.data!)
        setPaginationRes(resData)
      }
      setIsFetching(false)
    },
    [debouncedKeyword]
  )

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const onDeleteCell = (id: string) => {
    setShares((prev) => prev.filter((item) => item._id !== id))
  }

  useEffect(() => {
    fetchNext(1)
  }, [fetchNext])

  return (
    <div className='mt-4'>
      <CustomTable
        showCheckbox={false}
        topContent={<></>}
        dataSource={shares || []}
        columns={shareShareColumns}
        RenderCell={(share, columnKey) => (
          <RenderCellShare share={share} columnKey={columnKey} onDeleteCell={onDeleteCell} />
        )}
        searchKeys={["_id"] as ShareColumnKey[]}
        searchPlaceholder='Tìm kiếm tệp tin'
        showExport={false}
        showCreate={false}
        bodyProps={{
          emptyContent: `Không tìm thấy chia sẻ nào`,
          isLoading: isFetching,
          loadingContent: <Spinner />
        }}
        pagination={{
          page: paginationRes.page,
          totalPages: paginationRes.totalPages,
          onChangePage: fetchNext
        }}
        search={{
          keyword,
          onChangeKeyword
        }}
      />
    </div>
  )
}
export default ShareListData
