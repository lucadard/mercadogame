import React, { useEffect, useState } from 'react'
import api, { getRandomInt } from '../api'
import { Category } from '../types'

const CATEGORIES: Category[] = []

const useCategories = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchAllCategories = async () => {
    setIsLoading(true)

    const data = await api.getAllCategories()
    CATEGORIES.push(...data)

    setIsLoading(false)
  }

  const getCategories = async (amount: number) => {
    if (!CATEGORIES.length) await fetchAllCategories()
    const ids: Category['id'][] = []
    const selectedCategories: Category[] = []

    for (let i = 0; i < amount; i++) {
      const newCategory = CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]

      if (!ids.includes(newCategory.id)) {
        selectedCategories.push(newCategory)
        ids.push(newCategory.id)
      } else i--
    }

    return selectedCategories
  }

  return { getCategories, isLoading }
}

export default useCategories
