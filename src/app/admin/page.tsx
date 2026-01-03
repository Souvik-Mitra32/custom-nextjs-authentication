import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Admin</h1>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
