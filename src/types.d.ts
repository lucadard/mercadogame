export type Category = {
  name: string
  id: string
}

export type Product = {
  title: string
  id: string
  permalink: string
  thumbnail?: string
}

export type Question = {
  id: number
  text: string
  item_id: string
}

export type Score = {
  name: string
  score: number
  createdAt: string
}
