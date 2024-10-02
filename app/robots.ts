import type { MetadataRoute } from "next"
import { ENV_CONFIG } from "./_lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/data/", "/chatbot/", "/settings/"]
    },
    sitemap: ENV_CONFIG.PRODUCTION_URL + "/sitemap.xml"
  }
}
