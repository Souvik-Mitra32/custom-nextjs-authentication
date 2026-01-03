import z from "zod"
import crypto from "crypto"

import { userRoles } from "@/drizzle/schema"
import { redisClient } from "@/redis/redis"

// Seven days in seconds
const SESSION_EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 7

const COOKIE_SESSION_KEY = "session-id"

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
})

type UserSession = z.infer<typeof sessionSchema>
type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: "strict" | "lax"
      expires?: number
    }
  ) => void
  get: (key: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

export async function createUserSession(user: UserSession, cookies: Cookies) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize()

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_IN_SECONDS,
  })

  setCookies(sessionId, cookies)
}

function setCookies(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_IN_SECONDS * 1000,
  })
}

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value
  if (sessionId == null) return null

  return getUserSessionById(sessionId)
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`session:${sessionId}`)

  const parsed = sessionSchema.safeParse(rawUser)
  if (!parsed.success) return null

  return parsed.data
}
