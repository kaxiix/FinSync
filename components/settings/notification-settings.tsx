"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications</p>
      </div>

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Email Notifications</h4>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-transactions">Transaction Updates</Label>
              <p className="text-xs text-muted-foreground">Receive emails about your transactions</p>
            </div>
            <Switch id="email-transactions" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-budget">Budget Alerts</Label>
              <p className="text-xs text-muted-foreground">Get notified when you're close to budget limits</p>
            </div>
            <Switch id="email-budget" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-tips">Financial Tips</Label>
              <p className="text-xs text-muted-foreground">Receive personalized financial advice</p>
            </div>
            <Switch id="email-tips" />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Push Notifications</h4>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-transactions">Transaction Alerts</Label>
              <p className="text-xs text-muted-foreground">Get notified about new transactions</p>
            </div>
            <Switch id="push-transactions" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-reminders">Daily Reminders</Label>
              <p className="text-xs text-muted-foreground">Reminders to complete your daily questionnaire</p>
            </div>
            <Switch id="push-reminders" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-goals">Goal Progress</Label>
              <p className="text-xs text-muted-foreground">Updates on your savings goals progress</p>
            </div>
            <Switch id="push-goals" defaultChecked />
          </div>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </form>
    </div>
  )
}
