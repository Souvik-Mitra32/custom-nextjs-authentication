import Link from "next/link"

import { Button } from "@/components/ui/button"
import { UserCard } from "@/components/UserCard"

// const fullUser = { id: "", name: "Souvik", role: "user" } as const
const fullUser = null

export default function HomePage() {
  return (
    <>
      {fullUser == null ? (
        <div className="flex gap-4 items-center">
          <Button asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      ) : (
        <UserCard {...fullUser} />
      )}
    </>
  )
}
