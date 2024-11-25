"use client"

import { useNavigation } from "@/lib/routing/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Users,
  UserPlus,
  Shield,
  ShieldPlus,
  List
} from "lucide-react"

const iconMap = {
  Users,
  UserPlus,
  Shield,
  ShieldPlus,
  List,
}

export function NavMenu() {
  const { navigate, routes } = useNavigation()

  return (
    <div className="grid gap-6">
      {Object.entries(routes).map(([key, group]) => (
        <Card key={key} className="p-4">
          <h2 className="text-lg font-semibold mb-3">{group.title}</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(group.routes).map((route) => {
              const IconComponent = route.icon ? iconMap[route.icon as keyof typeof iconMap] : List

              return (
                <Button
                  key={route.path}
                  variant="outline"
                  className="justify-start"
                  onClick={() => navigate(route.path)}
                >
                  <IconComponent className="mr-2 h-4 w-4" />
                  {route.title}
                </Button>
              )
            })}
          </div>
        </Card>
      ))}
    </div>
  )
}