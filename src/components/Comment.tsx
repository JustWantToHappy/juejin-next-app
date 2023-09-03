import React from 'react'
import Entry from './Entry'
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

  React.useEffect(() => {
    //setComponents(() => Array(1000).fill(1).map((_, index) => <Entry id={index % 2 === 1 ? '13815bc6-f4ba-4b21-9b83-174d6183583b' : 'f635ab58-56f0-4661-af7f-b984384f0229'} key={index} data-index={index} title='🔥小册上新 | TypeScript 框架开发实战' likes={50} tags={[{ key: '前端', name: '前端' }, { key: '后端', name: '后端' }]} readCount={50} author='掘金小册' content='学习服务端 Web 框架最好的方式，就是从头写一个 Web 框架。与其按部就班的学习，开发框架本身更高效！' image='http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg' />))
  }, [])

  return (
    <div className='' id='comment'>
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
              <button className='btn-primary ml-6 px-4 py-3'>发表评论</button>
            </div>
          </div>
        </div>
      </div>
      <VirtualList components={components} wideSkeleton />
    </div>
  )
}

export default Comment