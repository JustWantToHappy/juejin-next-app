import React from 'react'
import { Get } from '@/utils'
import Avatar from './Avatar'
import type { Fetcher } from 'swr'
import { loginModal } from '@/store'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import useSWRInfinite from 'swr/infinite'
import { useSession } from 'next-auth/react'

const pageSize = 5
const Comment: React.FC<{ articleId: string }> = (props) => {
  const { articleId } = props
  const { onOpen } = loginModal()
  const { data: session } = useSession()
  const fetcher: Fetcher<any> = (url: string) => Get<any>(url)
  const { data, size, setSize, isLoading } = useSWRInfinite((index) => {
    return `/api/comment/${articleId}/?current=${index + 1}&pageSize=${pageSize}`
  }, fetcher)

  console.info(data)

  return (
    <div id='comment'>
      <div className=' font-extrabold text-xl '>
        <span onClick={() => setSize(size => size + 1)}>评论</span>
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
      <div className='mt-8'>
        <CommentItem />
      </div>
    </div>
  )
}

export default Comment