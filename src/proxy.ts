import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "./features/auth/lib/session"

const privateRoutes = ["/private"]
const adminroutes = ["/admin"]
const publicRoutes = ["/sign-up", "/sign-in"]

export async function proxy(request: NextRequest) {
  const response = (await proxyAuth(request)) ?? NextResponse.next()

  await updateUserSessionExpiration({
    set: (
      key: string,
      value: string,
      options: {
        secure?: boolean
        httpOnly?: boolean
        sameSite?: "strict" | "lax"
        expires?: number
      }
    ) => {
      response.cookies.set({ name: key, value, ...options })
    },
    get: (key: string) => request.cookies.get(key),
  })

  return response
}

async function proxyAuth(request: NextRequest) {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(await cookies())

    if (user == null)
      return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (adminroutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(await cookies())

    if (user == null)
      return NextResponse.redirect(new URL("/sign-in", request.url))

    if (user.role !== "admin")
      return NextResponse.redirect(new URL("/", request.url))
  }

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(await cookies())

    if (user) return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}
