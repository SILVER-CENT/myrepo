"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigation } from "@/lib/routing/navigation"

export default function UserEntryPage() {
  const { navigate } = useNavigation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Entry</h1>
        <Button variant="outline" onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email" />
        </div>
        <Button>Save User</Button>
      </div>
    </div>
  )
}