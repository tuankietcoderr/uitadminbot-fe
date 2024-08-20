import { Metadata, ResolvingMetadata } from "next"
import { PropsWithChildren } from "react"

export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    metadataBase: new URL("https://uitadminbot.vercel.app"),
    openGraph: {
      images: ["/og_bg.jpg", ...previousImages]
    }
  }
}

const layout = ({ children }: PropsWithChildren) => {
  return children
}

export default layout
