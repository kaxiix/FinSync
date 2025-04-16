"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLoading } from "@/contexts/loading-context"
import { AnimatedBackground } from "./animated-background"

export function AdvancedLoadingScreen() {
  const { isLoading } = useLoading()
  const [progress, setProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Loading phases with text and descriptions
  const loadingPhases = [
    { text: "Initializing FinX...", description: "Preparing your financial experience" },
    { text: "Loading market data...", description: "Fetching the latest financial information" },
    { text: "Analyzing your portfolio...", description: "Calculating insights and recommendations" },
    { text: "Optimizing performance...", description: "Fine-tuning your personalized dashboard" },
    { text: "Almost ready...", description: "Finalizing your FinX experience" },
  ]

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading || !isMounted) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 2
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return newProgress
      })
    }, 50)

    // Phase change interval
    const phaseInterval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % loadingPhases.length)
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
    }
  }, [isLoading, isMounted, loadingPhases.length])

  // Don't render anything during SSR
  if (!isMounted) return null

  // Don't render if not loading
  if (!isLoading) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background */}
          <AnimatedBackground />

          {/* Content container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <motion.div
              className="mb-12 flex items-center justify-center"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-cyan-500/30"
                  style={{
                    width: `${120 + i * 40}px`,
                    height: `${120 + i * 40}px`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              ))}

              {/* Logo container */}
              <motion.div
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg"
                animate={{
                  boxShadow: [
                    "0 0 20px 0px rgba(0, 191, 255, 0.3)",
                    "0 0 40px 10px rgba(0, 191, 255, 0.5)",
                    "0 0 20px 0px rgba(0, 191, 255, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <span className="text-3xl font-bold">FinX</span>

                {/* Orbiting dot */}
                <motion.div
                  className="absolute h-3 w-3 rounded-full bg-white shadow-lg"
                  animate={{
                    x: [0, 30, 0, -30, 0],
                    y: [30, 0, -30, 0, 30],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Loading text with animation */}
            <motion.div
              className="mb-8 text-center"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={loadingPhase}
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {loadingPhases[loadingPhase].text}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${loadingPhase}`}
                  className="mt-2 text-sm text-cyan-300/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {loadingPhases[loadingPhase].description}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Progress bar */}
            <div className="relative mb-2 h-1.5 w-64 overflow-hidden rounded-full bg-zinc-800/50 backdrop-blur-sm">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                style={{ width: `${progress}%` }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{ x: [-80, 320] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              className="text-sm font-medium text-cyan-300/70"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {Math.round(progress)}%
            </motion.p>

            {/* Data points animation */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 w-1 rounded-full bg-cyan-500"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
