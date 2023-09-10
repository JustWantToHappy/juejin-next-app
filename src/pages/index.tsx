import React from 'react'
import Head from 'next/head'
import { Get } from '@/utils'
import type { ArticleType } from '@/types'
import { useRouter } from 'next/router'
import Entry from '@/components/Entry'
import type { Fetcher } from 'swr'
import useSWRInfinite from 'swr/infinite'
import { GetServerSideProps } from 'next'
import { loginModal } from '@/store'
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
  const router = useRouter()
  const { onOpen } = loginModal()
  const [pageSize, setPageSize] = React.useState(10)
  const fetcher: Fetcher<Props> = (url: string) => Get<Props>(url)
  const { setSize, data, isLoading } = useSWRInfinite((index) => `/api/article?current=${index + 1}&pageSize=${pageSize}`, fetcher)
  const [listData, setListData] = React.useState<React.ReactElement[]>(fetchEntries(articles))

  const currentTotal = React.useMemo(() => {
    return data?.reduce((currentValue, { articles }) => currentValue + articles.length, 0) ?? 0
  }, [data])

  React.useEffect(() => {
    if ((data?.length ?? 0) > 1) {
      const articles: ArticleType[] = []
      data?.map(({ articles: arr }) => {
        articles.push(...arr)
      })
      setListData(fetchEntries(articles))
    }
  }, [data])

  React.useEffect(() => {
    const handleScrollToBottom = async () => {
      const scrollToBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
      if (scrollToBottom && currentTotal < total) {
        setSize(size => size + 1)
      }
    }

    window.addEventListener('scroll', handleScrollToBottom)

    return function () {
      window.removeEventListener('scroll', handleScrollToBottom)
    }
  }, [setSize, currentTotal, total])

  React.useEffect(() => {
    if (router.query.callbackUrl) {
      onOpen()
      router.push('/')
    }
  }, [router, onOpen])

  return (
    <HomeLayout>
      <div>
        <Head>
          <title>稀土掘金 - 开发测试版本</title>
        </Head>
        <div>
          <VirtualList components={listData} extraRenderCount={10} />
        </div>
      </div>
      <p className='text-center text-juejin-font-3 bg-juejin-bg pt-8'>已经到底了(๑•̀ω•́)ノ</p>
    </HomeLayout>
  )
}

export default Home


