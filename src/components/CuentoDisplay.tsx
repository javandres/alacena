import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PersonajeAnimado } from './PersonajeAnimado'
import { hablar, detener, narradorDisponible } from '../lib/narrador'
import type { Personaje, Lugar } from '../tipos'
import type { CuentoGenerado } from '../lib/generadorCuento'
import css from './CuentoDisplay.module.css'

type Props = {
  personaje: Personaje
  lugar: Lugar
  cuento: CuentoGenerado
  autoIniciarNarrador?: boolean
}

type Direccion = 1 | -1

export function CuentoDisplay({ personaje, lugar, cuento, autoIniciarNarrador = false }: Props) {
  const [pagina, setPagina] = useState(0)
  const [direccion, setDireccion] = useState<Direccion>(1)
  const total = 4
  const paso = (pagina + 1) as 1 | 2 | 3 | 4

  // Leer la página actual cuando cambia
  useEffect(() => {
    if (!narradorDisponible()) return
    if (pagina === 0 && !autoIniciarNarrador) return
    detener()
    const t = setTimeout(() => void hablar(cuento.actos[pagina]), 150)
    return () => {
      clearTimeout(t)
    }
  }, [pagina, cuento, autoIniciarNarrador])

  // Limpiar al desmontar
  useEffect(() => () => detener(), [])

  const anterior = () => {
    if (pagina === 0) return
    setDireccion(-1)
    setPagina(p => p - 1)
  }
  const siguiente = () => {
    if (pagina >= total - 1) return
    setDireccion(1)
    setPagina(p => p + 1)
  }

  const variantes = {
    enter: (dir: Direccion) => ({
      x: dir > 0 ? 80 : -80,
      rotate: dir > 0 ? 4 : -4,
      opacity: 0,
    }),
    center: { x: 0, rotate: 0, opacity: 1 },
    exit: (dir: Direccion) => ({
      x: dir > 0 ? -80 : 80,
      rotate: dir > 0 ? -4 : 4,
      opacity: 0,
    }),
  }

  return (
    <div className={css.cuaderno}>
      <div className={css.binding} aria-hidden />
      <div className={css.escenario}>
        <AnimatePresence mode="wait" custom={direccion}>
          <motion.div
            key={pagina}
            className={css.hoja}
            custom={direccion}
            variants={variantes}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className={css.fondoLugar} style={{ backgroundImage: `url(${lugar.imagen})` }} />
            <div className={css.overlay} aria-hidden />

            <div className={css.personajeWrapper}>
              <PersonajeAnimado personaje={personaje} paso={paso} tamanio={220} />
            </div>

            <div className={css.tarjetaTexto}>
              <p className={css.parrafo}>{cuento.actos[pagina]}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className={`${css.flecha} ${css.flechaIzq}`}
          onClick={anterior}
          disabled={pagina === 0}
          aria-label="Página anterior"
        >
          ←
        </button>
        <button
          className={`${css.flecha} ${css.flechaDer}`}
          onClick={siguiente}
          disabled={pagina >= total - 1}
          aria-label="Página siguiente"
        >
          →
        </button>
      </div>

      <div className={css.dots} role="group" aria-label="Páginas del cuento">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`${css.dot} ${i === pagina ? css.dotActivo : ''}`}
            onClick={() => {
              setDireccion(i > pagina ? 1 : -1)
              setPagina(i)
            }}
            aria-label={`Ir a página ${i + 1}`}
            aria-current={i === pagina ? 'true' : undefined}
          />
        ))}
      </div>

      <div className={css.contador}>Página {pagina + 1} de {total}</div>
    </div>
  )
}
