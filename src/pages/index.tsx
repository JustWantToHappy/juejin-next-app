import React from 'react'
import Head from 'next/head'
import { Get } from '@/utils'
import type { Nav } from '@/types'
import type { GetServerSideProps } from 'next'
import Skeleton from '@/components/Skeleton'
import BasicLayout from '@/components/layouts/BasicLayout'
import HomeLayout from '@/components/layouts/HomeLayout'

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {  } }
}

const Home = (props: { data: string }) => {

  return (
    <>
      <Head>
        <title>稀土掘金</title>
      </Head>
      <div className='px-[--home-recommend-padding-x] py-5'>
        <Skeleton />
      </div>
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