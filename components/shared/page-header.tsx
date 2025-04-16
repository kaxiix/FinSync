import type React from "react"
import { Separator } from "@/components/ui/separator"

interface PageHeaderProps {
  heading: string
  subheading?: string
  children?: React.ReactNode
}

export function PageHeader({ heading, subheading, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          {subheading && <p className="text-sm text-muted-foreground">{subheading}</p>}
        </div>
        {children}
      </div>
      <Separator />
    </div>
  )
}
