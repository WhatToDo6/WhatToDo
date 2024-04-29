import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import FeatureContent from '@/src/components/landing/feature-content'
import Footer from '@/src/components/landing/footer'
import Header from '@/src/components/landing/header'
import Navigation from '@/src/components/landing/navigation'
import SettingsContent from '@/src/components/landing/settings-content'
import { ROUTE } from '@/src/constants/route'

export default function Home() {
  const router = useRouter()
  const [isChecking, setChecking] = useState(true)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      router.push(ROUTE.myboard)
    } else {
      setChecking(false)
    }
  }, [router])

  if (isChecking) return null

  return (
    <main>
      <Navigation />
      <Header />
      <FeatureContent />
      <SettingsContent />
      <Footer />
    </main>
  )
}
