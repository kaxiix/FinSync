"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Medal, TrendingUp } from "lucide-react"

// Mock data - would come from your database in a real app
const stats = {
  rank: 10,
  totalUsers: 1250,
  percentile: 99,
  score: 650,
  streak: 7,
  improvement: "+15%",
}

export function LeaderboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <motion.div
        className="col-span-4 flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Your Rank</div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{stats.rank}</span>
              <span className="ml-2 text-sm text-muted-foreground">of {stats.totalUsers}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-muted-foreground">Percentile</div>
          <div className="text-2xl font-bold">Top {stats.percentile}%</div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col justify-between rounded-lg border bg-card p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <Award className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm font-medium">Score</div>
        </div>
        <div className="mt-2 text-2xl font-bold">{stats.score}</div>
      </motion.div>

      <motion.div
        className="flex flex-col justify-between rounded-lg border bg-card p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <Medal className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm font-medium">Streak</div>
        </div>
        <div className="mt-2 text-2xl font-bold">{stats.streak} days</div>
      </motion.div>

      <motion.div
        className="flex flex-col justify-between rounded-lg border bg-card p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm font-medium">Improvement</div>
        </div>
        <div className="mt-2 text-2xl font-bold text-green-500">{stats.improvement}</div>
      </motion.div>
    </div>
  )
}
