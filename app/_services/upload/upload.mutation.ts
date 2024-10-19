import { useMutation } from "@tanstack/react-query"
import { uploadService } from "./upload.service"

export const useUploadMutation = (setUploadProgress?: (p: number) => void, isAdmin = false) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)

      const handler = isAdmin ? uploadService.adminUpload : uploadService.upload

      const res = await handler(formData, setUploadProgress)

      return res.data
    },
    retry: 1
  })
}

export const useUpLinkMutation = () => {
  return useMutation({
    mutationFn: async (url: string) => {
      const res = await uploadService.uploadLink(url)
      return res.data
    },
    retry: 1
  })
}

export const useDeleteLinkMutation = () => {
  return useMutation({
    mutationFn: async (public_id: string) => {
      const res = await uploadService.deleteLink(public_id)
      return res.data
    },
    retry: 1
  })
}

export const useDeleteUploadMutation = (isAdmin: boolean = false) => {
  return useMutation({
    mutationFn: async (fileId: string) => {
      const handler = isAdmin ? uploadService.adminDelete : uploadService.delete
      const res = await handler(fileId)
      return res.data
    },
    retry: 1
  })
}
