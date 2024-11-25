"use client"

import { useRouter, usePathname } from 'next/navigation'
import { routes, getRouteByPath, getParentRoute } from '@/lib/routing/routes'
import type { RouteDefinition } from '@/lib/routing/types'
import { useEffect, useState } from 'react'

interface RouteState {
  currentRoute?: RouteDefinition
  parentRoute?: RouteDefinition
  isLoading: boolean
}

export function useRoute() {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<RouteState>({
    currentRoute: getRouteByPath(pathname),
    parentRoute: getParentRoute(pathname),
    isLoading: false
  })

  useEffect(() => {
    setState({
      currentRoute: getRouteByPath(pathname),
      parentRoute: getParentRoute(pathname),
      isLoading: false
    })
  }, [pathname])

  const navigateToRoute = (routePath: string) => {
    setState(prev => ({ ...prev, isLoading: true }))
    router.push(routePath)
  }

  const navigateToParent = () => {
    if (state.parentRoute?.path) {
      navigateToRoute(state.parentRoute.path)
    }
  }

  const getRouteTitle = () => state.currentRoute?.title || ''
  const getRouteDescription = () => state.currentRoute?.description || ''
  const getBaseLayout = () => state.currentRoute?.baseLayout
  const isChildRoute = () => !!state.parentRoute

  return {
    // Navigation
    navigateToRoute,
    navigateToParent,
    
    // Route information
    currentRoute: state.currentRoute,
    parentRoute: state.parentRoute,
    isLoading: state.isLoading,
    
    // Helper methods
    getRouteTitle,
    getRouteDescription,
    getBaseLayout,
    isChildRoute,
    
    // Access to route definitions
    routes
  }
}
