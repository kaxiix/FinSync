"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle3D } from "./theme-toggle-3d"
import { Settings } from "lucide-react"

export function FloatingThemeToggle() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <motion.div
      className="fixed right-6 top-6 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow-md backdrop-blur-md"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Theme settings"
      >
        <Settings className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute right-0 top-12 rounded-xl bg-background/80 p-3 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <ThemeToggle3D />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
