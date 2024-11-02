export const ENV_CONFIG = {
  BE_URL: process.env.NEXT_PUBLIC_BE_API_URL!,
  AI_URL: process.env.NEXT_PUBLIC_AI_API_URL!,
  PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL!,
  HTTP_TIMEOUT: Number(process.env.NEXT_PUBLIC_HTTP_TIMEOUT! || 300000) // 5 minutes
}
