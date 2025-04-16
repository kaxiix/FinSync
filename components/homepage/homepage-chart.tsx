"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartWrapper } from "@/components/ui/chart-wrapper"

// Consistent financial data across the app
const financialData = {
  // Monthly data for 2023
  monthlyData: [
    { name: "Jan", income: 4500, expenses: 3200, savings: 1300 },
    { name: "Feb", income: 4500, expenses: 3400, savings: 1100 },
    { name: "Mar", income: 4700, expenses: 3300, savings: 1400 },
    { name: "Apr", income: 4800, expenses: 3500, savings: 1300 },
    { name: "May", income: 5000, expenses: 3600, savings: 1400 },
    { name: "Jun", income: 5200, expenses: 3700, savings: 1500 },
    { name: "Jul", income: 5200, expenses: 3800, savings: 1400 },
    { name: "Aug", income: 5300, expenses: 3900, savings: 1400 },
    { name: "Sep", income: 5300, expenses: 3700, savings: 1600 },
    { name: "Oct", income: 5400, expenses: 3800, savings: 1600 },
    { name: "Nov", income: 5500, expenses: 4000, savings: 1500 },
    { name: "Dec", income: 5600, expenses: 4200, savings: 1400 },
  ],

  // Spending categories
  categoryData: [
    { name: "Housing", value: 1500 },
    { name: "Food", value: 800 },
    { name: "Transport", value: 400 },
    { name: "Entertainment", value: 300 },
    { name: "Utilities", value: 350 },
    { name: "Other", value: 250 },
  ],

  // Recent transactions
  recentTransactions: [
    {
      id: "t1",
      description: "Grocery Shopping",
      amount: -120.5,
      date: "2023-12-01",
      category: "Food",
      merchant: "Whole Foods",
    },
    {
      id: "t2",
      description: "Monthly Rent",
      amount: -1500,
      date: "2023-12-01",
      category: "Housing",
      merchant: "Property Management",
    },
    {
      id: "t3",
      description: "Salary Deposit",
      amount: 5500,
      date: "2023-11-30",
      category: "Income",
      merchant: "Employer Inc.",
    },
    {
      id: "t4",
      description: "Electric Bill",
      amount: -85.2,
      date: "2023-11-28",
      category: "Utilities",
      merchant: "Power Company",
    },
    {
      id: "t5",
      description: "Streaming Service",
      amount: -14.99,
      date: "2023-11-27",
      category: "Entertainment",
      merchant: "Netflix",
    },
  ],

  // Savings goals
  savingsGoals: [
    {
      id: "g1",
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2024-06-30",
    },
    {
      id: "g2",
      name: "Vacation",
      target: 3000,
      current: 1200,
      deadline: "2024-07-15",
    },
    {
      id: "g3",
      name: "New Car",
      target: 25000,
      current: 5000,
      deadline: "2025-01-01",
    },
  ],
}

export function HomePageChart() {
  const [chartType, setChartType] = useState<"spending" | "savings" | "categories">("spending")

  const renderChart = () => {
    switch (chartType) {
      case "spending":
        return (
          <ChartWrapper
            title=""
            data={financialData.monthlyData.slice(-6)}
            type="area"
            dataKey="expenses"
            height={300}
          />
        )
      case "savings":
        return (
          <ChartWrapper
            title=""
            data={financialData.monthlyData.slice(-6)}
            type="line"
            dataKey="savings"
            height={300}
          />
        )
      case "categories":
        return <ChartWrapper title="" data={financialData.categoryData} type="pie" dataKey="value" height={300} />
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={chartType} onValueChange={(value) => setChartType(value as any)} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
        </Tabs>

        {renderChart()}
      </CardContent>
    </Card>
  )
}
