"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, X, Calendar, Award } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  isSameDay,
  parseISO,
  addDays,
  isBefore,
} from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { financialData } from "@/lib/financial-data"

export function StreakCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const streakData = financialData.streakData

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const isActiveDay = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return streakData.activeStreakDays.includes(dateString)
  }

  const isMissedDay = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return streakData.missedDays.includes(dateString)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setShowDialog(true)
  }

  const getDateStatus = (date: Date) => {
    if (isActiveDay(date)) return "completed"
    if (isMissedDay(date)) return "missed"
    if (isSameDay(date, new Date())) return "today"
    if (isBefore(date, new Date())) return "missed"
    return "upcoming"
  }

  const getDateStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "You completed your daily financial tasks on this day!"
      case "missed":
        return "You missed your daily financial tasks on this day."
      case "today":
        return "Today! Complete your daily financial tasks to maintain your streak."
      case "upcoming":
        return "This day is coming up. Stay consistent with your financial habits!"
      default:
        return ""
    }
  }

  // Calculate streak progress
  const streakProgress = (streakData.currentStreak / streakData.streakGoal) * 100

  // Generate next 7 days for the forecast
  const generateForecast = () => {
    const today = new Date()
    const forecast = []

    for (let i = 0; i < 7; i++) {
      const forecastDate = addDays(today, i)
      forecast.push({
        date: forecastDate,
        isToday: i === 0,
        status: i === 0 ? "today" : "upcoming",
      })
    }

    return forecast
  }

  const forecast = generateForecast()

  // Mark today's streak
  const markTodayComplete = () => {
    alert("Great job! You've completed your financial tasks for today!")
    // In a real app, this would update the database
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Streak Calendar</CardTitle>
          <CardDescription>Track your daily financial habits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <motion.button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800"
              onClick={prevMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            <h3 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
            <motion.button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800"
              onClick={nextMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {monthDays.map((day, i) => {
              const isActive = isActiveDay(day)
              const isMissed = isMissedDay(day)
              const isCurrentDay = isToday(day)
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isSelected = selectedDate && isSameDay(day, selectedDate)

              return (
                <motion.button
                  key={i}
                  className={`aspect-square flex items-center justify-center rounded-sm text-xs 
                    ${isActive ? "bg-green-500 text-white" : isMissed ? "bg-red-400 text-white" : "bg-zinc-800 text-white"}
                    ${isCurrentDay ? "ring-2 ring-white" : ""}
                    ${!isCurrentMonth ? "opacity-30" : ""}
                    ${isSelected ? "ring-2 ring-blue-500" : ""}
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  onClick={() => handleDateClick(day)}
                >
                  {isActive && <Check className="h-3 w-3" />}
                  {isMissed && <X className="h-3 w-3" />}
                  {!isActive && !isMissed && format(day, "d")}
                </motion.button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-sm bg-green-500"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-sm bg-red-400"></div>
              <span>Missed</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-sm bg-zinc-800"></div>
              <span>Upcoming</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {isToday(new Date()) && !isActiveDay(new Date()) && (
        <Card className="border-green-500/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Today's Financial Tasks</h3>
                <p className="text-sm text-muted-foreground">Complete these to maintain your streak</p>
              </div>
              <Button onClick={markTodayComplete} className="bg-green-500 hover:bg-green-600">
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Streak Progress</CardTitle>
          <CardDescription>You're on a {streakData.currentStreak} day streak!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Streak</span>
                <span className="text-sm font-medium">
                  {streakData.currentStreak}/{streakData.streakGoal} days
                </span>
              </div>
              <Progress value={streakProgress} className="mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm text-muted-foreground">Longest Streak</p>
                <p className="text-2xl font-bold">{streakData.longestStreak}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm text-muted-foreground">Total Completed</p>
                <p className="text-2xl font-bold">{streakData.totalCompletedDays}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7-Day Forecast</CardTitle>
          <CardDescription>Plan ahead to maintain your streak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {forecast.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`rounded-full p-1 ${day.isToday ? "bg-primary" : "bg-muted"}`}>
                  <Calendar
                    className={`h-4 w-4 ${day.isToday ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
                </div>
                <p className="mt-1 text-xs font-medium">{format(day.date, "EEE")}</p>
                <p className="text-xs text-muted-foreground">{format(day.date, "d")}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Milestones you've reached</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {streakData.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    achievement.achieved ? "bg-yellow-500" : "bg-zinc-800"
                  }`}
                >
                  <Award className={`h-5 w-5 ${achievement.achieved ? "text-black" : "text-zinc-400"}`} />
                </div>
                <div>
                  <p className="font-medium">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.achieved && achievement.date && (
                    <p className="text-xs text-muted-foreground">
                      Achieved on {format(parseISO(achievement.date), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          {selectedDate && (
            <>
              <DialogHeader>
                <DialogTitle>{format(selectedDate, "EEEE, MMMM d, yyyy")}</DialogTitle>
                <DialogDescription>{getDateStatusText(getDateStatus(selectedDate))}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      isActiveDay(selectedDate)
                        ? "bg-green-500"
                        : isMissedDay(selectedDate)
                          ? "bg-red-400"
                          : "bg-zinc-800"
                    }`}
                  >
                    {isActiveDay(selectedDate) && <Check className="h-4 w-4 text-white" />}
                    {isMissedDay(selectedDate) && <X className="h-4 w-4 text-white" />}
                    {!isActiveDay(selectedDate) && !isMissedDay(selectedDate) && (
                      <Calendar className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {isActiveDay(selectedDate) ? "Completed" : isMissedDay(selectedDate) ? "Missed" : "Upcoming"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isActiveDay(selectedDate)
                        ? "Great job maintaining your streak!"
                        : isMissedDay(selectedDate)
                          ? "Try to be consistent next time."
                          : "Plan ahead to maintain your streak."}
                    </p>
                  </div>
                </div>

                {isActiveDay(selectedDate) && (
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm font-medium">Activities completed:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>Daily budget review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>Expense tracking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>Savings goal contribution</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
