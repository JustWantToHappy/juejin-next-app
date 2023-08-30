import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Nav } from '@/types'
import useSwr, { Fetcher } from 'swr'
import { Get } from '@/utils'
import { useRouter } from 'next/router'
import InputSearch from './InputSearch'
import VipSvg from '@/assets/img/vip.svg'
import JuejinSvg from '../../public/juejin.svg'
import { headerStore, loginModal } from '@/store'
import JuejinSmallSvg from '../../public/juejin-small.svg'
import { AiFillCaretDown } from 'react-icons/ai'

const Header = () => {
  const header = headerStore()
  const router = useRouter()
  const { onOpen } = loginModal()
  const [shrink, setShrink] = React.useState(true)
  const [navs] = React.useState<Nav[]>([
    {
      key: '/',
      name: '首页'
    },
    {
      key: 'pins',
      name: '沸点'
    },
    {
      key: 'course',
      name: '课程'
    },
    {
      key: 'live',
      name: '直播'
    },
    {
      key: 'events/all',
      name: '活动'
    },
    {
      key: 'challenge',
      name: '竞赛'
    },
    {
      key: 'goods',
      name: '商城'
    },
    {
      key: 'app',
      name: 'App'
    },
    {
      key: 'extension',
      name:'插件'
    }
  ])
  //const fetcher: Fetcher<Nav[]> = (url: string) => Get<Nav[]>(url)
  //const { data } = useSwr('/api/nav', fetcher)

  return (
    <header
      style={{ top: `${header.close ? '-60px' : '0px'}` }}
      className='w-full flex bg-juejin-layer-1 nav-height text-juejin-font-2 items-center pl-9  transition-top duration-300 fixed top-0 left-0 right-0 z-50'>
      <a>
        <Image src={JuejinSvg} alt='juejin' priority width='0' height='0' className='hidden sm:inline-block w-32 h-auto' />
        <Image src={JuejinSmallSvg} alt='juejin' priority width={35} className='inline-block sm:hidden' />
      </a>
      <nav>
        <ul className='flex xl:ml-8 ml-4 items-center'>
          {/* 窄屏导航栏显示 */}
          <li className='flex xl:hidden cursor-pointer relative'>
            <div
              onClick={() => setShrink(state => !state)}
              className='flex items-center gap-x-1 text-juejin-brand-1-normal'>
              <span className=' text-lg'>首页</span>
              <AiFillCaretDown className={`transition-all ${!shrink ? ' -rotate-180' : ''}`} />
            </div>
            <ul className={`absolute -bottom-8  ${shrink && 'hidden'}`}>
            </ul>
          </li>
          {/* 宽屏导航栏显示 */}
          <li className='w-[466px] items-center hidden xl:flex transition-all  duration-200'>
            {navs?.map(nav => <Link
              key={nav.key === '' ? '/' : nav.key} href={nav.key === '' ? '/' : nav.key}
              locale='en'>
              <div
                className={`mx-3 nav-height flex items-center justify-center hover:text-juejin-font-1 relative after:absolute after:bottom-0 after:w-full after:h-[2px] after:bg-juejin-brand-1-normal after:opacity-0 hover:after:opacity-100 ${router.pathname === '/' + nav.key ? 'after:opacity-100' : ''}`}>
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
              <li className='ml-6 hidden sm:block group relative'>
                <button
                  onClick={() => onOpen()}
                  className='btn text-juejin-brand-1-normal border border-juejin-brand-4-disable rounded-md bg-juejin-brand-5-light'>
                  登录&nbsp;|&nbsp;注册
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header >
  )
}

export default Header