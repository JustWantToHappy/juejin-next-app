import type { Comment, User, Tag } from "prisma/prisma-client";

export type Nav = {
	key: string;
	name: string;
};

export type Tag = {
	[x in "key" | "name"]: string;
};

export type EntryType = {
	id: number | string;
	title: string;
	likeCount: number;
	tags: Tag[];
	image: string;
	readCount: number;
	author: string;
	desc: string;
};

export type CatelogueType = {
	tag: string;
	index: number;
	title: string;
	children?: CatelogueType[];
};

export type CommentType = {
	content: string;
	articleId: string;
	userId: string;
	parentId?: number;
	rootId?: number;
};

type BasicComment = {
	[key in keyof Comment]: key extends "createdAt"
		? string | Date
		: Comment[key];
} & { user: User | null };
export type ResCommentType = BasicComment & {
	children: Array<BasicComment & { parent?: BasicComment }>;
};

export type ArticleType = {
	id: string;
	title: string;
	likeCount: number;
	readCount: number;
	desc: string;
	user: User;
	ArticleTag: Array<{ tag: Tag }>;
};
