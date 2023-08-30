import React from 'react'
import Head from 'next/head'
import { headerStore } from '@/store'
import { GetStaticProps, GetStaticPaths } from 'next'
import ArticleLayout from '@/components/layouts/ArticleLayout'

type Post = {

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
        <div className='flex-1 layer p-10 h-[2000px]'>
          <h1 className=' text-4xl font-extrabold leading-normal'>千万不要错过！JavaScript高效对比数组差异，一次学会！</h1>
          <article>
            <meta itemProp='headline' content='文章标题' />
            <meta itemProp='keywords' content='文章类型' />
            <meta itemProp='datePublished' content='时间' />
            <div className=''>
              zz
            </div>
          </article>
        </div>
        <div className='w-[--home-aside-width] hidden lg:block'>
          <div className='layer h-[163px]'>

          </div>
          <div className={`mt-[--layer-gap] layer transition-top duration-300 sticky  ${close ? 'top-[--aside-top]' : 'top-[84px]'}`}>
            ddd
          </div>
        </div>
      </div>
    </ArticleLayout>
  )
}

export default Post