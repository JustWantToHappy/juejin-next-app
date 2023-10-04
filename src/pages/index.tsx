import React from 'react'
import Head from 'next/head'
import { Get } from '@/utils'
import Entry from '@/components/Entry'
import { useDebouce } from '@/hooks'
import type { ArticleType } from '@/types'
import { GetServerSideProps } from 'next'
import VirtualList from '@/components/VirtualList'
import HomeLayout from '@/components/layouts/HomeLayout'

const initPageSize = 4
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/article?current=1&pageSize=${initPageSize}`)
  const data = await res.json()
  return { props: { total: data?.total, articles: data?.articles } }
}

interface Props {
  total: number
  articles: ArticleType[]
}

const fetchEntries = (articles: ArticleType[]) => {
  return articles.map((article, index) => {
    const { id, desc, title, ArticleTag, readCount, user, likeCount } = article
    const tags = ArticleTag.map(obj => obj.tag)
    return <Entry
      key={id}
      data-index={index}
      id={id}
      tags={tags}
      title={title}
      desc={desc}
      likeCount={likeCount}
      readCount={readCount}
      author={user?.name ?? ''}
      image={`https://www.dmoe.cc/random.php?id=${id}`} />
  })
}

const Home: React.FC<Props> = ({ total, articles }) => {
  const [pageSize, setPageSize] = React.useState(2)
  const [listData, setListData] = React.useState<ArticleType[]>(articles)
  const [current, setCurrent] = React.useState(Math.floor(initPageSize / pageSize) + 1)

  const fetchData = async () => {
    const { articles } = await Get<Props>(`/api/article?current=${current}&pageSize=${pageSize}`)
    if (articles.length) {
      listData.push(...articles)
      setListData([...listData])
    }
    setCurrent(current => current + 1)
  }

  const handleScrollToBottom = useDebouce(() => {
    const scrollToBottom = window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight
    if (scrollToBottom) {
      fetchData()
    }
  }, 100)

  const entries = React.useMemo(() => {
    return fetchEntries(listData)
  }, [listData])

  React.useEffect(() => {
    window.addEventListener('scroll', handleScrollToBottom)

    return function () {
      window.removeEventListener('scroll', handleScrollToBottom)
    }
  }, [handleScrollToBottom])

  return (
    <HomeLayout>
      <div>
        <Head>
          <title>稀土掘金 - 开发测试版本</title>
        </Head>
        <div>
          <VirtualList components={entries} extraRenderCount={10} />
        </div>
      </div>
      <p className='text-center text-juejin-font-3 bg-juejin-bg pt-8'>已经到底了(๑•̀ω•́)ノ</p>
    </HomeLayout>
  )
}

export default Home


