"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Home, BarChart2, Clock, Trophy, MessageSquare, Settings } from "lucide-react"
import { useAIChat } from "@/contexts/ai-chat-context"
import { useLoading } from "@/contexts/loading-context"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { openChat } = useAIChat()
  const { isLoading } = useLoading()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't show navbar on auth pages or when loading
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/onboarding"
  if (!mounted || isAuthPage || isLoading) return null

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart2 },
    { name: "Activity", href: "/activity", icon: Clock },
    { name: "Streaks", href: "/streaks", icon: Trophy },
  ]

  const handleSettingsClick = () => {
    router.push("/settings")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <motion.div
        className="flex items-center gap-2 bg-black border border-zinc-800 rounded-full mb-6 px-2 py-1"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center p-2">
              <motion.div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isActive ? "bg-white" : "bg-transparent"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={20} className={isActive ? "text-black" : "text-white"} />
              </motion.div>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 h-1 w-1 rounded-full bg-white"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
        <motion.button
          onClick={openChat}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={20} />
        </motion.button>
        <motion.button
          onClick={handleSettingsClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings size={20} />
        </motion.button>
      </motion.div>
    </div>
  )
}
