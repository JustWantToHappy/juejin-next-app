import React from 'react'
import Head from 'next/head'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import NavTags from '@/components/NavTags'
import Skeleton from '@/components/Skeleton'
import BasicLayout from '@/components/layouts/BasicLayout'
import HomeLayout from '@/components/layouts/HomeLayout'


const Home = () => {
  return (
    <>
      <Head>
        <title>稀土掘金</title>
      </Head>
      <Skeleton leadingHeight={14} rows={5} isLoading />
    </>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (<BasicLayout>
    <HomeLayout>
      {page}
    </HomeLayout>
  </BasicLayout>)
}

export default Home