import React from 'react'
import Link from 'next/link'
import { getElementTopOffset } from '@/utils'
import type { IconType } from 'react-icons'
import { TimerRefContext } from '@/context'
import { useRouter } from 'next/router'
import { FaCommentDots, FaShare } from 'react-icons/fa'
import { AiTwotoneLike, AiTwotoneWarning, AiFillStar, AiOutlineRead } from 'react-icons/ai'

const ArticleLayout: React.FC<React.PropsWithChildren> = (props) => {
  const router = useRouter()
  const timerRef = React.useContext(TimerRefContext)

  const icons: { icon: IconType, href?: string }[] = [
    { icon: AiTwotoneLike },
    { icon: FaCommentDots, href: '#comment' },
    { icon: AiFillStar },
    { icon: FaShare },
    { icon: AiTwotoneWarning },
    { icon: AiOutlineRead }
  ]

  const scrollToComments = (event: React.MouseEvent) => {
    event.preventDefault()
    const comments = document.querySelector('[data-id=\'comment\']')
    if ((comments instanceof HTMLElement) && timerRef) {
      const offsetTop = getElementTopOffset(comments)
      window.scrollTo({ top: offsetTop - 60 })
      router.push('#comment')
      timerRef.current = setTimeout(() => {
        timerRef.current = null
      }, 300)
    }
  }

  return (
    <>
      {props.children}
      <ul className='hidden sm:flex flex-col fixed z-30 left-3 top-[140px] gap-y-6 w-14 h-[400px] overflow-hidden '>
        {icons.map((item, index) => {
          const Icon = item.icon
          if (item.href) {
            return (<Link
              href={item.href}
              onClick={scrollToComments}
              className='text-juejin-font-3 flex items-center justify-center bg-juejin-layer-1 w-full h-14 rounded-full cursor-pointer group'
              key={index}>
              <Icon size='20' className=' group-hover:text-juejin-font-2' />
            </Link>)
          }
          return (<li
            key={index}
            className='text-juejin-font-3 flex items-center justify-center bg-juejin-layer-1 w-full h-14 rounded-full cursor-pointer group'>
            <Icon size='20' className=' group-hover:text-juejin-font-2' />
          </li>)
        })}
      </ul>
    </>
  )
}

export default ArticleLayout