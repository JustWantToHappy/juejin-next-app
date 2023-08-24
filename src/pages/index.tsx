import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import type { Nav } from '@/types'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import NavTags from '@/components/NavTags'
import Skeleton from '@/components/Skeleton'
import BasicLayout from '@/components/layouts/BasicLayout'
import HomeLayout from '@/components/layouts/HomeLayout'


const Home = () => {
  const navs: Nav[] = [
    { key: '/', name: '推荐' },
    { key: '/?sort=newest', name: '最新' }
  ]
  const [active, setActive] = React.useState('/')

  return (
    <>
      <Head>
        <title>稀土掘金</title>
      </Head>
      <div >
        <header className='border-b-juejin-gray-1-3 border-b h-[--home-recommend-header-height] leading-[--home-recommend-header-height] px-[--home-recommend-padding-x]'>
          <nav>
            <ul className='flex gap-x-10 text-[16px] text-juejin-font-3 '>
              {navs.map(nav => <li
                key={nav.key}
                className={` relative after:absolute after:bg-juejin-brand-1-normal after:w-4 after:h-1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-sm ${active === nav.key ? ' after:block' : ' after:hidden'}`}>
                <Link
                  href={nav.key}
                  locale='zh'>
                  {nav.name}
                </Link>
              </li>)}
            </ul>
          </nav>
        </header>
        <div className='px-[--home-recommend-padding-x]'>
          <Skeleton />
        </div>
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (<BasicLayout>
    <HomeLayout>
      {page}
    </HomeLayout>
  </BasicLayout>)
}

export default Home