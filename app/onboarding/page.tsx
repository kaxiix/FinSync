"use client"

import { OnboardingQuestionnaire } from "@/components/onboarding/onboarding-questionnaire"
import { AnimatedLogo } from "@/components/ui/animated-logo"

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="mb-8">
        <AnimatedLogo size="lg" />
      </div>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Welcome to FinX</h1>
          <p className="text-zinc-400">Let's set up your financial profile to get personalized insights</p>
        </div>
        <OnboardingQuestionnaire />
      </div>
    </div>
  )
}
