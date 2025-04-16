"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

// Mock data - would come from your database in a real app
const savingsGoal = {
  name: "Emergency Fund",
  targetAmount: 10000,
  currentAmount: 6500,
  progress: 65,
}

export function SavingsGoalCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">{savingsGoal.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold">${savingsGoal.currentAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">of ${savingsGoal.targetAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="relative">
          <Progress value={savingsGoal.progress} className="h-2" />
          <motion.span
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {savingsGoal.progress}%
          </motion.span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            ${(savingsGoal.targetAmount - savingsGoal.currentAmount).toLocaleString()} to go
          </p>
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Funds
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
