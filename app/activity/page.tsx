import { Suspense } from "react"
import { TransactionHistory } from "@/components/activity/transaction-history"
import { TransactionFilters } from "@/components/activity/transaction-filters"
import { TransactionHistorySkeleton } from "@/components/activity/transaction-history-skeleton"

export default function ActivityPage() {
  return (
    <main className="px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
        <p className="text-sm text-muted-foreground">View and analyze your financial transactions</p>
      </div>

      <TransactionFilters />

      <Suspense fallback={<TransactionHistorySkeleton />}>
        <TransactionHistory />
      </Suspense>
    </main>
  )
}
