import React from 'react'
import Avatar from './Avatar'
import { headerStore } from '@/store'
import { useSession } from 'next-auth/react'

const Aside = () => {
const { close } = headerStore()
  const { data: session } = useSession()

  return (
    <aside className={`w-[--home-aside-width] hidden lg:block sticky transition-all duration-300 ${close ? 'top-[--aside-top]' : ' top-[80px]'}`}>
      <div className='layer p-4'>
        <div className='flex '>
          <span className=' font-extrabold'>作者榜</span>
        </div>
        <div className='flex items-center gap-x-4 mt-4'>
          <Avatar url={session?.user.image} />
          <span>{session?.user.name}</span>
        </div>
      </div>
    </aside>
  )
}

export default Aside