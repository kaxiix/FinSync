"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowUpRight, ArrowDownLeft, Filter, Search } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"

// Sample transaction data
const sampleTransactions = [
  {
    id: "t1",
    description: "Whole Foods Market",
    amount: -82.45,
    date: new Date(2023, 3, 15),
    category: "Groceries",
    status: "completed",
  },
  {
    id: "t2",
    description: "Monthly Salary",
    amount: 2750.0,
    date: new Date(2023, 3, 12),
    category: "Income",
    status: "completed",
  },
  {
    id: "t3",
    description: "Electric Company",
    amount: -94.2,
    date: new Date(2023, 3, 10),
    category: "Utilities",
    status: "completed",
  },
  {
    id: "t4",
    description: "Starbucks",
    amount: -4.5,
    date: new Date(2023, 3, 9),
    category: "Dining",
    status: "completed",
  },
  {
    id: "t5",
    description: "Amazon",
    amount: -65.99,
    date: new Date(2023, 3, 7),
    category: "Shopping",
    status: "completed",
  },
]

interface RecentTransactionsProps {
  limit?: number
  showViewAll?: boolean
  isLoading?: boolean
  transactions?: any[]
}

export function RecentTransactions({
  limit = 5,
  showViewAll = true,
  isLoading = false,
  transactions = sampleTransactions,
}: RecentTransactionsProps) {
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Apply filtering
  const filteredTransactions = transactions.filter((t) => {
    const matchesCategory = filter ? t.category === filter : true
    const matchesSearch = searchQuery ? t.description.toLowerCase().includes(searchQuery.toLowerCase()) : true
    return matchesCategory && matchesSearch
  })

  // Limit the number of transactions to display
  const displayTransactions = expanded ? filteredTransactions : filteredTransactions.slice(0, limit)

  // Get unique categories for filter
  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter transactions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter(null)} className={filter === null ? "bg-accent" : ""}>
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setFilter(category)}
                  className={filter === category ? "bg-accent" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {displayTransactions.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">No transactions found</div>
          ) : (
            displayTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between border-b border-border px-6 py-4 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      transaction.amount > 0 ? "bg-emerald-500/10" : "bg-rose-500/10"
                    }`}
                  >
                    {transaction.amount > 0 ? (
                      <ArrowDownLeft className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{format(transaction.date, "MMM d, yyyy")}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span
                    className={`text-sm font-medium ${transaction.amount > 0 ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
      {showViewAll && filteredTransactions.length > limit && (
        <CardFooter className="flex justify-center border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center"
          >
            {expanded ? "Show Less" : "Show More"}
            <ChevronDown className={`ml-2 h-4 w-4 ${expanded ? "rotate-180" : ""} transition-transform`} />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
