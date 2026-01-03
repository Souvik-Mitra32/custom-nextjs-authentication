import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivatePage() {
  const currentUser = { role: "user" } // TODO Implement

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <Button>Toggle role</Button>
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
