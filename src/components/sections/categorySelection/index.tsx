import { useGame } from '../../../context/GameContext'
import { Category as CategoryType } from '../../../types'
import Category from './Category'

const CategoriesSection = () => {
  const { state, dispatch } = useGame()

  const handleCategorySelection = (id: string) => {
    if (state.selectedCategoryId) return
    dispatch({ type: 'set_category', payload: id })
  }

  return (
    <section className="z-10 flex flex-col gap-2 w-[600px] mx-auto">
      <h3 className="font-medium pl-3">1. Selecciona una categoria:</h3>
      <div className="bg-white h-[180px] rounded-sm shadow-sm grid grid-cols-3 select-none hover:shadow-lg">
        {state.categories.map(({ id, name }: CategoryType) => {
          return (
            <Category
              key={id}
              id={id}
              name={name}
              onCategorySelection={handleCategorySelection}
            />
          )
        })}
      </div>
    </section>
  )
}

export default CategoriesSection
