"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ThemeSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themeOptions = [
    {
      id: "dark",
      name: "Default Dark",
      description: "The default dark blue theme",
      preview: "theme-preview-default",
    },
    {
      id: "light",
      name: "Light",
      description: "Light mode for bright environments",
      preview: "bg-white",
    },
    {
      id: "monochrome",
      name: "Monochrome",
      description: "Clean black and white aesthetic",
      preview: "theme-preview-monochrome",
    },
    {
      id: "neon",
      name: "Neon",
      description: "Vibrant cyberpunk-inspired colors",
      preview: "theme-preview-neon",
    },
    {
      id: "pastel",
      name: "Pastel",
      description: "Soft, soothing color palette",
      preview: "theme-preview-pastel",
    },
    {
      id: "sunset",
      name: "Sunset",
      description: "Warm orange and gold tones",
      preview: "theme-preview-sunset",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleThemeChange = (themeId: string) => {
    if (themeId === "monochrome" || themeId === "neon" || themeId === "pastel" || themeId === "sunset") {
      document.documentElement.classList.remove("theme-monochrome", "theme-neon", "theme-pastel", "theme-sunset")
      document.documentElement.classList.add(`theme-${themeId}`)
      setTheme("dark") // Base theme is dark

      // Save theme preference to localStorage
      localStorage.setItem("custom-theme", themeId)
    } else {
      document.documentElement.classList.remove("theme-monochrome", "theme-neon", "theme-pastel", "theme-sunset")
      setTheme(themeId)

      // Remove custom theme from localStorage
      localStorage.removeItem("custom-theme")
    }
  }

  const handleBackClick = () => {
    router.push("/settings")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center px-6 py-6">
          <Button variant="ghost" size="icon" className="mr-4 rounded-full" onClick={handleBackClick}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Theme Settings</h1>
            <p className="text-muted-foreground">Customize your app appearance</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 px-6 py-8">
        <motion.div className="grid gap-6" variants={container} initial="hidden" animate="show">
          {themeOptions.map((option) => (
            <motion.div key={option.id} variants={item} className="theme-card">
              <div className={`theme-preview ${option.preview}`}></div>
              <div className="theme-card-content">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{option.name}</h3>
                  {((theme === option.id && !["monochrome", "neon", "pastel", "sunset"].includes(option.id)) ||
                    (document.documentElement.classList.contains(`theme-${option.id}`) &&
                      ["monochrome", "neon", "pastel", "sunset"].includes(option.id))) && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300">{option.description}</p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30"
                    onClick={() => handleThemeChange(option.id)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 rounded-lg border border-border/50 bg-card/30 p-4 text-sm">
          <p className="mb-2 font-medium">About themes</p>
          <p className="text-muted-foreground">
            Choose from our curated selection of themes to personalize your experience. Each theme offers a unique
            visual style while maintaining readability and usability.
          </p>
        </div>
      </div>
    </div>
  )
}
