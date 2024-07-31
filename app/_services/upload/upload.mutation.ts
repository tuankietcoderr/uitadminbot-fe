import { useMutation } from "@tanstack/react-query"
import { uploadService } from "./upload.service"

export const useUploadMutation = (setUploadProgress?: (p: number) => void) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)

      const res = await uploadService.upload(formData, setUploadProgress)

      return res.data
    }
  })
}

export const useDeleteUploadMutation = () => {
  return useMutation({
    mutationFn: async (fileId: string) => {
      const res = await uploadService.delete(fileId)
      return res.data
    }
  })
}
