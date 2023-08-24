import { prisma } from '@/lib/prismadb'
import { Method} from '@/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === Method.GET) {
    const navs=await prisma.tag.findMany()
    res.status(200).json(navs)
  }
  if (req.method === Method.POST) {
    const nav = await prisma.tag.create({data:req.body})
    if (nav) {
      res.status(200).end('success')
    }
  }
}