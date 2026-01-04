import { SignInForm } from "@/features/auth/components/SignInForm"
import { SocialSignInButtonGroups } from "@/features/auth/components/SocialSignInButtonGroup"

export default function SignInPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Sign in</h1>

      <SocialSignInButtonGroups />

      <SignInForm />
    </>
  )
}
