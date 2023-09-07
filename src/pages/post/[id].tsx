import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDebouce } from '@/hooks'
import { headerStore } from '@/store'
import Avatar from '@/components/Avatar'
import Comment from '@/components/Comment'
import Article from '@/components/Article'
import Catelogue from '@/components/Catelogue'
import { useSession } from 'next-auth/react'
import type { CatelogueType } from '@/types'
import { Article as ArticleType } from 'prisma/prisma-client'
import ArticleLayout from '@/components/layouts/ArticleLayout'
import type { GetStaticProps, GetStaticPaths } from 'next'
import { isHeadingEle, getElementTopOffset } from '@/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/article`)
  const articleIds = await res.json()
  const paths = articleIds?.map((article: any) => ({ params: { id: article?.id } }))
  return { paths: paths ?? [], fallback: false }
}

export const getStaticProps: GetStaticProps = async (props) => {
  let article = null
  if (props.params?.id) {
    const res1 = await fetch(`${process.env.PUBLIC_URL}/api/article/${props.params.id}`)
    article = await res1.json()
  }
  return { props: article, revalidate: 60 }
}

type Position = {
  id: string
  offsetTop: number
}

const Post = (props: ArticleType) => {
  const { data: session } = useSession()
  const { close } = headerStore()
  const router = useRouter()
  const positionsRef = React.useRef<Position[]>()
  const markdownRef = React.useRef<HTMLDivElement>()
  const [catelogue, setCatelogue] = React.useState<CatelogueType[]>([])

  const getCatelogue = React.useCallback((catelogue: CatelogueType[], markdownContainer: HTMLDivElement) => {
    const positions: Position[] = []
    setCatelogue(catelogue)
    markdownRef.current = markdownContainer
    Array.from(markdownContainer.children).map(ele => {
      if (isHeadingEle(ele.tagName)) {
        const id = ele.getAttribute('data-id')
        const offsetTop = getElementTopOffset(ele as HTMLHeadElement)
        positions.push({ id: id || '', offsetTop })
      }
    })
    positionsRef.current = positions
  }, [])

  const handleScroll = useDebouce(() => {
    const offset = window.scrollY
    const positions = positionsRef.current
    if (markdownRef.current && positions) {
      let ans = -1
      for (let i = 0; i < positions.length; i++) {
        const diff = positions[i].offsetTop - offset
        if (diff <= 60) {
          ans = i
        } else {
          break
        }
      }
      if (~ans) {
        router.push(`#${positions[ans].id}`)
      }
    }
  }, 50)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return function () {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <ArticleLayout>
      <Head>
        <title>{props.title + ' - 掘金'}</title>
      </Head>
      <div className='flex sm:ml-[90px] sm:mr-8  gap-x-[--layer-gap]'>
        <div className='flex-1'>
          <div className='layer p-10 mb-[--layer-gap]'>
            <Article {...props} getCatelogue={getCatelogue} />
          </div>
          <div className='layer mt-3 mb-8 px-10 py-4'>
            <Comment articleId={props.id} />
          </div>
        </div>
        <div className='w-[--home-aside-width] hidden lg:block'>
          <div className='layer h-[100px] py-4 px-3 flex items-center gap-x-4'>
            <Avatar url={session?.user.image} size={50} />
            <div className='flex flex-col gap-y-2'>
              <span>JustWantToHappy</span>
              <span className='text-juejin-font-3'>学生</span>
            </div>
          </div>
          <div className={` pt-4  mt-[--layer-gap] layer transition-top duration-300 sticky  ${close ? 'top-[--aside-top]' : 'top-[84px]'}`}>
            <Catelogue catelogue={catelogue} markdownContainer={markdownRef.current} smoothScroll={true} />
          </div>
        </div>
      </div>
    </ArticleLayout>
  )
}

export default Post