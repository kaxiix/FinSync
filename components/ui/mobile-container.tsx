"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Battery, Wifi, Signal } from "lucide-react"
import { format } from "date-fns"

interface MobileContainerProps {
  children: React.ReactNode
}

export function MobileContainer({ children }: MobileContainerProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [batteryLevel, setBatteryLevel] = useState(100)

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Simulate battery drain
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        const newLevel = prev - 1
        return newLevel < 20 ? 100 : newLevel
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <motion.div
        className="mobile-app-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Bar */}
        <div className="top-bar">
          <div className="left-status">
            <span className="time">{format(currentTime, "HH:mm")}</span>
          </div>
          <div className="right-status">
            <Signal size={16} className="mx-1" />
            <Wifi size={16} className="mx-1" />
            <Battery size={16} level={batteryLevel} className="mx-1" />
          </div>
        </div>

        {/* App Content */}
        <div className="app-content">{children}</div>

        {/* Home Bar */}
        <div className="home-bar"></div>
      </motion.div>
    </div>
  )
}
