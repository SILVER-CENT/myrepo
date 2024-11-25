'use client'

import { useState } from "react"
import { useAuthRouter } from "@/hooks/use-auth-router"
import { FormBuilder } from "@/lib/form-builder"
import { CompositeComponentConfig } from "@/lib/form-builder/types"

const forgotPasswordFormConfig: CompositeComponentConfig = {
  id: "forgot-password-form",
  name: "Forgot Password",
  description: "Reset your password",
  layout: "vertical",
  className: "space-y-4",
  components: [
    {
      id: "email",
      type: "input",
      label: "Email",
      placeholder: "name@example.com",
      validation: [
        {
          type: "required",
          message: "Email is required",
        },
        {
          type: "pattern",
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      ],
      className: "w-full",
    },
    {
      id: "submit",
      type: "button",
      label: "Send Reset Link",
      className: "w-full mt-4",
    },
    {
      id: "nav-links",
      type: "nav-links",
      label: "Navigation Links",
      className: "mt-4",
      links: [
        {
          label: "Back to Sign In",
          route: "login",
          className: "text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        }
      ]
    }
  ],
}

export function ForgotPasswordFormAlt() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const { navigate } = useAuthRouter()

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    
    try {
      // Here you would typically make your API call
      console.log('Form submitted with values:', values)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      setIsEmailSent(true)
    } catch (error) {
      console.error('Password reset error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-lg font-medium">Check your email</h3>
        <p className="text-muted-foreground">
          We have sent a password reset link to your email address.
        </p>
        <button
          onClick={() => navigate("login")}
          className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-medium">Forgot your password?</h3>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>
      <FormBuilder
        config={forgotPasswordFormConfig}
        onSubmit={handleSubmit}
        className="space-y-4"
      />
    </div>
  )
}
