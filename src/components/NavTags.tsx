import React from 'react'
import Link from 'next/link'
import { Get } from '@/utils'
import { headerStore } from '@/store'
import type { Type } from '@/types'
import useSwr, { Fetcher } from 'swr'

const NavTags = () => {
  const navRef = React.useRef<HTMLElement>(null)
  const [active, setActive] = React.useState('recommended')
  const fetcher: Fetcher<Type[]> = (url: string) => Get<Type[]>(url)
  const { data } = useSwr('/api/tag', fetcher)


  React.useEffect(() => {
    const unsubHeaderStore = headerStore.subscribe(state => {

      //if (!state.close && navRef.current) {
      //  navRef.current.style.top = '8px'
      //} else if (navRef.current) {
      //  navRef.current.style.top = ''
      //}
    })
    return function () {
      unsubHeaderStore()
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className='min-w-[--home-tag-width] text-lg text-juejin-font-2 p-2 layer hidden xl:block sticky aside-top '>
      <div className='flex flex-col justify-between gap-y-[1px]'>
        {data?.map(tag => <Link
          key={tag.key}
          href={tag.key}
          locale='zh'
          className={`px-4 py-2 hover:bg-juejin-bg rounded-md leading-7 ${active === tag.key ? ' text-juejin-brand-1-normal bg-juejin-brand-5-light' : ''}`}>
          <span>{tag.name}</span>
        </Link>)}
      </div>
    </nav>
  )
}

export default NavTags