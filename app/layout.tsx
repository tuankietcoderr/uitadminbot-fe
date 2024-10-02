import type { Metadata, ResolvingMetadata } from "next"
import { Nunito } from "next/font/google"
import { default as meta } from "../public/meta.json"
import { ENV_CONFIG } from "./_lib/constants"
import "./globals.css"
import Providers from "./providers"

const nunito = Nunito({ subsets: ["vietnamese"], preload: true, fallback: ["sans-serif"] })

export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    ...meta,
    metadataBase: new URL(ENV_CONFIG.PRODUCTION_URL),
    openGraph: {
      images: ["/og_bg.jpg", ...previousImages]
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi' suppressHydrationWarning>
      <body className={`${nunito.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
