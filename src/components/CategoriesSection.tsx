import React from 'react'

type Props = {
  children: any
  data: any
}

const CategoriesSection = ({ children, data }: Props) => {
  return (
    <section className="flex flex-col gap-2 w-[600px] mx-auto">
      {children}
      <div className="bg-white rounded-sm shadow-sm grid grid-cols-3 select-none hover:shadow-lg">
        {data.categories.map((category: any) => (
          <div
            key={category.id}
            className={`h-[180px] grid grid-rows-2  p-4 border-[1px] border-gray-100 ${
              !data.selectedCategoryId
                ? 'hover:bg-blue-500 hover:text-white cursor-pointer'
                : category.id === data.selectedCategoryId &&
                  'bg-blue-500 text-white'
            }`}
            onClick={() => data.handleCategorySelection(category.id)}
          >
            <div className="flex justify-center items-end">
              <img src="" alt="" />
            </div>
            <span className="text-center text-[15px]">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection
