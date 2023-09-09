import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { editorStore } from '@/store'
import { Post, Get } from '@/utils'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import 'react-quill/dist/quill.snow.css'
import useSwr, { type Fetcher } from 'swr'
import type { Tag } from 'prisma/prisma-client'
import ReactQuill, { ReactQuillProps } from 'react-quill'
const DynamicReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'code-block'],
    [{ 'align': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
  history: true
}

const Eidtor = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { data, setData, clearData } = editorStore()
  const editorRef = React.useRef<ReactQuill.UnprivilegedEditor>()
  const [show, setShow] = React.useState(false)
  const fetcher: Fetcher<Tag[]> = (url: string) => Get<Tag[]>(url)
  const { data: tags } = useSwr('/api/tag', fetcher)
  const [footer, setFooter] = React.useState<{ rows?: number, chars?: number }>({ rows: 1, chars: 0 })
  const [selectedTags, setSelectedTags] = React.useState<number[]>([])

  const handleChange: ReactQuillProps['onChange'] = (content, delta, source, editor) => {
    const text = editor.getText()
    const rows = text.split('\n').length - 1
    setData({ content })
    setFooter({
      chars: text === '\n' ? 0 : text.length,
      rows,
    })
    if (!editorRef.current) editorRef.current = editor
  }

  const handleSelectTag = (id: number) => {
    return function () {
      setSelectedTags(selectedTags => {
        if (selectedTags.includes(id)) return selectedTags.filter(originId => originId !== id)
        return [...selectedTags, id]
      })
    }
  }

  const publish = (event: React.MouseEvent) => {
    event.stopPropagation()
    setShow(show => !show)
  }

  const ConfirmPublish = async () => {
    if (data.title === '') {
      alert('标题不能为空')
      return
    } else if ((data?.content?.length ?? 0) < 50) {
      alert('文章内容不能低于50字')
      return
    } else if (!selectedTags.length) {
      alert('至少选择一个标签')
      return
    } else if ((data?.desc?.length ?? 0) < 50) {
      alert('文章摘要不能低于50字')
      return
    }
    if (session?.user.id && (await Post('/api/article',
      {
        article: { ...data, userId: session?.user.id },
        tags: selectedTags
      })) === 'success') {
      clearData()
      alert('发布文章成功!')
      router.replace('/')
    } else {
      alert('发布文章失败')
    }
  }

  React.useEffect(() => {
    const handleClick = () => {
      setShow(false)
    }

    window.addEventListener('click', handleClick)
    return function () {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div >
      <Head>
        <title>写文章&nbsp;-&nbsp;掘金</title>
      </Head>
      <div className='flex items-center h-[--editor-title-height] '>
        <input
          value={data.title}
          onChange={e => setData({ title: e.target.value })}
          className='flex-1 p-4 text-3xl font-extrabold rounded-none border-none bg-juejin-bg'
          placeholder='输入文章标题' />
        <div className='relative flex items-center'>
          <button
            onClick={publish}
            className=' bg-juejin-brand-1-normal text-juejin-gray-0 px-8 mr-4 p-3 rounded-full  hover:bg-juejin-brand-2-hover'>发布</button>
          <div
            onClick={e => e.stopPropagation()}
            className={`arrows after:bg-juejin-bg  p-4 shadow  border-t-juejin-gray-1-1 border-t  absolute right-7 min-w-[350px] max-w-full h-[320px] -bottom-[330px] z-10 layer bg-juejin-bg  ${show ? 'block' : 'hidden'}`}>
            <div>
              <label className=' float-left'>分类：</label>
              <div className='grid grid-cols-4 gap-2'>
                {tags?.map(tag => <span
                  key={tag.key}
                  onClick={handleSelectTag(tag.id)}
                  className={`layer text-center p-1  cursor-pointer  ${selectedTags.includes(tag.id) ? ' text-juejin-brand-1-normal bg-juejin-brand-6-light' : 'hover:bg-juejin-gray-1-1 text-juejin-font-3 bg-juejin-gray-1-2'}`}>
                  {tag.name}
                </span>)}
              </div>
            </div>
            <div className='mt-3 flex'>
              <label>文章摘要：</label>
              <textarea
                value={data.desc}
                onChange={e => setData({ desc: e.target.value })}
                rows={4}
                className='flex-1 resize-none outline-none border border-juejin-brand-1-normal p-2'
                maxLength={100} />
            </div>
            <div className='mt-3 '>
              <label>文章封面：</label>
              {/*<input type='file' />*/}
            </div>
            <div className='text-right mt-3'>
              <button
                onClick={() => setShow(false)}
                className=' btn-secondary  mr-4'>取消</button>
              <button
                onClick={ConfirmPublish}
                className='btn-primary'>确定发布</button>
            </div>
          </div>
        </div>
      </div>
      <DynamicReactQuill
        defaultValue={data.content}
        theme='snow'
        className='h-[--ql-container-height] scroll-container border-t border-t-juejin-editor-border'
        onChange={handleChange}
        placeholder='请输入文章内容'
        modules={modules} />
      <footer className='fixed h-[--editor-footer-height] leading-[--editor-footer-height] bottom-0 left-0 right-0 border-t border-t-juejin-editor-border z-50 bg-juejin-bg text-sm'>
        <div className='float-left ml-2 flex gap-x-3'>
          <span>行数：{footer?.rows}</span>
          <span>正文字数：{footer.chars}</span>
        </div>
        <span
          className='float-right mr-2 cursor-pointer btn-text'>
          回到顶部
        </span>
      </footer>
    </div>
  )
}

export default Eidtor