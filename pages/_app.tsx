import type { AppProps } from 'next/app'
import '../src/styles/reset.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
