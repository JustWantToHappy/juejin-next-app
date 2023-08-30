import React from 'react'
import { loginModal } from '@/store'
import { AiOutlineClose } from 'react-icons/ai'
import { useSession, signIn, signOut } from 'next-auth/react'

const SignIn = () => {
  const { onClose } = loginModal()
  const { data: session } = useSession()

  console.info(session)

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return function () {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className='fixed left-0 right-0 bottom-0 top-[--nav-header-height] z-30 bg-juejin-mask-1 overflow-auto'>
      <form className='layer mt-8  w-[--login-box-width] bg-juejin-layer-1 m-auto rounded-lg py-[--login-box-padding]'>
        <div className='flex justify-between items-center text-2xl px-[--login-box-padding] pb-[--login-box-padding] border-b border-b-juejin-gray-1-2'>
          <h1>登录掘金畅享更多权益</h1>
          <AiOutlineClose
            onClick={() => onClose()}
            className=' text-juejin-font-3 cursor-pointer' />
        </div>
        <div className='p-[--login-box-padding]'>
          <button onClick={() => signIn()}>登录</button>
        </div>
      </form>
    </div>
  )
}

export default SignIn