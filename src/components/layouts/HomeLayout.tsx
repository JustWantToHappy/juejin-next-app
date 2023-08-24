import React from 'react'
import Aside from '../Aside'
import NavTags from '../NavTags'

const HomeLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className=' px-10 flex items-start gap-x-6 '>
      <NavTags />
      <div className='flex gap-x-6 flex-1'>
        <div className='lg:w-[--home-recommend-width] layer h-[2000px] flex-1 min-w-[--home-recommend-min-width]'>
          {props.children}
        </div>
        <Aside />
      </div>
    </div>
  )
}

export default HomeLayout