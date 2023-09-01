import { prisma } from '@/lib/prismadb'
import { Method} from '@/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  if (req.method === Method.GET) {
    const articleIds = await prisma.article.findMany({ select: { id: true } })
    res.status(200).json(articleIds)
  }
  if (req.method === Method.POST) {
    const article=await prisma.article.create({data:req.body})
    if (article) {
      res.status(200).end('success')
    }
  }
}

