import ChangePage from '@/src/components/signinup/change-page'
import SignInForm from '@/src/components/signinup/form/signin'
import Layout from '@/src/components/signinup/layout'
import WelcomeLogo from '@/src/components/signinup/welcome-logo'

export default function SignInPage() {
  return (
    <Layout>
      <WelcomeLogo />
      <SignInForm />
      <ChangePage />
    </Layout>
  )
}
