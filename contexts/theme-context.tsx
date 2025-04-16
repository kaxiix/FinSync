"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useTheme } from "next-themes"

type CustomThemeContextType = {
  applyCustomTheme: (theme: string) => void
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined)

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme()

  // Apply custom theme from localStorage on initial load
  useEffect(() => {
    const savedCustomTheme = localStorage.getItem("custom-theme")

    if (savedCustomTheme) {
      document.documentElement.classList.remove("theme-monochrome", "theme-neon", "theme-pastel", "theme-sunset")
      document.documentElement.classList.add(`theme-${savedCustomTheme}`)
      setTheme("dark") // Base theme is dark
    }
  }, [setTheme])

  const applyCustomTheme = (theme: string) => {
    if (theme === "monochrome" || theme === "neon" || theme === "pastel" || theme === "sunset") {
      document.documentElement.classList.remove("theme-monochrome", "theme-neon", "theme-pastel", "theme-sunset")
      document.documentElement.classList.add(`theme-${theme}`)
      setTheme("dark") // Base theme is dark
      localStorage.setItem("custom-theme", theme)
    } else {
      document.documentElement.classList.remove("theme-monochrome", "theme-neon", "theme-pastel", "theme-sunset")
      setTheme(theme)
      localStorage.removeItem("custom-theme")
    }
  }

  return <CustomThemeContext.Provider value={{ applyCustomTheme }}>{children}</CustomThemeContext.Provider>
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext)
  if (context === undefined) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider")
  }
  return context
}
