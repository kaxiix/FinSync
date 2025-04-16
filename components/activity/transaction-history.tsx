"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Settings, Grid3X3, List, Filter, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { financialData } from "@/lib/financial-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: string
  merchant: string
}

export function TransactionHistory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  })
  const [settingsOptions, setSettingsOptions] = useState({
    showAmount: true,
    showDate: true,
    showCategory: true,
    showMerchant: true,
  })

  // Use consistent data from our financial data file
  const transactions: Transaction[] = financialData.recentTransactions

  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredTransactions = transactions.filter((transaction) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(transaction.category)

    // Date filter
    const transactionDate = new Date(transaction.date)
    const matchesDateStart = !dateRange.start || new Date(dateRange.start) <= transactionDate
    const matchesDateEnd = !dateRange.end || new Date(dateRange.end) >= transactionDate

    return matchesSearch && matchesCategory && matchesDateStart && matchesDateEnd
  })

  const handleSettingsSave = () => {
    setShowSettings(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Transaction History</CardTitle>
        <div className="flex items-center space-x-2">
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Display Settings</DialogTitle>
                <DialogDescription>Customize how transactions are displayed</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-amount"
                    checked={settingsOptions.showAmount}
                    onCheckedChange={(checked) =>
                      setSettingsOptions((prev) => ({ ...prev, showAmount: checked === true }))
                    }
                  />
                  <Label htmlFor="show-amount">Show Amount</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-date"
                    checked={settingsOptions.showDate}
                    onCheckedChange={(checked) =>
                      setSettingsOptions((prev) => ({ ...prev, showDate: checked === true }))
                    }
                  />
                  <Label htmlFor="show-date">Show Date</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-category"
                    checked={settingsOptions.showCategory}
                    onCheckedChange={(checked) =>
                      setSettingsOptions((prev) => ({ ...prev, showCategory: checked === true }))
                    }
                  />
                  <Label htmlFor="show-category">Show Category</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-merchant"
                    checked={settingsOptions.showMerchant}
                    onCheckedChange={(checked) =>
                      setSettingsOptions((prev) => ({ ...prev, showMerchant: checked === true }))
                    }
                  />
                  <Label htmlFor="show-merchant">Show Merchant</Label>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSettingsSave}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 ${viewMode === "grid" ? "bg-zinc-800" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 ${viewMode === "list" ? "bg-zinc-800" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className={`flex items-center gap-1 ${showFilters ? "bg-zinc-800" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="rounded-md border border-zinc-800 p-4">
                <h4 className="mb-2 text-sm font-medium">Categories</h4>
                <div className="mb-4 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                <h4 className="mb-2 text-sm font-medium">Date Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">From</label>
                    <Input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">To</label>
                    <Input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredTransactions.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 p-4 text-center">
            <p className="text-sm text-muted-foreground">No transactions found</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategories([])
                setDateRange({ start: "", end: "" })
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="flex items-center justify-between rounded-md border border-zinc-800 p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : "-"}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground">
                        {settingsOptions.showMerchant && <span>{transaction.merchant}</span>}
                        {settingsOptions.showDate && <span>{format(new Date(transaction.date), "MMM d, yyyy")}</span>}
                        {settingsOptions.showCategory && <span>{transaction.category}</span>}
                      </div>
                    </div>
                  </div>
                </div>
                {settingsOptions.showAmount && (
                  <p className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {filteredTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="flex flex-col rounded-md border border-zinc-800 p-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : "-"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{transaction.description}</p>
                    {settingsOptions.showMerchant && (
                      <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                    )}
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    {settingsOptions.showDate && (
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                      </p>
                    )}
                    {settingsOptions.showCategory && (
                      <Badge variant="outline" className="mt-1">
                        {transaction.category}
                      </Badge>
                    )}
                  </div>
                  {settingsOptions.showAmount && (
                    <p className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
