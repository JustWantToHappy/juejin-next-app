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

