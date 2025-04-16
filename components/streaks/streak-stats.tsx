"use client"

import { motion } from "framer-motion"
import { FlameIcon as Fire, Award, TrendingUp, Calendar } from "lucide-react"

export function StreakStats() {
  // Mock data - would come from your database in a real app
  const streakData = {
    currentStreak: 7,
    longestStreak: 21,
    totalCompletedDays: 45,
    level: 3,
    nextReward: 10,
  }

  const progressToNextLevel = (streakData.currentStreak / streakData.nextReward) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <motion.div
          className="relative flex h-32 w-32 items-center justify-center rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-zinc-900"></div>

          {/* Progress circle */}
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * progressToNextLevel) / 100 }}
              transition={{ duration: 1, delay: 0.5 }}
              strokeLinecap="round"
            />
          </svg>

          {/* Current streak */}
          <div className="flex flex-col items-center">
            <motion.div
              className="flex items-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Fire className="mr-1 h-5 w-5 text-white" />
              <span className="text-4xl font-bold">{streakData.currentStreak}</span>
            </motion.div>
            <motion.span
              className="text-xs text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              day streak
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="text-sm font-medium">Level {streakData.level}</div>
          <div className="text-xs text-zinc-400">
            {streakData.nextReward - streakData.currentStreak} days until next reward
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <motion.div
          className="flex flex-col items-center rounded-lg bg-zinc-900 p-3 text-center"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Award className="mb-1 h-5 w-5 text-zinc-400" />
          <div className="text-lg font-bold">{streakData.longestStreak}</div>
          <div className="text-xs text-zinc-400">Longest</div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center rounded-lg bg-zinc-900 p-3 text-center"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Calendar className="mb-1 h-5 w-5 text-zinc-400" />
          <div className="text-lg font-bold">{streakData.totalCompletedDays}</div>
          <div className="text-xs text-zinc-400">Total Days</div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center rounded-lg bg-zinc-900 p-3 text-center"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <TrendingUp className="mb-1 h-5 w-5 text-zinc-400" />
          <div className="text-lg font-bold">15%</div>
          <div className="text-xs text-zinc-400">Improvement</div>
        </motion.div>
      </div>

      <motion.div
        className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
      >
        <h3 className="mb-3 font-medium">Daily Activity</h3>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <motion.div
              key={day}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + day * 0.1 }}
            >
              <motion.div
                className={`h-16 w-4 rounded-t-full ${day < 7 ? "bg-white" : "bg-zinc-600"}`}
                initial={{ height: 0 }}
                animate={{ height: day < 7 ? "4rem" : "2rem" }}
                transition={{ delay: 2 + day * 0.1, duration: 0.5 }}
              />
              <div className="mt-1 text-xs text-zinc-400">{day === 7 ? "Today" : `Day ${day}`}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
