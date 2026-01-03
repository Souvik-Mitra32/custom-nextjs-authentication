import z from "zod"

export const signUpSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  password: z
    .string()
    .min(8, "Must be maximum 8 characters")
    .max(24, "Must be maximum 24 characters"),
})

export const signInSchema = z.object({
  email: z.string().min(1, "Required"),
  password: z
    .string()
    .min(8, "Must be maximum 8 characters")
    .max(24, "Must be maximum 24 characters"),
})
