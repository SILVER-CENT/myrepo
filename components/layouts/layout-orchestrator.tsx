"use client"

import { usePathname } from "next/navigation"
import { getBaseLayoutFromPath } from "@/lib/routing/routes"
import { BaseFormLayout } from "./base-form-layout"
import { BaseDataViewLayout } from "./base-data-view-layout"

interface LayoutOrchestratorProps {
  children: React.ReactNode
}

export function LayoutOrchestrator({ children }: LayoutOrchestratorProps) {
  const pathname = usePathname()
  const baseLayout = getBaseLayoutFromPath(pathname)

  switch (baseLayout) {
    case 'form':
      return <BaseFormLayout>{children}</BaseFormLayout>
    case 'data-view':
      return <BaseDataViewLayout>{children}</BaseDataViewLayout>
    default:
      return <>{children}</>
  }
}