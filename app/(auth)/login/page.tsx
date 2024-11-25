"use client"

import { LoginFormAlt } from "@/components/forms/login-form-alt"
import { NavMenu } from "@/components/navigation/nav-menu"

export default function LoginPage() {
  return (
    <div className="space-y-6">
       <LoginFormAlt />
      {/* <div className="pt-6 border-t">
        <h3 className="text-lg font-semibold mb-4">Navigation Demo</h3>
        <NavMenu />
      </div> */}
    </div>
  )
}