import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { EntryType } from '@/types'

const Entry: React.FC<EntryType> = ({ id, title, content, readCount, author, image, likes, tags }) => {
  const navigatToArticle = () => {
    window.open('/post/1')
  }

  return (
    <li
      onClick={navigatToArticle}
      className='h-[100px] break-words text-left px-[--home-recommend-padding-x] pt-4 list-none duration-300 transition-all ease-in border-b-juejin-gray-1-1 border-b flex gap-x-4 cursor-pointer hover:bg-juejin-gray-3 leading-7 text-sm text-juejin-font-3 overflow-hidden items-center'>
      <div className='flex-1'>
        <div>
          <Link href={`/post/${id}`}
            title={title}
            target='_blank'
            className=' text-lg font-extrabold text-juejin-font-1'>
            <p className='ellipsis'>{title}</p>
          </Link>
        </div>
        <div>
          <Link
            target='_blank'
            href={`/post/${id}`}>
            <p className='ellipsis'>{content}</p>
          </Link>
        </div>
        <div className='flex justify-between items-center'>
          <ul className='flex gap-x-4'>
            <li>{author}</li>
            <li className=' font-thin text-juejin-gray-1-1'>|</li>
            <li>{readCount}</li>
            <li className='ml-2'>{likes}</li>
          </ul>
          <div className='flex gap-x-4'>
            {tags.map(tag => <Link
              key={tag.key}
              href='/tag'
              className='px-1 bg-juejin-gray-1-2 layer hover:text-juejin-brand-1-normal'>
              {tag.name}
            </Link>)}
          </div>
        </div>
      </div>
      <div className='w-32 relative h-3/4 '>
        <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} priority />
      </div>
    </li>
  )
}

export default Entry