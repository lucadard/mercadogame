import axios from 'axios'
import { Category, Product, Question, Score } from '../types'
import { connect } from '@planetscale/database'
import { type ExecutedQuery } from '@planetscale/database'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const bannedCategoriesId = ['MLA1743', 'MLA1574', 'MLA1459', 'MLA1540']

const ML_SECRET_KEY = import.meta.env.VITE_ML_CLIENT_SECRET as string
const databaseUrl = import.meta.env.VITE_DB_URL as string

const DATABASE_HOST = import.meta.env.VITE_DATABASE_HOST as string
const DATABASE_USERNAME = import.meta.env.VITE_DATABASE_USERNAME as string
const DATABASE_PASSWORD = import.meta.env.VITE_DATABASE_PASSWORD as string

const config = {
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD
}
const conn = connect(config)

const getWithAuth = async (url: string, secretKey: string) =>
  await axios.get(url, { headers: { Authorization: `Bearer ${secretKey}` } })

let CATEGORIES: Category[] = []

const fetchs = {
  leaderboard: async (limit: number) => {
    const { data } = (await axios.get(`${databaseUrl}/leaderboard`, {
      params: {
        limit
      }
    }))
    return data.leaderboard
  },
  categories: async () => {
    const { data } = await getWithAuth(
      'https://api.mercadolibre.com/sites/MLA/categories',
      ML_SECRET_KEY
    )
    CATEGORIES = data.filter(
      (category: any) => !bannedCategoriesId.includes(category.id)
    )
    return CATEGORIES
  },
  productsByCategoryId: async (categoryId: string) => {
    const { data } = await getWithAuth(
      `https://api.mercadolibre.com/sites/MLA/search?category=${categoryId}`,
      ML_SECRET_KEY
    )
    return data.results
  },
  productDetails: async (permalink: string) => {
    const data = await fetch(permalink)
    return data
  },
  questionsByProductId: async (productId: string): Promise<Question[]> => {
    const url = `https://api.mercadolibre.com/questions/search?item=${productId}`
    const { data } = await axios.get(url)
    return data.questions
  }
}

export default {
  getLeaderboard: async (limit = 10) => {
    const results: ExecutedQuery = await conn.execute('SELECT * FROM leaderboard ORDER BY score DESC')
    console.log(results)
    return results.rows as Score[]
  },
  sendScore: async ({ name, score }: { name: string, score: number }) => {
    const query = 'INSERT INTO leaderboard (`name`, `score`) VALUES (:name, :score)'
    const params = {
      name,
      score
    }
    return await conn.execute(query, params)
  },
  getCategories: async (amount = 1) => {
    if (amount < 1) return []

    const indexes: number[] = []
    const selectedCategories = []

    const categories = !CATEGORIES.length
      ? await fetchs.categories()
      : CATEGORIES

    for (let i = 0; i < amount; i++) {
      const newIndex = getRandomInt(0, categories.length - 1)
      if (!indexes.includes(newIndex)) {
        selectedCategories.push(categories[newIndex])
        indexes.push(newIndex)
      } else i--
    }

    return selectedCategories
  },

  getAllCategories: async () => await fetchs.categories(),

  getProductDetails: async (permalink: string) =>
    await fetchs.productDetails(permalink),

  getProductsByCategoryId: async (
    categoryId: string,
    amount = 1
  ): Promise<Product[]> => {
    if (amount < 1) return []

    const titles: number[] = []

    const selectedProducts: Product[] = []
    const products = await fetchs.productsByCategoryId(categoryId)
    for (let i = 0; i < amount; i++) {
      const newIndex = getRandomInt(0, products.length - 1)
      if (!titles.includes(products[newIndex].title)) {
        selectedProducts.push({ ...products[newIndex], thumbnail: undefined })
        titles.push(products[newIndex].title)
      } else i--
    }
    return selectedProducts
  },
  getProductPicture: async (productId: string) => {
    const url = `https://api.mercadolibre.com/items/${productId}/`
    const { data } = await axios.get(url)
    return data.pictures[0].secure_url
  },

  getQuestionsByProductId: async (productId: string, amount = 1) => {
    const ids: number[] = []

    const selectedQuestions: Question[] = []
    const questions = await fetchs.questionsByProductId(productId)
    if (questions.length < amount) return undefined

    for (let i = 0; i < amount; i++) {
      const newIndex = getRandomInt(0, questions.length - 1)
      if (!ids.includes(questions[newIndex].id)) {
        selectedQuestions.push(questions[newIndex])
        ids.push(questions[newIndex].id)
      } else i--
    }

    return selectedQuestions
  }
}
