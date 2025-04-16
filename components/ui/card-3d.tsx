"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface Card3DProps {
  children: ReactNode
  className?: string
  depth?: number
  backgroundColor?: string
  glareIntensity?: number
  rotationIntensity?: number
  borderRadius?: string
  shadow?: string
  disabled?: boolean
}

export function Card3D({
  children,
  className,
  depth = 30,
  backgroundColor = "#111",
  glareIntensity = 0.2,
  rotationIntensity = 15,
  borderRadius = "1.5rem",
  shadow = "none",
  disabled = false,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add spring physics for smoother animation
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]), springConfig)

  // Parallax effect for content
  const contentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [depth / 3, -depth / 3]), springConfig)
  const contentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [depth / 3, -depth / 3]), springConfig)

  // Glare effect
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [50, 150]), springConfig)
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [50, 150]), springConfig)
  const glareOpacity = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, glareIntensity]), springConfig)

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
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
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        borderRadius,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d",
          borderRadius,
          backgroundColor,
          boxShadow: shadow,
        }}
      >
        {/* Subtle dot pattern for Nothing Phone aesthetic */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-blue-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Glare effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(56, 189, 248, ${glareOpacity}), transparent)`,
            borderRadius,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Card content with parallax effect */}
        <motion.div
          className="relative z-0 h-full w-full"
          style={{
            translateX: disabled ? 0 : contentX,
            translateY: disabled ? 0 : contentY,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
