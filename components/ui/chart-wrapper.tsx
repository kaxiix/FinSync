"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ChartWrapperProps {
  title: string
  description?: string
  data: any[]
  dataKey: string
  categories?: string[] // Make categories optional
  allowDownload?: boolean
  allowShare?: boolean
  allowChartTypeChange?: boolean
}

export function ChartWrapper({
  title,
  description,
  data,
  dataKey,
  categories = [], // Add default empty array
  allowDownload = true,
  allowShare = true,
  allowChartTypeChange = true,
}: ChartWrapperProps) {
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line")
  const { toast } = useToast()

  const handleDownload = () => {
    try {
      // Create a JSON file with the chart data
      const jsonData = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      // Create a download link and trigger it
      const a = document.createElement("a")
      a.href = url
      a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-data.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Download successful",
        description: "Your data has been downloaded as a JSON file.",
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your data.",
        variant: "destructive",
      })
    }
  }

  const handleShare = () => {
    try {
      // Generate a unique ID for sharing
      const shareId = Math.random().toString(36).substring(2, 15)

      // In a real app, this would save the data to a database
      // and generate a shareable link

      // Copy the "link" to clipboard
      navigator.clipboard.writeText(`https://finsync.app/share/${shareId}`)

      toast({
        title: "Link copied to clipboard",
        description: "Share this link with others to show them your data.",
      })
    } catch (error) {
      toast({
        title: "Share failed",
        description: "There was an error generating a shareable link.",
        variant: "destructive",
      })
    }
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    }

    // Add a safety check for data
    if (!data || data.length === 0) {
      return (
        <div className="flex h-[300px] items-center justify-center text-muted-foreground">
          No data available to display
        </div>
      )
    }

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={dataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {categories && categories.length > 0 ? (
                categories.map((category, index) => (
                  <Bar
                    key={category}
                    dataKey={category}
                    fill={`hsl(var(--chart-${index + 1}))`}
                    animationDuration={1000}
                  />
                ))
              ) : (
                // Fallback when no categories are provided
                <Bar
                  dataKey={Object.keys(data[0]).find((key) => key !== dataKey) || "value"}
                  fill="hsl(var(--chart-1))"
                  animationDuration={1000}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={dataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {categories && categories.length > 0 ? (
                categories.map((category, index) => (
                  <Area
                    key={category}
                    type="monotone"
                    dataKey={category}
                    fill={`hsl(var(--chart-${index + 1}))`}
                    stroke={`hsl(var(--chart-${index + 1}))`}
                    fillOpacity={0.3}
                    animationDuration={1000}
                  />
                ))
              ) : (
                // Fallback when no categories are provided
                <Area
                  type="monotone"
                  dataKey={Object.keys(data[0]).find((key) => key !== dataKey) || "value"}
                  fill="hsl(var(--chart-1))"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={0.3}
                  animationDuration={1000}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )
      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={dataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {categories && categories.length > 0 ? (
                categories.map((category, index) => (
                  <Line
                    key={category}
                    type="monotone"
                    dataKey={category}
                    stroke={`hsl(var(--chart-${index + 1}))`}
                    activeDot={{ r: 8 }}
                    animationDuration={1000}
                  />
                ))
              ) : (
                // Fallback when no categories are provided
                <Line
                  type="monotone"
                  dataKey={Object.keys(data[0]).find((key) => key !== dataKey) || "value"}
                  stroke="hsl(var(--chart-1))"
                  activeDot={{ r: 8 }}
                  animationDuration={1000}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          {allowDownload && (
            <Button variant="outline" size="icon" onClick={handleDownload} title="Download data">
              <Download className="h-4 w-4" />
            </Button>
          )}
          {allowShare && (
            <Button variant="outline" size="icon" onClick={handleShare} title="Share chart">
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {allowChartTypeChange && (
          <div className="mb-4">
            <Tabs value={chartType} onValueChange={(value) => setChartType(value as "line" | "bar" | "area")}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="bar">Bar</TabsTrigger>
                <TabsTrigger value="area">Area</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
        {renderChart()}
      </CardContent>
    </Card>
  )
}
