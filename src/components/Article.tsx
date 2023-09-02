import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import VirtualList from './VirtualList'
import { AiOutlineEye } from 'react-icons/ai'
import { parseTitleFromTree } from '@/utils'
import type { Article as ArticleType } from 'prisma/prisma-client'

const Article: React.FC<ArticleType> = ({ title, createdAt, content }) => {

  const markdownRef = React.useRef<HTMLDivElement>(null)
  const [components, setComponents] = React.useState<React.ReactElement[]>([])

  React.useEffect(() => {
    let index = 0
    const reg = /^[h][1-6]$/i
    const parser = new DOMParser()
    const parsedHtml = parser.parseFromString(content, 'text/html')
    const elements = Array.from(parsedHtml.body.children)

  }, [content])

  return (
    <article>
      <meta itemProp='headline' content={title} />
      <meta itemProp='keywords' content='文章类型' />
      <meta itemProp='datePublished' content={String(createdAt)} />
      <header>
        <h1 className='mb-3 text-4xl font-extrabold leading-normal'>
          {title}
        </h1>
        <div className='flex  gap-x-4 text-juejin-font-3 items-center'>
          <Link href='/' className='text-juejin-font-2 hover:text-juejin-brand-2-hover'>JustWantToHappy</Link>
          <time dateTime='2023-08-19T02:08:29.000Z' title='2023-08-19T02:08:29.000Z'>2023-08-19 10:08</time>
          <AiOutlineEye />
          <span>22353</span>
          <div className='hidden sm:flex '>
            <small>&emsp;|&emsp;</small>
            <span className='hidden sm:inline'>
              收录于：
              <Link href='/' className='text-juejin-font-2 hover:text-juejin-brand-2-hover'>程序员</Link>
            </span>
          </div>
        </div>
      </header>
      <div
        ref={markdownRef}
        className=' mt-8  markdown-body'>
        <VirtualList components={components} wideSkeleton />
        {/*<p>阿宝哥第一次使用 TypeScript 是在 Angular 2.x 项目中，那时候 TypeScript 还没有进入大众的视野。然而现在学习 TypeScript 的小伙伴越来越多了，本文阿宝哥将从 16 个方面入手，带你一步步学习 TypeScript，感兴趣的小伙伴不要错过。。</p>
        <Image src='http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg' alt='image' width='10000' height='0' priority />*/}
      </div>
    </article>
  )
}

export default Article