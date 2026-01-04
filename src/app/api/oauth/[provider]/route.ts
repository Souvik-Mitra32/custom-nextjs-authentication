import { NextRequest } from "next/server"
import { redirect } from "next/navigation"
import z from "zod"

import { oAuthProviders } from "@/drizzle/schema"
import { OAuthClient } from "@/features/auth/lib/oAuth/base"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider: rawProvider } = await params
  const code = request.nextUrl.searchParams.get("code")
  const provider = z.enum(oAuthProviders).parse(rawProvider)

  if (typeof code !== "string")
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect, please try again."
      )}`
    )

  const user = await new OAuthClient().fetchUser(code)
  console.log(user)
}
