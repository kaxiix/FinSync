import { RegisterForm } from "@/components/auth/register-form"
import { AnimatedLogo } from "@/components/ui/animated-logo"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="mb-8">
        <AnimatedLogo size="lg" />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Create an account</h1>
          <p className="text-zinc-400">Sign up to get started with FinX</p>
        </div>
        <RegisterForm />
        <div className="mt-6 text-center text-sm">
          <span className="text-zinc-400">Already have an account? </span>
          <Link href="/login" className="text-cyan-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
