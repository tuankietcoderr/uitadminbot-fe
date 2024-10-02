import type { MetadataRoute } from "next"
import { ENV_CONFIG } from "./_lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const productionUrl = ENV_CONFIG.PRODUCTION_URL
  return [
    {
      url: productionUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    }
  ]
}
