"use client"

import { useRouter, usePathname } from 'next/navigation'
import { secureRoutes } from '@/lib/routing/secure-routes'
import { useAuthStore } from '@/lib/auth/auth-store'
import type { RouteDefinition, UserRole } from '@/lib/routing/types'
import { useEffect, useState } from 'react'

interface SecureRouteState {
  currentRoute?: RouteDefinition
  parentRoute?: RouteDefinition
  isLoading: boolean
  isAuthorized: boolean
  pendingMakerChecker: boolean
}

export function useSecureRoute() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, roles, userId } = useAuthStore()

  const [state, setState] = useState<SecureRouteState>({
    currentRoute: getRouteByPath(pathname),
    parentRoute: getParentRoute(pathname),
    isLoading: false,
    isAuthorized: false,
    pendingMakerChecker: false
  })

  // Helper functions
  const getRouteByPath = (path: string) => {
    for (const group of Object.values(secureRoutes)) {
      for (const route of Object.values(group.routes)) {
        if (route.path === path) return route
      }
    }
    return undefined
  }

  const getParentRoute = (path: string) => {
    const route = getRouteByPath(path)
    if (route?.parent) {
      return getRouteByPath(route.parent)
    }
    return undefined
  }

  const checkAuthorization = (route?: RouteDefinition): boolean => {
    if (!route?.guard) return true
    
    const { requireAuth, allowedRoles, requireMakerChecker } = route.guard
    
    // Check authentication
    if (requireAuth && !isAuthenticated) return false
    
    // Check roles
    if (allowedRoles && !roles.some(role => allowedRoles.includes(role))) {
      return false
    }
    
    // Maker-Checker logic can be expanded based on your needs
    if (requireMakerChecker) {
      const { makerRoles, checkerRoles } = route.guard
      const isMaker = makerRoles?.some(role => roles.includes(role))
      const isChecker = checkerRoles?.some(role => roles.includes(role))
      
      if (!isMaker && !isChecker) return false
    }
    
    return true
  }

  useEffect(() => {
    const route = getRouteByPath(pathname)
    const isAuthorized = checkAuthorization(route)
    
    setState({
      currentRoute: route,
      parentRoute: getParentRoute(pathname),
      isLoading: false,
      isAuthorized,
      pendingMakerChecker: route?.guard?.requireMakerChecker || false
    })
  }, [pathname, isAuthenticated, roles])

  const navigateToRoute = (routePath: string) => {
    const targetRoute = getRouteByPath(routePath)
    if (!checkAuthorization(targetRoute)) {
      console.error('Unauthorized access attempt')
      return
    }

    setState(prev => ({ ...prev, isLoading: true }))
    router.push(routePath)
  }

  const navigateToParent = () => {
    if (state.parentRoute?.path) {
      navigateToRoute(state.parentRoute.path)
    }
  }

  return {
    // Navigation
    navigateToRoute,
    navigateToParent,
    
    // Route & Auth State
    currentRoute: state.currentRoute,
    parentRoute: state.parentRoute,
    isLoading: state.isLoading,
    isAuthorized: state.isAuthorized,
    pendingMakerChecker: state.pendingMakerChecker,
    
    // Auth Info
    isAuthenticated,
    roles,
    userId,
    
    // Route Definitions
    routes: secureRoutes
  }
}