import { z } from "zod"
import { OAuthClient } from "./base"

export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: "google",
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    scopes: ["openid", "profile", "email"],
    urls: {
      auth: "https://accounts.google.com/o/oauth2/v2/auth",
      token: "https://oauth2.googleapis.com/token",
      user: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    userInfo: {
      schema: z.object({
        sub: z.string(),
        name: z.string(),
        email: z.email(),
      }),
      parser: (user) => ({
        id: user.sub,
        name: user.name,
        email: user.email,
      }),
    },
  })
}
