import { prisma } from "@/lib/prismadb";
import { Method } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === Method.GET && !Object.keys(req.query).length) {
		const articleIds = await prisma.article.findMany({
			select: { id: true },
		});
		res.status(200).json(articleIds);
	} else if (req.method === Method.GET && req.query) {
		const current = parseInt((req.query.current as string) ?? "0");
		const pageSize = parseInt((req.query.pageSize as string) ?? "0");
		const total = await prisma.article.count();
		const articles = await prisma.article.findMany({
			skip: (current - 1) * pageSize,
			take: pageSize,
			select: {
				id: true,
				title: true,
				likeCount: true,
				readCount: true,
				desc: true,
				user: true,
				ArticleTag: { include: { tag: true } },
			},
		});
		res.status(200).json({ total, articles });
	}
	if (req.method === Method.POST) {
		const article = await prisma.article.create({
			data: {
				...req.body.article,
				ArticleTag: {
					create: req.body.tags.map((tagId: number) => ({ tagId })),
				},
			},
		});
		if (article) {
			res.status(200).end("success");
		}
	}
}
