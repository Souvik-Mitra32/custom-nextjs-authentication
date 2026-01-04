"use server"

import { cookies } from "next/headers"
import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema"

import { getCurrentUser } from "@/features/auth/lib/currentUser"
import { updateUserSessiondData } from "@/features/auth/lib/session"

export async function toggleRole() {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const [updatedUser] = await db
    .update(UserTable)
    .set({ role: user.role === "user" ? "admin" : "user" })
    .where(eq(UserTable.id, user.id))
    .returning({ id: UserTable.id, role: UserTable.role })

  await updateUserSessiondData(updatedUser, await cookies())
}
