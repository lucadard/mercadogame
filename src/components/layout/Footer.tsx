import React from 'react'
import { useModal } from '../../hooks/useModal'
import Button from '../Button'

const Popup = () => {
  return (
    <div className="text-center flex flex-col gap-3 w-full">
      <h3 className="text-2xl">Como jugar:</h3>
      <p>
        El juego se compone de 10 rondas en las que deberás deducir, o en
        algunos casos adivinar, a qué producto se refiere la pregunta
        presentada, obteniendo 3 puntos en caso de responder correctamente y 0
        si la respuesta es incorrecta.
      </p>
      <p>
        Durante cada ronda, se te permitirá cambiar la pregunta dos veces,
        siempre del mismo producto. Sin embargo, cada vez que lo hagas, se te
        descontará 1 punto del puntaje obtenido en la ronda, lo que significa
        que la puntuacion puede variar de 1 a 3 puntos.
      </p>
      <p>
        En caso de detectar algún error, la ronda se reiniciará, lo que no
        afectará a tu puntuación.
      </p>
    </div>
  )
}

const Footer = () => {
  const setModal = useModal((state) => state.setModal)
  return (
    <>
      <p
        className="text-center text-sm underline text-gray-500 cursor-pointer hover:text-gray-400 mb-2"
        onClick={() => setModal(<Popup />)}
      >
        Como funciona?
      </p>
      <section className="border-t-[1px] border-gray-300 py-6 flex justify-center items-center flex-col gap-2 bg-gray-400/10">
        <div>
          <span className="mr-2">hecho por</span>
          <a href="https://github.com/lucadard" target="_blank">
            <Button style="dashed">lucadard</Button>
          </a>
        </div>
      </section>
    </>
  )
}

export default Footer
