import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { BaseResponse } from "@/_lib/types"
import { UploadResponseDto } from "./upload.dto"

export const uploadService = {
  upload: async (form: FormData, setUploadProgress?: (p: number) => void) => {
    return await apiClient.post<BaseResponse<UploadResponseDto>>(API.UPLOADER.UPLOAD, form, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / (progressEvent.total || 1)) * 100)
        setUploadProgress?.(progress)
      },
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  delete: async (fileId: string) => {
    return await apiClient.delete<BaseResponse<UploadResponseDto>>(API.UPLOADER.DELETE(fileId))
  }
}
