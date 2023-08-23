import React from 'react'
import Header from '../Header'

const BasicLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <main>
      <Header />
      <div> {props.children}</div>
    </main>
  )
}

export default BasicLayout