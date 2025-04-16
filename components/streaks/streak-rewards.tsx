"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Check, Star, Award, Trophy, Crown } from "lucide-react"

export function StreakRewards() {
  // Mock data - would come from your database in a real app
  const rewards = [
    {
      id: "r1",
      title: "Beginner Budgeter",
      description: "Complete 7 consecutive days of financial tracking",
      icon: Star,
      requiredStreak: 7,
      unlocked: true,
      unlockedDate: "May 15, 2023",
    },
    {
      id: "r2",
      title: "Consistency Champion",
      description: "Complete 14 consecutive days of financial tracking",
      icon: Award,
      requiredStreak: 14,
      unlocked: false,
    },
    {
      id: "r3",
      title: "Finance Master",
      description: "Complete 30 consecutive days of financial tracking",
      icon: Trophy,
      requiredStreak: 30,
      unlocked: false,
    },
    {
      id: "r4",
      title: "Financial Guru",
      description: "Complete 90 consecutive days of financial tracking",
      icon: Crown,
      requiredStreak: 90,
      unlocked: false,
    },
  ]

  const [selectedReward, setSelectedReward] = useState<string | null>(null)

  const handleRewardClick = (id: string) => {
    setSelectedReward(selectedReward === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {rewards.map((reward, index) => (
        <motion.div
          key={reward.id}
          className={`rounded-lg border ${
            reward.unlocked ? "border-white" : "border-zinc-800"
          } bg-zinc-900/50 overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className="p-4 cursor-pointer"
            onClick={() => handleRewardClick(reward.id)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`rounded-full p-2 ${reward.unlocked ? "bg-white text-black" : "bg-zinc-800 text-white"}`}
                >
                  <reward.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h4 className="font-medium">{reward.title}</h4>
                    <div
                      className={`ml-2 flex items-center rounded-full px-2 py-0.5 text-xs ${
                        reward.unlocked ? "bg-white text-black" : "bg-zinc-800 text-white"
                      }`}
                    >
                      {reward.unlocked ? (
                        <>
                          <Check className="mr-1 h-3 w-3" />
                          Unlocked
                        </>
                      ) : (
                        <>
                          <Lock className="mr-1 h-3 w-3" />
                          {reward.requiredStreak} days
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400">{reward.description}</p>
                </div>
              </div>
            </div>

            {reward.unlocked && (
              <motion.div
                className="mt-2 text-xs text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                Unlocked on {reward.unlockedDate}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="bg-zinc-800 p-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: selectedReward === reward.id ? "auto" : 0,
              opacity: selectedReward === reward.id ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            {reward.unlocked ? (
              <div className="space-y-3">
                <h5 className="font-medium">Reward Details</h5>
                <p className="text-sm text-zinc-400">
                  Congratulations on earning this badge! You've demonstrated excellent financial discipline.
                </p>
                <motion.button
                  className="rounded-full bg-white px-4 py-2 text-sm text-black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share Achievement
                </motion.button>
              </div>
            ) : (
              <div className="space-y-3">
                <h5 className="font-medium">How to Earn</h5>
                <p className="text-sm text-zinc-400">
                  Complete your daily financial check-in for {reward.requiredStreak} consecutive days to unlock this
                  achievement.
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-700">
                  <motion.div
                    className="h-1.5 rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${(7 / reward.requiredStreak) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-xs text-zinc-400">
                  Current progress: 7/{reward.requiredStreak} days ({Math.round((7 / reward.requiredStreak) * 100)}%)
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
