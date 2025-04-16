"use client"

import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, DollarSign, Wallet, PiggyBank, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const metricsData = {
  totalBalance: 12450.75,
  monthlyIncome: 5200,
  monthlyExpenses: 3150.25,
  monthlySavings: 2049.75,
  savingsRate: 39.4,
  incomeChange: 2.5,
  expenseChange: -5.2,
  creditScore: 745,
  creditScoreChange: 15,
  debtToIncome: 28,
  netWorth: 45250.5,
  netWorthChange: 3.8,
}

export function MetricsCards() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "quarter" | "year">("month")

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  const handleTimeframeChange = (newTimeframe: "week" | "month" | "quarter" | "year") => {
    setTimeframe(newTimeframe)
    // In a real app, you would fetch new data based on the timeframe
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium">Financial Summary</h2>
        <Tabs value={timeframe} onValueChange={(value) => handleTimeframeChange(value as any)}>
          <TabsList className="h-8">
            <TabsTrigger value="week" className="text-xs">
              Week
            </TabsTrigger>
            <TabsTrigger value="month" className="text-xs">
              Month
            </TabsTrigger>
            <TabsTrigger value="quarter" className="text-xs">
              Quarter
            </TabsTrigger>
            <TabsTrigger value="year" className="text-xs">
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Total Balance */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Total Balance</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold">${metricsData.totalBalance.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                  <p className="text-xs text-emerald-500">+3.2% from last {timeframe}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Income */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                  <Wallet className="h-4 w-4 text-emerald-500" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Income</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold">${metricsData.monthlyIncome.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                  <p className="text-xs text-emerald-500">
                    +{metricsData.incomeChange}% from last {timeframe}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Expenses */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10">
                  <CreditCard className="h-4 w-4 text-rose-500" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Expenses</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold">${metricsData.monthlyExpenses.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <ArrowDown className="mr-1 h-3 w-3 text-emerald-500" />
                  <p className="text-xs text-emerald-500">
                    {metricsData.expenseChange}% from last {timeframe}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Savings */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                  <PiggyBank className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Savings</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-semibold">${metricsData.monthlySavings.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-muted-foreground">{metricsData.savingsRate}% of income</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
