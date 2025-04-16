"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, Wallet, PiggyBank, TrendingUp } from "lucide-react"

export function StreakChallenges() {
  // Mock data - would come from your database in a real app
  const challenges = [
    {
      id: "c1",
      title: "No Spend Day",
      description: "Complete a day without any unnecessary spending",
      icon: DollarSign,
      progress: 3,
      target: 5,
      reward: "50 points",
    },
    {
      id: "c2",
      title: "Budget Master",
      description: "Stay under budget for 7 consecutive days",
      icon: Wallet,
      progress: 4,
      target: 7,
      reward: "100 points",
    },
    {
      id: "c3",
      title: "Savings Boost",
      description: "Increase your savings by 5% this month",
      icon: PiggyBank,
      progress: 60,
      target: 100,
      reward: "200 points",
    },
    {
      id: "c4",
      title: "Investment Research",
      description: "Research and log 3 potential investments",
      icon: TrendingUp,
      progress: 1,
      target: 3,
      reward: "75 points",
    },
  ]

  const [activeChallenge, setActiveChallenge] = useState<string | null>(null)

  const toggleChallenge = (id: string) => {
    setActiveChallenge(activeChallenge === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {challenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className="p-4 cursor-pointer"
            onClick={() => toggleChallenge(challenge.id)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-zinc-800 p-2">
                  <challenge.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{challenge.title}</h4>
                  <p className="text-sm text-zinc-400">{challenge.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                  className="h-1.5 rounded-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />
              </div>
            </div>

            <div className="mt-2 text-xs">
              <span className="font-medium">Reward:</span> {challenge.reward}
            </div>
          </motion.div>

          <motion.div
            className="bg-zinc-800 p-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeChallenge === challenge.id ? "auto" : 0,
              opacity: activeChallenge === challenge.id ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <h5 className="mb-2 font-medium">Challenge Details</h5>
            <p className="mb-3 text-sm text-zinc-400">
              Complete this challenge by {new Date().toLocaleDateString()} to earn your reward.
            </p>
            <div className="flex justify-between">
              <motion.button
                className="rounded-full bg-zinc-700 px-4 py-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View History
              </motion.button>
              <motion.button
                className="rounded-full bg-white px-4 py-2 text-sm text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Complete Step
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
