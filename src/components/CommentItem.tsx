import React from 'react'
import Link from 'next/link'
import Avatar from './Avatar'
import { loginModal } from '@/store'
import { useSession } from 'next-auth/react'
import CommentInput from './CommentInput'
import { AiOutlineLike } from 'react-icons/ai'
import { RiMoreLine } from 'react-icons/ri'
import { LiaCommentDots } from 'react-icons/lia'
import type { User, Comment } from 'prisma/prisma-client'

interface Props {
  id: number
  articleId: string
  likes?: number
  content: string
  replies?: number
  user: User | null
  createdAt?: Date
  avatarSize?: number
  parent?: Comment & { user: User }
  children?: React.ReactElement
}

const CommentItem: React.FC<Props> = ({ content, children, user, articleId, avatarSize = 40, id }) => {
  const { onOpen } = loginModal()
  const { data: session } = useSession()

  const handleReply = (event: React.MouseEvent) => {
    if (!session) {
      onOpen()
    }
  }

  const handleLike = () => {
    if (!session) onOpen()
  }

  return (
    <div className='flex gap-x-4'>
      <Avatar url={user?.image ?? ''} size={avatarSize} />
      <div className='flex-1 text-juejin-font-3'>
        <div className='mt-1 flex flex-col gap-y-3'>
          <div className='justify-between flex'>
            <Link href='/'>
              <span className='text-juejin-font-1'>{user?.name}</span>
            </Link>
            <span>22天前</span>
          </div>
          <p className='text-juejin-font-1'>{content}</p>
          <div className='flex gap-x-10 text-2xl '>
            <span
              onClick={handleLike}
              className="cursor-pointer hover:text-juejin-brand-2-hover w-16 relative after:content-['点赞'] after:absolute after:text-base  after:right-0 after:top-1/2 after:-translate-y-1/2">
              <AiOutlineLike />
            </span>
            <span
              onClick={handleReply}
              data-id={id}
              className="cursor-pointer hover:text-juejin-brand-2-hover w-16 relative after:content-['回复'] after:absolute after:text-base  after:right-0 after:top-1/2 after:-translate-y-1/2">
              <LiaCommentDots />
            </span>
            <RiMoreLine className='cursor-pointer' />
          </div>
          <div style={{}} className='hidden'>
            <CommentInput articleId={articleId} />
          </div>
        </div>
        {children}
      </div>
    </div >
  )
}

export default CommentItem