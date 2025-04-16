"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { StreakCalendar } from "@/components/streaks/streak-calendar"
import { StreakStats } from "@/components/streaks/streak-stats"
import { StreakChallenges } from "@/components/streaks/streak-challenges"
import { StreakRewards } from "@/components/streaks/streak-rewards"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function StreaksPage() {
  const [activeTab, setActiveTab] = useState("stats")

  // Animation variants
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
    <div className="flex flex-col">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Financial Streaks</h1>
        <p className="text-zinc-400">Track your daily financial habits</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4 bg-zinc-900 p-1 rounded-full">
          <TabsTrigger
            value="stats"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Stats
          </TabsTrigger>
          <TabsTrigger
            value="calendar"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Calendar
          </TabsTrigger>
          <TabsTrigger
            value="challenges"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Challenges
          </TabsTrigger>
          <TabsTrigger
            value="rewards"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Rewards
          </TabsTrigger>
        </TabsList>

        <motion.div variants={container} initial="hidden" animate="show">
          <TabsContent value="stats" className="mt-0">
            <motion.div variants={item}>
              <StreakStats />
            </motion.div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <motion.div variants={item}>
              <StreakCalendar />
            </motion.div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-0">
            <motion.div variants={item}>
              <StreakChallenges />
            </motion.div>
          </TabsContent>

          <TabsContent value="rewards" className="mt-0">
            <motion.div variants={item}>
              <StreakRewards />
            </motion.div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
