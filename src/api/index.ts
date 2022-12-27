import axios from 'axios'
// import * as dotenv from 'dotenv'
// dotenv.config()

import { Category, Product, Question } from '../types'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const bannedCategoriesId = ['MLA1743', 'MLA1574', 'MLA1459', 'MLA1540']

const ML_SECRET_KEY = 'pnZrLhspqg9ktuzwRz7FmiR1rCrYuEKF'

const getWithAuth = (url: string, secretKey: string) =>
  axios.get(url, { headers: { Authorization: `Bearer ${secretKey}` } })

const fetchs = {
  categories: async () => {
    const { data } = await getWithAuth(
      'https://api.mercadolibre.com/sites/MLA/categories',
      ML_SECRET_KEY
    )
    return data.filter(
      (category: any) => !bannedCategoriesId.includes(category.id)
    )
  },
  productsByCategoryId: async (category_id: string) => {
    const { data } = await getWithAuth(
      `https://api.mercadolibre.com/sites/MLA/search?category=${category_id}`,
      ML_SECRET_KEY
    )
    return data.results
  },
  productDetails: async (permalink: string) => {
    const data = await fetch(permalink)
    return data
  },
  questionsByProductId: async (product_id: string): Promise<Question[]> => {
    const url = `https://api.mercadolibre.com/questions/search?item=${product_id}`
    const { data } = await axios.get(url)
    return data.questions
  }
}

export default {
  getCategories: async (amount = 1): Promise<Category[]> => {
    if (amount < 1) return []

    const indexes: number[] = []
    const selectedCategories = []

    const categories = await fetchs.categories()
    for (let i = 0; i < amount; i++) {
      const newIndex = getRandomInt(0, categories.length - 1)
      if (!indexes.includes(newIndex)) {
        selectedCategories.push(categories[newIndex])
        indexes.push(newIndex)
      } else i--
    }

    return selectedCategories
  },

  getAllCategories: async (): Promise<Category[]> => await fetchs.categories(),

  getProductDetails: async (permalink: string): Promise<any> =>
    await fetchs.productDetails(permalink),

  getProductsByCategoryId: async (
    category_id: string,
    amount = 1
  ): Promise<Product[]> => {
    if (amount < 1) return []

    const titles: number[] = []

    const selectedProducts: Product[] = []
    const products = await fetchs.productsByCategoryId(category_id)
    for (let i = 0; i < amount; i++) {
      const newIndex = getRandomInt(0, products.length - 1)
      if (!titles.includes(products[newIndex].title)) {
        selectedProducts.push(products[newIndex])
        titles.push(products[newIndex].title)
      } else i--
    }
    return selectedProducts
  },
  getProductPicture: async (product_id: string) => {
    const url = `https://api.mercadolibre.com/items/${product_id}/`
    const { data } = await axios.get(url)
    return data.pictures[0].secure_url
  },

  getQuestionsByProductId: async (
    product_id: string,
    amount = 1
  ): Promise<Question[] | undefined> => {
    const ids: number[] = []

    const selectedQuestions: Question[] = []
    const questions = await fetchs.questionsByProductId(product_id)
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
