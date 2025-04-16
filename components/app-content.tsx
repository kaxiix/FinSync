"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLoading } from "@/contexts/loading-context"
import { AIChat } from "@/components/ui/ai-chat"
import { Navbar } from "@/components/ui/navbar"
import { AdvancedLoadingScreen } from "@/components/ui/advanced-loading-screen"

export function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Return a placeholder during SSR to avoid hydration issues
    return <div className="min-h-screen bg-black">{children}</div>
  }

  return (
    <>
      {/* The loading screen is now inside AppContent, after useLoading is available */}
      <AdvancedLoadingScreen />

      <AnimatePresence mode="wait">
        <motion.div
          key={isLoading ? "loading" : "content"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mobile-app-container"
        >
          {children}
          {!isLoading && <Navbar />}
          {!isLoading && <AIChat />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
