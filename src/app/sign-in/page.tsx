import { SignInForm } from "@/features/auth/components/SignInForm"
import { SocialSignInButtonGroups } from "@/features/auth/components/SocialSignInButtonGroup"
import { Suspense } from "react"

type Props = {
  searchParams: Promise<{ oauthError?: string }>
}

export default function SignInPage(props: Props) {
  return (
    <>
      <h1 className="text-3xl font-semibold">Sign in</h1>

      <Suspense>
        <ErrorMessage {...props} />
      </Suspense>

      <SocialSignInButtonGroups />

      <SignInForm />
    </>
  )
}

async function ErrorMessage({ searchParams }: Props) {
  const { oauthError } = await searchParams

  if (!oauthError) return null

  return <div className="text-destructive">{oauthError}</div>
}
