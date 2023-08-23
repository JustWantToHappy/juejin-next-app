import React from 'react'
import '@/assets/style/index.css'
import BasicLayout from '@/components/layouts/BasicLayout'

type Props = {
  Component: React.FC & { getLayout: React.FC }
  pageProps: { [key in string]: any }
}

//创建单一共享布局
const App: React.FC<Props> = ({
  Component,
  pageProps,
}) => {
  const getLayout = Component.getLayout
  if (Object.prototype.toString.call(getLayout) === '[object Function]') {
    return getLayout(<Component {...pageProps} />)
  } else {
    return (
      <>
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      </>
    )
  }
}

export default App
