import { COOKIES_KEY, ENV_CONFIG } from "@/_lib/constants"
import { BaseResponse } from "@/_lib/types"
import { convertToQuery } from "@/_lib/utils"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

type Options = {
  params?: Record<string, any>
  body?: any
  cookies?: () => ReadonlyRequestCookies
} & RequestInit

const _FETCH = async <T extends any>(url: string, options?: Options): Promise<BaseResponse<T>> => {
  const isFormData = options?.body instanceof FormData
  const opts = {
    ...options,
    body: isFormData ? options?.body : JSON.stringify(options?.body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers
    },
    credentials: "include"
  } as Options

  //@ts-ignore
  isFormData && opts.headers && delete opts.headers["Content-Type"]

  try {
    const apiUrl = url.startsWith("http") ? url : `${ENV_CONFIG.BE_URL}${url}`

    const queries = opts.params
      ? Object.keys(opts.params as {})
          .map((key) => (opts.params?.[key] ? convertToQuery(key, opts.params?.[key]) : []))
          .join("&")
      : ""

    const res = await fetch(`${apiUrl}?${queries}`, opts)
    const data = await res.json()
    return data as BaseResponse<T>
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message ?? error?.message,
      statusCode: error?.response?.data?.statusCode ?? error?.status ?? 500
    } as BaseResponse<T>
  }
}

const FETCH_WITH_TOKEN = async <T extends any>(url: string, options?: Options) => {
  const cookieData = options?.cookies?.()
  const accessToken = cookieData?.get(COOKIES_KEY.ACCESS_TOKEN)
  return await _FETCH<T>(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: "Bearer " + accessToken?.value
    } as HeadersInit
  })
}

export const FETCH = {
  get: <T extends any>(url: string, options?: Options) =>
    FETCH_WITH_TOKEN<T>(url, { ...options, method: "GET", cookies: options?.cookies }),
  post: <T extends any, Y = {}>(url: string, data?: T, options?: Options) =>
    FETCH_WITH_TOKEN<Y>(url, { ...options, body: data as any, method: "POST", cookies: options?.cookies }),
  put: <T extends any, Y = {}>(url: string, data: T, options?: Options) =>
    FETCH_WITH_TOKEN<Y>(url, { ...options, body: data as any, method: "PUT", cookies: options?.cookies }),
  delete: <T extends any>(url: string, options?: Options) =>
    FETCH_WITH_TOKEN<T>(url, { ...options, method: "DELETE", cookies: options?.cookies })
}
