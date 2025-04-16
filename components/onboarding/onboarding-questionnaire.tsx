"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

interface OnboardingQuestionnaireProps {
  step: number
}

export function OnboardingQuestionnaire({ step }: OnboardingQuestionnaireProps) {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000)
  const [savingsGoal, setSavingsGoal] = useState<number>(20)
  const [financialGoals, setFinancialGoals] = useState<string[]>([])

  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="monthly-income">What is your monthly income?</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">$</span>
              <Input
                id="monthly-income"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">Enter your average monthly income after taxes</p>
          </div>

          <div className="space-y-2">
            <Label>What is your employment status?</Label>
            <RadioGroup defaultValue="full-time">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="full-time" />
                <Label htmlFor="full-time">Full-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="part-time" />
                <Label htmlFor="part-time">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self-employed" id="self-employed" />
                <Label htmlFor="self-employed">Self-employed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unemployed" id="unemployed" />
                <Label htmlFor="unemployed">Unemployed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="retired" id="retired" />
                <Label htmlFor="retired">Retired</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )

    case 2:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>What percentage of your income would you like to save?</Label>
            <div className="space-y-4">
              <Slider
                value={[savingsGoal]}
                onValueChange={(values) => setSavingsGoal(values[0])}
                min={0}
                max={50}
                step={1}
              />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">0%</span>
                <span className="font-medium">{savingsGoal}%</span>
                <span className="text-sm text-muted-foreground">50%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Financial experts recommend saving 15-20% of your income</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-category">Which expense category do you spend the most on?</Label>
            <Select>
              <SelectTrigger id="expense-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="financial-knowledge">How would you rate your financial knowledge?</Label>
            <RadioGroup defaultValue="intermediate">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced">Advanced</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )

    case 3:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>What are your primary financial goals?</Label>
            <p className="text-xs text-muted-foreground">Select all that apply</p>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { id: "emergency-fund", label: "Build emergency fund" },
                { id: "debt-free", label: "Become debt-free" },
                { id: "home", label: "Buy a home" },
                { id: "retirement", label: "Save for retirement" },
                { id: "education", label: "Education savings" },
                { id: "travel", label: "Travel" },
                { id: "car", label: "Buy a car" },
                { id: "investing", label: "Start investing" },
              ].map((goal) => (
                <motion.div key={goal.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <div
                    className={`flex cursor-pointer items-center justify-center rounded-md border p-3 text-center text-sm ${
                      financialGoals.includes(goal.id)
                        ? "border-primary bg-primary/5 font-medium"
                        : "border-border bg-background"
                    }`}
                    onClick={() => {
                      if (financialGoals.includes(goal.id)) {
                        setFinancialGoals(financialGoals.filter((g) => g !== goal.id))
                      } else {
                        setFinancialGoals([...financialGoals, goal.id])
                      }
                    }}
                  >
                    {goal.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fin-expectations">What would you like Fin to help you with?</Label>
            <Select>
              <SelectTrigger id="fin-expectations">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budgeting">Budgeting advice</SelectItem>
                <SelectItem value="saving">Saving strategies</SelectItem>
                <SelectItem value="investing">Investment guidance</SelectItem>
                <SelectItem value="debt">Debt management</SelectItem>
                <SelectItem value="goals">Goal tracking</SelectItem>
                <SelectItem value="all">All of the above</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )

    default:
      return null
  }
}
