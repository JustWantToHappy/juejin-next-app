import React from 'react'
import Head from 'next/head'
import useSwr from 'swr'
import { Get } from '@/utils'
import { useRouter } from 'next/router'
import Entry from '@/components/Entry'
import VirtualList from '@/components/VirtualList'
import BasicLayout from '@/components/layouts/BasicLayout'
import HomeLayout from '@/components/layouts/HomeLayout'

const Home = (props: { data: string }) => {
  const router = useRouter()
  const [listData, setListData] = React.useState<React.ReactElement[]>([])

  React.useEffect(() => {
    setListData(() => Array(1000).fill(1).map((_, index) => <Entry id={1} key={index} data-index={index} title='🔥小册上新 | TypeScript 框架开发实战' likes={50} tags={[{ key: '前端', name: '前端' }, { key: '后端', name: '后端' }]} readCount={50} author='掘金小册' content='学习服务端 Web 框架最好的方式，就是从头写一个 Web 框架。与其按部就班的学习，开发框架本身更高效！' image='http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg' />))
  }, [router])

  React.useEffect(() => {
    const handleScrollToBottom = () => {
      const scrollToBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
      if (scrollToBottom) {
        const prevTime = new Date().getTime()
        while (Date.now() - prevTime < 1000) { }
        setListData(listData => {
          return [...listData, ...Array(5).fill(1).map((_, index) => <Entry id={1} key={index + listData.length} data-index={index + listData.length} title='🔥小册上新 | TypeScript 框架开发实战' likes={50} tags={[{ key: '前端', name: '前端' }, { key: '后端', name: '后端' }]} readCount={50} author='掘金小册' content='学习服务端 Web 框架最好的方式，就是从头写一个 Web 框架。与其按部就班的学习，开发框架本身更高效！' image='http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg' />)]
        })
      }
    }

    window.addEventListener('scroll', handleScrollToBottom)

    return function () {
      window.removeEventListener('scroll', handleScrollToBottom)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>稀土掘金</title>
      </Head>
      <div>
        <VirtualList components={listData} />
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (<BasicLayout>
    <HomeLayout>
      {page}
    </HomeLayout>
  </BasicLayout>)
}

Home.getInitialProps = async () => {
  
  return {}
}

export default Home


