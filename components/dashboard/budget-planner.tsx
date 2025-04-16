"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus, Edit2, Trash2, PieChart, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - in a real app, this would come from your API
const initialBudgets = [
  {
    id: "b1",
    category: "Housing",
    budgeted: 1200,
    spent: 1200,
    remaining: 0,
    percentage: 100,
  },
  {
    id: "b2",
    category: "Food & Dining",
    budgeted: 600,
    spent: 450,
    remaining: 150,
    percentage: 75,
  },
  {
    id: "b3",
    category: "Transportation",
    budgeted: 300,
    spent: 275,
    remaining: 25,
    percentage: 92,
  },
  {
    id: "b4",
    category: "Entertainment",
    budgeted: 200,
    spent: 180,
    remaining: 20,
    percentage: 90,
  },
  {
    id: "b5",
    category: "Shopping",
    budgeted: 150,
    spent: 200,
    remaining: -50,
    percentage: 133,
  },
]

export function BudgetPlanner() {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [showAddBudgetDialog, setShowAddBudgetDialog] = useState(false)
  const [editingBudget, setEditingBudget] = useState<string | null>(null)
  const [newBudget, setNewBudget] = useState({
    category: "",
    budgeted: 0,
  })
  const [activeTab, setActiveTab] = useState("all")

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

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.budgeted > 0) {
      if (editingBudget) {
        setBudgets(
          budgets.map((budget) =>
            budget.id === editingBudget
              ? {
                  ...budget,
                  category: newBudget.category,
                  budgeted: newBudget.budgeted,
                  remaining: newBudget.budgeted - budget.spent,
                  percentage: Math.round((budget.spent / newBudget.budgeted) * 100),
                }
              : budget
          )
        )
        setEditingBudget(null)
      } else {
        const id = `b${budgets.length + 1}`
        setBudgets([
          ...budgets,
          {
            id,
            category: newBudget.category,
            budgeted: newBudget.budgeted,
            spent: 0,
            remaining: newBudget.budgeted,
            percentage: 0,
          },
        ])
      }
      setShowAddBudgetDialog(false)
      setNewBudget({
        category: "",
        budgeted: 0,
      })
    }
  }

  const handleEditBudget = (id: string) => {
    const budget = budgets.find((b) => b.id === id)
    if (budget) {
      setNewBudget({
        category: budget.category,
        budgeted: budget.budgeted,
      })
      setEditingBudget(id)
      setShowAddBudgetDialog(true)
    }
  }

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id))
  }

  const filteredBudgets = activeTab === "all" 
    ? budgets 
    : activeTab === "overspent" 
      ? budgets.filter(b => b.percentage > 100)
      : budgets.filter(b => b.percentage <= 100)

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent
  const overallPercentage = Math.round((totalSpent / totalBudgeted) * 100) || 0

  return (
    <>
      <Card className="overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/80 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Budget Planner</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 rounded-full border-zinc-800"
              onClick={() => {
                setEditingBudget(null)
                setNewBudget({
                  category: "",
                  budgeted: 0,
                })
                setShowAddBudgetDialog(true)
              }}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Category
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-zinc-400">
              View All <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Budget Summary */}
          <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-zinc-400">Total Budgeted</p>
                <p className="text-xl font-bold">${totalBudgeted.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Total Spent</p>
                <p className="text-xl font-bold">${totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Remaining</p>
                <p className={`text-xl font-bold ${totalRemaining < 0 ? "text-red-500" : ""}`}>
                  ${totalRemaining.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Budget</span>
                <span>{overallPercentage}% used</span>
              </div>
              <Progress 
                value={overallPercentage} 
                className="h-2 bg-zinc-800" 
                indicatorClassName={overallPercentage > 100 ? "bg-red-500" : "bg-white"} 
              />
            </div>
          </div>

          {/* Budget Categories Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-900 p-1 rounded-full">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="good"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
              >
                On Track
              </TabsTrigger>
              <TabsTrigger
                value="overspent"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Overspent
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            {filteredBudgets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-zinc-800 p-3 mb-3">
                  <PieChart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">No budget categories found</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  {activeTab === "all" 
                    ? "Create your first budget category to start tracking your spending" 
                    : activeTab === "overspent" 
                      ? "No overspent categories - great job!" 
                      : "No categories on track - add some budgets to get started"}
                </p>
                {activeTab === "all" && (
                  <Button 
                    variant="outline" 
                    className="mt-4 rounded-full border-zinc-800"
                    onClick={() => {
                      setEditingBudget(null)
                      setNewBudget({
                        category: "",
                        budgeted: 0,
                      })
                      setShowAddBudgetDialog(true)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Budget
                  </Button>
                )}
              </div>
            ) : (
              filteredBudgets.map((budget) => (
                <motion.div
                  key={budget.id}
                  variants={item}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 transition-all duration-300 hover:bg-zinc-900/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{budget.category}</h3>
                    <div className="flex items-center gap-2">
                      {budget.percentage > 100 && (
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                          Overspent
                        </Badge>
                      )}
                      {budget.percentage >= 90 && budget.percentage <= 100 && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          Almost Full
                        </Badge>
                      )}
                      {budget.percentage < 50 && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          On Track
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 rounded-full"
                        onClick={() => handleEditBudget(budget.id)}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 rounded-full text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteBudget(budget.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">
                      ${budget.spent.toLocaleString()} of ${budget.budgeted.toLocaleString()}
                    </span>
                    <span className={`text-sm font-medium ${budget.remaining < 0 ? "text-red-500" : "text-zinc-400"}`}>
                      {budget.remaining < 0 ? "-" : ""}${Math.abs(budget.remaining).toLocaleString()} remaining
                    </span>
                  </div>
                  
                  <Progress 
                    value={budget.percentage > 100 ? 100 : budget.percentage} 
                    className="h-2 bg-zinc-800" 
                    indicatorClassName={budget.percentage > 100 ? "bg-red-500" : "bg-white"} 
                  />
                  
                  <div className="flex items-center justify-end mt-2 text-xs text-zinc-400">
                    <span>{budget.percentage}% used</span>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          <Button 
            variant="outline" 
            className="mt-4 w-full justify-center gap-2 rounded-full border-zinc-800"
            onClick={() => {
              // In a real app, this would navigate to a detailed budget page
            }}
          >
            Detailed Budget Analysis
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Add/Edit Budget Dialog */}
      <Dialog open={showAddBudgetDialog} onOpenChange={setShowAddBudgetDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>{editingBudget ? "Edit Budget Category" : "Add Budget Category"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingBudget 
                ? "Update your budget category details." 
                : "Create a new budget category to track your spending."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category Name</Label>
              <Input
                id="category"
                placeholder="e.g., Groceries"
                value={newBudget.category}
                onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                className

\
Let's fix the recent-transactions.tsx file to properly export the RecentTransactions component:
