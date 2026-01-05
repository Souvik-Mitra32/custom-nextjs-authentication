import z from "zod"

import { Cookies } from "../session"

export class OAuthClient<T> {
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  })

  private readonly userSchema = z.object({
    id: z.string(),
    email: z.email(),
    global_name: z.string().nullable(),
    username: z.string(),
  })

  private get redirectUrl() {
    return new URL("discord", process.env.OAUTH_REDIRECT_URL_BASE)
  }

  createAuthUrl(cookies: Pick<Cookies, "set">) {
    const url = new URL("https://discord.com/oauth2/authorize")
    url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID!)
    url.searchParams.set("redirect_uri", this.redirectUrl.toString())
    url.searchParams.set("response_type", "code")
    url.searchParams.set("scope", "identify email")

    return url.toString()
  }

  async fetchUser(code: string) {
    const { accessToken, tokenType } = await this.fetchToken(code)

    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
    const rawData = await response.json()

    const parsed = this.userSchema.safeParse(rawData)
    if (!parsed.success) throw new InvalidUserError(parsed.error)

    const data = parsed.data

    return {
      id: data.id,
      email: data.email,
      username: data.global_name ?? data.username,
    }
  }

  private async fetchToken(code: string) {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
      }),
    })
    const rawData = await response.json()

    const parsed = this.tokenSchema.safeParse(rawData)
    if (!parsed.success) throw new InvalidTokenError(parsed.error)

    const data = parsed.data

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    }
  }
}

export class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid Token")
    this.cause = zodError
  }
}

export class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid User")
    this.cause = zodError
  }
}
