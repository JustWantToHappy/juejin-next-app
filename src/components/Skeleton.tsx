import React from 'react'

interface Props {
  rows: number
  isLoading: boolean
  leadingHeight: number
}

const Skeleton: React.FC<Props> = ({ rows, isLoading, leadingHeight }) => {
  return (
    <div className={`${isLoading ? ' block' : ' hidden'}`}>
      {Array(rows).fill(1).map(index => <p
        key={index}
        style={{ height: `${leadingHeight}px` }}
        className='mt-2 skeleton'>
      </p>)}
    </div>
  )
}

export default Skeleton