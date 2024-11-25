'use client'

import { useState } from "react"
import { useAuthRouter } from "@/hooks/use-auth-router"
import { FormBuilder } from "@/lib/form-builder"
import { CompositeComponentConfig } from "@/lib/form-builder/types"

const loginFormConfig: CompositeComponentConfig = {
  id: "login-form",
  name: "Login Form",
  description: "Sign in to your account",
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
      id: "password",
      type: "input",
      label: "Password",
      placeholder: "Enter your password",
      validation: [
        {
          type: "required",
          message: "Password is required",
        },
        {
          type: "min",
          value: 6,
          message: "Password must be at least 6 characters",
        },
      ],
      className: "w-full",
    },
    {
      id: "submit",
      type: "button",
      label: "Sign In",
      className: "w-full",
    },
    {
      id: "nav-links",
      type: "nav-links",
      label: "Navigation Links",
      className: "mt-4",
      links: [
        {
          label: "Don't have an account? Sign Up",
          route: "signup",
          className: "text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        },
        {
          label: "Forgot your password?",
          route: "forgotPassword",
          className: "text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        }
      ]
    }
  ],
}

export function LoginFormAlt() {
  const [isLoading, setIsLoading] = useState(false)
  const { navigate } = useAuthRouter()

  const handleSubmit = async (values: Record<string, any>) => {
    setIsLoading(true)
    
    try {
      // Here you would typically make your API call
      console.log('Form submitted with values:', values)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to dashboard on success
      navigate("login")
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <FormBuilder
        config={loginFormConfig}
        onSubmit={handleSubmit}
        className="space-y-4"
      />
    </div>
  )
}
