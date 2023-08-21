import React from 'react'
import Header from '../Header'
//import type { Metadata } from 'next'

//export const metadata: Metadata = {
//  title: '稀土掘金',
//  description: '...',
//}

const BasicLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <main>
      <Header />
      <div> {props.children}</div>
    </main>
  )
}

export default BasicLayout