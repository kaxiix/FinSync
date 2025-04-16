"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Metrics card skeleton */}
      <div className="app-card">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="app-card">
        <div className="p-4">
          <Skeleton className="mb-4 h-5 w-32" />
          <div className="flex items-center justify-center">
            <Skeleton className="h-[220px] w-full" />
          </div>
        </div>
      </div>

      {/* Savings goals skeleton */}
      <div className="app-card">
        <div className="p-4">
          <Skeleton className="mb-4 h-5 w-32" />
          <div className="space-y-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Transactions skeleton */}
      <div className="app-card">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="mb-4 h-10 w-full rounded-xl" />
          <div className="space-y-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
