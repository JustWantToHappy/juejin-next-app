import React from 'react'
import { getElementOffsetTop } from '@/utils'
import type { CatelogueType } from '@/types'

type Props = {
  catelogue: CatelogueType[]
  smoothScroll?: boolean
  markdownContainer: HTMLDivElement | undefined
}

const Catelogue: React.FC<Props> = ({ catelogue, smoothScroll = false, markdownContainer }) => {
  const [active, setActive] = React.useState(-1)

  const originClick = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const handleClickCatelogue = (event: React.MouseEvent) => {
    event.preventDefault()
    if (markdownContainer) {
      const index = event.currentTarget.getAttribute('data-index')
      const hash = (event.target as HTMLAnchorElement)?.hash ?? ''
      const title = markdownContainer.querySelector(`[data-id='${hash.slice(1)}']`) as HTMLElement
      window.location.hash = hash
      if (title) {
        const offsetTop = getElementOffsetTop(title)
        window.scrollTo({ top: offsetTop - 70, behavior: smoothScroll ? 'smooth' : 'auto' })
      }
      setActive(parseInt(index ?? '0'))
    }
  }

  const generateCatelogueTree = (catelogue: CatelogueType[], level: number) => {
    return (
      <ul className={`text-md max-h-[--catelogue-max-height] overflow-auto scroll-container mr-1 ${!level ? 'mt-3' : ''}`}>
        {catelogue.map((item) => (
          <React.Fragment key={item.index}>
            <li
              data-index={item.index}
              onClick={handleClickCatelogue}
              style={{ paddingLeft: `${16 * level}px` }}
              className={`before:absolute before:w-[4px]  before:rounded-sm  before:h-4  before:top-1/2   before:bg-juejin-brand-1-normal before:-left-[0px] before:-translate-y-1/2 relative cursor-pointer group h-10 leading-10 ellipsis transition-all duration-300 ${active === item.index ? 'before:block' : 'before:hidden'}`}>
              <a
                title={item.title}
                href={`#heading-${item.index}`}
                onClick={originClick}
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
