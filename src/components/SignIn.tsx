import React from 'react'
import Link from 'next/link'
import { loginModal } from '@/store'
import { useForm } from 'react-hook-form'
import { AiOutlineClose, AiFillGithub } from 'react-icons/ai'
import { useSession, signIn, signOut } from 'next-auth/react'

type Inputs = {
  email: string
  password: string
}

const SignIn = () => {
  const { onClose } = loginModal()
  const { data: session } = useSession()
  const { handleSubmit, register, formState: { errors } } = useForm<Inputs>()

  console.info(session)

  const onSubmit = handleSubmit(data => {
    console.info(data, 'data')
  })

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return function () {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className='fixed left-0 right-0 bottom-0 top-0 z-50 bg-juejin-mask-1 '>
      <form onSubmit={onSubmit} className='layer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[--login-box-width] bg-juejin-layer-1 rounded-lg py-[--login-box-padding]'>
        <div className='flex justify-between items-center text-xl px-[--login-box-padding] pb-[--login-box-padding] border-b border-b-juejin-gray-1-2'>
          <h1>登录掘金畅享更多权益</h1>
          <AiOutlineClose
            onClick={() => onClose()}
            className=' text-juejin-font-3 cursor-pointer' />
        </div>
        <div className='p-[--login-box-padding]'>
          <h1 className='text-lg'>密码登录</h1>
          <div className='flex flex-col mt-4'>
            <input
              type='email'
              autoFocus
              {...register('email', { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
              placeholder='请输入邮箱'
              className=' bg-juejin-gray-1-2 w-full py-[10px] pl-4 focus:bg-juejin-layer-1 focus:border-juejin-brand-1-normal border-juejin-layer-1 peer' />
            <small className={`opacity-0 text-juejin-danger-1-normal ${errors.email ? ' opacity-100' : ''}`}>
              {errors.email?.type === 'required' ? ' 邮箱地址不能为空' : '邮箱格式不合法'}
            </small>
            <input
              type='password'
              {...register('password', { required: true })}
              placeholder='请输入密码'
              className=' w-full py-[10px] pl-4 bg-juejin-gray-1-2 focus:border-juejin-brand-1-normal focus:bg-juejin-layer-1 border-juejin-layer-1' />
            <small className={` opacity-0 text-juejin-danger-1-normal ${errors.password ? ' opacity-100' : ''}`}>
              密码不能为空
            </small>
          </div>
          <button className=' mt-4 btn bg-juejin-brand-1-normal text-juejin-layer-1 w-full hover:bg-juejin-brand-2-hover'>
            登录
          </button>
          <div className='mt-7 leading-8 h-8'>
            <span >其他登录：</span>
            <AiFillGithub className=' inline ml-4 text-[2rem] -translate-y-[2px] cursor-pointer hover:text-juejin-brand-2-hover' title='icon_Github' />
          </div>
          <p className='text-center mt-7'>
            注册登录即表示同意
            <Link href='/' className='text-juejin-brand-1-normal'>&nbsp;用户协议</Link>
            &nbsp;和&nbsp;
            <Link href='/' className='text-juejin-brand-1-normal'>隐私政策</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignIn