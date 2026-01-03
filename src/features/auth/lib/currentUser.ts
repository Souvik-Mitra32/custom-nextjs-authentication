import { cache } from "react"
import { cookies } from "next/headers"

import { getUserFromSession } from "./session"

export const getCurrentUser = cache(async () => {
  return getUserFromSession(await cookies())
})
