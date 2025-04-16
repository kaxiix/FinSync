export interface User {
  id: string
  email: string
  monthlyIncome: number
  savingsGoal: number
  streak: number
  lastQuestionnaireDate: string | null
}

export interface Transaction {
  id: string
  description: string
  amount: number
  date: Date
  category: string
  status: "completed" | "pending" | "failed"
}

export interface SavingsGoal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
  priority: string
  category: string
  monthlyContribution: number
}
