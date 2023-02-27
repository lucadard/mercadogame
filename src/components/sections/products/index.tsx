import { useEffect, useState } from 'react'
import api from '../../../api'
import { LoadingDots } from '../../../assets/Loading'
import { State, useGame } from '../../../context/GameContext'
import { Product as ProductType } from '../../../types'
import Product from './Product'

type Props = {
  children: any
  isLoading: boolean
  setIsLoading: any
}

const ProductsSection = ({ children, isLoading, setIsLoading }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const { state, dispatch } = useGame()
  const [stateCopy, setStateCopy] = useState<State>(state)

  useEffect(() => {
    if (state.products.length) {
      setIsVisible(true)
      setStateCopy(state)
    } else {
      setIsVisible(false)
      setTimeout(() => {
        setStateCopy(state)
      }, 1000)
    }
  }, [state.products, state.selectedProductId])

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
    <section className="flex flex-col gap-2">
      {children}
      <div className="rounded-md flex justify-center gap-6 ">
        {isLoading ? (
          <div className="mt-10 grid place-content-center">
            <LoadingDots />
          </div>
        ) : (
          stateCopy.products.map(({ id, title }: ProductType) => {
            return (
              <Product
                key={id}
                id={id}
                title={title}
                isVisible={isVisible}
                state={stateCopy}
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
