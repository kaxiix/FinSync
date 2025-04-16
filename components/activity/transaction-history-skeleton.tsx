import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TransactionHistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Skeleton className="h-4 w-32 mr-8" />
            <Skeleton className="h-4 w-24 mr-8" />
            <Skeleton className="h-4 w-24 mr-8" />
            <Skeleton className="h-4 w-16 ml-auto mr-8" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="h-4 w-40 mr-8" />
                <Skeleton className="h-6 w-24 mr-8" />
                <Skeleton className="h-4 w-24 mr-8" />
                <Skeleton className="h-4 w-16 ml-auto mr-8" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ))}

          <div className="flex items-center justify-between pt-4">
            <Skeleton className="h-4 w-48" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
