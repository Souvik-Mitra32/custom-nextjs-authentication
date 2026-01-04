import Link from "next/link"

import { Button } from "@/components/ui/button"

import { getCurrentUser } from "@/features/auth/lib/currentUser"
import { ToggleRoleButton } from "@/features/users/components/ToggleRoleButton"

export default async function PrivatePage() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <ToggleRoleButton />

        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
