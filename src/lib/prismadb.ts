//保证开发环境中每次请求都会创建一个新的数据库连接，防止连接问题
import { isDev} from '@/utils'
import { PrismaClient } from '@prisma/client'

declare global{
  var prisma: PrismaClient | undefined
}

const prisma=globalThis.prisma??new PrismaClient()

if(isDev) globalThis.prisma=new PrismaClient()

export {prisma}


