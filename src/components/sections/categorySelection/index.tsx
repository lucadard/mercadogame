import { useEffect } from 'react'
import { useGame } from '../../../context/GameContext'
import { Category as CategoryType } from '../../../types'
import CategoryCard from './CategoryCard'

const CategoriesSection = () => {
  const { state, dispatch, getCategories } = useGame()

  useEffect(() => {
    if (state.categories.length) return
    getCategories(3).then((payload) =>
      dispatch({ type: 'start_round', payload })
    )
  }, [state.categories])

  const isCategorySelected = Boolean(state.selectedCategoryId)
  const handleCategorySelection = (id: string) => {
    if (isCategorySelected) return
    dispatch({ type: 'select_category', payload: id })
  }

  return (
    <section className="flex flex-col gap-2 max-w-[600px] mx-auto mb-7 md:mb-4">
      <h3 className={`font-medium pl-3`}>1. Selecciona una categoria:</h3>
      <div className="bg-white md:h-[180px] rounded-sm shadow-sm grid md:grid-cols-3 select-none hover:shadow-lg">
        {state.categories.map(({ id, name }: CategoryType) => (
          <CategoryCard
            key={id}
            id={id}
            name={name}
            onCategorySelection={() => handleCategorySelection(id)}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection
