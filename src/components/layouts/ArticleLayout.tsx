import React from 'react'
import { FaCommentDots, FaShare } from 'react-icons/fa'
import { AiTwotoneLike, AiTwotoneWarning, AiFillStar, AiOutlineRead } from 'react-icons/ai'

const ArticleLayout: React.FC<React.PropsWithChildren> = (props) => {
  const icons = [AiTwotoneLike, FaCommentDots, AiFillStar, FaShare, AiTwotoneWarning, AiOutlineRead]
  return (
    <>
      {props.children}
      <ul className='hidden sm:flex flex-col fixed z-30 left-3 top-[140px] gap-y-6 w-14 h-[400px] overflow-hidden '>
        {icons.map((Icon, index) => <li
          key={index}
          className='text-juejin-font-3 flex items-center justify-center bg-juejin-layer-1 w-full h-14 rounded-full cursor-pointer group'>
          <Icon size='20' className=' group-hover:text-juejin-font-2' />
        </li>)}
      </ul>
    </>
  )
}

export default ArticleLayout