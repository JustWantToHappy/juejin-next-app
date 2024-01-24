import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { EntryType } from '@/types'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai'

const Entry: React.FC<EntryType> = ({ id, title, desc, readCount, author, image, likeCount, tags }) => {
  const navigatToArticle = () => {
    window.open(`/post/${id}`)
  }

  return (
    <li
      onClick={navigatToArticle}
      className='h-[100px] break-words text-left px-[--home-recommend-padding-x] pt-4 list-none duration-300 transition-all ease-in border-b-juejin-gray-1-1 border-b flex gap-x-4 cursor-pointer hover:bg-juejin-gray-3 leading-7 text-sm text-juejin-font-3 overflow-hidden items-center'>
      <div className='flex-1'>
        <div>
          <Link
            href={`/post/${id}`}
            onClick={e => e.preventDefault()}
            title={title}
            className=' text-lg font-extrabold text-juejin-font-1'>
            <p className='ellipsis'>{title}</p>
          </Link>
        </div>
        <div>
          <Link
            onClick={e => e.preventDefault()}
            href={`/post/${id}`}>
            <p className='ellipsis'>{desc}</p>
          </Link>
        </div>
        <div className='flex justify-between items-center'>
          <ul className='flex gap-x-4'>
            <li className='ellipsis'>{author}</li>
            <li className=' font-thin text-juejin-gray-1-1 hidden'>|</li>
            <li className='flex items-center gap-x-2'>
              <AiOutlineEye className='text-lg ' />
              <span>{readCount}</span>
            </li>
            <li className='ml-2 flex items-center gap-x-2'>
              <AiOutlineLike className='text-lg' />
              <span>{likeCount}</span>
            </li>
            <li className='flex items-center'>
              <FiMoreHorizontal className='text-lg' />
            </li>
          </ul>
          <div className='hidden sm:flex gap-x-4'>
            {tags.map(tag => <Link
              key={tag.key}
              href='/tag'
              className='px-1 bg-juejin-gray-1-2 layer hover:text-juejin-brand-1-normal ellipsis'>
              {tag.name}
            </Link>)}
          </div>
        </div>
      </div>
      <div className='w-[100px] relative h-3/4 overflow-hidden'>
        {/*<Image src={image} alt={title} sizes='100vw' fill priority objectFit='contain' className='rounded' />*/}
      </div>
    </li>
  )
}

export default Entry