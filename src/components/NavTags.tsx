import React from 'react'
import Link from 'next/link'
import { Get } from '@/utils'
import { useRouter } from 'next/router'
import { headerStore } from '@/store'
import type { Tag } from '@/types'
import useSwr, { Fetcher } from 'swr'

const NavTags = () => {
  const { close } = headerStore()
  const router = useRouter()
  const navRef = React.useRef<HTMLElement>(null)
  const [active, setActive] = React.useState('recommended')
  const fetcher: Fetcher<Tag[]> = (url: string) => Get<Tag[]>(url)
  const { data } = useSwr('/api/tag', fetcher)

  return (
    <nav
      ref={navRef}
      className={`min-w-[--home-tag-width] text-lg text-juejin-font-2 p-2 layer hidden xl:block sticky overflow-auto ${close ? 'aside-top' : ' top-[80px]'}`}>
      <div className='flex flex-col justify-between gap-y-[1px]'>
        {data?.map(tag => <Link
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