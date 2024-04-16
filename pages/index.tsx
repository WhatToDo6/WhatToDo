import FeatureContent from '@/src/components/landing/feature-content'
import Footer from '@/src/components/landing/footer'
import Header from '@/src/components/landing/header'
import Navigation from '@/src/components/landing/navigation'
import SettingsContent from '@/src/components/landing/settings-content'

export default function Home() {
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
