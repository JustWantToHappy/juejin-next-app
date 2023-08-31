import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { headerStore } from '@/store'
import Comment from '@/components/Comment'
import Article from '@/components/Article'
import Catelogue from '@/components/Catelogue'
import { GetStaticProps, GetStaticPaths } from 'next'
import ArticleLayout from '@/components/layouts/ArticleLayout'

type Post = {
  title: string
  createdAt: string
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [{ params: { id: '1' } }], fallback: false }
}

export const getStaticProps: GetStaticProps = () => {
  return { props: { name: 'hhh' }, revalidate: 10 }
}

const Post = (props: Post) => {
  const { close } = headerStore()

  return (
    <ArticleLayout>
      <Head>
        <title>文章页面</title>
      </Head>
      <div className='flex sm:ml-[90px] sm:mr-8  gap-x-[--layer-gap]'>
        <div className='flex-1'>
          <div className='layer p-10 mb-[--layer-gap]'>
            <Article />
          </div>
          <div className='layer mt-3'>
            <Comment />
          </div>
        </div>
        <div className='w-[--home-aside-width] hidden lg:block'>
          <div className='layer h-[163px] py-4 px-3'>
            {/*  */}
          </div>
          <div className={` py-4 pl-3 mt-[--layer-gap] layer transition-top duration-300 sticky  ${close ? 'top-[--aside-top]' : 'top-[84px]'}`}>
            <Catelogue />
          </div>
        </div>
      </div>
    </ArticleLayout>
  )
}

export default Post