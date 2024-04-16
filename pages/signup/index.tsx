import ChangePage from '@/src/components/login-signup/change-page'
import SignUpForm from '@/src/components/login-signup/form/signup'
import Layout from '@/src/components/login-signup/layout'
import WelcomeLogo from '@/src/components/login-signup/welcome-logo'

export default function SignUpPage() {
  return (
    <Layout>
      <WelcomeLogo />
      <SignUpForm />
      <ChangePage />
    </Layout>
  )
}
