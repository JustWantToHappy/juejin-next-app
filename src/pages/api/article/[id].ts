import { prisma } from '@/lib/prismadb'
import { Method } from '@/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit:'2mb'
    }
  }
}

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  if (req.method === Method.GET) {
    const id = (req.query.id ?? '0') as string
    const article=await prisma.article.findFirst({where:{id},include:{user:true}})
    res.status(200).json(article)
  }
}

