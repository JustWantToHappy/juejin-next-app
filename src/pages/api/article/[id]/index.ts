import { prisma } from '@/lib/prismadb'
import { Method } from '@/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb'
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = (req.query.id ?? '0') as string

  if (req.method === Method.GET) {
    const article = await prisma.article.findFirst({ where: { id }, include: { user: true } })
    res.status(200).json(article)
  }
  if (req.method === Method.PATCH) {
    const article = await prisma.article.update({ where: { id }, data: { readCount: { increment: 1 } } })
    if (article) {
      res.status(204).json('success')
    } else {
      res.status(500)
    }
  }
}

