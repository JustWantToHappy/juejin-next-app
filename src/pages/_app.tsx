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

  React.useEffect(() => {
    console.log(
      '%c 稀土 %c 掘金 (JueJin) %c',
      'background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%) ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff; padding:5px 0;',
      'background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%); padding: 1px; border-radius: 0 3px 3px 0;  color: #000; padding:5px 0;',
      'background:transparent'
    )
  }, [])

  return (
    <SessionProvider session={session}>
      <BasicLayout >
        <Component {...props} />
      </BasicLayout>
    </SessionProvider>
  )
}

export default App
