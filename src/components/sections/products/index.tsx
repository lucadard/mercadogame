import { useEffect, useState } from 'react'
import api from '../../../api'
import { LoadingDots } from '../../../assets/Loading'
import { useGame } from '../../../context/GameContext'
import { Product as ProductType } from '../../../types'
import ProductCard from './Product'

const ProductsSection = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = useGame()

  useEffect(() => {
    if (!state.selectedCategoryId || state.products.length) return
    setIsLoading(true)
    api
      .getProductsByCategoryId(state.selectedCategoryId, 4)
      .then((payload) => dispatch({ type: 'set_products', payload }))
      .finally(() => setIsLoading(false))
  }, [state.selectedCategoryId])

  const handleProductSelection = (id: string) => {
    if (state.selectedProductId) return
    dispatch({ type: 'select_product', payload: id })
  }

  return (
    <section className="flex flex-col gap-2 mx-auto">
      <h3 className="font-medium pl-3 w-full max-w-[600px] mx-auto mb-7 md:mb-4">
        3. Analiza y elegi tu respuesta:
      </h3>
      <div className="grid grid-cols-2 lg:grid-flow-col auto-cols-min gap-4 mx-auto min-h-[250px]">
        {isLoading ? (
          <div className="col-span-full row-span-full flex justify-center items-center">
            <LoadingDots />
          </div>
        ) : (
          state.products.map(({ id, title }: ProductType, index) => {
            return (
              <ProductCard
                key={id}
                id={id}
                index={index}
                title={title}
                onProductSelection={handleProductSelection}
              />
            )
          })
        )}
      </div>
    </section>
  )
}

export default ProductsSection
