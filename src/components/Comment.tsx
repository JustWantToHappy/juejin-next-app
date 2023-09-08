import React from 'react'
import { Get } from '@/utils'
import Avatar from './Avatar'
import Skeleton from './Skeleton'
import type { Fetcher } from 'swr'
import { loginModal } from '@/store'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import useSWRInfinite from 'swr/infinite'
import { useSession } from 'next-auth/react'
import type { ResCommentType } from '@/types'
import { BsChevronDown } from 'react-icons/bs'

type Res = {
  data: ResCommentType[]
  total: number
  listLength: number
}
const Comment: React.FC<{ articleId: string }> = (props) => {
  const { articleId } = props
  const { onOpen } = loginModal()
  const commentRef = React.useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const [pageSize, setPageSize] = React.useState(5)
  const fetcher: Fetcher<Res> = (url: string) => Get<Res>(url)
  const [activeCommentInput, setActiveCommentInput] = React.useState(-1)
  const { data, setSize, isLoading, mutate } = useSWRInfinite((index) => {
    return `/api/comment/${articleId}/?current=${index + 1}&pageSize=${pageSize}`
  }, fetcher)

  const loadingMore = () => {
    setSize(size => size + 1)
  }

  const updateComments = React.useCallback(() => {
    mutate()
  }, [mutate])

  const updateActiveCommentInput = React.useCallback((active: number) => {
    setActiveCommentInput(active)
  }, [])


  const currentTotal = React.useMemo(() => {
    return data?.reduce((currentValue, { listLength }) => currentValue + listLength, 0) || 0
  }, [data])

  const total = React.useMemo(() => {
    if (data?.length) {
      return data.at(-1)?.total ?? 0
    }
    return 0
  }, [data])

  React.useEffect(() => {
    const handleClick = () => {
      setActiveCommentInput(-1)
    }
    window.addEventListener('click', handleClick)
    return function () {
      window.removeEventListener('click', handleClick)
    }
  }, [])


  if (isLoading) return <div className='px-8'><Skeleton /></div>
  return (
    <div
      ref={commentRef}
      id='comment'>
      <div className=' font-extrabold text-xl '>
        <span onClick={() => setSize(size => size + 1)}>评论</span>
      </div>
      <div className=' mt-6 flex gap-x-8 items-start'>
        <Avatar url={session?.user?.image} />
        <div className='flex-1'>
          {session ? <CommentInput articleId={articleId} updateComments={updateComments} /> :
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
        {data?.map(({ data: comments }) => {
          return comments.map(firstLevelComment => <div key={firstLevelComment.id} className='mb-8'>
            <CommentItem
              id={firstLevelComment.id}
              rootId={firstLevelComment.id}
              activeCommentInput={activeCommentInput}
              updateActiveCommentInput={updateActiveCommentInput}
              updateComments={updateComments}
              articleId={articleId}
              user={firstLevelComment.user}
              likes={firstLevelComment.likes}
              replies={firstLevelComment.children.length}
              createdAt={firstLevelComment.createdAt}
              content={firstLevelComment.content}>
              {firstLevelComment.children.length ? <div className='my-3 layer bg-juejin-layer-2-1 p-4 flex flex-col gap-y-3'>
                {firstLevelComment?.children?.map(secondLevelComment =>
                  <CommentItem
                    id={secondLevelComment.id}
                    rootId={firstLevelComment.id}
                    avatarSize={30}
                    updateComments={updateComments}
                    parent={secondLevelComment.parent}
                    updateActiveCommentInput={updateActiveCommentInput}
                    activeCommentInput={activeCommentInput}
                    articleId={articleId}
                    user={secondLevelComment.user}
                    key={secondLevelComment.id}
                    likes={secondLevelComment.likes}
                    content={secondLevelComment.content} />)}
              </div> : <></>}
            </CommentItem>
          </div>)
        })}
      </div>
      {/* loading more... */}
      <p
        onClick={loadingMore}
        style={{ display: `${(currentTotal < total) ? 'flex' : 'none'}` }}
        className={`cursor-pointer bg-juejin-layer-2-1 text-juejin-font-2  items-center h-[52px] justify-center text-lg tracking-wider hover:text-juejin-brand-2-hover`}>
        加载更多评论<BsChevronDown />
      </p>
      <p
        className=' justify-center items-center text-juejin-font-3'
        style={{ display: `${currentTotal >= total ? 'flex' : 'none'}` }}>
        已经到底了(๑•̀ω•́)ノ
      </p>
    </div>
  )
}

export default Comment