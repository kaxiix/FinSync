"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and authentication</p>
      </div>

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>

        <Button type="submit" isLoading={isLoading}>
          Update Password
        </Button>
      </form>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Two-Factor Authentication</h4>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
            <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Switch id="2fa" />
        </div>

        <Button variant="outline">Set Up Two-Factor Authentication</Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Sessions</h4>
        <p className="text-sm text-muted-foreground">You're currently signed in on this device.</p>

        <Button variant="destructive">Sign Out of All Devices</Button>
      </div>
    </div>
  )
}
