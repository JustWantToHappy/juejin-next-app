import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { headerStore } from '@/store'
import type { Tag } from '@/types'
//import { Get } from '@/utils'
//import useSwr, { Fetcher } from 'swr'

const NavTags = () => {
  const { close } = headerStore()
  const router = useRouter()
  const navRef = React.useRef<HTMLElement>(null)
  const [active, setActive] = React.useState('recommended')
  const [tags] = React.useState<Tag[]>([
    {
      key: 'following',
      name: '关注'
    },
    {
      key: 'recommended',
      name: '综合'
    },
    {
      key: 'backend',
      name: '后端'
    },
    {
      key: 'frontend',
      name: '前端'
    },
    {
      key: 'andriod',
      name: 'Andriod'
    },
    {
      key: 'ios',
      name: 'iOS'
    },
    {
      key: 'ai',
      name: '人工智能'
    },
    {
      key: 'freebie',
      name: '开发工具'
    },
    {
      key: 'career',
      name: '代码人生'
    },
    {
      key: 'article',
      name: '阅读'
    },
    {
      key: 'articles',
      name: '排行榜'
    },
  ])
  //const fetcher: Fetcher<Tag[]> = (url: string) => Get<Tag[]>(url)
  //const { data } = useSwr('/api/tag', fetcher)

  return (
    <nav
      ref={navRef}
      className={`min-w-[--home-tag-width] text-lg text-juejin-font-2 p-2 layer hidden xl:block sticky overflow-auto ${close ? 'top-[--aside-top]' : ' top-[80px]'}`}>
      <div className='flex flex-col justify-between gap-y-[1px]'>
        {tags?.map(tag => <Link
          key={tag.key}
          href={tag.key}
          onClick={() => setActive(tag.key)}
          locale='zh'
          className={`px-4 py-2 hover:bg-juejin-bg rounded-md leading-7 ${active === tag.key ? ' text-juejin-brand-1-normal bg-juejin-brand-5-light' : ''}`}>
          <span>{tag.name}</span>
        </Link>)}
      </div>
    </nav>
  )
}

export default NavTags