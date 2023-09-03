import React from 'react'
import Skeleton from './Skeleton'
import VirtualItem from './VirtualItem'

interface Props {
  preHeight?: number//预测列表项高度
  extraRenderCount?: number//额外渲染的列表项个数
  components: React.ReactElement[]
  wideSkeleton?: boolean
}

const getStartIndex = (tops: number[], scrollTop: number, extraRenderCount: number) => {
  let left = 0, right = tops.length
  while (left < right) {
    const mid = left + (~~((right - left) / 2))
    if (tops[mid] >= scrollTop) right = mid
    else left = mid + 1
  }
  return Math.max(0, left - extraRenderCount - 1)
}

const getEndIndex = (tops: number[], scrollTop: number, extraRenderCount: number) => {
  let left = 0, right = tops.length
  const clientHeight = typeof window !== 'undefined' ? window.innerHeight : 0
  while (left < right) {
    const mid = left + (~~((right - left) / 2))
    if (tops[mid] < scrollTop + clientHeight) left = mid + 1
    else right = mid
  }
  return Math.min(tops.length - 1, left + extraRenderCount)
}

// eslint-disable-next-line react/display-name
export const VirtualList = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { preHeight = 50, extraRenderCount = 4, components, wideSkeleton = false } = props
  const heightsRef = React.useRef<number[]>([])
  const [scrollTop, setScrollTop] = React.useState(0)
  const [tops, setTops] = React.useState<number[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  const getVirtualItemHeight = React.useCallback((index: number) => {
    return heightsRef.current[index] ?? preHeight
  }, [preHeight])

  const getTops = React.useCallback(() => {
    const tops: number[] = [0]
    for (let i = 1; i <= components.length; i++) {
      tops[i] = tops[i - 1] + getVirtualItemHeight(i - 1)
    }
    return tops
  }, [components.length, getVirtualItemHeight])

  const setVritualItemHeight = React.useCallback((index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height
      setTops(getTops())
    }
  }, [getTops])

  React.useEffect(() => {
    setTops(getTops())
  }, [components.length, getTops])

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return function () {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

  const getCurrentRenderItems = () => {
    const height = tops[tops.length - 1] ?? 0
    const startIndex = getStartIndex(tops, scrollTop, extraRenderCount)
    const endIndex = getEndIndex(tops, scrollTop, extraRenderCount)
    return (<div
      style={{
        //transform: `translateY(${scrollTop >= (containerRef.current?.offsetTop ?? 0) ? `-${containerRef.current?.offsetTop ?? 0}px` : '0px'})`,
        width: '100%',
        height: height + 'px'
      }}>
      {components.slice(startIndex, endIndex).map((component) => {
        const index = component.props['data-index']
        return <VirtualItem
          key={component.key}
          setHeight={setVritualItemHeight}
          style={{ position: 'absolute', width: '100%', top: `${tops[index]}px`, willChange: 'top' }}
          index={index}>
          {component}
        </VirtualItem>
      })}
    </div>)
  }

  if (!components.length) {
    return wideSkeleton ? <Skeleton /> : <div style={{ padding: '0 20px' }}><Skeleton /></div>
  }

  return (<div
    ref={containerRef}
    className={`w-full relative`}>
    {getCurrentRenderItems()}
  </div>)
})

export default React.memo(VirtualList)