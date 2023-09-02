import React from 'react'
import VirtualList from './VirtualList'

const Comment = () => {
  const inputRef = React.useRef<HTMLDivElement>(null)
  const [focus, setFocus] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [components, setComponents] = React.useState<React.ReactElement[]>([])

  const handleBlur = (event: React.ChangeEvent) => {
    const input = event.target as HTMLDivElement
    setComment(input.textContent ?? '')
  }

  return (
    <>
      <div className=''>
        <div className=' font-extrabold text-xl '>
          <span>评论</span>
        </div>
        <div className=' mt-6 flex gap-x-8'>
          <div>头像</div>
          <div className='flex-1'>
            <div
              ref={inputRef}
              spellCheck={false}
              onBlur={handleBlur}
              contentEditable
              className={`before:content-['输入评论,(Enter换行,Ctrl+Enter发送)'] before:top-4 before:left-4 before:text-juejin-font-3  before:absolute before:pointer-events-none relative min-h-[100px] bg-juejin-gray-1-2 p-4 border border-transparent focus:border-juejin-brand-1-normal focus:bg-juejin-layer-1 text-juejin-font-1 focus:before:hidden ${comment === '' ? ' before:block' : ' before:hidden'} peer`}
              placeholder='输入评论 (Enter换行,Ctrl + Enter发送)'>
            </div>
            <div className='flex justify-between mt-3'>
              <div></div>
              <div className='text-juejin-font-3'>
                <span>Crtl + Enter</span>
                <button className='btn-primary ml-6'>发表评论</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VirtualList components={components} wideSkeleton={false} />
    </>
  )
}

export default Comment