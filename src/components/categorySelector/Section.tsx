import { useGame } from '../../context/GameContext'
import { Category as CategoryType } from '../../types'
import Category from './Category'

export const ICONS: any = {
  MLA5725: 'automobile',
  MLA1512: 'tractor',
  MLA1403: 'hamburger',
  MLA1071: 'dog-face',
  MLA1367: 'hourglass-done',
  MLA1368: 'books',
  MLA1384: 'baby',
  MLA1246: 'nail-polish',
  MLA1039: 'camera',
  MLA1051: 'mobile-phone',
  MLA1648: 'laptop',
  MLA1144: 'joystick',
  MLA1500: 'construction',
  MLA1276: 'soccer-ball',
  MLA5726: 'wind-face',
  MLA1000: 'satellite-antenna',
  MLA2547: 'ticket',
  MLA407134: 'hammer-and-wrench',
  MLA1499: 'paperclip',
  MLA1182: 'violin',
  MLA3937: 'watch',
  MLA1132: 'teddy-bear',
  MLA3025: 'writing-hand',
  MLA1168: 'clapper-board',
  MLA1430: 't-shirt',
  MLA409431: 'stethoscope',
  MLA9304: 'party-popper',
  MLA1953: 'magnifying-glass-tilted-left'
}

type Props = {
  children: any
}

const CategoriesSection = ({ children }: Props) => {
  const { state, dispatch } = useGame()

  const handleCategorySelection = (id: string) => {
    if (state.selectedCategoryId) return
    dispatch({ type: 'set_category', payload: id })
  }

  return (
    <section className="z-10 flex flex-col gap-2 w-[600px] mx-auto">
      {children}
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
