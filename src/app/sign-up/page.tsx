import { SignUpForm } from "@/features/auth/components/SignUpForm"
import { SocialSignInButtonGroups } from "@/features/auth/components/SocialSignInButtonGroup"

export default function SignUpPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Sign up</h1>

      <SocialSignInButtonGroups />

      <SignUpForm />
    </>
  )
}
