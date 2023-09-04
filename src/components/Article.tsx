import Link from 'next/link'
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { generateCatelogue } from '@/utils'
import type { CatelogueType } from '@/types'
import type { Article as ArticleType } from 'prisma/prisma-client'

type Props = ArticleType & {
  getCatelogue: (catelogue: CatelogueType[], container: HTMLDivElement) => void
}

const Article: React.FC<Props> = ({ title, createdAt, content, getCatelogue }) => {
  const markdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (markdownRef.current) {
      const catelogue: CatelogueType[] = []
      markdownRef.current.innerHTML = content as string
      const reg = /^h[1-6]$/i
      Array.from(markdownRef.current.children).reduce((index, ele) => {
        if (reg.test(ele.tagName)) {
          ele.setAttribute('data-id', `heading-${index}`)
          return index + 1
        }
        return index
      }, 0)
      generateCatelogue(Array.from(markdownRef.current.children), catelogue)
      getCatelogue(catelogue, markdownRef.current)
    }
  }, [content, getCatelogue])

  return (
    <article >
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
          <div className='hidden md:flex '>
            <small>&emsp;|&emsp;</small>
            <span className='hidden md:inline'>
              收录于：
              <Link href='/' className='text-juejin-font-2 hover:text-juejin-brand-2-hover'>程序员</Link>
            </span>
          </div>
        </div>
      </header>
      <div
        ref={markdownRef}
        className=' mt-8  markdown-body'>
      </div>
    </article>
  )
}

export default React.memo(Article)