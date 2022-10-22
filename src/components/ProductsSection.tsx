import React from 'react'

type Props = {
  children: any
  data: any
}

const ProductsSection = ({ children, data }: Props) => {
  console.log(data.selectedProductId)
  return (
    <section className="flex flex-col gap-2 min-h-[270px]">
      {children}
      <div className="rounded-md flex justify-center gap-6">
        {data.products.data.map((product: any) => {
          return (
            <div
              key={product.id}
              className={`z-10 relative shadow-sm min-w-[180px] select-none group
               ${
                 data.selectedProductId === product.id
                   ? 'opacity-60 shadow-lg'
                   : 'hover:shadow-lg'
               } 
               ${!data.selectedProductId ? 'cursor-pointer' : ''}
               `}
              onClick={() => data.handleProductSelection(product.id)}
            >
              {data.selectedProductId === product.id && (
                <div className="absolute w-full h-full grid place-content-center scale-[4] pointer-events-none">
                  {product.id === data.questionItemId ? (
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined">close</span>
                  )}
                </div>
              )}
              <div className="border-b-[1px] border-gray-200 bg-white rounded-md group-hover:rounded-b-none overflow-hidden transition-all duration-100">
                <img
                  className="h-[180px]"
                  src={product.thumbnail}
                  alt={`Foto de ${product.title}`}
                />
              </div>
              <div
                className={`-z-10 w-full absolute p-3 -mt-[70px] rounded-b-md  bg-white transition-all duration-100 
                  ${
                    data.selectedProductId === product.id
                      ? 'mt-0 shadow-lg'
                      : 'group-hover:mt-0 group-hover:shadow-lg'
                  }
                  `}
              >
                <p className="overflow-hidden max-h-10 text-ellipsis text-[13px] text-gray-600 transition-opacity opacity-100 group-hover:opacity-100 duration-100">
                  {product.title}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProductsSection
