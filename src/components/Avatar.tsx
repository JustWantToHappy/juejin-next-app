import React from 'react'
import Image from 'next/image'
import { AiOutlineUser } from 'react-icons/ai'

type Props = {
  url: string
  alt?: string
  title?: string
  size?: number
}

const Avatar: React.FC<Props> = ({ url, alt = '头像', title = '头像', size = 40 }) => {
  return (
    <div >
      {(url ?? '' !== '') ?
        <Image
          width={size}
          height={size}
          className='rounded-full'
          src={url}
          alt={alt}
          title={title} /> :
        <div className='relative bg-juejin-bg p-2 rounded-full'>
          <AiOutlineUser className='text-3xl text-juejin-font-3' />
        </div>}
    </div>
  )
}

export default Avatar