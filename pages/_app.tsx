import Head from 'next/head'

import type { AppProps } from 'next/app'
import '../src/styles/reset.css'
import '@/src/components/common/input/date/react-datepicker.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taskify</title>
        <link
          rel="icon"
          href="https://raw.githubusercontent.com/WhatToDo6/WhatToDo/027f5302001614a333b41894bd24b212cc73eb75/public/favicon.ico"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
