import React from 'react'
import Link from 'next/link'
import Avatar from './Avatar'
import { loginModal } from '@/store'
import { useSession } from 'next-auth/react'
import CommentInput from './CommentInput'
import { AiOutlineLike } from 'react-icons/ai'
import { RiMoreLine } from 'react-icons/ri'
import { LiaCommentDots } from 'react-icons/lia'
import type { BasicComment } from '@/types'
import type { User, Comment } from 'prisma/prisma-client'

interface Props {
  id: number
  rootId?: number
  articleId: string
  likes?: number
  content: string
  replies?: number
  user: User | null
  createdAt?: Date
  avatarSize?: number
  activeCommentInput: number
  parent?: BasicComment
  children?: React.ReactElement
  updateActiveCommentInput?: (active: number) => void
}

const CommentItem: React.FC<Props> = ({
  content,
  children,
  user,
  articleId,
  rootId = 0,
  avatarSize = 40,
  id,
  parent,
  activeCommentInput,
  updateActiveCommentInput
}) => {
  const { onOpen } = loginModal()
  const { data: session } = useSession()

  const handleReply = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (!session) {
      onOpen()
    } else {
      const current = event.currentTarget as HTMLSpanElement
      if (activeCommentInput === -1 || parseInt(current.getAttribute('data-id') ?? '0') !== activeCommentInput) updateActiveCommentInput?.(parseInt(current.getAttribute('data-id') ?? '0'))
      else {
        updateActiveCommentInput?.(-1)
      }
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
            <div className='flex gap-x-3'>
              <Link href='/'>
                <span className='text-juejin-font-1'>{user?.name}</span>
              </Link>
              {parent && <>
                <span>回复</span>
                <Link href='/'>
                  <span className='text-juejin-font-1'>{parent.user?.name}</span>
                </Link>
              </>}
            </div>
            <span>22天前</span>
          </div>
          <p className='text-juejin-font-1'>{content}</p>
          {parent && <div className='flex bg-juejin-gray-2 px-3 py-1 border border-juejin-gray-1-1'>
            &quot;<p title={parent.content} className='ellipsis'>{parent.content}</p>&quot;
          </div>}
          <div className='flex gap-x-10 text-2xl '>
            <span
              onClick={handleLike}
              className="cursor-pointer hover:text-juejin-brand-2-hover w-16 relative after:content-['点赞'] after:absolute after:text-base  after:right-0 after:top-1/2 after:-translate-y-1/2">
              <AiOutlineLike />
            </span>
            <span
              onClick={handleReply}
              data-id={id}
              className={`  after:content-['回复'] cursor-pointer hover:text-juejin-brand-2-hover w-16 relative after:absolute after:text-base  after:right-0 after:top-1/2 after:-translate-y-1/2 }`}>
              <LiaCommentDots />
            </span>
            <RiMoreLine className='cursor-pointer' />
          </div>
          {activeCommentInput === id && <CommentInput
            parentId={id}
            rootId={rootId}
            articleId={articleId}
            defaultFocus />}
        </div>
        {children}
      </div>
    </div >
  )
}

export default React.memo(CommentItem)