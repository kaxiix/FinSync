import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedLogo } from "@/components/ui/animated-logo"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="mb-8">
        <AnimatedLogo size="lg" />
      </div>
      <h1 className="mb-2 text-4xl font-bold">404</h1>
      <h2 className="mb-6 text-xl">Page Not Found</h2>
      <p className="mb-8 max-w-md text-center text-zinc-400">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track with your financial
        journey.
      </p>
      <Button asChild>
        <Link href="/">Return to Dashboard</Link>
      </Button>
    </div>
  )
}
