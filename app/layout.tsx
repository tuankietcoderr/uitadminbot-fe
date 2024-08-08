import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const nunito = Nunito({ subsets: ["vietnamese"], preload: true, fallback: ["sans-serif"] })

export const metadata: Metadata = {
  title: "UITAdminBot",
  description:
    "Một Chatbot hỗ trợ sinh viên trường UIT trong việc tra cứu thông tin, hỗ trợ học tập và giải đáp thắc mắc."
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
