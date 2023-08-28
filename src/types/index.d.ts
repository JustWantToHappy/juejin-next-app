export type Nav = {
  key: string;
  name: string;
}

export type Type = {
  [x in 'key'|'name']:string
}

export type Entry = {
  id: number;
  title: string;
  likes: number;
  tags:string[]
  image: string;
  readCount: number;
  author: string;
  content: string;
}