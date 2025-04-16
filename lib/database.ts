import { createClient } from "@supabase/supabase-js"
import type { Transaction, MonthlyStats, SavingsGoal } from "@/types/finance"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function getTransactions(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("transaction_date", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Transaction[]
}

export async function addTransaction(userId: string, transaction: Omit<Transaction, "id">) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id: userId,
        ...transaction,
      },
    ])
    .select()

  if (error) throw error
  return data[0] as Transaction
}

export async function getMonthlyStats(userId: string, year: number) {
  const { data, error } = await supabase
    .from("monthly_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("year", year)
    .order("month", { ascending: true })

  if (error) throw error
  return data as MonthlyStats[]
}

export async function getSavingsGoals(userId: string) {
  const { data, error } = await supabase.from("financial_goals").select("*").eq("user_id", userId)

  if (error) throw error
  return data as SavingsGoal[]
}

export async function updateSavingsGoal(goalId: string, amount: number) {
  const { data, error } = await supabase
    .from("financial_goals")
    .update({ current_amount: amount })
    .eq("id", goalId)
    .select()

  if (error) throw error
  return data[0] as SavingsGoal
}

export async function getChatHistory(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function saveQuestionnaireResponse(userId: string, questionId: string, response: string) {
  const { data, error } = await supabase.from("questionnaire_responses").insert([
    {
      user_id: userId,
      question_id: questionId,
      response,
    },
  ])

  if (error) throw error
  return data
}
