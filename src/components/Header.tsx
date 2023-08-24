import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Nav } from '@/types'
import { useHeader } from '@/hooks'
import useSwr, { Fetcher } from 'swr'
import { Get } from '@/utils/request'
import { useRouter } from 'next/router'
import InputSearch from './InputSearch'
import VipSvg from '@/assets/img/vip.svg'
import JuejinSvg from '../../public/juejin.svg'
import JuejinSmallSvg from '../../public/juejin-small.svg'

const Header = () => {
  const header = useHeader()
  const router = useRouter()
  const fetcher: Fetcher<Nav[]> = (url: string) => Get<Nav[]>(url)
  const { data } = useSwr('/api/nav', fetcher)

  return (
    <header
      style={{ top: `${header.close ? '-60px' : '0px'}` }}
      className='w-full flex bg-juejin-layer-1 nav-height text-juejin-font-2 items-center px-4 overflow-hidden transition-top duration-300 fixed top-0 left-0 right-0'>
      <a>
        <Image src={JuejinSvg} alt='juejin' priority width={100} height={60} className='hidden sm:inline-block' />
        <Image src={JuejinSmallSvg} alt='juejin' priority width={35} className='inline-block sm:hidden' />
      </a>
      <nav>
        <ul className='flex ml-5 items-center'>
          <li className='w-[466px] items-center hidden lg:flex transition-all  duration-200'>
            {data?.map(nav => <Link key={nav.key} href={nav.key} locale='en'>
              <div
                className={`mx-3 nav-height flex items-center justify-center hover:text-juejin-font-1 relative after:absolute after:bottom-0 after:w-full after:h-[2px] after:bg-juejin-brand-1-normal after:opacity-0 hover:after:opacity-100 ${router.pathname === nav.key ? 'after:opacity-100' : ''}`}>
                {nav.name}
              </div>
            </Link>)}
          </li>
          <li className='absolute right-4'>
            <ul className='flex'>
              <li className='flex overflow-hidden gap-x-6'>
                <InputSearch />
                <button className='btn bg-juejin-brand-1-normal text-juejin-layer-1 pr-8 hover:bg-juejin-brand-2-hover hidden md:inline-block'>
                  创作者中心
                </button>
              </li>
              <li className='hidden md:flex items-center text-juejin-font-3 ml-6 '>
                <Image src={VipSvg} alt='vip' title='juejin-vip' />
                <span>会员</span>
              </li>
              <li className='ml-6 hidden sm:block'>
                <button className='btn text-juejin-brand-1-normal border border-juejin-brand-4-disable rounded-md bg-juejin-brand-5-light'>登录&nbsp;|&nbsp;注册</button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header >
  )
}

export default Header