import React from 'react'
import Header from '../Header'
import NavTags from '../NavTags'
import { headerStore } from '@/store'
import { useThrottle } from '@/hooks'

const BasicLayout: React.FC<React.PropsWithChildren> = (props) => {
  const { onClose, onOpen } = headerStore()
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>()
  const prevStopScrollTopRef = React.useRef<number>(0)

  const handleScroll = useThrottle(() => {
    const scrollTop = window.scrollY
    if (scrollTop - prevStopScrollTopRef.current > 100) onClose()
    if (prevStopScrollTopRef.current - scrollTop > 30 || !scrollTop) onOpen()
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      prevStopScrollTopRef.current = scrollTop
    }, 30)
  }, 30)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return function () {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <main>
      <Header />
      <div className='my-[--nav-header-height]'></div>
      <div className='pt-6'>{props.children}</div>
    </main>
  )
}

export default BasicLayout