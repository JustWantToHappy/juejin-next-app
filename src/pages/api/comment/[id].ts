import { prisma } from '@/lib/prismadb'
import { Method} from '@/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  if (req.method === Method.GET) {
    const articleId = (req.query.id??'0') as string
    const comments = await prisma.comment.findMany({ where: { articleId } })
    
  }
}
