"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { IPaginate } from "@/_lib/interfaces"
import { Asset } from "@/_lib/types/schema"
import { assetService } from "@/_services/asset"
import { useUploadMutation } from "@/_services/upload"
import { Progress, Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { AssetColumnKey, assetColumns } from "../_mock/assetColumn.mock"
import RenderCellAsset from "./RenderCellData"

const CreateLinkModal = dynamic(() => import("./CreateLinkModal"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

const AssetListData = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [paginationRes, setPaginationRes] = useState<IPaginate>({
    page: 1
  })

  const pickFileRef = useRef<HTMLInputElement | null>(null)

  const searchParams = useSearchParams()
  const type = searchParams.get("selected_tab") || "pdf"
  const isLink = type === "link"
  const [isFetching, setIsFetching] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(keyword, 500)
  const [showModal, setShowModal] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadMutation = useUploadMutation(setUploadProgress, true)
  const isUploading = uploadMutation.isPending

  const fetchNext = useCallback(
    async (page: number) => {
      setIsFetching(true)
      try {
        const res = await assetService.getAll(type, {
          keyword: debouncedKeyword,
          page
        })
        const resData = res.data
        if (resData.success) {
          setAssets(resData.data!)
          setPaginationRes(resData)
        }
      } catch (err: any) {
        toast.error("Có lỗi xảy ra khi tải dữ liệu", {
          description: err.response?.data?.message ?? err.message
        })
      } finally {
        setIsFetching(false)
      }
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
      duration: Infinity,
      description: <Progress value={uploadProgress} className='w-full' />,
      classNames: {
        content: "w-full"
      }
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
    if (isLink) {
      setShowModal(true)
      return
    }
    pickFileRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        accept='.pdf,.xls,.xlsx'
        // accept='.jpg,.jpeg,.png,.pdf,.xls,.xlsx'
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
        searchKeys={["name"] as AssetColumnKey[]}
        searchPlaceholder={`Tìm kiếm ${isLink ? "liên kết" : "tệp tin"}`}
        onClickCreate={onClickCreate}
        createText={`Tải lên ${isLink ? "liên kết" : "tệp"} mới`}
        showExport={false}
        bodyProps={{
          emptyContent: `Không tìm thấy ${isLink ? "liên kết" : "tệp tin"} nào`,
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
        <CreateLinkModal
          visible={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          onCreated={() => fetchNext(1)}
        />
      )}
    </>
  )
}
export default AssetListData
