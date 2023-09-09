const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const tags = [
  {
    key: 'following',
    name: '关注'
  },
  {
    key: 'recommended',
    name: '综合'
  },
  {
    key: 'backend',
    name: '后端'
  },
  {
    key: 'frontend',
    name: '前端'
  },
  {
    key: 'andriod',
    name: 'Andriod'
  },
  {
    key: 'ios',
    name: 'iOS'
  },
  {
    key: 'ai',
    name: '人工智能'
  },
  {
    key: 'freebie',
    name: '开发工具'
  },
  {
    key: 'career',
    name: '代码人生'
  },
  {
    key: 'article',
    name: '阅读'
  },
  {
    key: 'articles',
    name: '排行榜'
  },
]

async function main() {
  await prisma.tag.createMany({ data: tags })
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.info(e)
  await prisma.$disconnect()
})