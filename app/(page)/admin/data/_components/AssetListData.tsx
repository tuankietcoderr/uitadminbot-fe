"use client"
import { CustomTable } from "@/_components"
import { IPaginate } from "@/_lib/interfaces"
import { Asset } from "@/_lib/types/schema"
import { assetService } from "@/_services/asset"
import { useUploadMutation } from "@/_services/upload"
import { Spinner } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { assetColumns } from "../_mock/assetColumn.mock"
import RenderCellAsset from "./RenderCellData"

const AssetListData = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const pickFileRef = useRef<HTMLInputElement | null>(null)

  const searchParams = useSearchParams()
  const type = searchParams.get("selected_tab") || "pdf"
  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)

  const uploadMutation = useUploadMutation()
  const isUploading = uploadMutation.isPending

  const fetchNext = useCallback(
    async (page: number) => {
      setIsFetching(true)
      const res = await assetService.getAll(type, debouncedKeyword, page)
      const resData = res.data
      if (resData.success) {
        setAssets(resData.data!)
        setPaginationRes(resData)
      }
      setIsFetching(false)
    },
    [debouncedKeyword, type]
  )

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const onDeleteCell = (id: string) => {
    setAssets((prev) => prev.filter((item) => item._id !== id))
  }

  useEffect(() => {
    fetchNext(1)
  }, [fetchNext])

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      handleUploadImage(file)
    }
  }

  const handleUploadImage = async (file: File) => {
    if (!file) return

    toast.loading("Đang tải lên tệp tin", {
      duration: Infinity
    })
    uploadMutation.mutate(file, {
      onSuccess: ({ data }) => {
        toast.dismiss()
        toast.success("Tệp tin tải lên thành công")
        fetchNext(1)
      },
      onError: (err: any) => {
        toast.dismiss()
        toast.error("Có lỗi xảy ra khi tải tệp tin lên", {
          description: err.response?.data?.message ?? err.message
        })
      }
    })
  }

  const onClickCreate = () => {
    pickFileRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        accept='.jpg,.jpeg,.png,.pdf,.xls,.xlsx'
        ref={pickFileRef}
        onChange={onPickImage}
        className='hidden'
        onClick={(e: any) => (e.target.value = "")}
      />
      <CustomTable
        showCheckbox={false}
        dataSource={assets || []}
        columns={assetColumns}
        RenderCell={(asset, columnKey) => (
          <RenderCellAsset asset={asset} columnKey={columnKey} onDeleteCell={onDeleteCell} />
        )}
        searchKeys={["name"]}
        searchPlaceholder='Tìm kiếm tệp tin'
        onClickCreate={onClickCreate}
        createText='Tải lên tệp mới'
        showExport={false}
        bodyProps={{
          emptyContent: "Không tìm thấy tệp tin nào",
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
    </>
  )
}
export default AssetListData
