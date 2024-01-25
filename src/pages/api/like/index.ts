import { prisma } from "@/lib/prismadb";
import { Method } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === Method.PATCH) {
		const like = await prisma.like.findFirst({ where: req.body });
		if (like) {
			//可以采用数据库触发器，但是prisma目前并不支持,这里还是采用事务
			await prisma.$transaction([
				prisma.like.delete({ where: { userId_articleId: req.body } }),
				prisma.article.update({
					where: { id: req.body.articleId },
					data: { likeCount: { decrement: 1 } },
				}),
			]);
			res.status(200).json("");
		} else {
			await prisma.$transaction([
				prisma.like.create({ data: req.body }),
				prisma.article.update({
					where: { id: req.body.articleId },
					data: { likeCount: { increment: 1 } },
				}),
			]);
			res.status(200).json("success");
		}
	}
	if (req.method === Method.GET) {
		const like = await prisma.like.findFirst({ where: req.query });
		res.status(200).json(like ? "success" : "");
	}
}
