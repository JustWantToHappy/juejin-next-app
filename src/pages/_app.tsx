import React from 'react'
import '@/assets/style/index.css'
import { SessionProvider } from 'next-auth/react'
import BasicLayout from '@/components/layouts/BasicLayout'
import type { Session } from 'next-auth'

type Props = {
  Component: React.FC
  props: {
    [key in string]: any
  } & { session: Session }
}

//创建单一共享布局
const App: React.FC<Props> = ({ Component, props }) => {
  const { session, ...pageProps } = props || {}
  return (
    <SessionProvider session={session}>
      <BasicLayout >
        <Component {...pageProps} />
      </BasicLayout>
    </SessionProvider>
  )
}

export default App
