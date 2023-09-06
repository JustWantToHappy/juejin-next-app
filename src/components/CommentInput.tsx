import React from 'react'
import { Post } from '@/utils'
import type { CommentType } from '@/types'
import { useSession } from 'next-auth/react'

interface Props {
  articleId: string
  defaultFocus?: boolean
  updateComments?: () => void
  parentId?: number
  rootId?: number
}

const CommentInput: React.FC<Props> = ({ articleId, defaultFocus, updateComments, parentId = 0, rootId = 0 }) => {
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
        parentId,
        rootId
      })
      updateComments?.()
      inputRef.current.textContent = ''
      setComment('')
      inputRef.current.blur()
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    //ctrl+enter
    if (e.ctrlKey && e.key === 'Enter') {
      submitComment()
    }
  }

  const handleInput = (event: React.MouseEvent<HTMLDivElement>) => {
    const input = event.target as HTMLDivElement
    setComment(input.textContent ?? '')
  }

  React.useEffect(() => {
    if (inputRef.current && defaultFocus) {
      inputRef.current.focus()
    }
  }, [defaultFocus])

  return (
    <div onClick={e => e.stopPropagation()}>
      <div
        ref={inputRef}
        spellCheck={false}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onInput={handleInput}
        contentEditable
        className={`before:content-['输入评论,(Enter换行,Ctrl+Enter发送)'] before:top-4 before:left-4 before:text-juejin-font-3  before:absolute before:pointer-events-none relative min-h-[70px] bg-juejin-gray-1-2 p-4 border border-transparent focus:border-juejin-brand-1-normal focus:bg-juejin-layer-1 text-juejin-font-1 layer transition-all duration-300 ${comment === '' ? ' before:block' : ' before:hidden'}`}
        placeholder='输入评论 (Enter换行,Ctrl + Enter发送)'>
      </div>
      <div className='justify-end mt-3 flex'>
        <div className='text-juejin-font-3'>
          <span>Crtl + Enter</span>
          <button
            disabled={comment === ''}
            onClick={submitComment}
            className={`btn-primary ml-6 px-4 py-3 ${comment === '' && ' bg-juejin-brand-4-disable hover:bg-juejin-brand-4-disable'}`}>
            发表评论
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CommentInput)