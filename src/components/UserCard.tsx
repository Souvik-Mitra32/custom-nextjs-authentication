import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserRole } from "@/drizzle/schema"

export function UserCard({ name, role }: { name?: string; role?: UserRole }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>User: {name}</CardTitle>
        <CardDescription>Role: {role}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href="/private">Private page</Link>
        </Button>

        {role === "admin" && (
          <Button variant="outline" asChild>
            <Link href="/admin">Admin page</Link>
          </Button>
        )}

        <Button variant="destructive">Log out</Button>
      </CardFooter>
    </Card>
  )
}
