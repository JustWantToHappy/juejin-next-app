import React from 'react'
import { AiOutlineVerticalAlignTop, AiOutlineComment } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'

interface Props {
  showUpIcon: boolean
}

const FloatButtons: React.FC<Props> = ({ showUpIcon }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 })
  }

  return (
    <div className='fixed bottom-5 z-40 right-4 text-2xl text-juejin-font-3 flex flex-col gap-y-4'>
      <style jsx>{`
        span{
          cursor:pointer;
          padding:10px;
          border-radius:50%;
          background-color:#fff;
        }
        span:hover{
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        }
      `}
      </style>
      <span
        className=' hover:text-juejin-brand-1-normal'
        style={{ display: `${showUpIcon ? 'block' : 'none'}` }}
        onClick={scrollToTop}>
        <AiOutlineVerticalAlignTop />
      </span>
      <span
        title='建议反馈'
        className=' text-juejin-brand-1-normal'>
        <AiOutlineComment />
      </span>
      <span title='更多'><FiMoreHorizontal /></span>
    </div>
  )
}

export default FloatButtons