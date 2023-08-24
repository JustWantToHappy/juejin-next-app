import React from 'react'
import Header from '../Header'
import { useHeader, useThrottle } from '@/hooks'

const BasicLayout: React.FC<React.PropsWithChildren> = (props) => {
  const { onClose, onOpen } = useHeader()
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>()
  const prevStopScrollTopRef = React.useRef<number>(0)

  const handleScroll = useThrottle(() => {
    const scrollTop = window.scrollY
    if (scrollTop - prevStopScrollTopRef.current > 30) onClose()
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
      <div className='h-[2000px]'>{props.children}</div>
    </main>
  )
}

export default BasicLayout