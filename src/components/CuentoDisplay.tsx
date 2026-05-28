import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PersonajeAnimado } from './PersonajeAnimado'
import { ControlesAudio } from './ControlesAudio'
import type { Personaje } from '../tipos'
import type { CuentoGenerado } from '../lib/generadorCuento'
import css from './CuentoDisplay.module.css'

type Props = {
  personaje: Personaje
  cuento: CuentoGenerado
  autoIniciarNarrador?: boolean
}

const MS_POR_PARRAFO = 3000

export function CuentoDisplay({ personaje, cuento, autoIniciarNarrador = false }: Props) {
  const [parrafosVisibles, setParrafosVisibles] = useState(1)

  useEffect(() => {
    if (parrafosVisibles >= 4) return
    const t = setTimeout(() => setParrafosVisibles(n => Math.min(n + 1, 4)), MS_POR_PARRAFO)
    return () => clearTimeout(t)
  }, [parrafosVisibles])

  // pose actual = paso del último párrafo visible
  const pasoActual = (Math.min(parrafosVisibles, 4)) as 1 | 2 | 3 | 4

  return (
    <div className={css.contenedor}>
      <div className={css.personaje}>
        <PersonajeAnimado personaje={personaje} paso={pasoActual} tamanio={200} />
      </div>

      <div className={css.texto}>
        {cuento.actos.slice(0, parrafosVisibles).map((parrafo, i) => (
          <motion.p
            key={i}
            className={css.parrafo}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {parrafo}
          </motion.p>
        ))}
      </div>

      <div className={css.controles}>
        <ControlesAudio texto={cuento.texto} autoIniciar={autoIniciarNarrador} />
      </div>
    </div>
  )
}
