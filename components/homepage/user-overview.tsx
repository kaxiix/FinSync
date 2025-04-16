"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Bell, Calendar, DollarSign, Wallet } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function UserOverview() {
  const [showAllPayments, setShowAllPayments] = useState(false)

  // Sample user data
  const userData = {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    balance: 4285.75,
    streak: 7,
    upcomingPayments: [
      { id: 1, name: "Rent", amount: 1200, date: "May 15", isPaid: false },
      { id: 2, name: "Internet", amount: 79.99, date: "May 18", isPaid: false },
      { id: 3, name: "Phone Bill", amount: 45.5, date: "May 20", isPaid: false },
      { id: 4, name: "Electricity", amount: 120.75, date: "May 22", isPaid: false },
    ],
  }

  const displayedPayments = showAllPayments ? userData.upcomingPayments : userData.upcomingPayments.slice(0, 2)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Your Overview</CardTitle>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{userData.name}</p>
            <p className="text-xs text-muted-foreground">Premium Member</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <Wallet className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Balance</span>
            </div>
            <p className="mt-2 text-lg font-semibold">${userData.balance.toLocaleString()}</p>
          </div>

          <div className="flex flex-col rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Streak</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-lg font-semibold">{userData.streak} days</p>
              <Badge variant="outline" className="h-5 text-xs">
                +2 <ArrowUpRight className="ml-1 h-3 w-3" />
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium">Upcoming Payments</h3>
            <Badge variant="secondary" className="text-xs">
              {userData.upcomingPayments.length} total
            </Badge>
          </div>

          <div className="space-y-3">
            {displayedPayments.map((payment) => (
              <motion.div
                key={payment.id}
                className="flex items-center justify-between rounded-lg border p-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-500/10 p-2">
                    <DollarSign className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{payment.name}</p>
                    <p className="text-xs text-muted-foreground">Due {payment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">${payment.amount}</p>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Pay
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {userData.upcomingPayments.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full"
              onClick={() => setShowAllPayments(!showAllPayments)}
            >
              {showAllPayments ? "Show Less" : "Show All"}
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/activity">View All Transactions</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
