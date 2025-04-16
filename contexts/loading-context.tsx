"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

// Create the context with a default value to avoid undefined errors
const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
})

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true)

    // Check if this is the first load
    try {
      const hasVisited = sessionStorage.getItem("hasVisitedBefore")

      if (hasVisited) {
        // If user has visited before, don't show loading screen
        setIsLoading(false)
      } else {
        // For first visit, show loading screen and set timeout
        const timer = setTimeout(() => {
          setIsLoading(false)
          sessionStorage.setItem("hasVisitedBefore", "true")
        }, 3000)

        return () => clearTimeout(timer)
      }
    } catch (e) {
      // In case sessionStorage is not available
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Provide the actual context value when mounted
  const contextValue = {
    isLoading: isMounted ? isLoading : true,
    setIsLoading,
  }

  return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>
}

export function useLoading() {
  return useContext(LoadingContext)
}
