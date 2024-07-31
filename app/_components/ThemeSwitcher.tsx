"use client"

import { Button } from "@nextui-org/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <div>
      <Button isIconOnly onPress={toggleTheme} radius='full' variant='light'>
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </div>
  )
}

export default ThemeSwitcher
