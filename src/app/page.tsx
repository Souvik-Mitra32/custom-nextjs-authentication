import Link from "next/link"

import { getCurrentUser } from "@/features/auth/lib/currentUser"

import { Button } from "@/components/ui/button"
import { UserCard } from "@/features/users/components/UserCard,"

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

  return <UserCard {...fullUser} />
}
