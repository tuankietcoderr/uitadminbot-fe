"use client"
import { CustomTable } from "@/_components"
import { IPaginate } from "@/_lib/interfaces"
import { Admin } from "@/_lib/types/schema"
import { authService } from "@/_services/auth"
import { Spinner } from "@nextui-org/react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { AccountColumnKey, accountColumns } from "../_mock/accountColumn.mock"
import RenderCellAccount from "./RenderCellAccount"

const AccountListData = () => {
  const [accounts, setAccounts] = useState<Admin[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const fetchNext = useCallback(
    async (page: number) => {
      setIsFetching(true)
      try {
        const res = await authService.getAdmins({
          keyword: debouncedKeyword,
          page
        })
        const resData = res.data
        if (resData.success) {
          setAccounts(resData.data!)
          setPaginationRes(resData)
        }
      } catch (error: any) {
        toast.error("Có lỗi xảy ra", {
          description: error.response?.data?.message || error.message
        })
      } finally {
        setIsFetching(false)
      }
    },
    [debouncedKeyword]
  )

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const onDeleteCell = (id: string) => {
    setAccounts((prev) => prev.filter((item) => item._id !== id))
  }

  const onBanCell = (id: string) => {
    setAccounts((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            isBanned: !item.isBanned
          }
        }
        return item
      })
    )
  }

  useEffect(() => {
    fetchNext(1)
  }, [fetchNext])

  const onClickCreate = () => {}

  return (
    <div className='mt-4'>
      <CustomTable
        showCheckbox={false}
        dataSource={accounts || []}
        columns={accountColumns}
        onClickCreate={onClickCreate}
        RenderCell={(account, columnKey) => (
          <RenderCellAccount
            account={account}
            columnKey={columnKey}
            onDeleteCell={onDeleteCell}
            onBanCell={onBanCell}
          />
        )}
        searchKeys={["email", "name"] as AccountColumnKey[]}
        searchPlaceholder='Tìm kiếm tài khoản'
        showExport={false}
        createText='Tạo tài khoản'
        bodyProps={{
          emptyContent: `Không tìm thấy tài khoản nào`,
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
export default AccountListData
