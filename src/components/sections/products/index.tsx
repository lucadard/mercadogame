import { useEffect, useState } from 'react'
import api from '../../../api'
import { LoadingDots } from '../../../assets/Loading'
import { State, useGame } from '../../../context/GameContext'
import { Product as ProductType } from '../../../types'
import ProductCard from './Product'

type Props = {
  isLoading: boolean
  setIsLoading: any
}

const ProductsSection = ({ isLoading, setIsLoading }: Props) => {
  const { state, dispatch } = useGame()

  const getProducts = async (categoryId: string) => {
    setIsLoading((prev: any) => ({ ...prev, products: true }))
    const products = await api.getProductsByCategoryId(categoryId, 4)
    dispatch({ type: 'set_products', payload: products })
    setIsLoading((prev: any) => ({ ...prev, products: false }))
  }

  useEffect(() => {
    if (!state.selectedCategoryId) return
    getProducts(state.selectedCategoryId)
  }, [state.selectedCategoryId])

  const handleProductSelection = (id: string) => {
    if (state.selectedProductId) return
    dispatch({ type: 'choose_product', payload: id })
  }

  return (
    <section className="flex flex-col gap-2 mx-auto">
      <h3 className="font-medium pl-3 w-full max-w-[600px] mx-auto mb-4">
        3. Analiza y elegi tu respuesta:
      </h3>
      <div className="grid grid-cols-2 lg:grid-flow-col auto-cols-min gap-4 mx-auto min-h-[250px]">
        {isLoading ? (
          <div className="col-span-full row-span-full flex justify-center items-center">
            <LoadingDots />
          </div>
        ) : (
          state.products.map(({ id, title }: ProductType) => {
            return (
              <ProductCard
                key={id}
                id={id}
                title={title}
                state={state}
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
