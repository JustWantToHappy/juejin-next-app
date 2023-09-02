import React from 'react'
import type { CatelogueType } from '@/types'

const catelogue: CatelogueType[] = [{ index: 0, children: [{ index: 1, title: '这是h1下的h2标签' }], title: '这是h1标签' }, { index: 2, title: '这是h2' }]

const Catelogue = () => {
  const [active, setActive] = React.useState('')
  const catelogueContainerRef = React.useRef<HTMLUListElement>(null)

  const generateCatelogueTree = React.useCallback((catelogue: CatelogueType[], parent: DocumentFragment | HTMLElement, level: number) => {
    if (!Array.isArray(catelogue)) return
    for (let i = 0; i < catelogue.length; i++) {
      const li = document.createElement('li')
      li.style.paddingLeft = `${10 * level}px`
      const title = document.createElement('a')
      title.textContent = catelogue[i].title
      title.href = `#heading-${catelogue[i].index}`
      li.append(title)
      parent.append(li)
      if (catelogue[i].children) {
        const ul = document.createElement('ul')
        generateCatelogueTree(catelogue[i].children as CatelogueType[], ul, level + 1)
        parent.append(ul)
      }
    }
  }, [])

  React.useEffect(() => {
    const documentFragment = document.createDocumentFragment()
    generateCatelogueTree(catelogue, documentFragment, 0)
    if (catelogueContainerRef.current) {
      catelogueContainerRef.current.innerHTML = ''
      catelogueContainerRef.current.append(documentFragment)
    }
  }, [generateCatelogueTree])

  return (
    <nav className=' max-h-[--catelogue-max-width] overflow-auto'>
      <style>
        {`
        ul{
          font-size:14px;
          font-weight:400;
        }
        ul li{
          height:40px;
          line-height:40px;
          cursor:pointer;
        }
        ul li:hover{
          color:#1171ee;
          //background:red;
        }
      `}
      </style>
      <div className=' pb-4 mr-3 text-xl border-b border-b-juejin-gray-1-1'>目录</div>
      <ul ref={catelogueContainerRef} className='mt-2'>
      </ul>
    </nav>
  )
}

export default Catelogue