import React from 'react'
import { Post } from '@/utils'
import type { CommentType } from '@/types'
import { useSession } from 'next-auth/react'

const CommentInput: React.FC<{ articleId: string }> = ({ articleId }) => {
  const { data: session } = useSession()
  const inputRef = React.useRef<HTMLDivElement>(null)
  const [comment, setComment] = React.useState('')

  const handleBlur = (event: React.ChangeEvent) => {
    const input = event.target as HTMLDivElement
    setComment(input.textContent ?? '')
  }

  const submitComment = async () => {
    if (inputRef.current) {
      const userId = session?.user.id as string
      const text = inputRef.current.textContent as string
      if (text === '') {
        alert('你还没有输入任何东西...')
        return
      }
      const data = await Post<CommentType, string>('/api/comment', {
        articleId,
        userId,
        content: text,
      })
      alert(data)
      inputRef.current.textContent = ''
      inputRef.current.blur()
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    //ctrl+enter
    if (e.ctrlKey && e.key === 'Enter') {
      submitComment()
    }
  }
  return (
    <div>
      <div
        ref={inputRef}
        spellCheck={false}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        contentEditable
        className={`before:content-['输入评论,(Enter换行,Ctrl+Enter发送)'] before:top-4 before:left-4 before:text-juejin-font-3  before:absolute before:pointer-events-none relative min-h-[100px] bg-juejin-gray-1-2 p-4 border border-transparent focus:border-juejin-brand-1-normal focus:bg-juejin-layer-1 text-juejin-font-1 focus:before:hidden ${comment === '' ? ' before:block' : ' before:hidden'} peer`}
        placeholder='输入评论 (Enter换行,Ctrl + Enter发送)'>
      </div>
      <div className='flex justify-end mt-3'>
        <div className='text-juejin-font-3'>
          <span>Crtl + Enter</span>
          <button
            onClick={submitComment}
            className='btn-primary ml-6 px-4 py-3'>
            发表评论
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentInput