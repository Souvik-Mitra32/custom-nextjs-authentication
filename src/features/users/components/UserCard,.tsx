import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LogoutButton } from "@/features/auth/components/LogoutButton"

import { UserRole } from "@/drizzle/schema"

export function UserCard(user: { name: string; role: UserRole }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>User: {user.name}</CardTitle>
        <CardDescription>Role: {user.role}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href="/private">Private page</Link>
        </Button>

        {user.role === "admin" && (
          <Button variant="outline" asChild>
            <Link href="/admin">Admin page</Link>
          </Button>
        )}

        <LogoutButton />
      </CardFooter>
    </Card>
  )
}
