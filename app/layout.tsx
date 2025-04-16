import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AIChatProvider } from "@/contexts/ai-chat-context"
import { AuthProvider } from "@/components/auth/auth-provider"
import { CustomThemeProvider } from "@/contexts/theme-context"
import { LoadingProvider } from "@/contexts/loading-context"
import { AppContent } from "@/components/app-content"

export const metadata: Metadata = {
  title: "FinX - Modern Finance",
  description: "Track your finances and get personalized advice with AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CustomThemeProvider>
            <LoadingProvider>
              <AuthProvider>
                <AIChatProvider>
                  <AppContent>{children}</AppContent>
                </AIChatProvider>
              </AuthProvider>
            </LoadingProvider>
          </CustomThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'