import { prisma } from '@/lib/prismadb'
import { Method } from '@/constants'
import {isProtectedApi } from '@/utils'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === Method.POST) {
    const body=req.body
    const comment=await prisma.comment.create({data:req.body})
    if (comment) {
      res.status(200).end('发表评论成功!')
    }
  }
}
