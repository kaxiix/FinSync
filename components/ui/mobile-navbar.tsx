"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, Calendar, MessageSquare, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAIChat } from "@/contexts/ai-chat-context"
import { motion } from "framer-motion"

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
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Chat",
    href: "#chat",
    icon: MessageSquare,
  },
]

export function MobileNavbar() {
  const pathname = usePathname()
  const { openChat } = useAIChat()
  const [mounted, setMounted] = useState(false)

  // Determine if we're on a login/register page
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/onboarding"

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return isAuthPage ? null : (
      <motion.div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border/40 bg-background/80 px-2 backdrop-blur-lg">
        {navItems.map((item) => {
          const isActive = item.href === "#chat" ? false : pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href === "#chat" ? "#" : item.href}
              onClick={item.href === "#chat" ? openChat : undefined}
              className={cn(
                "relative flex h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon size={20} strokeWidth={1.5} />
              <span className="mt-1 text-[10px] font-medium">{item.name}</span>

              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 h-1 w-6 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </motion.div>
    )

  return isAuthPage ? null : null
}
