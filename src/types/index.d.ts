export type Nav = {
  key: string;
  name: string;
}

export type Tag = {
  [x in 'key'|'name']:string
}

export type EntryType = {
  id: number|string;
  title: string;
  likes: number;
  tags: Tag[]
  image: string;
  readCount: number;
  author: string;
  content: string;
}

export type CatelogueType = {
  tag: string;
  index: number;
  title: string;
  children?:CatelogueType[]
}

export type CommentType = {
  content: string;
  articleId: string;
  userId: string;
  parentId?: string;
}