"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FinancialSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Financial settings updated",
        description: "Your financial settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update financial settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Financial Settings</h3>
        <p className="text-sm text-muted-foreground">Update your financial preferences and goals</p>
      </div>

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income</Label>
          <Input id="monthlyIncome" type="number" defaultValue="5000" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="savingsGoal">Monthly Savings Goal</Label>
          <Input id="savingsGoal" type="number" defaultValue="1000" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select defaultValue="usd">
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
              <SelectItem value="gbp">GBP (£)</SelectItem>
              <SelectItem value="jpy">JPY (¥)</SelectItem>
              <SelectItem value="cad">CAD ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetStartDay">Budget Start Day</Label>
          <Select defaultValue="1">
            <SelectTrigger id="budgetStartDay">
              <SelectValue placeholder="Select start day" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">The day of the month when your budget cycle starts</p>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </form>
    </div>
  )
}
