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
    ).catch(err => console.error(err.message))
  }, [state.categories])

  const isCategorySelected = Boolean(state.selectedCategoryId)
  const handleCategorySelection = (id: string) => {
    if (isCategorySelected) return
    dispatch({ type: 'select_category', payload: id })
  }

  return (
    <section className='mx-auto mb-7 flex max-w-[600px] flex-col gap-2 md:mb-4'>
      <h3 className='pl-3 font-medium'>1. Selecciona una categoria:</h3>
      <div className='grid select-none rounded-sm bg-white shadow-sm hover:shadow-lg md:h-[180px] md:grid-cols-3'>
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
