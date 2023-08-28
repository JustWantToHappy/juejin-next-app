import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Aside from '../Aside'
import NavTags from '../NavTags'
import type { Nav } from '@/types'

const HomeLayout: React.FC<React.PropsWithChildren> = (props) => {
  const navs: (Nav & { index: number })[] = [
    { key: '/', name: '推荐', index: 0 },
    { key: '/?sort=newest', name: '最新', index: 1 }
  ]

  const router = useRouter()
  const [active, setActive] = React.useState(0)

  return (
    <div className=' px-10 flex items-start gap-x-6 '>
      <NavTags />
      <div className='flex gap-x-6 flex-1 items-start'>
        {/* min-w:--home-recommend-padding-x */}
        <div className='lg:w-[--home-recommend-width] layer flex-1 '>
          <header className='border-b-juejin-gray-1-3 border-b h-[--home-recommend-header-height] leading-[--home-recommend-header-height] px-[--home-recommend-padding-x]'>
            <nav>
              <ul className='flex gap-x-10 text-[16px] text-juejin-font-3'>
                {navs.map(nav => <li
                  key={nav.key}
                  className={` hover:text-juejin-brand-2-hover relative after:absolute after:bg-juejin-brand-1-normal after:w-4 after:h-1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-sm ${active === nav.index ? ' after:block' : ' after:hidden'}`}>
                  <Link
                    href={nav.key}
                    locale='zh'>
                    {nav.name}
                  </Link>
                </li>)}
              </ul>
            </nav>
          </header>
          {props.children}
        </div>
        <Aside />
      </div>
    </div>
  )
}

export default HomeLayout