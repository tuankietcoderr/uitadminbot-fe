"use client"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PropsWithChildren } from "react"
import { Toaster } from "sonner"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='light' storageKey='uitadminbot:theme'>
        <QueryClientProvider client={queryClient}>
          <main className='relative min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:to-black'>
            {children}
          </main>
        </QueryClientProvider>
      </NextThemesProvider>
      <Toaster position='top-right' className='z-[999]' richColors expand visibleToasts={5} duration={3000} />
    </NextUIProvider>
  )
}

export default Providers
