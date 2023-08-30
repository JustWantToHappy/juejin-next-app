import React from 'react'
import Header from '../Header'
import SignIn from '../SignIn'
import { useThrottle } from '@/hooks'
import FloatButtons from '../FloatButtons'
import { SessionProvider } from 'next-auth/react'
import { headerStore, loginModal } from '@/store'

const BasicLayout: React.FC<React.PropsWithChildren & { session: any }> = (props) => {
  const { onClose, onOpen } = headerStore()
  const { open } = loginModal()
  const [showUpIcon, setShowUpIcon] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>()
  const prevStopScrollTopRef = React.useRef<number>(0)

  const handleScroll = useThrottle(() => {
    const scrollTop = window.scrollY

    scrollTop > 100 ? setShowUpIcon(true) : setShowUpIcon(false)

    if (scrollTop - prevStopScrollTopRef.current > 100) onClose()
    if (prevStopScrollTopRef.current - scrollTop > 30 || !scrollTop) onOpen()
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      prevStopScrollTopRef.current = scrollTop
    }, 100)
  }, 100)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return function () {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <SessionProvider session={props.session}>
      <main className='min-w-[--layer-min-width]'>
        {open && <SignIn />}
        <Header />
        <div className='my-[--nav-header-height]'></div>
        <div className='pt-6'>{props.children}</div>
        <FloatButtons showUpIcon={showUpIcon} />
      </main>
    </SessionProvider>
  )
}

export default BasicLayout