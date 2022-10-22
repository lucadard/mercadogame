import api from './api'
import { getRandomInt } from './api'
import { useEffect, useState } from 'react'

import CategoriesSection from './components/CategoriesSection'
import QuestionSection from './components/QuestionSection'
import ProductsSection from './components/ProductsSection'

type Category = {
  name: string
  id: string
}

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined)
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >(undefined)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<{ loading: boolean; data: any }>({
    loading: false,
    data: []
  })
  const [question, setQuestion] = useState<
    { text: string; item_id: string } | undefined
  >(undefined)
  const [showQuestion, setShowQuestion] = useState<boolean>(false)

  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!categories.length) api.getCategories(3).then(setCategories)
  }, [categories])

  function handleCategorySelection(id: string) {
    if (selectedCategoryId) return
    setSelectedCategoryId(id)

    setProducts((prev) => ({ ...prev, loading: true }))
    api
      .getProductsByCategoryId(id, 4)
      .then((products) => setProducts({ data: products, loading: false }))
  }

  function handleProductSelection(id: string) {
    if (selectedProductId) return
    setSelectedProductId(id)
    setScore((prevScore) =>
      id === question?.item_id ? prevScore + 1 : prevScore - 1
    )
  }

  function handleNextRound() {
    if (!selectedProductId) return
    console.log('next round')

    setSelectedProductId(undefined)
    setSelectedCategoryId(undefined)
    setCategories([])
    setProducts({ loading: false, data: [] })
    setQuestion(undefined)
    setShowQuestion(false)
  }

  useEffect(() => {
    if (products.data.length) {
      let choosedProductId =
        products.data[getRandomInt(0, products.data.length - 1)].id
      api
        .getQuestionByProductId(choosedProductId)
        .then(({ text }) => setQuestion({ item_id: choosedProductId, text }))
    }
  }, [products])

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <nav className="h-24 bg-yellow-200 grid place-content-center">
        <h1 className="text-5xl">TITLE</h1>
      </nav>
      <div className="h-full flex flex-col py-6 bg-zinc-100 gap-6">
        <CategoriesSection
          data={{
            categories,
            handleCategorySelection,
            selectedCategoryId
          }}
        >
          <h3 className="font-medium pl-3">1. Select a category:</h3>
        </CategoriesSection>
        <QuestionSection
          data={{ question: question?.text, showQuestion, setShowQuestion }}
        >
          <h3 className="font-medium pl-3">2. Click to unveil the question!</h3>
        </QuestionSection>
        <ProductsSection
          data={{
            products,
            selectedProductId,
            handleProductSelection,
            questionItemId: question?.item_id
          }}
        >
          <h3 className="font-medium pl-3 w-[600px] mx-auto">
            3. Analize and choose your pick:
          </h3>
        </ProductsSection>

        <section className="flex justify-between items-center">
          <div>
            <p>
              Score: <span>{score}</span>
            </p>
          </div>
          <div
            onClick={() => handleNextRound()}
            className="bg-zinc-200 cursor-pointer py-2 px-4 rounded-md"
          >
            <p>Next</p>
          </div>
        </section>
      </div>
      {/* <div className="h-full shadow-md bg-white flex flex-col justify-between overflow-hidden">
        <section className="w-full h-36 bg-yellow-200 grid place-content-center">
          <div className="flex gap-4">
            {categories.map((cat: any, index: number) => (
              <div
                key={cat.id + index}
                className="rounded-sm shadow-md p-4 cursor-pointer bg-zinc-50"
                onClick={() => handleSelectCategory(index)}
              >
                <p className="text-center text-xl">{cat.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col justify-between h-full pt-12">
          <div className="flex gap-6 justify-center">
            {products.loading
              ? 'loading'
              : products.data.map((prod: any, index: number) => (
                  <div
                    key={prod.id + index}
                    className="cursor-pointer animate-enter"
                  >
                    <div className="w-[220px] rounded-sm shadow-md hover:animate-scale bg-slate-100 hover:scale-110 transition-all duration-100">
                      <img
                        src={`${prod.thumbnail}`}
                        alt=""
                        className="w-full"
                      />
                      <hr />
                      <p className="py-4 px-3 text-ellipsis overflow-hidden whitespace-nowrap">
                        {prod.title}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
          {question && (
            <div className="p-4 bg-slate-100 flex justify-center h-36">
              <div className="flex flex-col items-center gap-2 max-w-[500px]">
                <span className="font-bold">Pregunta:</span>
                <span>{question}</span>
              </div>
            </div>
          )}
        </section>
      </div> */}
    </main>
  )
}

export default App
