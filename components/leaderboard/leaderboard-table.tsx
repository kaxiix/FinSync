"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react"

// Mock data - would come from your database in a real app
const globalUsers = [
  {
    id: "u1",
    name: "Alex Johnson",
    avatar: "/colorful-abstract-shapes.png",
    score: 950,
    streak: 32,
    change: "up",
    rank: 1,
  },
  {
    id: "u2",
    name: "Jamie Smith",
    avatar: "/colorful-abstract-shapes.png",
    score: 920,
    streak: 28,
    change: "up",
    rank: 2,
  },
  {
    id: "u3",
    name: "Taylor Brown",
    avatar: "/abstract-geometric-shapes.png",
    score: 890,
    streak: 25,
    change: "down",
    rank: 3,
  },
  {
    id: "u4",
    name: "Jordan Lee",
    avatar: "/abstract-geometric-shapes.png",
    score: 850,
    streak: 21,
    change: "same",
    rank: 4,
  },
  {
    id: "u5",
    name: "Casey Wilson",
    avatar: "/abstract-geometric-shapes.png",
    score: 820,
    streak: 18,
    change: "up",
    rank: 5,
  },
  {
    id: "u6",
    name: "Riley Davis",
    avatar: "/placeholder.svg?height=40&width=40&query=6",
    score: 780,
    streak: 15,
    change: "down",
    rank: 6,
  },
  {
    id: "u7",
    name: "Morgan White",
    avatar: "/placeholder.svg?height=40&width=40&query=7",
    score: 750,
    streak: 12,
    change: "up",
    rank: 7,
  },
  {
    id: "u8",
    name: "Sam Green",
    avatar: "/placeholder.svg?height=40&width=40&query=8",
    score: 720,
    streak: 10,
    change: "same",
    rank: 8,
  },
  {
    id: "u9",
    name: "Drew Taylor",
    avatar: "/placeholder.svg?height=40&width=40&query=9",
    score: 690,
    streak: 8,
    change: "down",
    rank: 9,
  },
  {
    id: "u10",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40&query=10",
    score: 650,
    streak: 7,
    change: "up",
    rank: 10,
    isCurrentUser: true,
  },
]

const friendsUsers = [
  {
    id: "f1",
    name: "Jamie Smith",
    avatar: "/colorful-abstract-shapes.png",
    score: 920,
    streak: 28,
    change: "up",
    rank: 1,
  },
  {
    id: "f2",
    name: "Casey Wilson",
    avatar: "/abstract-geometric-shapes.png",
    score: 820,
    streak: 18,
    change: "up",
    rank: 2,
  },
  {
    id: "f3",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40&query=10",
    score: 650,
    streak: 7,
    change: "up",
    rank: 3,
    isCurrentUser: true,
  },
  {
    id: "f4",
    name: "Morgan White",
    avatar: "/placeholder.svg?height=40&width=40&query=7",
    score: 620,
    streak: 5,
    change: "down",
    rank: 4,
  },
  {
    id: "f5",
    name: "Drew Taylor",
    avatar: "/placeholder.svg?height=40&width=40&query=9",
    score: 580,
    streak: 3,
    change: "same",
    rank: 5,
  },
]

interface LeaderboardTableProps {
  type: "global" | "friends"
}

export function LeaderboardTable({ type }: LeaderboardTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const users = type === "global" ? globalUsers : friendsUsers

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-2 text-sm font-medium">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-2 text-right">Score</div>
          <div className="col-span-2 text-right">Streak</div>
          <div className="col-span-2 text-right">Change</div>
        </div>

        <div className="divide-y">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className={`grid grid-cols-12 items-center px-4 py-3 ${user.isCurrentUser ? "bg-primary/5" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
            >
              <div className="col-span-1 font-mono text-sm">
                {user.rank <= 3 ? (
                  <Badge
                    variant={user.rank === 1 ? "default" : "outline"}
                    className="h-6 w-6 p-0 flex items-center justify-center"
                  >
                    {user.rank}
                  </Badge>
                ) : (
                  user.rank
                )}
              </div>
              <div className="col-span-5 flex items-center">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{user.name}</div>
                {user.isCurrentUser && (
                  <Badge variant="outline" className="ml-2">
                    You
                  </Badge>
                )}
              </div>
              <div className="col-span-2 text-right font-mono">{user.score}</div>
              <div className="col-span-2 text-right font-mono">{user.streak} days</div>
              <div className="col-span-2 flex justify-end">{getChangeIcon(user.change)}</div>
            </motion.div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">No users found</div>
          )}
        </div>
      </div>
    </div>
  )
}
