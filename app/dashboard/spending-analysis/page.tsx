import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SpendingAnalysisPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        heading="Spending Analysis"
        subheading="Review your spending patterns and identify areas for improvement"
      />

      <Card>
        <CardHeader>
          <CardTitle>Restaurant Spending Alert</CardTitle>
          <CardDescription>Your restaurant spending is 40% higher than last month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We've noticed that your spending on restaurants has increased significantly compared to your usual patterns.
            This might be an area where you could potentially save money.
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span>This month:</span>
              <span className="font-medium">$420</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Last month:</span>
              <span className="font-medium">$300</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Increase:</span>
              <span className="font-medium text-amber-500">+40%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
