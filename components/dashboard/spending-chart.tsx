"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BarChart3, LineChart, AreaChart, ChevronDown } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Import consistent financial data
import { financialData } from "@/lib/financial-data"

type TimeRange = "weekly" | "monthly" | "yearly"
type ChartType = "bar" | "line" | "area"

export function SpendingChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly")
  const [chartType, setChartType] = useState<ChartType>("bar")

  // Get data based on time range
  const getData = () => {
    switch (timeRange) {
      case "weekly":
        return [
          { name: "Mon", Expenses: 120, Income: 0 },
          { name: "Tue", Expenses: 85, Income: 0 },
          { name: "Wed", Expenses: 140, Income: 0 },
          { name: "Thu", Expenses: 95, Income: 0 },
          { name: "Fri", Expenses: 210, Income: 2500 },
          { name: "Sat", Expenses: 180, Income: 0 },
          { name: "Sun", Expenses: 75, Income: 0 },
        ]
      case "monthly":
        return financialData.monthlyData.map((item) => ({
          name: item.name,
          Expenses: item.expenses,
          Income: item.income,
        }))
      case "yearly":
        return [
          { name: "2018", Expenses: 24000, Income: 48000 },
          { name: "2019", Expenses: 26000, Income: 52000 },
          { name: "2020", Expenses: 23000, Income: 50000 },
          { name: "2021", Expenses: 28000, Income: 55000 },
          { name: "2022", Expenses: 30000, Income: 58000 },
          { name: "2023", Expenses: 32000, Income: 62000 },
        ]
      default:
        return []
    }
  }

  const renderChart = () => {
    const data = getData()

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Expenses" fill="#ef4444" />
              <Bar dataKey="Income" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Expenses" stroke="#ef4444" />
              <Line type="monotone" dataKey="Income" stroke="#10b981" />
            </RechartsLineChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Expenses" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              <Area type="monotone" dataKey="Income" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </RechartsAreaChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-medium">Income vs. Expenses</CardTitle>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                {chartType === "bar" ? (
                  <BarChart3 className="mr-2 h-4 w-4" />
                ) : chartType === "line" ? (
                  <LineChart className="mr-2 h-4 w-4" />
                ) : (
                  <AreaChart className="mr-2 h-4 w-4" />
                )}
                {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setChartType("bar")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Bar Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChartType("line")}>
                <LineChart className="mr-2 h-4 w-4" />
                Line Chart
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChartType("area")}>
                <AreaChart className="mr-2 h-4 w-4" />
                Area Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)} className="mb-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>

        {renderChart()}
      </CardContent>
    </Card>
  )
}
