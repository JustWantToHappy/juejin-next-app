import Link from 'next/link'
import React from 'react'
import dayjs from 'dayjs'
import { AiOutlineEye } from 'react-icons/ai'
import type { CatelogueType } from '@/types'
import { generateCatelogue, isHeadingEle } from '@/utils'
import type { Article as ArticleType, User } from 'prisma/prisma-client'

type Props = ArticleType & { user: User | null } & {
  getCatelogue: (catelogue: CatelogueType[], container: HTMLDivElement) => void
}

const Article: React.FC<Props> = ({ title, createdAt, content, getCatelogue, readCount, user }) => {
  const markdownRef = React.useRef<HTMLDivElement>(null)
  const dataStr = dayjs(createdAt).format('YYYY MM-DD HH:mm:ss')

  React.useEffect(() => {
    if (markdownRef.current) {
      const catelogue: CatelogueType[] = []
      Array.from(markdownRef.current.children).reduce((index, ele) => {
        if (isHeadingEle(ele.tagName)) {
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
          <Link href='/' className='text-juejin-font-2 hover:text-juejin-brand-2-hover'>
            {user?.name}
          </Link>
          <time dateTime={dataStr} title={dataStr}>
            {dataStr}
          </time>
          <AiOutlineEye />
          <span>{readCount}</span>
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
        className=' mt-8  markdown-body'
        dangerouslySetInnerHTML={{ __html: content }}>
      </div>
      <div id='comment'>
      </div>
    </article>
  )
}

export default React.memo(Article)