"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, Activity, Trophy, Settings } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useAIChat } from "@/contexts/ai-chat-context"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart2,
  },
  {
    name: "Activity",
    href: "/activity",
    icon: Activity,
  },
  {
    name: "Streaks",
    href: "/streaks",
    icon: Trophy,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function FloatingNavbar() {
  const pathname = usePathname()
  const { openChat } = useAIChat()
  const [mounted, setMounted] = useState(false)

  // Determine if we're on a login/register page
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/onboarding"

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isAuthPage) return null

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-navbar flex items-center justify-center gap-1 rounded-full p-1.5 shadow-lg md:gap-2 md:p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex h-12 w-12 flex-col items-center justify-center rounded-full transition-all duration-300 ease-in-out",
                isActive
                  ? "bg-white text-black dark:bg-black dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              )}
            >
              <item.icon size={20} strokeWidth={1.5} />
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 h-1 w-1 rounded-full bg-cyan-500"
                  layoutId="navbar-indicator"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          )
        })}
        <motion.button
          onClick={openChat}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 13.5V13.51"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 13.5V13.51"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 13.5V13.51"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}
