import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { getUserFromSession } from "./session"

import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema"

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>

type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>

export const getCurrentUser = cache(_getCurrentUser)

function _getCurrentUser(options?: {
  withFullUser: true
  redirectIfNotFound: true
}): Promise<FullUser>
function _getCurrentUser(options?: {
  withFullUser: true
  redirectIfNotFound?: false
}): Promise<FullUser | null>
function _getCurrentUser(options?: {
  withFullUser?: false
  redirectIfNotFound: true
}): Promise<User>
function _getCurrentUser(options?: {
  withFullUser?: false
  redirectIfNotFound?: false
}): Promise<User | null>

async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies())

  if (user == null) {
    if (redirectIfNotFound) redirect("/sign-in")
    return null
  }

  if (!withFullUser) return user

  const fullUser = await getUserFromDb(user.id)
  if (fullUser == null) throw new Error("User not found in database") // This should not happen

  return fullUser
}

async function getUserFromDb(id: string) {
  const [user] = await db
    .select({
      id: UserTable.id,
      name: UserTable.name,
      role: UserTable.role,
      password: UserTable.password,
      salt: UserTable.salt,
    })
    .from(UserTable)
    .where(eq(UserTable.id, id))
  if (!user) return null

  return user
}
