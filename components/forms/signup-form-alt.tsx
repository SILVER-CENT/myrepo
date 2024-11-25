'use client'

import { useState } from "react"
import { useAuthRouter } from "@/hooks/use-auth-router"
import { FormBuilder } from "@/lib/form-builder"
import { CompositeComponentConfig } from "@/lib/form-builder/types"

const signupFormConfig: CompositeComponentConfig = {
  id: "signup-form",
  name: "Sign Up Form",
  description: "Create your account",
  layout: "vertical",
  className: "space-y-4",
  components: [
    {
      id: "name",
      type: "input",
      label: "Full Name",
      placeholder: "Enter your full name",
      validation: [
        {
          type: "required",
          message: "Name is required",
        },
        {
          type: "min",
          value: 2,
          message: "Name must be at least 2 characters",
        },
      ],
      className: "w-full",
    },
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
      placeholder: "Create a password",
      validation: [
        {
          type: "required",
          message: "Password is required",
        },
        {
          type: "min",
          value: 8,
          message: "Password must be at least 8 characters",
        },
        {
          type: "pattern",
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        },
      ],
      className: "w-full",
    },
    {
      id: "confirmPassword",
      type: "input",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      validation: [
        {
          type: "required",
          message: "Please confirm your password",
        },
        {
          type: "custom",
          value: (value: string, formValues: Record<string, any>) => value === formValues.password,
          message: "Passwords do not match",
        },
      ],
      className: "w-full",
    },
    {
      id: "terms",
      type: "checkbox",
      label: "I agree to the Terms of Service and Privacy Policy",
      validation: [
        {
          type: "required",
          message: "You must agree to the terms",
        },
      ],
      className: "mt-4",
    },
    {
      id: "submit",
      type: "button",
      label: "Sign Up",
      className: "w-full mt-4",
    },
    {
      id: "nav-links",
      type: "nav-links",
      label: "Navigation Links",
      className: "mt-4",
      links: [
        {
          label: "Already have an account? Sign In",
          route: "login",
          className: "text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        }
      ]
    }
  ],
}

export function SignupFormAlt() {
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
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <FormBuilder
        config={signupFormConfig}
        onSubmit={handleSubmit}
        className="space-y-4"
      />
    </div>
  )
}
