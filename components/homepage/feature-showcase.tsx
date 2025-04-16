"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BarChart2, Bell, Calendar, CreditCard, DollarSign, LineChart, PiggyBank, Target, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Budget Planning",
    description: "Set and track monthly budgets for different spending categories",
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
    href: "/dashboard",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Bill Reminders",
    description: "Never miss a payment with automated bill tracking and reminders",
    color: "bg-red-500/10",
    textColor: "text-red-500",
    href: "/dashboard",
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Expense Tracking",
    description: "Automatically categorize and visualize your spending patterns",
    color: "bg-green-500/10",
    textColor: "text-green-500",
    href: "/activity",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Financial Goals",
    description: "Set savings goals and track your progress over time",
    color: "bg-purple-500/10",
    textColor: "text-purple-500",
    href: "/streaks",
  },
  {
    icon: <PiggyBank className="h-6 w-6" />,
    title: "Savings Insights",
    description: "Get personalized recommendations to increase your savings",
    color: "bg-amber-500/10",
    textColor: "text-amber-500",
    href: "/dashboard",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Daily Challenges",
    description: "Complete daily financial tasks to build better habits",
    color: "bg-cyan-500/10",
    textColor: "text-cyan-500",
    href: "/questionnaire",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Card Management",
    description: "Track all your credit cards and payment methods in one place",
    color: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    href: "/settings",
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Net Worth Tracker",
    description: "Monitor your assets and liabilities to track your net worth",
    color: "bg-pink-500/10",
    textColor: "text-pink-500",
    href: "/dashboard",
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Financial Reports",
    description: "Generate detailed reports on your financial health",
    color: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    href: "/dashboard",
  },
]

export function FeatureShowcase() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature, index) => (
        <motion.div key={index} variants={item}>
          <Link href={feature.href}>
            <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-md">
              <CardContent className="p-6">
                <div className={`mb-4 rounded-full ${feature.color} p-3 w-fit`}>
                  <div className={feature.textColor}>{feature.icon}</div>
                </div>
                <h3 className="mb-2 font-medium">{feature.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>
                <Button variant="ghost" size="sm" className="mt-auto">
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
