import React from 'react'
import { Html, Main, NextScript, Head } from 'next/document'

const Document = () => {
  return (
    <Html lang={'zh'}>
      <Head >
        <meta charSet='UTF-8' />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel='icon' href='./favicon.png' sizes='32x32' type='image/png'></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document