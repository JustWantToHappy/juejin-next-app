import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'

const Home = () => {
  return (
    <>
      <Head>
        <title>稀土掘金</title>
      </Head>
      <div className='h-[10000px]'>我是首页</div>
    </>
  )
}

export default Home