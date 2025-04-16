"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus, MoreHorizontal, Check, Clock, Target, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample data - in a real app, this would come from your API
const initialGoals = [
  {
    id: "g1",
    name: "Emergency Fund",
    target: 10000,
    current: 6500,
    deadline: "2023-12-31",
    priority: "high",
    category: "emergency",
    monthlyContribution: 500,
  },
  {
    id: "g2",
    name: "Vacation to Japan",
    target: 5000,
    current: 2200,
    deadline: "2024-06-30",
    priority: "medium",
    category: "travel",
    monthlyContribution: 300,
  },
  {
    id: "g3",
    name: "New Laptop",
    target: 2000,
    current: 1800,
    deadline: "2023-09-30",
    priority: "low",
    category: "electronics",
    monthlyContribution: 200,
  },
]

export function SavingsGoals() {
  const [goals, setGoals] = useState(initialGoals)
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: 0,
    current: 0,
    deadline: "",
    priority: "medium",
    category: "other",
    monthlyContribution: 0,
  })

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

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target > 0 && newGoal.deadline) {
      const id = `g${goals.length + 1}`
      setGoals([...goals, { ...newGoal, id }])
      setShowAddGoalDialog(false)
      setNewGoal({
        name: "",
        target: 0,
        current: 0,
        deadline: "",
        priority: "medium",
        category: "other",
        monthlyContribution: 0,
      })
    }
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-rose-500 text-white">High</Badge>
      case "medium":
        return <Badge className="bg-amber-500 text-white">Medium</Badge>
      case "low":
        return <Badge className="bg-emerald-500 text-white">Low</Badge>
      default:
        return null
    }
  }

  const getTimeRemaining = (deadline: string) => {
    const today = new Date()
    const targetDate = new Date(deadline)
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return "Overdue"
    } else if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Tomorrow"
    } else if (diffDays < 30) {
      return `${diffDays} days left`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} month${months > 1 ? "s" : ""} left`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} year${years > 1 ? "s" : ""} left`
    }
  }

  return (
    <>
      <Card className="overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Savings Goals</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-zinc-800"
              onClick={() => setShowAddGoalDialog(true)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Goal
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-zinc-400">
              View All <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            {goals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-zinc-800 p-3 mb-3">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">No savings goals yet</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Create your first savings goal to start tracking your progress
                </p>
                <Button
                  variant="outline"
                  className="mt-4 rounded-full border-zinc-800"
                  onClick={() => setShowAddGoalDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Goal
                </Button>
              </div>
            ) : (
              goals.map((goal) => {
                const progress = Math.round((goal.current / goal.target) * 100)

                return (
                  <motion.div
                    key={goal.id}
                    variants={item}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 transition-all duration-300 hover:bg-zinc-900/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{goal.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
                          <DropdownMenuItem className="text-white hover:bg-zinc-800">
                            <Check className="mr-2 h-4 w-4" />
                            Add Funds
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-zinc-800">
                            <Clock className="mr-2 h-4 w-4" />
                            Adjust Timeline
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-zinc-800">
                            <Target className="mr-2 h-4 w-4" />
                            Edit Goal
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem
                            className="text-red-500 hover:bg-zinc-800"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Goal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(goal.priority)}
                        <span className="text-xs text-zinc-400">{getTimeRemaining(goal.deadline)}</span>
                      </div>
                      <span className="text-sm font-medium">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>

                    <Progress value={progress} className="h-2 bg-zinc-800" indicatorClassName="bg-white" />

                    <div className="flex items-center justify-between mt-2 text-xs text-zinc-400">
                      <span>Contributing ${goal.monthlyContribution}/month</span>
                      <span>{progress}% complete</span>
                    </div>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog open={showAddGoalDialog} onOpenChange={setShowAddGoalDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Add New Savings Goal</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new savings goal to track your progress.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                placeholder="e.g., Vacation Fund"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target Amount ($)</Label>
                <Input
                  id="target"
                  type="number"
                  placeholder="5000"
                  value={newGoal.target || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current">Current Amount ($)</Label>
                <Input
                  id="current"
                  type="number"
                  placeholder="0"
                  value={newGoal.current || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Contribution ($)</Label>
                <Input
                  id="monthly"
                  type="number"
                  placeholder="200"
                  value={newGoal.monthlyContribution || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: Number(e.target.value) })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex gap-2">
                {["low", "medium", "high"].map((priority) => (
                  <Button
                    key={priority}
                    type="button"
                    variant={newGoal.priority === priority ? "default" : "outline"}
                    className={`flex-1 capitalize ${
                      newGoal.priority === priority
                        ? "bg-white text-black"
                        : "border-zinc-800 bg-transparent text-white hover:bg-zinc-800"
                    }`}
                    onClick={() => setNewGoal({ ...newGoal, priority })}
                  >
                    {priority}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddGoalDialog(false)}
              className="border-zinc-800 bg-transparent text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button onClick={handleAddGoal} className="bg-white text-black hover:bg-zinc-200">
              Add Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
