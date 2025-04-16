"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Trophy, Medal, Crown } from "lucide-react"

// Mock data - would come from your database in a real app
const achievements = [
  {
    id: "a1",
    title: "Savings Champion",
    description: "Saved 30% of income for 3 consecutive months",
    user: {
      name: "Alex Johnson",
      avatar: "/colorful-abstract-shapes.png",
    },
    icon: Trophy,
    date: "May 15, 2023",
    rarity: "Legendary",
    rarityColor: "bg-orange-500/10 text-orange-500",
  },
  {
    id: "a2",
    title: "Budget Master",
    description: "Stayed under budget for 6 consecutive months",
    user: {
      name: "Jamie Smith",
      avatar: "/colorful-abstract-shapes.png",
    },
    icon: Crown,
    date: "April 28, 2023",
    rarity: "Epic",
    rarityColor: "bg-purple-500/10 text-purple-500",
  },
  {
    id: "a3",
    title: "Debt Destroyer",
    description: "Paid off $10,000 in debt",
    user: {
      name: "Taylor Brown",
      avatar: "/abstract-geometric-shapes.png",
    },
    icon: Award,
    date: "June 2, 2023",
    rarity: "Rare",
    rarityColor: "bg-blue-500/10 text-blue-500",
  },
  {
    id: "a4",
    title: "Investment Guru",
    description: "Achieved 15% return on investments",
    user: {
      name: "Jordan Lee",
      avatar: "/abstract-geometric-shapes.png",
    },
    icon: Star,
    date: "May 20, 2023",
    rarity: "Uncommon",
    rarityColor: "bg-green-500/10 text-green-500",
  },
  {
    id: "a5",
    title: "Financial Planner",
    description: "Created and followed a 5-year financial plan",
    user: {
      name: "Casey Wilson",
      avatar: "/abstract-geometric-shapes.png",
    },
    icon: Medal,
    date: "June 10, 2023",
    rarity: "Rare",
    rarityColor: "bg-blue-500/10 text-blue-500",
  },
]

export function LeaderboardAchievements() {
  return (
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          className="flex items-start justify-between rounded-lg border p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start space-x-4">
            <div className={`rounded-full p-3 ${achievement.rarityColor}`}>
              <achievement.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center">
                <h4 className="font-medium">{achievement.title}</h4>
                <Badge className={`ml-2 ${achievement.rarityColor}`}>{achievement.rarity}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              <div className="mt-2 flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src={achievement.user.avatar || "/placeholder.svg"} alt={achievement.user.name} />
                  <AvatarFallback>{achievement.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  Earned by <span className="font-medium">{achievement.user.name}</span> on {achievement.date}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
