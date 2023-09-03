import React from 'react'
import type { CatelogueType } from '@/types'

type Props = {
  active?: number
  catelogue: CatelogueType[]
  smoothScroll?: boolean
}

const Catelogue: React.FC<Props> = ({ active = -1, catelogue, smoothScroll = false }) => {
  const handleClickCatelogue = (event: React.MouseEvent) => {
    event.preventDefault()
    const hash = (event.target as HTMLAnchorElement)?.hash ?? '#heading'
    const title = document.querySelector(hash) as HTMLElement
    if (title) {
      window.scrollTo({ top: title.offsetTop - 70, behavior: 'smooth' })
      setTimeout(() => {
        window.location.hash = hash
      }, 300)
    }
  }

  const generateCatelogueTree = (catelogue: CatelogueType[], level: number) => {
    return (
      <ul className={`text-md max-h-[--catelogue-max-height] overflow-auto scroll-container mr-1 ${!level ? 'mt-3' : ''}`}>
        {catelogue.map((item) => (
          <React.Fragment key={item.index}>
            <li
              onClick={handleClickCatelogue}
              style={{ paddingLeft: `${16 * level}px` }}
              className={`before:absolute before:w-[4px]  before:rounded-sm  before:h-4  before:top-1/2   before:bg-juejin-brand-1-normal before:-left-[0px] before:-translate-y-1/2 relative cursor-pointer group h-10 leading-10 ellipsis transition-all duration-300 ${active === item.index ? 'before:block' : 'before:hidden'}`}>
              <a
                title={item.title}
                href={`#heading-${item.index}`}
                onClick={e => e.preventDefault()}
                style={active === item.index ? { color: '#1171ee' } : {}}
                className='ml-3 group-hover:text-juejin-brand-2-hover block w-full'>{item.title}</a>
            </li>
            {item.children?.length ? generateCatelogueTree(item.children, level + 1) : ''}
          </React.Fragment>
        ))}
      </ul>
    )
  }

  return (
    <nav >
      <div className='pb-4 mr-3 text-xl border-b border-b-juejin-gray-1-1  ml-3'>目录</div>
      {generateCatelogueTree(catelogue, 0)}
    </nav>
  )
}

export default Catelogue
