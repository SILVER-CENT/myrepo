"use client"

import { useRouter } from "next/navigation"
import { AuthRoutes, type RouteKey } from "@/config/auth-route"

export function useAuthRouter() {
  const router = useRouter()

  const navigate = (route: RouteKey) => {
    router.push(AuthRoutes[route].path)
  }

  return {
    navigate,
    routes: AuthRoutes
  }
}