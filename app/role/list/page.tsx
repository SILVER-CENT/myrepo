"use client"

import { Button } from "@/components/ui/button"
import { useNavigation } from "@/lib/routing/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const demoRoles = [
  { id: 1, name: "Admin", description: "Full system access" },
  { id: 2, name: "User", description: "Limited access" },
]

export default function RoleListPage() {
  const { navigate } = useNavigation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Role List</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Back to Login
          </Button>
          <Button onClick={() => navigate("/role/entry")}>Add Role</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoRoles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}