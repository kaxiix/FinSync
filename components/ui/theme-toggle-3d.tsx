"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Sun, Moon } from "lucide-react"

interface ThemeToggle3DProps {
  className?: string
}

export function ThemeToggle3D({ className = "" }: ThemeToggle3DProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  // Add spring physics
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  return (
    <motion.div
      className={`relative h-16 w-16 cursor-pointer perspective-1000 ${className}`}
      onClick={toggleTheme}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="relative h-full w-full rounded-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Day side */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-300"
          style={{
            backfaceVisibility: "hidden",
            zIndex: isDark ? 0 : 1,
          }}
          animate={{
            rotateY: isDark ? 180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative flex h-10 w-10 items-center justify-center"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 10, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
          >
            <Sun className="h-8 w-8 text-yellow-400 drop-shadow-md" strokeWidth={1.5} />
            {/* Sun rays */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-0 h-2 w-0.5 origin-bottom"
                  style={{
                    backgroundColor: "rgba(255, 255, 0, 0.7)",
                    rotate: `${i * 30}deg`,
                    translateX: "-50%",
                  }}
                  animate={{ scaleY: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Night side */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#111] to-[#000]"
          style={{
            backfaceVisibility: "hidden",
            zIndex: isDark ? 1 : 0,
            rotateY: 180,
          }}
          animate={{
            rotateY: isDark ? 0 : 180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative flex h-10 w-10 items-center justify-center">
            <Moon className="h-7 w-7 text-slate-200" strokeWidth={1.5} />
            {/* Stars */}
            <AnimatePresence>
              {isHovered &&
                [...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-white"
                    style={{
                      top: `${10 + Math.random() * 80}%`,
                      left: `${10 + Math.random() * 80}%`,
                      opacity: 0.7,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                      repeatType: "loop",
                    }}
                  />
                ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Edge glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: isDark ? "0 0 15px 2px rgba(56, 189, 248, 0.3)" : "0 0 15px 2px rgba(56, 189, 248, 0.3)",
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}
