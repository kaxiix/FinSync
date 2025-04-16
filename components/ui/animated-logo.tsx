"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function AnimatedLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Size mapping
  const sizes = {
    sm: { container: 32, text: "text-lg" },
    md: { container: 48, text: "text-2xl" },
    lg: { container: 64, text: "text-3xl" },
  }

  const selectedSize = sizes[size]

  return (
    <div className="relative flex items-center">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0"
          style={{
            width: selectedSize.container,
            height: selectedSize.container,
            borderRadius: selectedSize.container / 4,
            background: `conic-gradient(from 180deg at 50% 50%, 
              ${isDark ? "#333" : "#f0f0f0"} 0deg, 
              ${isDark ? "#111" : "#fff"} 180deg, 
              ${isDark ? "#333" : "#f0f0f0"} 360deg)`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        {/* Glowing effect */}
        <motion.div
          className="absolute"
          style={{
            width: selectedSize.container * 1.2,
            height: selectedSize.container * 1.2,
            borderRadius: selectedSize.container / 3,
            background: `radial-gradient(circle, 
              rgba(0, 191, 255, 0.2) 0%, 
              rgba(0, 191, 255, 0) 70%)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Logo text */}
        <motion.div
          className={`relative z-10 font-bold ${selectedSize.text} tracking-tighter`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="text-foreground">Fin</span>
          <motion.span
            className="text-cyan-500"
            animate={{
              textShadow: ["0 0 5px rgba(0,191,255,0)", "0 0 10px rgba(0,191,255,0.5)", "0 0 5px rgba(0,191,255,0)"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            X
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}
