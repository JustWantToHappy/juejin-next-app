import React from 'react'
import Link from 'next/link'
import Avatar from './Avatar'
import { AiOutlineLike } from 'react-icons/ai'
import { RiMoreLine } from 'react-icons/ri'
import { LiaCommentDots } from 'react-icons/lia'

interface Props {

}

const CommentItem: React.FC<Props> = (props) => {
  return (
    <div className='flex gap-x-4'>
      <Avatar url='' />
      <div className='flex-1 text-juejin-font-3'>
        <div className='justify-between flex'>
          <Link href='/'>
            <span className='text-juejin-font-1 text-lg'>Samsara</span>
          </Link>
          <span>22天前</span>
        </div>
        <p className='text-juejin-font-1 mt-3'>你们这些人都不看完文章就开喷吗，自己去搜搜mdn的标准是什么，你没实现你还有理了</p>
        <div className='flex gap-x-10 text-2xl mt-3'>
          <span className="cursor-pointer hover:text-juejin-brand-2-hover w-16 relative after:content-['点赞'] after:absolute after:text-base  after:right-0 after:top-1/2 after:-translate-y-1/2">
            <AiOutlineLike />
          </span>
          <span className="cursor-pointer hover:text-juejin-brand-2-hover w-16 relative after:content-['回复'] after:absolute after:text-base  after:right-0 after:top-1/2 after:-translate-y-1/2">
            <LiaCommentDots />
          </span>
          <RiMoreLine className='cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default CommentItem