import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyQuestionnaire } from "@/components/shared/daily-questionnaire"
import { Skeleton } from "@/components/ui/skeleton"

export default function QuestionnairePage() {
  return (
    <main className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Daily Questionnaire</h1>
        <p className="text-muted-foreground">
          Answer these questions to improve your financial habits and track your progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glyph-border">
          <CardHeader>
            <CardTitle>Today's Questions</CardTitle>
            <CardDescription>Complete your daily financial check-in</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <DailyQuestionnaire />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="glyph-border">
          <CardHeader>
            <CardTitle>Financial Responsibility Score</CardTitle>
            <CardDescription>Track your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative mb-4 flex h-36 w-36 items-center justify-center rounded-full border-8 border-primary/20">
                  <div className="text-4xl font-bold">85</div>
                  <div className="absolute -top-2 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    +2
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-medium">Excellent</h3>
                <p className="text-center text-sm text-muted-foreground">
                  You've maintained a streak of 7 days. Keep it up!
                </p>

                <div className="mt-8 w-full">
                  <h4 className="mb-2 font-medium">Recent Activity</h4>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div key={day} className="flex flex-col items-center">
                        <div className="h-20 w-8 rounded-t-full bg-primary" />
                        <div className="text-xs text-muted-foreground">{day === 7 ? "Today" : `Day ${day}`}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
