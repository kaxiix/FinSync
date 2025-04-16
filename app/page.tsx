"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight, BarChart2, PieChart, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useAIChat } from "@/contexts/ai-chat-context"
import { UserOverview } from "@/components/homepage/user-overview"
import { QuickQuestionnaire } from "@/components/homepage/quick-questionnaire"
import { FeatureShowcase } from "@/components/homepage/feature-showcase"
import { HomePageChart } from "@/components/homepage/homepage-chart"

export default function Home() {
  const { openChat } = useAIChat()
  const [activeTab, setActiveTab] = useState("overview")
  const [loadMoreTransactions, setLoadMoreTransactions] = useState(false)

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Sample transactions data
  const initialTransactions = [
    { description: "Grocery Store", amount: -82.45, date: "Today", category: "Groceries" },
    { description: "Monthly Salary", amount: 2750.0, date: "Yesterday", category: "Income" },
    { description: "Electric Bill", amount: -94.2, date: "May 10", category: "Utilities" },
  ]

  const additionalTransactions = [
    { description: "Coffee Shop", amount: -4.75, date: "May 9", category: "Food & Drink" },
    { description: "Gas Station", amount: -45.3, date: "May 8", category: "Transportation" },
  ]

  const transactions = loadMoreTransactions ? [...initialTransactions, ...additionalTransactions] : initialTransactions

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <motion.div
        className="relative flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.15) 0%, transparent 70%)",
          }}
        />

        <motion.h1
          className="mb-4 text-4xl font-bold tracking-tight md:text-5xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to <span className="text-primary">FinX</span>
        </motion.h1>

        <motion.p
          className="mb-6 max-w-md text-lg text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your personal finance assistant powered by AI
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 rounded-full">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2 rounded-full" onClick={() => openChat()}>
            Ask Fin
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="questionnaire">Quick Check-in</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <UserOverview />
              <HomePageChart />
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <FeatureShowcase />
          </TabsContent>

          <TabsContent value="questionnaire" className="mt-6">
            <QuickQuestionnaire />
          </TabsContent>
        </Tabs>

        {/* Financial Health Score */}
        <motion.div
          className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Financial Health Score</h2>
              <p className="text-sm text-muted-foreground">Based on your spending habits, savings, and debt</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary/20">
              <span className="text-2xl font-bold">78</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Spending</span>
                <span className="text-sm font-medium">Good</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Savings</span>
                <span className="text-sm font-medium">Excellent</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Debt Management</span>
                <span className="text-sm font-medium">Fair</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="mb-12" variants={container} initial="hidden" animate="show">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { title: "Add Transaction", icon: TrendingUp, href: "/activity" },
              { title: "Set Budget", icon: PieChart, href: "/dashboard" },
              { title: "Track Goals", icon: BarChart2, href: "/streaks" },
              { title: "Daily Check-in", icon: CheckCircle, href: "/questionnaire" },
            ].map((action, index) => (
              <motion.div key={action.title} variants={item}>
                <Link href={action.href}>
                  <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:bg-zinc-900/80">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-3 rounded-full bg-primary/10 p-3">
                        <action.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium">{action.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Link href="/activity">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800">
                {transactions.map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date} • {transaction.category}
                      </p>
                    </div>
                    <p className={`font-medium ${transaction.amount > 0 ? "text-emerald-500" : ""}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-zinc-800 p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setLoadMoreTransactions(!loadMoreTransactions)}
              >
                {loadMoreTransactions ? "Show Less" : "Load More"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
