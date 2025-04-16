import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardStats } from "@/components/leaderboard/leaderboard-stats"
import { LeaderboardAchievements } from "@/components/leaderboard/leaderboard-achievements"
import { Skeleton } from "@/components/ui/skeleton"

export default function LeaderboardPage() {
  return (
    <main className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Financial Leaderboard</h1>
        <p className="text-muted-foreground">See how your financial habits compare with others</p>
      </div>

      <Tabs defaultValue="global" className="space-y-4">
        <TabsList>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card className="glyph-border">
            <CardHeader>
              <CardTitle>Your Ranking</CardTitle>
              <CardDescription>Your position on the global leaderboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[100px] w-full" />}>
                <LeaderboardStats />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="glyph-border">
            <CardHeader>
              <CardTitle>Global Rankings</CardTitle>
              <CardDescription>Top performers in financial habits</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <LeaderboardTable type="global" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="space-y-4">
          <Card className="glyph-border">
            <CardHeader>
              <CardTitle>Friends Rankings</CardTitle>
              <CardDescription>See how your friends are doing</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <LeaderboardTable type="friends" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card className="glyph-border">
            <CardHeader>
              <CardTitle>Top Achievements</CardTitle>
              <CardDescription>Most impressive financial milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <LeaderboardAchievements />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
