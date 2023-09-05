import React from 'react'
import Avatar from './Avatar'
import { loginModal } from '@/store'
import CommentInput from './CommentInput'
import { useSession } from 'next-auth/react'

const Comment: React.FC<{ articleId: string }> = (props) => {
  const { articleId } = props
  const { data: session } = useSession()
  const { onOpen } = loginModal()

  return (
    <div id='comment'>
      <div className=' font-extrabold text-xl '>
        <span>评论</span>
      </div>
      <div className=' mt-6 flex gap-x-8 items-start'>
        <Avatar url={session?.user?.image} />
        <div className='flex-1'>
          {session ? <CommentInput articleId={articleId} /> :
            <>
              <div
                onClick={onOpen}
                className='layer bg-juejin-bg h-20 flex items-center break-words justify-center text-lg'>
                看完啦，<button className='mx-1 text-juejin-brand-1-normal cursor-pointer'>登录</button>分享一下感受吧~
              </div>
            </>}
        </div>
      </div>
    
    </div>
  )
}

export default Comment