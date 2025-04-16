"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Bell, Shield, Palette, ChevronRight, ArrowLeft } from "lucide-react"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { FinancialSettings } from "@/components/settings/financial-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type SettingsTab = "profile" | "financial" | "notifications" | "security"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  const renderSettingsContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />
      case "financial":
        return <FinancialSettings />
      case "notifications":
        return <NotificationSettings />
      case "security":
        return <SecuritySettings />
      default:
        return <ProfileSettings />
    }
  }

  const settingsOptions = [
    {
      id: "profile",
      name: "Profile",
      description: "Manage your personal information",
      icon: User,
    },
    {
      id: "financial",
      name: "Financial",
      description: "Update your financial preferences",
      icon: Bell,
    },
    {
      id: "notifications",
      name: "Notifications",
      description: "Configure notification settings",
      icon: Bell,
    },
    {
      id: "security",
      name: "Security",
      description: "Manage your account security",
      icon: Shield,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center px-6 py-6">
          <Button variant="ghost" size="icon" className="mr-4 rounded-full" onClick={handleBackClick}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full border-b border-border md:w-64 md:border-b-0 md:border-r">
          <nav className="p-4">
            <ul className="space-y-2">
              {settingsOptions.map((option) => (
                <li key={option.id}>
                  <button
                    onClick={() => setActiveTab(option.id as SettingsTab)}
                    className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors ${
                      activeTab === option.id ? "bg-white text-black" : "hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <option.icon className="mr-3 h-5 w-5" />
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </li>
              ))}
              <li>
                <Link href="/settings/theme">
                  <button className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-zinc-900">
                    <div className="flex items-center">
                      <Palette className="mr-3 h-5 w-5" />
                      <div>
                        <div className="font-medium">Theme</div>
                        <div className="text-xs text-muted-foreground">Customize app appearance</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderSettingsContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
