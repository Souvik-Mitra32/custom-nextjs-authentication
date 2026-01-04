"use client"

import { useState } from "react"
import Link from "next/link"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "../../../components/ui/button"

import { signIn } from "../actions/action"
import { signInSchema } from "../actions/schema"

export function SignInForm() {
  const [error, setError] = useState<string>()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    const error = await signIn(data)
    setError(error)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
      <FieldSet>
        {error && <FieldError>{error}</FieldError>}

        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="maxleiter@example.com"
                  autoComplete="off"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="off"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field orientation="horizontal">
            <Button type="submit">Sign in</Button>

            <Button variant="outline" type="button" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
