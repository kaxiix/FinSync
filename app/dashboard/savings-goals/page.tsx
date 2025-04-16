import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SavingsGoalsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader heading="Savings Goals" subheading="Track your progress towards your financial goals" />

      <Card>
        <CardHeader>
          <CardTitle>Emergency Fund</CardTitle>
          <CardDescription>Target: $10,000 by December 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Current balance:</span>
              <span className="font-medium">$7,500</span>
            </div>

            <Progress value={75} className="h-2" />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$0</span>
              <span>$10,000</span>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span>Monthly contribution:</span>
                <span className="font-medium">$500</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Estimated completion:</span>
                <span className="font-medium text-emerald-500">December 2023</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
