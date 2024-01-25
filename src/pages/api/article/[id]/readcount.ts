import { prisma } from "@/lib/prismadb";
import { Method } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = (req.query.id ?? "0") as string;

	if (req.method === Method.PATCH) {
		const article = await prisma.article.update({
			where: { id },
			data: { readCount: { increment: 1 } },
		});
		if (article) {
			res.status(204).json("success");
		} else {
			res.status(500);
		}
	}
}
