import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { lineasIntro } from '../data/intro'
import { BotonPrincipal } from '../components/BotonPrincipal'
import css from './Intro.module.css'

const INTRO_VISTO_KEY = 'alacena:intro-visto'

export function Intro() {
  const navegar = useNavigate()
  const [visibles, setVisibles] = useState(0)
  const completo = visibles >= lineasIntro.length

  useEffect(() => {
    if (completo) return
    const t = setTimeout(() => setVisibles(v => v + 1), visibles === 0 ? 600 : 1400)
    return () => clearTimeout(t)
  }, [visibles, completo])

  const continuar = () => {
    localStorage.setItem(INTRO_VISTO_KEY, 'true')
    navegar('/menu')
  }

  return (
    <div className={css.contenedor}>
      <button className={css.saltar} onClick={continuar} aria-label="Saltar intro">
        Saltar →
      </button>

      <div>
        {lineasIntro.slice(0, visibles).map((linea, i) => (
          <motion.p
            key={i}
            className={css.linea}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {linea}
          </motion.p>
        ))}
      </div>

      {completo && (
        <motion.div
          className={css.boton}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <BotonPrincipal onClick={continuar}>¡Sí, vamos!</BotonPrincipal>
        </motion.div>
      )}
    </div>
  )
}
