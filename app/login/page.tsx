import { LoginForm } from "@/components/auth/login-form"
import { AnimatedLogo } from "@/components/ui/animated-logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="mb-8">
        <AnimatedLogo size="lg" />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
          <p className="text-zinc-400">Sign in to continue to FinX</p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm">
          <span className="text-zinc-400">Don't have an account? </span>
          <Link href="/register" className="text-cyan-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
