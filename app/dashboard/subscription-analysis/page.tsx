import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export default function SubscriptionAnalysisPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader heading="Subscription Analysis" subheading="Optimize your recurring expenses and save money" />

      <Card>
        <CardHeader>
          <CardTitle>Unused Subscriptions</CardTitle>
          <CardDescription>You could save $240 annually by canceling these subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-medium">StreamFlix Premium</h3>
                <p className="text-sm text-muted-foreground">Last used: 3 months ago</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$14.99/month</p>
                <p className="text-sm text-muted-foreground">$179.88/year</p>
              </div>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-medium">FitTrack Pro</h3>
                <p className="text-sm text-muted-foreground">Last used: 2 months ago</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$4.99/month</p>
                <p className="text-sm text-muted-foreground">$59.88/year</p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Button className="flex-1" variant="outline">
                <Check className="mr-2 h-4 w-4" /> Keep All
              </Button>
              <Button className="flex-1">
                <X className="mr-2 h-4 w-4" /> Cancel Selected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
