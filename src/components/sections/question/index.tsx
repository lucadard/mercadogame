import { useGame } from '../../../context/GameContext'

import Lock from './LockIcon'
import Text from './Text'
import { LoadingSpinner } from '../../../assets/Loading'

type Props = {
  isLoading: boolean
}

const QuestionSection = ({ isLoading }: Props) => {
  const { state, dispatch } = useGame()

  const handleResetQuestion = () => {
    dispatch({ type: 'question_next' })
    // setAnimateRotation(true)
    setTimeout(() => {
      // setAnimateRotation(false)
    }, 1000)
  }

  const currentQuestion = state.questions[state.questionResets]

  const renderChildren = () => {
    if (!currentQuestion) return <Lock />

    return (
      <Text
        children={
          isLoading ? <LoadingSpinner size={25} /> : currentQuestion.text
        }
      />
    )
  }

  return (
    <section className="z-20 relative flex flex-col gap-2 max-w-[600px] mx-auto h-[100px] mb-4">
      <div className="flex items-center gap-2">
        <h3 className="font-medium pl-3">
          2. Hace click para revelar la pregunta:
        </h3>
        <span className="material-symbols-outlined cursor-pointer select-none text-lg">
          refresh
        </span>
      </div>
      <div className="min-h-[62px]">{renderChildren()}</div>
    </section>
  )
}

export default QuestionSection
