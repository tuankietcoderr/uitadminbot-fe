"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { IPaginate } from "@/_lib/interfaces"
import { Integration } from "@/_lib/types/schema"
import { integrationService } from "@/_services/integration"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { IntegrationColumnKey, integrationColumns } from "../_mock/integrationColumn.mock"
import RenderCellIntegration from "./RenderCellIntegration"

const CreateIntegrationModal = dynamic(() => import("./CreateIntegrationModal"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

const IntegrationListData = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const fetchNext = useCallback(
    async (page: number) => {
      setIsFetching(true)
      try {
        const res = await integrationService.getAll({
          keyword: debouncedKeyword,
          page
        })
        const resData = res.data
        if (resData.success) {
          setIntegrations(resData.data!)
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
    setIntegrations((prev) => prev.filter((item) => item._id !== id))
  }

  const onBanCell = (id: string) => {
    setIntegrations((prev) =>
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

  const onClickCreate = () => {
    setShowModal(true)
  }

  return (
    <div className='mt-4'>
      <CustomTable
        showCheckbox={false}
        dataSource={integrations || []}
        columns={integrationColumns}
        onClickCreate={onClickCreate}
        RenderCell={(integration, columnKey) => (
          <RenderCellIntegration
            integration={integration}
            columnKey={columnKey}
            onDeleteCell={onDeleteCell}
            onBanCell={onBanCell}
          />
        )}
        searchKeys={["email", "name"] as IntegrationColumnKey[]}
        searchPlaceholder='Tìm kiếm tích hợp'
        showExport={false}
        createText='Thêm tích hợp'
        bodyProps={{
          emptyContent: `Không tìm thấy tích hợp nào`,
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
      {showModal && (
        <CreateIntegrationModal
          visible={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          onCreated={() => fetchNext(1)}
        />
      )}
    </div>
  )
}
export default IntegrationListData
