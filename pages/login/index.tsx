import ChangePage from '@/src/components/login-signup/change-page'
import LogInForm from '@/src/components/login-signup/form/login'
import Layout from '@/src/components/login-signup/layout'
import WelcomeLogo from '@/src/components/login-signup/welcome-logo'

export default function LoginPage() {
  return (
    <Layout>
      <WelcomeLogo />
      <LogInForm />
      <ChangePage />
    </Layout>
  )
}
