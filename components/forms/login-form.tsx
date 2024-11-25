"use client"

import { useState } from "react"
import { useAuthRouter } from "@/hooks/use-auth-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { navigate } = useAuthRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="flex flex-col space-y-2 text-center text-sm">
        <button
          onClick={() => navigate("signup")}
          className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          Don&apos;t have an account? Sign Up
        </button>
        <button
          onClick={() => navigate("forgotPassword")}
          className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          Forgot your password?
        </button>
      </div>
    </div>
  )
}