"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { AnimatedLogo } from "./animated-logo"

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  // Reset loading state when pathname changes
  useEffect(() => {
    let timeout: NodeJS.Timeout
    let interval: NodeJS.Timeout

    // Only show loading screen on initial load
    if (sessionStorage.getItem("initialLoadComplete")) {
      setLoading(false)
    } else {
      // Simulate loading progress
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress > 100 ? 100 : newProgress
        })
      }, 200)

      timeout = setTimeout(() => {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setLoading(false)
          sessionStorage.setItem("initialLoadComplete", "true")
        }, 500)
      }, 2000)
    }

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex flex-col items-center">
            {/* Animated particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-cyan-500"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.sin(i * 30 * (Math.PI / 180)) * 80,
                    y: Math.cos(i * 30 * (Math.PI / 180)) * 80,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Logo */}
            <AnimatedLogo size="lg" />

            {/* Progress bar */}
            <motion.div
              className="mt-12 h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </motion.div>

            {/* Loading text with typing effect */}
            <motion.div
              className="mt-6 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative h-6">
                {["Loading", "Initializing", "Preparing", "Almost ready"].map((text, index) => (
                  <motion.span
                    key={text}
                    className="absolute left-0 top-0 font-mono text-sm tracking-widest"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: progress > index * 25 && progress <= (index + 1) * 25 ? 1 : 0,
                      y: progress > index * 25 && progress <= (index + 1) * 25 ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {text}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      _
                    </motion.span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
