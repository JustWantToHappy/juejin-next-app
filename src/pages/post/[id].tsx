import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { headerStore } from '@/store'
import Comment from '@/components/Comment'
import Article from '@/components/Article'
import Catelogue from '@/components/Catelogue'
import type { CatelogueType } from '@/types'
import { Article as ArticleType } from 'prisma/prisma-client'
import ArticleLayout from '@/components/layouts/ArticleLayout'
import type { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/article`)
  const articleIds = await res.json()
  const paths = articleIds?.map((article: any) => ({ params: { id: article?.id } }))
  return { paths: paths ?? [], fallback: false }
}


export const getStaticProps: GetStaticProps = async (props) => {
  let data = null
  if (props.params?.id) {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/article/${props.params.id}`)
    data = await res.json()
  }
  return { props: data }
}

const Post = (props: ArticleType) => {
  const { close } = headerStore()
  const [components, setComponents] = React.useState<React.ReactElement[]>([])

  React.useEffect(() => {
    //const reg = /^[h][1-6]$/i
    const parser = new DOMParser()
    const catelogue: CatelogueType[] = []
    //解析html字符串
    const parsedHtml = parser.parseFromString(props.content, 'text/html')
    const elements = Array.from(parsedHtml.body.children)
    const components = elements.map((ele, index) => <div
      key={index}
      data-index={index}
      dangerouslySetInnerHTML={{ __html: ele.outerHTML }}>
    </div>)
    setComponents(components)//虚拟列表外部数据源
  }, [props.content])

  return (
    <ArticleLayout>
      <Head>
        <title>{props.title + ' - 掘金'}</title>
      </Head>
      <div className='flex sm:ml-[90px] sm:mr-8  gap-x-[--layer-gap]'>
        <div className='flex-1'>
          <div className='layer p-10 mb-[--layer-gap]'>
            <Article {...props} components={components} />
          </div>
          <div className='layer mt-3 mb-8 px-10 py-4'>
            <Comment />
          </div>
        </div>
        <div className='w-[--home-aside-width] hidden lg:block'>
          <div className='layer h-[100px] py-4 px-3 flex items-center gap-x-4'>
            <Image width='100' height='40' className='rounded-full w-14 h-14 object-cover' src='http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg' alt='头像' />
            <div className='flex flex-col gap-y-2'>
              <span>JustWantToHappy</span>
              <span className='text-juejin-font-3'>学生</span>
            </div>
          </div>
          <div className={` pt-4  mt-[--layer-gap] layer transition-top duration-300 sticky  ${close ? 'top-[--aside-top]' : 'top-[84px]'}`}>
            <Catelogue />
          </div>
        </div>
      </div>
    </ArticleLayout>
  )
}

export default Post