"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, AlertTriangle, Lightbulb, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

// Sample insights data
const insights = [
  {
    id: "i1",
    title: "Unusual spending detected",
    description: "Your restaurant spending is 40% higher than last month.",
    type: "warning",
    icon: AlertTriangle,
    action: "Review",
    category: "Spending",
    link: "/dashboard/spending-analysis",
  },
  {
    id: "i2",
    title: "Savings goal progress",
    description: "You're on track to reach your emergency fund goal by December.",
    type: "success",
    icon: ThumbsUp,
    action: "View Goal",
    category: "Savings",
    link: "/dashboard/savings-goals",
  },
  {
    id: "i3",
    title: "Subscription optimization",
    description: "You could save $240 annually by canceling unused subscriptions.",
    type: "opportunity",
    icon: Lightbulb,
    action: "See Details",
    category: "Optimization",
    link: "/dashboard/subscription-analysis",
  },
]

export function FinancialInsights() {
  const router = useRouter()
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-amber-500"
      case "success":
        return "text-emerald-500"
      case "opportunity":
        return "text-blue-500"
      default:
        return "text-foreground"
    }
  }

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-amber-500/10"
      case "success":
        return "bg-emerald-500/10"
      case "opportunity":
        return "bg-blue-500/10"
      default:
        return "bg-primary/10"
    }
  }

  const handleViewAll = () => {
    router.push("/dashboard/insights")
  }

  const handleInsightAction = (insight: (typeof insights)[0]) => {
    router.push(insight.link)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-medium">Financial Insights</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleViewAll}>
          View All <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              variants={item}
              className="flex items-start space-x-4 rounded-lg border border-border p-4"
              onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
            >
              <div className={`mt-0.5 rounded-full ${getInsightBgColor(insight.type)} p-2`}>
                <insight.icon className={`h-4 w-4 ${getInsightColor(insight.type)}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {insight.category}
                  </Badge>
                </div>
                <h3 className="font-medium">{insight.title}</h3>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 h-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleInsightAction(insight)
                  }}
                >
                  {insight.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
