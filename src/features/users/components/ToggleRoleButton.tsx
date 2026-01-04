"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { toggleRole } from "../actions/action"

export function ToggleRoleButton() {
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => await toggleRole())
  }

  return (
    <Button onClick={handleToggle} disabled={isPending}>
      Toggle role
    </Button>
  )
}
