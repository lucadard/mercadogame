import axios from 'axios'
import { questions } from '../../question_example.json'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getWithAuth = (url: string, secretKey: string) =>
  axios.get(url, { headers: { Authorization: `Bearer ${secretKey}` } })

const fetch = {
  categories: async () => {
    const { data } = await getWithAuth(
      'https://api.mercadolibre.com/sites/MLA/categories',
      process.env.ML_SECRET_KEY as string
    )
    return data
  },
  productsByCategoryId: async (category_id: string) => {
    const { data } = await getWithAuth(
      `https://api.mercadolibre.com/sites/MLA/search?category=${category_id}`,
      process.env.ML_SECRET_KEY as string
    )
    return data.results
  },
  questionsByProductId: async (product_id: string) => {
    const { data } = await getWithAuth(
      `https://api.mercadolibre.com/questions/search?item=${product_id}`,
      process.env.ML_SECRET_KEY as string
    )
    return data
  }
}

export default {
  getCategories: async (amount = 1): Promise<any[]> => {
    if (amount < 1) return []

    const indexes: number[] = []
    const selectedCategories = []

    const categories = await fetch.categories()
    for (let i = 0; i < amount; i++) {
      const newIndex = getRandomInt(0, categories.length - 1)
      if (!indexes.includes(newIndex)) {
        selectedCategories.push(categories[newIndex])
        indexes.push(newIndex)
      } else i--
    }

    return selectedCategories
  },
  getProductsByCategoryId: async (
    category_id: string,
    amount = 1
  ): Promise<any[]> => {
    if (amount < 1) return []

    const titles: number[] = []

    const selectedProducts = []
    const products = await fetch.productsByCategoryId(category_id)
    for (let i = 0; i < amount; i++) {
      const newIndex = getRandomInt(0, products.length - 1)
      if (!titles.includes(products[newIndex].title)) {
        selectedProducts.push(products[newIndex])
        titles.push(products[newIndex].title)
      } else i--
    }
    return selectedProducts
  },
  getQuestionByProductId: async (product_id: string): Promise<any> => {
    let question = undefined
    while (!question) {
      // questions = await fetch.questionsByProductId(product_id)
      question = questions[getRandomInt(0, questions.length)]
    }
    return question
  }
}
