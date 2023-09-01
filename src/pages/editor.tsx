import React from 'react'
import dynamic from 'next/dynamic'
import { Post, Get } from '@/utils'
import 'react-quill/dist/quill.snow.css'
import { type Tag } from '@/types'
import { tags } from '@/components/NavTags'
import { useSession } from 'next-auth/react'
const DynamicReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'code-block', 'image'],
    [{ 'align': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
  history: true
}

const Eidtor = () => {
  const session = useSession()
  const [show, setShow] = React.useState(false)
  const [desc, setDesc] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [selectedTags, setSelectedTags] = React.useState<string[]>(['1', '2'])

  const publish = (event: React.MouseEvent) => {
    event.stopPropagation()
    setShow(show => !show)
  }

  const ConfirmPublish = async () => {
    if (title === '') {
      alert('标题不能为空')
      return
    } else if (content.length < 50) {
      alert('文章内容不能低于50字')
      return
    } else if (!selectedTags.length) {
      alert('至少选择一个标签')
      return
    }
    console.info(content)
    if ((await Post('/api/article', { desc, content, title })) === 'success') {
      alert('发布文章成功!')
    } else {
      alert('发布文章失败')
    }
  }

  React.useEffect(() => {
    const handleClick = () => {
      setShow(false)
    }

    window.addEventListener('click', handleClick)
    document.body.style.backgroundColor = '#fff'

    return function () {
      window.removeEventListener('click', handleClick)
      document.body.style.backgroundColor = '#f2f3f5'
    }
  }, [])

  return (
    <div className=' -translate-y-6'>
      <div className='flex  border border-juejin-gray-1-1'>
        <input
          onChange={e => setTitle(e.target.value)}
          className='flex-1 p-4 rounded-none '
          placeholder='请输入文章标题' />
        <div className='relative flex items-center'>
          <button
            onClick={publish}
            className=' bg-juejin-brand-1-normal text-juejin-gray-0 px-8 mr-4 p-3 rounded-full  hover:bg-juejin-brand-2-hover'>发布</button>
          <div
            onClick={e => e.stopPropagation()}
            className={`after:w-4 after:h-4 after:bg-juejin-layer-1 after:border after:border-t-juejin-gray-1-1 after:border-transparent after:border-l-juejin-gray-1-1 after:border-t after:absolute after:z-20 after:right-4 after:-top-2 after:rotate-45  p-4 shadow  border-t-juejin-gray-1-1 border-t  absolute right-7 min-w-[350px] max-w-full h-[320px] -bottom-[330px] z-10 layer  ${show ? 'block' : 'hidden'}`}>
            <div>
              <label className=' float-left'>分类：</label>
              <div className='grid grid-cols-4 gap-2'>
                {tags.map(tag => <span
                  key={tag.key}
                  className='layer text-center p-1 bg-juejin-gray-1-2 cursor-pointer text-juejin-font-3 hover:bg-juejin-gray-1-1'>
                  {tag.name}
                </span>)}
              </div>
            </div>
            <div className='mt-3 flex'>
              <label>描述：</label>
              <textarea className='flex-1 resize-none outline-none border border-juejin-brand-1-normal p-2' rows={4} maxLength={100} />
            </div>
            <div className='mt-3 '>
              <label>文章封面：</label>
              {/*<input type='file' />*/}
            </div>
            <div className='text-right mt-3'>
              <button
                onClick={() => setShow(false)}
                className='btn border-juejin-brand-1-normal border text-juejin-brand-1-normal mr-4'>取消</button>
              <button
                onClick={ConfirmPublish}
                className='btn bg-juejin-brand-1-normal text-juejin-layer-1 hover:bg-juejin-brand-2-hover'>确定发布</button>
            </div>
          </div>
        </div>
      </div>
      <DynamicReactQuill
        theme='snow'
        onChange={content => setContent(content)}
        placeholder='请输入文章内容'
        modules={modules} />
    </div>
  )
}

export default Eidtor