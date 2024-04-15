import ChangePage from '@/src/components/signinup/change-page'
import SignUpForm from '@/src/components/signinup/form/signup'
import Layout from '@/src/components/signinup/layout'
import WelcomeLogo from '@/src/components/signinup/welcome-logo'

export default function SignUpPage() {
  return (
    <Layout>
      <WelcomeLogo />
      <SignUpForm />
      <ChangePage />
    </Layout>
  )
}
