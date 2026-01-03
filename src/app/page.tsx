import Link from "next/link"

import { getCurrentUser } from "@/features/auth/lib/currentUser"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LogoutButton } from "@/features/auth/components/LogoutButton"

export default async function HomePage() {
  const fullUser = await getCurrentUser({ withFullUser: true })

  if (fullUser == null)
    return (
      <div className="flex gap-4 items-center">
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    )

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>User: {fullUser.name}</CardTitle>
        <CardDescription>Role: {fullUser.role}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href="/private">Private page</Link>
        </Button>

        {fullUser.role === "admin" && (
          <Button variant="outline" asChild>
            <Link href="/admin">Admin page</Link>
          </Button>
        )}

        <LogoutButton />
      </CardFooter>
    </Card>
  )
}
