import { prisma} from '@/lib/prismadb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req:NextApiRequest,res:NextApiResponse) {
  const navs=await prisma.nav.findMany()
  res.status(200).json(navs)
}