import { useEffect, useState } from 'react'

type Props = {
  children: any
  data: any
}

const QuestionSection = ({ children, data }: Props) => {
  console.log(data.question)

  const [renglones, setRenglones] = useState(1)
  useEffect(() => {
    if (!data.question) return
    const calculateRenglones = () =>
      Math.ceil(data.question.split(' ').length / 12)
    setRenglones(calculateRenglones())
    console.log(calculateRenglones())
  }, [data.question])

  return (
    <section className="relative flex flex-col gap-2 w-[600px] mx-auto h-[120px]">
      {children}
      <div>
        {!data.question && (
          <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group select-none">
            <div className="absolute translate-x-7 -translate-y-10 flex flex-col group-hover:opacity-70 opacity-0 transition-opacity duration-200 pointer-events-none">
              <span className="bg-black text-white py-1 px-3 rounded-md whitespace-nowrap">
                You need to select a category first!
              </span>
              <span className="translate-y-[74px] -translate-x-[44px] rotate-45 text-lg">
                ▼
              </span>
            </div>
            <span className="z-10 material-symbols-outlined">lock</span>
          </div>
        )}
        {data.question && !data.showQuestion && (
          <div
            onClick={() => data.setShowQuestion(true)}
            className="z-10 w-full h-14 absolute cursor-pointer select-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid place-content-center"
          >
            <span className="material-symbols-outlined">visibility</span>
          </div>
        )}
        <div
          className={`absolute w-full p-4 bg-white rounded-sm shadow-sm ${
            data.showQuestion ? 'hover:shadow-lg group' : ''
          }`}
        >
          <p
            className={`text-lg text-center h-[30px] overflow-hidden duration-200 
            ${!data.showQuestion ? 'blur-sm opacity-40 select-none' : ''} 
            ${renglones === 2 ? 'group-hover:max-h-[100px]' : ''} 
            ${renglones === 3 ? 'group-hover:max-h-[100px]' : ''} 
            `}
          >
            {data.question ? data.question : 'AJSDNKASNDKJASDNHAJKSDASJK'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default QuestionSection
