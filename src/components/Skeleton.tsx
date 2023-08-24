import React from 'react'

interface Props {
  isLoading?: boolean
  leadingHeight?: number
  shortAndLong?: boolean
}

const Skeleton: React.FC<Props> = ({ isLoading = true, leadingHeight = 20, shortAndLong = true }) => {
  return (
    <div className={`${isLoading ? ' block' : ' hidden'} py-4`}>
      <p className={`mt-4 skeleton h-[${leadingHeight}px] ${shortAndLong ? 'w-1/2' : ''}`}></p>
      <p className={`mt-4 skeleton h-[${leadingHeight}px]`}></p>
      <p className={`mt-4 skeleton h-[${leadingHeight}px] ${shortAndLong ? 'w-3/4' : ''}`}></p>
      <p className={`mt-4 skeleton h-[${leadingHeight}px] ${shortAndLong ? 'w-2/3' : ''}`}></p>
    </div>
  )
}

export default Skeleton