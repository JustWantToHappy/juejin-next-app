import React from 'react'
import '@/assets/style/index.css'
import { SessionProvider } from 'next-auth/react'
import BasicLayout from '@/components/layouts/BasicLayout'
import type { Session } from 'next-auth'

type Props = {
  Component: React.FC
  pageProps: {
    [key in string]: any
  } & { session: Session }
}

//创建单一共享布局
const App: React.FC<Props> = ({ Component, pageProps }) => {
  const { session, ...props } = pageProps || {}
  return (
    <SessionProvider session={session}>
      <BasicLayout >
        <Component {...props} />
      </BasicLayout>
    </SessionProvider>
  )
}

export default App
