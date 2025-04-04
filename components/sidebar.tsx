import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  LayoutDashboard,
  Wallet,
  Flame,
  User2,
  Bot,
  ClipboardCheck,
  Activity,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="border-r border-dotted border-gray-800 bg-black backdrop-blur">
      <div className="flex h-16 items-center gap-2 border-b border-dotted border-gray-800 px-6">
        <Wallet className="h-6 w-6" />
        <span className="font-bold">FinSync</span>
      </div>
      <div className="px-4 py-6">
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 p-3 border border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Current Streak</span>
              <span className="font-bold text-orange-500">🔥 7 Days</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">Best: 14</span>
        </div>
      </div>
      <nav className="space-y-2 px-2 flex-1">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/chat">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Bot className="h-4 w-4" />
            Ask Fin
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <ClipboardCheck className="h-4 w-4" />
          Questinare
        </Button>
        <Link href="/activity">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </Button>
        </Link>

        <div className="mt-auto px-2 pt-5 py-4">
          <Link href="/profile">
            <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-3 border border-purple-500/20">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <User2 className="h-5 w-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-gray-400">Pro Member</span>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
