"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Lightbulb, ThumbsUp, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function InsightsPage() {
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
    {
      id: "i4",
      title: "Income increase",
      description: "Your income has increased by 15% compared to last quarter.",
      type: "success",
      icon: TrendingUp,
      action: "View Details",
      category: "Income",
      link: "/dashboard/income-analysis",
    },
    {
      id: "i5",
      title: "Bill payment due soon",
      description: "Your electricity bill of $85 is due in 3 days.",
      type: "warning",
      icon: AlertCircle,
      action: "Pay Now",
      category: "Bills",
      link: "/dashboard/bill-payment",
    },
    {
      id: "i6",
      title: "Investment opportunity",
      description: "Based on your profile, consider increasing your retirement contributions.",
      type: "opportunity",
      icon: Lightbulb,
      action: "Learn More",
      category: "Investments",
      link: "/dashboard/investment-opportunities",
    },
    {
      id: "i7",
      title: "Spending decrease",
      description: "Your utility expenses decreased by 12% this month.",
      type: "success",
      icon: TrendingDown,
      action: "View Details",
      category: "Spending",
      link: "/dashboard/utility-analysis",
    },
  ]

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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        heading="Financial Insights"
        subheading="Personalized insights to help you manage your finances better"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
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
                    onClick={() => (window.location.href = insight.link)}
                  >
                    {insight.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
