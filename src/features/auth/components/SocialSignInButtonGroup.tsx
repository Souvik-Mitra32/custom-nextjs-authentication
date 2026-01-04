"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"

import { OAuthProvider } from "@/drizzle/schema"
import { oAuthSignIn } from "../actions/action"

export function SocialSignInButtonGroups() {
  const [isPending, startTransition] = useTransition()

  function handleOAuthSignIn(provider: OAuthProvider) {
    startTransition(async () => {
      const url = await oAuthSignIn(provider)
      window.location.href = url
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button
        variant="outline"
        onClick={() => handleOAuthSignIn("discord")}
        disabled={isPending}
      >
        Sign in with Discord
      </Button>

      <Button
        variant="outline"
        onClick={() => handleOAuthSignIn("github")}
        disabled={isPending}
      >
        Sign in with Github
      </Button>
    </div>
  )
}
