"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Lightbulb, ThumbsUp, ThumbsDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample financial tips
const financialTips = [
  {
    id: 1,
    tip: "Set up automatic transfers to your savings account on payday to build your emergency fund without thinking about it.",
    category: "Saving",
  },
  {
    id: 2,
    tip: "Follow the 50/30/20 rule: Spend 50% on needs, 30% on wants, and save 20% of your income.",
    category: "Budgeting",
  },
  {
    id: 3,
    tip: "Review your subscriptions quarterly and cancel any services you don't regularly use.",
    category: "Spending",
  },
  {
    id: 4,
    tip: "Consider index funds for long-term investing if you're new to the stock market.",
    category: "Investing",
  },
  {
    id: 5,
    tip: "Pay more than the minimum on credit cards to reduce interest and pay off debt faster.",
    category: "Debt",
  },
]

export function DailyTip() {
  // In a real app, you'd fetch the daily tip from an API
  // For now, we'll just pick a random tip
  const randomIndex = Math.floor(Math.random() * financialTips.length)
  const tip = financialTips[randomIndex]

  const [isLiked, setIsLiked] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleFeedback = (liked: boolean) => {
    setIsLiked(liked)
    setShowFeedback(true)
    // In a real app, you'd send this feedback to your backend
  }

  return (
    <Card className="overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/80">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-amber-500/10 p-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <div className="mb-1 flex items-center">
              <h3 className="font-medium">FinX Daily Tip</h3>
              <Badge variant="outline" className="ml-2 text-xs">
                {tip.category}
              </Badge>
            </div>
            <p className="text-sm text-zinc-400">{tip.tip}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/50 px-4 py-2">
        {!showFeedback ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-zinc-400">Was this helpful?</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" onClick={() => handleFeedback(true)}>
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0"
              onClick={() => handleFeedback(false)}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-zinc-400">
            Thanks for your feedback!
          </motion.div>
        )}
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          Next Tip <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}
