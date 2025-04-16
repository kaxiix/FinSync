"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { FinancialInsights } from "@/components/dashboard/financial-insights"
import { SavingsGoals } from "@/components/dashboard/savings-goals"
import { DailyTip } from "@/components/shared/daily-tip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Grid2X2, LayoutGrid, Bell, Download, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const [layout, setLayout] = useState<"grid" | "compact">("grid")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  // Sample upcoming bills
  const upcomingBills = [
    { name: "Rent", amount: 1200, dueDate: "2023-06-01" },
    { name: "Internet", amount: 65, dueDate: "2023-06-05" },
    { name: "Netflix", amount: 14.99, dueDate: "2023-06-10" },
  ]

  const handleExportData = () => {
    // Create sample financial data for export
    const data = {
      metrics: {
        totalBalance: 12500.75,
        income: 3200.0,
        expenses: 1850.25,
        savings: 1349.75,
      },
      transactions: [
        { id: 1, date: "2023-05-28", description: "Grocery Store", amount: -120.5, category: "Groceries" },
        { id: 2, date: "2023-05-27", description: "Salary Deposit", amount: 3200.0, category: "Income" },
        { id: 3, date: "2023-05-26", description: "Restaurant", amount: -85.2, category: "Dining" },
        { id: 4, date: "2023-05-25", description: "Gas Station", amount: -45.0, category: "Transportation" },
        { id: 5, date: "2023-05-24", description: "Online Shopping", amount: -65.99, category: "Shopping" },
      ],
      savingsGoals: [
        { id: 1, name: "Emergency Fund", current: 6500, target: 10000 },
        { id: 2, name: "Vacation", current: 1200, target: 3000 },
        { id: 3, name: "New Car", current: 5000, target: 25000 },
      ],
    }

    // Convert to JSON string
    const jsonString = JSON.stringify(data, null, 2)

    // Create a blob and download link
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    // Create download link and trigger click
    const a = document.createElement("a")
    a.href = url
    a.download = `financial_data_${format(new Date(), "yyyy-MM-dd")}.json`
    document.body.appendChild(a)
    a.click()

    // Clean up
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Dashboard exported",
      description: "Your financial data has been exported successfully.",
    })
  }

  const handleShareDashboard = () => {
    // Create a shareable link (in a real app, this would generate a unique URL)
    const shareableLink = `https://finsync.app/share?id=${Math.random().toString(36).substring(2, 10)}`

    // Copy to clipboard
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast({
          title: "Dashboard shared",
          description: "A shareable link has been copied to your clipboard.",
        })
      })
      .catch(() => {
        toast({
          title: "Sharing failed",
          description: "Could not copy link to clipboard. Please try again.",
          variant: "destructive",
        })
      })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Tabs
              value={layout}
              onValueChange={(value) => setLayout(value as "grid" | "compact")}
              className="hidden md:block"
            >
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid2X2 className="mr-2 h-4 w-4" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="compact">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Compact
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShareDashboard}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-6">
          <motion.div variants={itemVariants}>
            <MetricsCards />
          </motion.div>

          <div className={`grid grid-cols-1 gap-6 ${layout === "grid" ? "lg:grid-cols-3" : ""}`}>
            <motion.div variants={itemVariants} className={layout === "grid" ? "lg:col-span-2" : ""}>
              <SpendingChart />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Upcoming Bills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-0 px-6">
                  {upcomingBills.map((bill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Bell className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{bill.name}</p>
                          <p className="text-xs text-muted-foreground">Due {format(new Date(bill.dueDate), "MMM d")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${bill.amount.toFixed(2)}</p>
                        <Badge variant="outline" className="text-xs">
                          Upcoming
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className={`grid grid-cols-1 gap-6 ${layout === "grid" ? "lg:grid-cols-3" : ""}`}>
            <motion.div variants={itemVariants} className={layout === "grid" ? "lg:col-span-2" : ""}>
              <RecentTransactions />
            </motion.div>

            <motion.div variants={itemVariants}>
              <SavingsGoals />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <FinancialInsights />
          </motion.div>

          <motion.div variants={itemVariants}>
            <DailyTip />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
