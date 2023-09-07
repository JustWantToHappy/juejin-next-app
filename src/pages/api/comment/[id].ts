import { prisma } from '@/lib/prismadb'
import { Method } from '@/constants'
import type { ResCommentType} from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  if (req.method === Method.GET) {
    const articleId = (req.query.id??'0') as string
    const take = parseInt(req.query.pageSize as string)
    const current=parseInt(req.query.current as string)
    const firstLevelComments = await prisma.comment.findMany({
      where: { articleId, parentId: 0 },
      orderBy: { createdAt: 'desc' },
      take,
      skip: (current - 1) * take,
      include:{user:true}
    })
    const comments:Array<ResCommentType>=firstLevelComments.map(firstLevelComment=>({...firstLevelComment,children:[]}))
    //评论总数
    const total=await prisma.comment.count({where:{articleId}})
    await Promise.all(firstLevelComments.map(async (firstLevelComment) => {
      const rootId = firstLevelComment.id
      const comment=comments.find(comment=>comment.id===firstLevelComment.id)
      const secondLevelComments = await prisma.comment.findMany({
        where: { rootId,NOT:{parentId:0} },
        orderBy: { createdAt: 'asc' },
        include:{user:true}
      })
      secondLevelComments?.map((secondLevelComment,_,arrThis) => {
        const parent=arrThis.find(comment=>comment.id===secondLevelComment.parentId)
        //直接回复一级评论的二级评论
        if (secondLevelComment.parentId === firstLevelComment.id) {
          comment?.children.push(secondLevelComment)
        } else {
          comment?.children.push({...secondLevelComment,parent})
        }
      })
    }))
    const listLength=comments.length+comments.reduce((currentValue,comment)=>currentValue+comment.children.length,0)
    res.status(200).json({total,data:comments,listLength})
  }
}
