import React from 'react'
import Head from 'next/head'
import useSwr from 'swr'
import { Get } from '@/utils'
import type { ArticleType } from '@/types'
import { useRouter } from 'next/router'
import Entry from '@/components/Entry'
import useSWRInfinite from 'swr/infinite'
import { GetServerSideProps } from 'next'
import VirtualList from '@/components/VirtualList'
import HomeLayout from '@/components/layouts/HomeLayout'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/article?current=1&pageSize=20`)
  const data = await res.json()
  return { props: { total: data?.total, articles: data?.articles } }
}

interface Props {
  total: number
  articles: ArticleType[]
}

const Home: React.FC<Props> = ({ total, articles }) => {
  console.info(articles, 'test')
  const router = useRouter()
  const [pageSize, setPageSize] = React.useState(10)
  const [listData, setListData] = React.useState<React.ReactElement[]>(articles.map((article, index) => {
    const { id, desc, title, tags, readCount, user, likeCount } = article
    return <Entry
      key={id}
      data-index={index}
      id={id}
      tags={tags}
      title={title}
      desc={desc}
      likeCount={likeCount}
      readCount={readCount}
      author={user.name ?? ''}
      image='http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg' />
  }))

  React.useEffect(() => {

    //setListData(() => Array(1000).fill(1).map((_, index) => <Entry id={index % 2 === 1 ? '13815bc6-f4ba-4b21-9b83-174d6183583b' : 'f635ab58-56f0-4661-af7f-b984384f0229'} key={index} data-index={index} title='🔥小册上新 | TypeScript 框架开发实战' likes={50} tags={[{ key: '前端', name: '前端' }, { key: '后端', name: '后端' }]} readCount={50} author='掘金小册' content='学习服务端 Web 框架最好的方式，就是从头写一个 Web 框架。与其按部就班的学习，开发框架本身更高效！' image='http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg' />))
  }, [router])

  React.useEffect(() => {
    const handleScrollToBottom = async () => {
      const scrollToBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
      if (scrollToBottom) {

      }
    }

    window.addEventListener('scroll', handleScrollToBottom)

    return function () {
      window.removeEventListener('scroll', handleScrollToBottom)
    }
  }, [])

  return (
    <HomeLayout>
      <div>
        <Head>
          <title>稀土掘金</title>
        </Head>
        <div>
          <VirtualList components={listData} extraRenderCount={10} />
        </div>
      </div>
    </HomeLayout>
  )
}

export default Home


