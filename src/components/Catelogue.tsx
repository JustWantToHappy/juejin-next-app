import React from 'react'
import type { CatelogueType } from '@/types'

type Props = {
  active?: number
  catelogue: CatelogueType[]
  smoothScroll?: boolean
  markdownContainer: HTMLDivElement | undefined
}

const Catelogue: React.FC<Props> = ({ active = -1, catelogue, smoothScroll = false, markdownContainer }) => {
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>()
  const hashRef = React.useRef<string>('')

  const originClick = (event: React.MouseEvent) => {
    event.preventDefault()
    if (markdownContainer) {
    }
  }

  const handleClickCatelogue = (event: React.MouseEvent) => {
    event.preventDefault()
    if (markdownContainer) {
      const hash = (event.target as HTMLAnchorElement)?.hash ?? ''
      const title = markdownContainer.querySelector(`[data-id='${hash.slice(1)}']`) as HTMLElement
      hashRef.current = hash
      console.info(title.offsetTop, 'test')
      if (title) {
        window.scrollTo({ top: title.offsetTop - 70, behavior: smoothScroll ? 'smooth' : 'auto' })
      }
    }
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (timerRef.current || hashRef.current === '') clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        window.location.hash = hashRef.current
      }, 300)
    }

    window.addEventListener('scroll', handleScroll)

    return function () {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
