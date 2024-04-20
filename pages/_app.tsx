import type { AppProps } from 'next/app'
import '../src/styles/reset.css'
import '@/src/components/common/input/date/react-datepicker.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
