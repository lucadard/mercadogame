import { useGame } from '../../../context/GameContext'

import Lock from './LockIcon'
import Text from './Text'
import { LoadingSpinner } from '../../../assets/Loading'

type Props = {
  children: any
  isLoading: boolean
}

const QuestionSection = ({ children, isLoading }: Props) => {
  const { state } = useGame()

  const renderChildren = () => {
    if (!state.questions[state.questionResets]) return <Lock />
    return (
      <Text
        children={
          isLoading ? (
            <LoadingSpinner size={25} />
          ) : (
            state.questions[state.questionResets].text
          )
        }
      />
    )
  }

  return (
    <section className="z-20 relative flex flex-col gap-2 w-[600px] mx-auto h-[100px]">
      {children}
      <div className="min-h-[62px]">{renderChildren()}</div>
    </section>
  )
}

export default QuestionSection
