//解决hot replace导致的多次实例化prisma客服端问题
import { PrismaClient } from '@prisma/client'

declare global{
  var prisma: PrismaClient | undefined
}

export const prisma=globalThis.prisma??new PrismaClient()

if(process.env.NODE_ENV!=='production') globalThis.prisma=new PrismaClient()


